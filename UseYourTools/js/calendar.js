// ============================================================
// Google Calendar Integration
// Uses Google Identity Services (OAuth2 implicit flow)
// No backend required — runs entirely in the browser
// ============================================================

const CAL_TOKEN_KEY    = 'uyt_gcal_token';
const CAL_CLIENT_KEY   = 'uyt_gcal_client_id';
const CAL_EXPIRY_KEY   = 'uyt_gcal_expiry';
const USER_PROFILE_KEY = 'uyt_user_profile';
const CAL_SCOPE        = 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.readonly';
const CAL_API_BASE     = 'https://www.googleapis.com/calendar/v3';

// In-memory state
const calState = {
  token: null,
  clientId: null,
  tokenClient: null,
  events: [],
  fetchError: null,
  userProfile: null,
  unreadCount: null,
  oncall: null,       // string — name of who is on-call today
  ooo: [],            // array of names who are OOO today
  upcoming: [],       // array of notable upcoming events (next 30 days)
};

// ── Bootstrap ───────────────────────────────────────────────

function calInit() {
  calState.clientId    = localStorage.getItem(CAL_CLIENT_KEY) || '';
  calState.userProfile = loadUserProfile();

  const token  = localStorage.getItem(CAL_TOKEN_KEY);
  const expiry = Number(localStorage.getItem(CAL_EXPIRY_KEY) || 0);
  const now    = Date.now();

  if (token && now < expiry) {
    calState.token = token;
    Promise.all([
      calFetchUpcoming().catch((e) => {
        console.warn('[calInit] calFetchUpcoming error:', e);
      }),
      calFetchUnreadCount(),
      calFetchOncall(),
      calFetchOOO(),
      calFetchUpcomingEvents(),
    ]).then(() => {
      if (typeof renderDashboard === 'function') renderDashboard();
    });
  } else if (calState.clientId) {
    calClearToken();
    if (typeof google !== 'undefined' && google.accounts?.oauth2) {
      _calSilentRefresh();
    } else {
      window.addEventListener('load', () => {
        if (typeof google !== 'undefined' && google.accounts?.oauth2) {
          _calSilentRefresh();
        }
      });
    }
  }
}

function _calSilentRefresh() {
  const tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: calState.clientId,
    scope: CAL_SCOPE,
    prompt: '',
    callback: async (resp) => {
      if (resp.error) {
        console.warn('Silent token refresh failed:', resp.error);
        if (typeof renderDashboard === 'function') renderDashboard();
        return;
      }
      calState.token = resp.access_token;
      const expiry = Date.now() + (resp.expires_in || 3600) * 1000;
      localStorage.setItem(CAL_TOKEN_KEY, calState.token);
      localStorage.setItem(CAL_EXPIRY_KEY, String(expiry));

      await Promise.all([calFetchUpcoming(), calFetchUnreadCount()]);
      if (typeof renderDashboard     === 'function') renderDashboard();
      if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
    },
  });
  tokenClient.requestAccessToken({ prompt: '' });
}

function loadUserProfile() {
  try {
    return JSON.parse(localStorage.getItem(USER_PROFILE_KEY) || 'null');
  } catch {
    return null;
  }
}

function saveUserProfile(profile) {
  if (profile) {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  } else {
    localStorage.removeItem(USER_PROFILE_KEY);
  }
  calState.userProfile = profile;
}

// ── OAuth2 flow ──────────────────────────────────────────────

function calConnect() {
  const clientId = (document.getElementById('gcal-client-id-input')?.value || '').trim()
                || calState.clientId;
  if (!clientId) {
    alert('Please enter your Google Client ID first.');
    return;
  }

  calState.clientId = clientId;
  localStorage.setItem(CAL_CLIENT_KEY, clientId);

  if (typeof google === 'undefined' || !google.accounts) {
    alert('Google Identity Services failed to load. Check your internet connection and try again.');
    return;
  }

  calState.tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: CAL_SCOPE,
    callback: async (resp) => {
      if (resp.error) {
        console.error('GCal auth error:', resp);
        alert('Calendar connection failed: ' + resp.error);
        return;
      }

      calState.token = resp.access_token;
      const expiry = Date.now() + (resp.expires_in || 3600) * 1000;
      localStorage.setItem(CAL_TOKEN_KEY, calState.token);
      localStorage.setItem(CAL_EXPIRY_KEY, String(expiry));

      // Fetch user's name/profile from Google
      await calFetchUserProfile();
      await Promise.all([calFetchUpcoming(), calFetchUnreadCount(), calFetchOncall(), calFetchOOO(), calFetchUpcomingEvents()]);

      if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
      if (typeof renderDashboard     === 'function') renderDashboard();
    },
  });

  calState.tokenClient.requestAccessToken({ prompt: 'consent' });
}

async function calFetchUnreadCount() {
  if (!calState.token) return;
  try {
    const res = await fetch(
      'https://gmail.googleapis.com/gmail/v1/users/me/labels/INBOX',
      { headers: { Authorization: `Bearer ${calState.token}` } }
    );
    if (!res.ok) return;
    const data = await res.json();
    calState.unreadCount = typeof data.messagesUnread === 'number' ? data.messagesUnread
                         : typeof data.threadsUnread  === 'number' ? data.threadsUnread
                         : 0;
    console.log('Gmail label data:', data);
  } catch (err) {
    console.warn('Could not fetch Gmail unread count:', err);
    calState.unreadCount = null;
  }
}

async function calFetchUserProfile() {
  if (!calState.token) return;
  try {
    const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${calState.token}` },
    });
    if (!res.ok) return;
    const data = await res.json();
    saveUserProfile({
      name:    data.name    || '',
      email:   data.email   || '',
      picture: data.picture || '',
    });
  } catch (err) {
    console.warn('Could not fetch user profile:', err);
  }
}

function calDisconnect() {
  if (calState.token && typeof google !== 'undefined') {
    google.accounts.oauth2.revoke(calState.token, () => {});
  }
  calClearToken();
  calState.events = [];
  calState.unreadCount = null;
  saveUserProfile(null);
  if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
  if (typeof renderDashboard     === 'function') renderDashboard();
}

function calClearToken() {
  calState.token = null;
  localStorage.removeItem(CAL_TOKEN_KEY);
  localStorage.removeItem(CAL_EXPIRY_KEY);
}

function calIsConnected() {
  return !!calState.token;
}


// ── API calls ────────────────────────────────────────────────

async function calFetchUpcoming(daysAhead = 7) {
  calState.fetchError = null;
  if (!calState.token) return [];

  const now = new Date();
  const end = new Date(now);
  end.setDate(end.getDate() + daysAhead);

  const params = new URLSearchParams({
    calendarId:   'primary',
    timeMin:      now.toISOString(),
    timeMax:      end.toISOString(),
    maxResults:   20,
    singleEvents: 'true',
    orderBy:      'startTime',
  });

  try {
    const res = await fetch(`${CAL_API_BASE}/calendars/primary/events?${params}`, {
      headers: { Authorization: `Bearer ${calState.token}` },
    });

    if (res.status === 401) {
      calClearToken();
      calState.fetchError = 'Session expired — reconnect your calendar.';
      throw new Error('401 Unauthorized');
    }

    if (!res.ok) {
      let body = await res.text().catch(() => '');
      let errorMsg = body;
      try {
        const json = JSON.parse(body);
        if (json.error?.message) errorMsg = json.error.message;
        else if (json.error_description) errorMsg = json.error_description;
      } catch (_err) {}
      console.error('GCal fetch failed:', res.status, errorMsg);
      calState.fetchError = `Unable to load calendar events (${res.status}): ${escHtml(String(errorMsg || 'unknown error'))}`;
      return [];
    }

    const data = await res.json();
    calState.events = (data.items || []).map(item => ({
      id:       item.id,
      title:    item.summary || '(no title)',
      start:    item.start?.dateTime || item.start?.date,
      end:      item.end?.dateTime   || item.end?.date,
      allDay:   !item.start?.dateTime,
      location: item.location || '',
      link:     item.htmlLink || '',
      color:    item.colorId  || null,
    }));
    calState.fetchError = null;
    return calState.events;
  } catch (err) {
    console.error('GCal fetch error:', err);
    calState.fetchError = 'Unable to reach Google Calendar.';
    return [];
  }
}

async function calFetchOncall() {
  if (!calState.token) return;
  try {
    const now = new Date();
    const end = new Date(now); end.setHours(23, 59, 59);
    const params = new URLSearchParams({
      timeMin: now.toISOString(),
      timeMax: end.toISOString(),
      singleEvents: 'true',
      orderBy: 'startTime',
      maxResults: 5,
    });
    const res = await fetch(
      `${CAL_API_BASE}/calendars/${ONCALL_CAL_ID}/events?${params}`,
      { headers: { Authorization: `Bearer ${calState.token}` } }
    );
    if (!res.ok) { calState.oncall = null; return; }
    const data = await res.json();
    const event = (data.items || [])[0];
    calState.oncall = event ? (event.summary || 'On-call') : null;
  } catch (e) {
    console.warn('On-call fetch error:', e);
    calState.oncall = null;
  }
}

async function calFetchOOO() {
  if (!calState.token) return;
  try {
    const now = new Date();
    const end = new Date(now); end.setHours(23, 59, 59);
    const params = new URLSearchParams({
      timeMin: now.toISOString(),
      timeMax: end.toISOString(),
      singleEvents: 'true',
      orderBy: 'startTime',
      maxResults: 20,
    });
    const res = await fetch(
      `${CAL_API_BASE}/calendars/${OOO_CAL_ID}/events?${params}`,
      { headers: { Authorization: `Bearer ${calState.token}` } }
    );
    if (!res.ok) { calState.ooo = []; return; }
    const data = await res.json();
    calState.ooo = (data.items || [])
      .filter(e => {
        const t = (e.summary || '').toLowerCase();
        return t.includes('ooo') || t.includes('out of office') || t.includes('leave') || t.includes('vacation');
      })
      .map(e => e.summary || 'Unknown');
  } catch (e) {
    console.warn('OOO fetch error:', e);
    calState.ooo = [];
  }
}

async function calFetchUpcomingEvents() {
  if (!calState.token) return;
  try {
    const now = new Date();
    const end = new Date(now); end.setDate(end.getDate() + 30);
    const params = new URLSearchParams({
      timeMin: now.toISOString(),
      timeMax: end.toISOString(),
      singleEvents: 'true',
      orderBy: 'startTime',
      maxResults: 20,
    });

    // Fetch from both OOO and Recharge calendars in parallel
    const [oooRes, rechargeRes] = await Promise.all([
      fetch(`${CAL_API_BASE}/calendars/${OOO_CAL_ID}/events?${params}`,
        { headers: { Authorization: `Bearer ${calState.token}` } }),
      fetch(`${CAL_API_BASE}/calendars/${RECHARGE_CAL_ID}/events?${params}`,
        { headers: { Authorization: `Bearer ${calState.token}` } }),
    ]);

    const keywords = ['holiday', 'due', 'deadline', 'all hands', 'all-hands', 'offsite', 'kickoff'];
    let events = [];

    if (oooRes.ok) {
      const data = await oooRes.json();
      const filtered = (data.items || []).filter(e =>
        keywords.some(k => (e.summary || '').toLowerCase().includes(k))
      );
      events = events.concat(filtered.map(e => ({
        title: e.summary,
        start: e.start?.date || e.start?.dateTime,
        type: 'ooo',
      })));
    }

    if (rechargeRes.ok) {
      const data = await rechargeRes.json();
      const prefixes = ['US', 'CA', 'RO', 'AUS', 'JP', 'IN', 'PT', 'UK', 'IL'];

      // Filter to only events starting with a known country code
      const filtered = (data.items || []).filter(e =>
        prefixes.some(p => (e.summary || '').toUpperCase().startsWith(p))
      );

      const formatRange = (start, end) => {
        const s = new Date(start);
        // Google all-day end dates are exclusive (day after), subtract 1
        const e = end ? new Date(new Date(end).setDate(new Date(end).getDate() - 1)) : null;
        const sLabel = s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (!e || s.toDateString() === e.toDateString()) return sLabel;
        const eLabel = s.getMonth() === e.getMonth()
          ? e.getDate()
          : e.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return `${sLabel}–${eLabel}`;
      };

      // Group by start date — collapse same-day holidays into one chip
      const byDate = {};
      filtered.forEach(e => {
        const start  = e.start?.date || e.start?.dateTime;
        const end    = e.end?.date   || e.end?.dateTime;
        const dateKey = start?.slice(0, 10);
        if (!dateKey) return;
        if (!byDate[dateKey]) byDate[dateKey] = [];
        byDate[dateKey].push({ summary: e.summary, start, end });
      });

      Object.entries(byDate).forEach(([dateKey, items]) => {
        if (items.length === 1) {
          const { summary, start, end } = items[0];
          events.push({
            title: summary,
            start: dateKey,
            dateLabel: formatRange(start, end),
            type: 'recharge',
          });
        } else {
          const codes = items.map(i => {
            const match = i.summary.match(/^([A-Z]+)/);
            return match ? match[1] : i.summary;
          });
          const latestEnd = items.reduce((max, i) => {
            const e = i.end || i.start;
            return e > max ? e : max;
          }, items[0].end || items[0].start);
          events.push({
            title: `Holiday (${[...new Set(codes)].join(', ')})`,
            start: dateKey,
            dateLabel: formatRange(dateKey, latestEnd),
            type: 'recharge',
          });
        }
      });
    }

    // Sort by date
    events.sort((a, b) => new Date(a.start) - new Date(b.start));
    calState.upcoming = events;
  } catch (e) {
    console.warn('Upcoming events fetch error:', e);
    calState.upcoming = [];
  }
}

const ONCALL_CAL_ID  = 'c_33c0731c98854b7a958fe6bb5880a5f0abbfa15be32df7119e2af8704fe033f1%40group.calendar.google.com';
const OOO_CAL_ID     = 'support%40snyk.io';
const RECHARGE_CAL_ID = 'c_93af26c794d2c1cdbdcd2b0f4fc8f7b948582d268d4260f729c6b234d4f5074f%40group.calendar.google.com';

// ── Helpers ──────────────────────────────────────────────────

function calTodayEvents() {
  const today = new Date().toDateString();
  return calState.events.filter(e => new Date(e.start).toDateString() === today);
}

function calUpcomingEvents() {
  return calState.events;
}

function calFormatEventTime(event) {
  if (event.allDay) return 'All day';
  const d = new Date(event.start);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function calFormatEventDate(event) {
  const d = new Date(event.start);
  const today    = new Date();
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);

  if (d.toDateString() === today.toDateString())    return 'Today';
  if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
