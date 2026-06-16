// ============================================================
// Google Calendar Integration
// Uses Google Identity Services (OAuth2 implicit flow)
// No backend required — runs entirely in the browser
// ============================================================

const CAL_TOKEN_KEY    = 'uyt_gcal_token';
const CAL_CLIENT_KEY   = 'uyt_gcal_client_id';
const CAL_EXPIRY_KEY   = 'uyt_gcal_expiry';
const USER_PROFILE_KEY = 'uyt_user_profile';
const CAL_SCOPE = 'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/drive.readonly';
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
  oncall: null,
  oncallLast: null,  // who was on-call last weekend
  oncallNext: null,  // who is on-call next weekend
  ooo: [],
  upcoming: [],
  driveShared: [],
  driveMentions: [],
  driveCreated: [],
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
      calFetchDriveShared(),
      calFetchDriveMentions(),
      calFetchDriveCreated(),
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
      await Promise.all([
        calFetchUpcoming(),
        calFetchUnreadCount(),
        calFetchOncall(),
        calFetchOOO(),
        calFetchUpcomingEvents(),
        calFetchDriveShared(),
        calFetchDriveMentions(),
        calFetchDriveCreated(),
      ]);

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
  calState.oncall = null;
  calState.oncallLast = null;
  calState.oncallNext = null;
  calState.driveShared = [];
  calState.driveMentions = [];
  calState.driveCreated = [];
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
    // Helper to get last Saturday 00:00 and next Sunday 23:59
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon ... 6=Sat

    // Last weekend: previous Sat–Sun
    const lastSat = new Date(now);
    lastSat.setDate(now.getDate() - ((dayOfWeek + 1) % 7) - 7);
    lastSat.setHours(0, 0, 0, 0);
    const lastSun = new Date(lastSat);
    lastSun.setDate(lastSat.getDate() + 1);
    lastSun.setHours(23, 59, 59, 999);

    // Next weekend: coming Sat–Sun
    const daysUntilSat = (6 - dayOfWeek + 7) % 7 || 7;
    const nextSat = new Date(now);
    nextSat.setDate(now.getDate() + daysUntilSat);
    nextSat.setHours(0, 0, 0, 0);
    const nextSun = new Date(nextSat);
    nextSun.setDate(nextSat.getDate() + 1);
    nextSun.setHours(23, 59, 59, 999);

    // Fetch a wide window covering last weekend → next weekend
    const fetchStart = new Date(lastSat);
    const fetchEnd   = new Date(nextSun);
    // Also add 7 more days for next-week events in the grid
    fetchEnd.setDate(fetchEnd.getDate() + 7);

    const params = new URLSearchParams({
      timeMin: fetchStart.toISOString(),
      timeMax: fetchEnd.toISOString(),
      singleEvents: 'true',
      orderBy: 'startTime',
      maxResults: 50,
    });
    const res = await fetch(
      `${CAL_API_BASE}/calendars/${ONCALL_CAL_ID}/events?${params}`,
      { headers: { Authorization: `Bearer ${calState.token}` } }
    );
    if (!res.ok) { calState.oncall = null; return; }
    const data = await res.json();
    const items = data.items || [];

    const eventOnDate = (date) => {
      // Compare in local time — events use dateTime (UTC midnight = prior day in local tz)
      const dateStr = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
      return items.find(e => {
        const start = e.start?.dateTime || e.start?.date || '';
        const localDate = new Date(start);
        const localStr = `${localDate.getFullYear()}-${String(localDate.getMonth()+1).padStart(2,'0')}-${String(localDate.getDate()).padStart(2,'0')}`;
        return localStr === dateStr;
      });
    };

    // Extract name from summary like "Joshua Woods is on-call for..."
    const extractName = (summary) => {
      const match = (summary || '').match(/^(.+?)\s+is on-call/i);
      return match ? match[1] : summary;
    };

    // Today's on-call banner
    const todayEvent = eventOnDate(now);
    calState.oncall = todayEvent ? extractName(todayEvent.summary) : null;

    // Last weekend — check both Saturday and Sunday, dedupe names
    const lastWkEvents = [lastSat, lastSun].map(eventOnDate).filter(Boolean);
    const lastNames = [...new Set(lastWkEvents.map(e => extractName(e.summary)))];
    calState.oncallLast = lastNames.length ? lastNames.join(', ') : null;

    // Next weekend — check both Saturday and Sunday, dedupe names
    const nextWkEvents = [nextSat, nextSun].map(eventOnDate).filter(Boolean);
    const nextNames = [...new Set(nextWkEvents.map(e => extractName(e.summary)))];
    calState.oncallNext = nextNames.length ? nextNames.join(', ') : null;

    // Inject on-call events into calState.events for week/day views
    const weekStart = fetchStart;
    const weekEnd   = new Date(now); weekEnd.setDate(now.getDate() + 7);
    const oncallEvents = items.map(e => ({
        id:     'oncall-' + e.id,
        title:  '🚨 ' + extractName(e.summary),
        start:  e.start?.dateTime || e.start?.date,
        end:    e.end?.dateTime   || e.end?.date,
        allDay: !e.start?.dateTime,
        location: '',
        link:   e.htmlLink || '',
        color:  'oncall',
      }));

    calState.events = calState.events.filter(e => !e.id?.startsWith('oncall-'));
    calState.events = calState.events.concat(oncallEvents);
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

      const parseDate = str => {
        // Parse YYYY-MM-DD without timezone shift
        const [y, m, d] = str.slice(0, 10).split('-').map(Number);
        return new Date(y, m - 1, d);
      };

      const formatRange = (start, end) => {
        const s = parseDate(start);
        const e = end ? parseDate(end) : null;
        const sLabel = s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        // If no end, or same day, or end is just 1 day after start (all-day event convention), show single date
        if (!e || s.toDateString() === e.toDateString()) return sLabel;
        const diffDays = Math.round((e - s) / 86400000);
        if (diffDays <= 1) return sLabel;
        const eLabel = s.getMonth() === e.getMonth()
          ? e.getDate()
          : e.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return `${sLabel}–${eLabel}`;
      };

      // Determine event label — "Recharge Week" or "Holiday"
      const getEventType = summary => {
        if ((summary || '').toLowerCase().includes('recharge')) return 'recharge week';
        return 'holiday';
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
          const eventLabel = getEventType(items[0].summary);
          events.push({
            title: `${eventLabel.charAt(0).toUpperCase() + eventLabel.slice(1)} (${[...new Set(codes)].join(', ')})`,
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

async function calFetchDriveShared() {
  if (!calState.token) return;
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const query = `sharedWithMe and modifiedTime > '${thirtyDaysAgo.toISOString()}' and (mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType = 'application/vnd.google-apps.document')`;
    const params = new URLSearchParams({
      q: query,
      fields: 'files(id,name,mimeType,webViewLink,modifiedTime,sharingUser)',
      orderBy: 'modifiedTime desc',
      pageSize: 10,
    });
    const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`, {
      headers: { Authorization: `Bearer ${calState.token}` },
    });
    if (!res.ok) { calState.driveShared = []; return; }
    const data = await res.json();
    calState.driveShared = (data.files || []).map(f => ({
      id: f.id,
      name: f.name,
      type: f.mimeType.includes('spreadsheet') ? 'sheet' : 'doc',
      link: f.webViewLink,
      modified: f.modifiedTime,
      sharedBy: f.sharingUser?.displayName || '',
    }));
  } catch (e) {
    console.warn('Drive shared fetch error:', e);
    calState.driveShared = [];
  }
}

async function calFetchDriveMentions() {
  if (!calState.token) return;
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    // Search for files where user is mentioned in comments
    const params = new URLSearchParams({
      q: `(mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType = 'application/vnd.google-apps.document') and modifiedTime > '${thirtyDaysAgo.toISOString()}'`,
      fields: 'files(id,name,mimeType,webViewLink,modifiedTime)',
      orderBy: 'modifiedTime desc',
      pageSize: 10,
      includeItemsFromAllDrives: true,
      supportsAllDrives: true,
    });
    // Use the activity/comments approach — search for files with unresolved comments mentioning the user
    const email = calState.userProfile?.email || '';
    if (!email) { calState.driveMentions = []; return; }

    const mentionParams = new URLSearchParams({
      q: `fullText contains '${email}' and (mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType = 'application/vnd.google-apps.document') and modifiedTime > '${thirtyDaysAgo.toISOString()}'`,
      fields: 'files(id,name,mimeType,webViewLink,modifiedTime)',
      orderBy: 'modifiedTime desc',
      pageSize: 10,
    });
    const res = await fetch(`https://www.googleapis.com/drive/v3/files?${mentionParams}`, {
      headers: { Authorization: `Bearer ${calState.token}` },
    });
    if (!res.ok) { calState.driveMentions = []; return; }
    const data = await res.json();
    calState.driveMentions = (data.files || []).map(f => ({
      id: f.id,
      name: f.name,
      type: f.mimeType.includes('spreadsheet') ? 'sheet' : 'doc',
      link: f.webViewLink,
      modified: f.modifiedTime,
    }));
  } catch (e) {
    console.warn('Drive mentions fetch error:', e);
    calState.driveMentions = [];
  }
}

async function calFetchDriveCreated() {
  if (!calState.token) return;
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const params = new URLSearchParams({
      q: `'me' in owners and createdTime > '${thirtyDaysAgo.toISOString()}' and (mimeType = 'application/vnd.google-apps.spreadsheet' or mimeType = 'application/vnd.google-apps.document') and trashed = false`,
      fields: 'files(id,name,mimeType,webViewLink,createdTime,modifiedTime)',
      orderBy: 'createdTime desc',
      pageSize: 10,
    });
    const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`, {
      headers: { Authorization: `Bearer ${calState.token}` },
    });
    if (!res.ok) { calState.driveCreated = []; return; }
    const data = await res.json();
    calState.driveCreated = (data.files || []).map(f => ({
      id: f.id,
      name: f.name,
      type: f.mimeType.includes('spreadsheet') ? 'sheet' : 'doc',
      link: f.webViewLink,
      modified: f.modifiedTime,
      created: f.createdTime,
      sharedBy: '',
    }));
  } catch (e) {
    console.warn('Drive created fetch error:', e);
    calState.driveCreated = [];
  }
}

const ONCALL_CAL_ID  = '8mhg7kvrksctmpiklii47jgpi8lchppe%40import.calendar.google.com';
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
