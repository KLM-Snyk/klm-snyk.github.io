// Blink — Main App

/* ============================================================
   Zen Quotes
   ============================================================ */
const ZEN_QUOTES = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Focus is not about saying yes to the thing you've got to focus on. It's about saying no to the hundred other good ideas.", author: "Steve Jobs" },
  { text: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.", author: "Steve Jobs" },
  { text: "It's not about having time. It's about making time.", author: "Unknown" },
  { text: "Done is better than perfect.", author: "Sheryl Sandberg" },
  { text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.", author: "Stephen Covey" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "Deep work is the ability to focus without distraction on a cognitively demanding task.", author: "Cal Newport" },
  { text: "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus.", author: "Alexander Graham Bell" },
  { text: "Either you run the day or the day runs you.", author: "Jim Rohn" },
  { text: "Productivity is never an accident. It is always the result of a commitment to excellence.", author: "Paul J. Meyer" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Time is what we want most but what we use worst.", author: "William Penn" },
  { text: "You will never find time for anything. If you want time, you must make it.", author: "Charles Buxton" },
  { text: "Work smarter, not harder.", author: "Allan F. Mogensen" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "I am not a product of my circumstances. I am a product of my decisions.", author: "Stephen Covey" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "Today's accomplishments were yesterday's impossibilities.", author: "Robert H. Schuller" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
];

function sanitizeHtml(html) {
  return (html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '');
}


function getDailyQuote() {
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  return ZEN_QUOTES[dayOfYear % ZEN_QUOTES.length];
}

/* ============================================================
   Date / Time helpers
   ============================================================ */

function formatTime(hour, minute = 0, use12 = true) {
  if (use12) {
    const period = hour < 12 ? 'AM' : 'PM';
    const h = hour % 12 || 12;
    const m = String(minute).padStart(2, '0');
    return minute ? `${h}:${m} ${period}` : `${h} ${period}`;
  } else {
    const h = String(hour).padStart(2, '0');
    const m = String(minute).padStart(2, '0');
    return `${h}:${m}`;
  }
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function isoDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getInboxZeroMessage() {
  const messages = [
    'Inbox zero. You beautiful, productive human.',
    'Nothing here. Your future self is very proud of you.',
    'All clear. Somewhere a project manager just shed a tear of joy.',
    'Zero unread. This is what peak performance looks like.',
    'Empty inbox. You\'re either very efficient or very scary.',
    'No new emails. Go touch grass. You\'ve earned it.',
    'Inbox zero achieved. The monks in Tibet are impressed.',
    'Clean inbox. Have you considered a career in professional email management?',
    'Nothing to see here. Your inbox thanks you for your service.',
    'Zero. Zip. Nada. Absolutely crushing it today.',
  ];
  const day = new Date().getDate();
  return messages[day % messages.length];
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

/* ============================================================
   SVG Icons
   ============================================================ */

const ICONS = {
  cases:    `<svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>`,
  quote:    `<svg viewBox="0 0 24 24"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
};

/* ============================================================
   Planner notes storage
   ============================================================ */

const NOTES_KEY = 'uyt_planner_notes';

function loadNotes() {
  try { return JSON.parse(localStorage.getItem(NOTES_KEY) || '{}'); }
  catch { return {}; }
}

function saveNote(dateKey, hour, text) {
  const notes = loadNotes();
  if (!notes[dateKey]) notes[dateKey] = {};
  notes[dateKey][hour] = text;
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

/* ============================================================
   App State
   ============================================================ */

const state = {
  screen: 'dashboard',
  prefs: loadPrefs(),
};

/* ============================================================
   Navigation
   ============================================================ */

function navigate(screen) {
  state.screen = screen;

  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.screen === screen);
  });

  document.querySelectorAll('.screen').forEach(el => {
    el.classList.toggle('active', el.id === `screen-${screen}`);
  });

  if (screen === 'dashboard') renderDashboard();
  if (screen === 'calendar')  renderCalendar();
  if (screen === 'slack')     renderSlackAndAutoFetch();
  if (screen === 'mail') {
    renderMail();
    if (!mailState.messages && !mailState.loading && calIsConnected()) fetchMailMessages();
  }
  if (screen === 'cases') {
    renderCases();
    if (!jiraState.issues && !jiraState.loading && localStorage.getItem('uyt_jira_token')) fetchJiraIssues();
    if (!backlogState.data && !backlogState.loading) fetchBacklogData();
  }
  if (screen === 'drive')     renderDrive();
  if (screen === 'planner')   renderPlanner();
}

async function refreshApp() {
  if (!calIsConnected()) return;
  // Show spinning state on refresh buttons + Weeping Angel overlay
  document.querySelectorAll('.icon-btn[onclick*="refreshApp"]').forEach(b => b.classList.add('refreshing'));
  const angelOverlay = document.getElementById('angel-overlay');
  const _tardis = state.prefs?.tardisBackground || 'none';
  const _isDark = state.prefs?.darkMode && state.prefs?.colorScheme === 'modern';
  const isWhovian = _isDark && ['tardis', 'interior', 'tally'].includes(_tardis);
  if (angelOverlay && isWhovian) angelOverlay.classList.add('active');
  calState.driveLoading = true;
  renderDashboard();
  if (state.screen === 'calendar') renderCalendar();
  if (state.screen === 'drive') renderDrive();

  await Promise.all([
    calFetchUpcoming().catch(e => console.warn(e)),
    calFetchUnreadCount(),
    calFetchOncall(),
    calFetchOOO(),
    calFetchUpcomingEvents(),
    calFetchDriveShared(),
    calFetchDriveCreated(),
  ]);
  await calFetchDriveMentions();
  calState.driveLoading = false;
  document.querySelectorAll('.icon-btn[onclick*="refreshApp"]').forEach(b => b.classList.remove('refreshing'));
  if (angelOverlay) angelOverlay.classList.remove('active');

  renderDashboard();
  if (state.screen === 'calendar') renderCalendar();
  if (state.screen === 'drive') renderDrive();
}


// Default channels
const SLACK_DEFAULT_CHANNELS = [
  { id: 'C0885BMRNBA', name: 'support-leads' },
  { id: 'C0AFSPT6YK1', name: 'the-four-horsemen-of-support' },
  { id: 'C07JV4M7BAT', name: 'cx-support-sla' },
  { id: 'C08K5GUMVHS', name: 'cs-support-chatter' },
];

function getSlackChannels() {
  try { const s = localStorage.getItem('uyt_slack_channels'); return s ? JSON.parse(s) : SLACK_DEFAULT_CHANNELS; }
  catch { return SLACK_DEFAULT_CHANNELS; }
}

function saveSlackChannels(channels) {
  localStorage.setItem('uyt_slack_channels', JSON.stringify(channels));
}

function addSlackChannel() {
  const id = document.getElementById('slack-ch-id')?.value.trim();
  const name = document.getElementById('slack-ch-name')?.value.trim();
  if (!id || !name) return;
  const channels = getSlackChannels();
  if (!channels.find(c => c.id === id)) { channels.push({ id, name }); saveSlackChannels(channels); }
  renderSettingsPanel();
}

function removeSlackChannel(index) {
  const channels = getSlackChannels();
  channels.splice(index, 1);
  saveSlackChannels(channels);
  renderSettingsPanel();
}



// Render Slack Block Kit blocks as HTML
function renderSlackBlocks(blocks) {
  if (!blocks || !blocks.length) return null;
  let html = '';
  for (const block of blocks) {
    if (block.type === 'header') {
      html += `<div class="handover-block-header">${renderSlackMrkdwn(block.text?.text || '')}</div>`;
    } else if (block.type === 'carousel') {
      html += '<div class="handover-block-fields">';
      for (const card of (block.elements || [])) {
        if (card.type === 'card') {
          html += `<div class="handover-block-field">
            <div style="font-weight:700;font-size:13px;margin-bottom:2px">${renderSlackMrkdwn(card.title?.text || '')}</div>
            <div style="font-size:11px;color:var(--text-secondary);margin-bottom:6px">${renderSlackMrkdwn(card.subtitle?.text || '')}</div>
            <div style="font-size:12px;line-height:1.6">${renderSlackMrkdwn(card.body?.text || '')}</div>
          </div>`;
        }
      }
      html += '</div>';
    } else if (block.type === 'section') {
      if (block.fields) {
        html += '<div class="handover-block-fields">';
        for (const f of block.fields) {
          html += `<div class="handover-block-field">${renderSlackMrkdwn(f.text || '')}</div>`;
        }
        html += '</div>';
      } else if (block.text) {
        html += `<div class="handover-block-section">${renderSlackMrkdwn(block.text.text || '')}</div>`;
      }
    } else if (block.type === 'context') {
      const texts = (block.elements || []).filter(e => e.type === 'mrkdwn' || e.type === 'plain_text').map(e => renderSlackMrkdwn(e.text || '')).join(' · ');
      if (texts) html += `<div class="handover-block-context">${texts}</div>`;
    } else if (block.type === 'divider') {
      html += '<hr class="handover-divider">';
    }
  }
  return html || null;
}

function renderSlackMrkdwn(text) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // Restore and convert Slack links: <url|text> or <url>
    .replace(/&lt;(https?:\/\/[^|&]+)\|([^&]+)&gt;/g, '<a href="$1" target="_blank">$2</a>')
    .replace(/&lt;(https?:\/\/[^&]+)&gt;/g, '<a href="$1" target="_blank">$1</a>')
    .replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>')
    .replace(/_([^_\n]+)_/g, '<em>$1</em>')
    .replace(/:[a-z_0-9]+:/g, '')
    .replace(/\n/g, '<br>');
}

function renderSlackText(text) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*([^*]+)\*/g, '<strong>$1</strong>')
    .replace(/:[a-z_]+:/g, '')  // remove emoji codes
    .replace(/·/g, '·')
    .replace(/\n/g, '<br>');
}

function renderSlack() {
  const el = document.getElementById('slack-content');
  if (!el) return;
  const workerUrl = 'https://uyt-slack-digest.kar-marsten.workers.dev';
  const channels = getSlackChannels();
  if (!workerUrl) {
    el.innerHTML = `<div class="cal-connect-prompt"><div class="cal-connect-icon">💬</div><h3>Set up Slack Digest</h3><p>Add your Cloudflare Worker URL in Settings to enable the push-button Slack digest.</p><button class="connect-btn" onclick="openSettings()">Open Settings</button></div>`;
    return;
  }
  el.innerHTML = `
    <div class="slack-screen-header">
      <div><div class="slack-screen-sub">Last 24 hours · ${channels.length} channel${channels.length===1?'':'s'}</div></div>
      <button class="connect-btn" onclick="fetchSlackDigestFull()" style="padding:8px 16px;font-size:13px;${slackDigestState.loading ? 'opacity:0.5;pointer-events:none;cursor:not-allowed' : ''}">${slackDigestState.loading ? '⏳ Refreshing…' : '↺ Refresh Digest'}</button>
    </div>

    ${slackDigestState.handover ? `
    <div class="handover-banner" style="margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:8px;font-weight:700;font-size:13px">
        🌏 Region Handover
        <span style="font-size:11px;font-weight:400;color:var(--text-secondary)">${escHtml(slackDigestState.handover.time)}</span>
      </div>
      <div class="handover-blocks">${
        (() => {
          const rendered = renderSlackBlocks(slackDigestState.handover.blocks);
          return rendered || renderSlackText(slackDigestState.handover.text.slice(0, 400));
        })()
      }</div>
      <a href="${escHtml(slackDigestState.handover.permalink)}" target="_blank" style="font-size:12px;color:var(--primary);font-weight:600">View in Slack →</a>
    </div>
    ` : ''}
    ${slackDigestState.loading ? `<div class="cal-connect-prompt" style="margin-top:32px"><div class="cal-connect-icon">⏳</div><h3>Searching Slack…</h3><p>This usually takes 10–20 seconds.</p></div>`
    : slackDigestState.error ? `<div class="cal-connect-prompt" style="margin-top:32px"><div class="cal-connect-icon">⚠️</div><h3>Error loading digest</h3><p>${escHtml(slackDigestState.error)}</p><button class="connect-btn" onclick="fetchSlackDigestFull()">Try again</button></div>`
    : slackDigestState.html ? `<div class="slack-digest-full">${sanitizeHtml(slackDigestState.html)}</div><div class="slack-digest-timestamp">Last updated ${escHtml(slackDigestState.asOf||'')}</div>`
    : `<div class="cal-connect-prompt" style="margin-top:32px"><div class="cal-connect-icon">💬</div><h3>Ready to digest</h3><p>Click Refresh Digest to search the last 24 hours across your channels.</p><button class="connect-btn" onclick="fetchSlackDigestFull()">Get Digest</button></div>`}
  `;
}

async function fetchSlackDigestFull() {
  slackDigestState.loading = true;
  renderSlack();
  // Show angel overlay if Whovian background is active
  const _angelOverlay = document.getElementById('angel-overlay');
  const _tardis = state.prefs?.tardisBackground || 'none';
  const _isDark = state.prefs?.darkMode && state.prefs?.colorScheme === 'modern';
  if (_angelOverlay && _isDark && ['tardis', 'interior', 'tally'].includes(_tardis)) {
    _angelOverlay.classList.add('active');
  }
  await fetchSlackDigest();
  if (_angelOverlay) _angelOverlay.classList.remove('active');
  renderSlack();
}

function renderSlackAndAutoFetch() {
  renderSlack();
  // Auto-fetch if no digest loaded yet and worker is configured
  if (!slackDigestState.html && !slackDigestState.loading && 'https://uyt-slack-digest.kar-marsten.workers.dev') {
    fetchSlackDigestFull();
  }
}



/* ============================================================
   Mail Screen — grouped by label, collapsible, paginated
   Client-side only — no AI, no worker, no content leaves browser
   ============================================================ */

const mailState = {
  loading: false,
  messages: JSON.parse(localStorage.getItem('uyt_mail_messages') || 'null'),
  asOf: localStorage.getItem('uyt_mail_asof') || null,
  error: null,
  search: '',
  searchSender: '',
  searchDate: '',
  expanded: {},   // label -> true/false
  page: {},       // label -> page index (0-based, 10 per page)
};

function getGmailExcluded() {
  try { return JSON.parse(localStorage.getItem('uyt_gmail_excluded_labels') || '[]'); }
  catch { return []; }
}

async function fetchMailMessages() {
  if (!calState.token) return;
  mailState.loading = true;
  mailState.error = null;
  renderMail();
  // Show Weeping Angel if Whovian background active
  const _mailAngel = document.getElementById('angel-overlay');
  const _mailTardis = state.prefs?.tardisBackground || 'none';
  const _mailDark = state.prefs?.darkMode && state.prefs?.colorScheme === 'modern';
  if (_mailAngel && _mailDark && ['tardis','interior','tally'].includes(_mailTardis)) _mailAngel.classList.add('active');
  try {
    const excluded = getGmailExcluded();
    const exclusionClause = excluded.length ? ' ' + excluded.map(id => '-label:' + id).join(' ') : '';
    const q = 'is:unread newer_than:30d -in:spam -in:trash' + exclusionClause;
    const params = new URLSearchParams({ q, maxResults: 100 });
    const listRes = await fetch(
      'https://gmail.googleapis.com/gmail/v1/users/me/messages?' + params,
      { headers: { Authorization: 'Bearer ' + calState.token } }
    );
    if (!listRes.ok) throw new Error('Failed to list messages');
    const listData = await listRes.json();
    const ids = (listData.messages || []).map(function(m) { return m.id; });
    // Fetch metadata for each message
    const messages = (await Promise.all(ids.map(async function(id) {
      try {
        const r = await fetch(
          'https://gmail.googleapis.com/gmail/v1/users/me/messages/' + id + '?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date',
          { headers: { Authorization: 'Bearer ' + calState.token } }
        );
        if (!r.ok) return null;
        const d = await r.json();
        const headers = d.payload ? d.payload.headers || [] : [];
        const getH = function(name) { return (headers.find(function(h) { return h.name === name; }) || {}).value || ''; };
        const from = getH('From');
        const senderMatch = from.match(/^"?(.+?)"?\s*</) || from.match(/^(.+)$/);
        const senderName = senderMatch ? senderMatch[1].replace(/"/g, '').trim() : from;
        const senderEmail = (from.match(/<(.+?)>/) || [])[1] || from;
        const dateStr = getH('Date');
        const ts = dateStr ? new Date(dateStr).getTime() : 0;
        const isUnread = (d.labelIds || []).includes('UNREAD');
        // Only keep INBOX and user-created labels (no system/category labels)
        const SKIP_LABELS = ['UNREAD','STARRED','IMPORTANT','SENT','DRAFT',
          'CATEGORY_PROMOTIONS','CATEGORY_SOCIAL','CATEGORY_UPDATES','CATEGORY_FORUMS','CATEGORY_PERSONAL'];
        const rawLabelIds = d.labelIds || [];
        const inInbox = rawLabelIds.includes('INBOX');
        const labelIds = rawLabelIds.filter(function(l) {
          return !SKIP_LABELS.includes(l) && !l.startsWith('CATEGORY_');
        });
        return {
          id,
          subject: getH('Subject') || '(no subject)',
          sender: senderName,
          senderEmail,
          snippet: d.snippet || '',
          dateStr: ts ? new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '',
          dateFull: ts ? new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
          ts,
          labelIds,
          isUnread,
          link: 'https://mail.google.com/mail/u/0/#all/' + id,
          inInbox,
        };
      } catch(e) { return null; }
    }))).filter(Boolean).sort(function(a, b) { return b.ts - a.ts; });
    mailState.messages = messages;
    mailState.asOf = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    localStorage.setItem('uyt_mail_messages', JSON.stringify(messages));
    localStorage.setItem('uyt_mail_asof', mailState.asOf);
    calFetchGmailLabelBreakdown();
  } catch(e) {
    mailState.error = e.message;
  } finally {
    mailState.loading = false;
    if (_mailAngel) _mailAngel.classList.remove('active');
    renderMail();
  }
}

function mailGetLabelName(labelId) {
  // Map system label IDs to friendly names
  const names = { INBOX: 'Inbox', SENT: 'Sent', DRAFT: 'Drafts' };
  if (names[labelId]) return names[labelId];
  // Try from breakdown cache
  const breakdown = calState.gmailBreakdown || [];
  const found = breakdown.find(function(l) { return l.id === labelId; });
  if (found) return found.name;
  // Hide raw Label_ IDs - return null to skip
  if (labelId.startsWith('Label_')) return null;
  return labelId;
}

function mailRenderRows(msgs, labelId) {
  const page = mailState.page[labelId] || 0;
  const start = page * 10;
  const slice = msgs.slice(start, start + 10);
  const rows = slice.map(function(m) {
    return '<a class="mail-row" href="' + escHtml(m.link) + '" target="_blank">' +
      '<div class="mail-row-date">' + escHtml(m.dateStr) + '</div>' +
      '<div class="mail-row-sender">' + escHtml(m.sender) + '</div>' +
      '<div class="mail-row-subject">' + escHtml(m.subject) + '</div>' +
      '</a>';
  }).join('');
  const safeId = labelId.replace(/'/g, '');
  const prevBtn = page > 0
    ? '<button class="mail-page-btn" onclick="mailPage(' + JSON.stringify(safeId) + ',-1)">← Prev 10</button>'
    : '';
  const nextBtn = msgs.length > start + 10
    ? '<button class="mail-page-btn" onclick="mailPage(' + JSON.stringify(safeId) + ',1)">Next 10 →</button>'
    : '';
  const pageNav = (prevBtn || nextBtn)
    ? '<div class="mail-page-nav">' + prevBtn + '<span style="font-size:12px;color:var(--text-secondary)">' + (start+1) + '–' + Math.min(start+10, msgs.length) + ' of ' + msgs.length + '</span>' + nextBtn + '</div>'
    : '';
  return rows + pageNav;
}

function mailToggle(lid, val) { mailState.expanded[lid] = val; mailState.page[lid] = 0; renderMail(); }

function mailPage(labelId, dir) {
  const cur = mailState.page[labelId] || 0;
  mailState.page[labelId] = Math.max(0, cur + dir);
  renderMail();
}

function mailApplySearch(msgs) {
  let filtered = msgs;
  const kw = mailState.search.trim().toLowerCase();
  const sender = mailState.searchSender.trim().toLowerCase();
  const date = mailState.searchDate.trim();
  if (kw) filtered = filtered.filter(function(m) {
    return m.subject.toLowerCase().includes(kw) || m.snippet.toLowerCase().includes(kw);
  });
  if (sender) filtered = filtered.filter(function(m) {
    return m.sender.toLowerCase().includes(sender) || m.senderEmail.toLowerCase().includes(sender);
  });
  if (date) filtered = filtered.filter(function(m) { return m.dateFull.toLowerCase().includes(date.toLowerCase()); });
  return filtered;
}

function setMailFilter(f) { mailState.search = f; renderMail(); }

function renderMail() {
  const el = document.getElementById('screen-mail-content');
  if (!el) return;
  if (!calIsConnected()) {
    el.innerHTML = '<div class="cal-connect-prompt"><div class="cal-connect-icon">📬</div><h3>Connect Google</h3><p>Sign in with Google to see your mail.</p><button class="connect-btn" onclick="openSettings()">Connect</button></div>';
    return;
  }
  if (mailState.loading) {
    el.innerHTML = '<div class="cal-connect-prompt"><div class="cal-connect-icon">⏳</div><h3>Loading mail…</h3></div>';
    return;
  }
  if (mailState.error) {
    el.innerHTML = '<div class="cal-connect-prompt"><div class="cal-connect-icon">⚠️</div><h3>Error</h3><p>' + escHtml(mailState.error) + '</p><button class="connect-btn" onclick="fetchMailMessages()">Try again</button></div>';
    return;
  }
  if (!mailState.messages) {
    el.innerHTML = '<div class="cal-connect-prompt"><div class="cal-connect-icon">📬</div><h3>30-day mail</h3><p>Unread and recent messages grouped by label. Nothing leaves your browser.</p><button class="connect-btn" onclick="fetchMailMessages()">Load Mail</button></div>';
    return;
  }

  // Search bar
  const searchHtml = '<div class="mail-search-bar">' +
    '<input class="mail-search-input" placeholder="🔍 Keyword search…" value="' + escHtml(mailState.search) + '" oninput="mailState.search=this.value;renderMail()">' +
    '<input class="mail-search-input" placeholder="👤 Sender…" value="' + escHtml(mailState.searchSender) + '" oninput="mailState.searchSender=this.value;renderMail()">' +
    '<input class="mail-search-input" placeholder="📅 Date (e.g. Jun)…" value="' + escHtml(mailState.searchDate) + '" oninput="mailState.searchDate=this.value;renderMail()">' +
    '</div>';

  // Group by label, INBOX first
  const msgs = mailApplySearch(mailState.messages);
  const labelOrder = ['INBOX'];
  // INBOX expanded by default on first load
  if (mailState.expanded['INBOX'] === undefined) mailState.expanded['INBOX'] = true;
  const labelMap = {};
  msgs.forEach(function(m) {
    // Skip messages with no meaningful labels after filtering (e.g. pure CATEGORY_ messages)
    const assignedLabels = m.labelIds.length ? m.labelIds : (m.inInbox ? ['INBOX'] : []);
    assignedLabels.forEach(function(lid) {
      if (!labelMap[lid]) labelMap[lid] = [];
      if (!labelMap[lid].find(function(x) { return x.id === m.id; })) labelMap[lid].push(m);
    });
  });
  // Add remaining labels after INBOX
  Object.keys(labelMap).forEach(function(lid) { if (!labelOrder.includes(lid)) labelOrder.push(lid); });

  const excluded = getGmailExcluded();
  const groupsHtml = labelOrder.filter(function(lid) {
    return labelMap[lid] && labelMap[lid].length > 0 && !excluded.includes(lid) && mailGetLabelName(lid) !== null;
  }).map(function(lid) {
    const labelMsgs = labelMap[lid].sort(function(a,b) { return b.ts - a.ts; });
    const unreadCount = labelMsgs.filter(function(m) { return m.isUnread; }).length;
    const isExpanded = mailState.expanded[lid] === true; // default collapsed
    const labelName = mailGetLabelName(lid);
    const badge = unreadCount > 0 ? ' <span class="mail-label-badge">' + unreadCount + ' unread</span>' : '';
    const toggle = isExpanded
      ? '<button class="mail-label-toggle" onclick="mailToggle(\'' + lid.replace(/'/g,'') + '\',false)">▾</button>'
      : '<button class="mail-label-toggle" onclick="mailToggle(\'' + lid.replace(/'/g,'') + '\',true)">▸</button>';
    const colHeader = isExpanded
      ? '<div class="mail-col-header"><span>Date</span><span>Sender</span><span>Subject</span></div>'
      : '';
    const body = isExpanded ? mailRenderRows(labelMsgs, lid) : '';
    return '<div class="mail-label-group">' +
      '<div class="mail-label-header">' + toggle + '<span class="mail-label-name">' + escHtml(labelName) + '</span>' + badge + '<span class="mail-label-total">(' + labelMsgs.length + ')</span></div>' +
      colHeader +
      '<div class="mail-list">' + body + '</div>' +
      '</div>';
  }).join('');

  const headerHtml = '<div class="mail-header">' +
    '<div class="mail-meta">Last updated ' + escHtml(mailState.asOf || '') + ' · ' + msgs.length + ' messages</div>' +
    '<button class="connect-btn" onclick="fetchMailMessages()" style="padding:8px 16px;font-size:13px">↺ Refresh</button>' +
    '</div>';

  el.innerHTML = headerHtml + searchHtml + groupsHtml; // NOSONAR
}


/* ============================================================
   Cases Screen (Jira)
   ============================================================ */

const jiraState = {
  loading: false,
  issues: null,
  error: null,
  asOf: null,
  search: '',
  searchProject: '',
  expanded: {},
};

function getJiraProjects() {
  try { return JSON.parse(localStorage.getItem('uyt_jira_projects') || '[]'); }
  catch { return []; }
}

async function fetchJiraIssues() {
  const token = localStorage.getItem('uyt_jira_token');
  const cloud = localStorage.getItem('uyt_jira_cloud');
  if (!token || !cloud) return;
  jiraState.loading = true;
  jiraState.error = null;
  renderCases();
  // Angel overlay
  const _angel = document.getElementById('angel-overlay');
  const _tardis = state.prefs?.tardisBackground || 'none';
  const _dark = state.prefs?.darkMode && state.prefs?.colorScheme === 'modern';
  if (_angel && _dark && ['tardis','interior','tally'].includes(_tardis)) _angel.classList.add('active');
  const projects = getJiraProjects().map(function(p) { return p.key; }).join(',');
  try {
    const res = await fetch(
      'https://uyt-slack-digest.kar-marsten.workers.dev/jira/issues?t=' + encodeURIComponent(token) + '&c=' + encodeURIComponent(cloud) + (projects ? '&p=' + encodeURIComponent(projects) : ''),
      { headers: { 'Content-Type': 'application/json' } }
    );
    const data = await res.json();
    if (data.issues) {
      jiraState.issues = data.issues;
      jiraState.asOf = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
      localStorage.setItem('uyt_jira_issues', JSON.stringify(jiraState.issues));
      localStorage.setItem('uyt_jira_asof', jiraState.asOf);
    } else {
      jiraState.error = data.errorMessages?.[0] || 'Failed to load issues';
    }
  } catch(e) {
    jiraState.error = e.message;
  } finally {
    jiraState.loading = false;
    if (_angel) _angel.classList.remove('active');
    renderCases();
    renderDashboard();
  }
}

function casesToggle(key, val) { jiraState.expanded[key] = val; renderCases(); }

/* ============================================================
   Backlog Chart (stacked bar, atop Cases screen)
   ============================================================ */

const BACKLOG_COLORS = ['#3B82F6', '#8B5CF6', '#F59E0B', '#14B8A6', '#F43F5E', '#84CC16', '#EC4899'];

let backlogState = { data: null, statusNames: [], loading: false, error: null, asOf: null };

async function fetchBacklogData() {
  backlogState.loading = true;
  backlogState.error = null;
  renderCases();
  try {
    const res = await fetch('https://uyt-slack-digest.kar-marsten.workers.dev/looker/backlog');
    const data = await res.json();
    if (data.backlog) {
      backlogState.data = data.backlog.slice().sort(function(a, b) { return b.total - a.total; });
      backlogState.statusNames = data.statusNames || [];
      backlogState.asOf = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    } else {
      backlogState.error = data.error || 'Failed to load backlog';
    }
  } catch (e) {
    backlogState.error = e.message;
  } finally {
    backlogState.loading = false;
    renderCases();
  }
}

function renderBacklogChart() {
  if (backlogState.loading && !backlogState.data) {
    return '<div class="backlog-chart"><div class="backlog-chart-title">⏳ Loading backlog…</div></div>';
  }
  if (backlogState.error && !backlogState.data) {
    return '<div class="backlog-chart"><div class="backlog-chart-title">⚠️ Backlog unavailable</div>' +
      '<div style="font-size:12px;color:var(--text-secondary);margin-top:4px">' + escHtml(backlogState.error) + '</div></div>';
  }
  if (!backlogState.data || !backlogState.data.length) return '';

  const maxTotal = Math.max.apply(null, backlogState.data.map(function(d) { return d.total; }));

  const legendHtml = backlogState.statusNames.map(function(name, idx) {
    const color = BACKLOG_COLORS[idx % BACKLOG_COLORS.length];
    return '<div class="backlog-legend-item"><span class="backlog-legend-swatch" style="background:' + color + '"></span>' + escHtml(name) + '</div>';
  }).join('');

  const rowsHtml = backlogState.data.map(function(d) {
    const segments = backlogState.statusNames.map(function(name, idx) {
      const val = d.statuses[name] || 0;
      if (!val) return '';
      const pct = maxTotal ? (val / maxTotal * 100) : 0;
      const color = BACKLOG_COLORS[idx % BACKLOG_COLORS.length];
      return '<div class="backlog-segment" style="width:' + pct + '%;background:' + color + '" title="' + escHtml(d.owner) + ' — ' + escHtml(name) + ': ' + val + '"></div>';
    }).join('');
    return '<div class="backlog-row">' +
      '<div class="backlog-row-name" title="' + escHtml(d.owner) + '">' + escHtml(d.owner) + '</div>' +
      '<div class="backlog-bar">' + segments + '</div>' +
      '<div class="backlog-row-total">' + d.total + '</div>' +
      '</div>';
  }).join('');

  return '<div class="backlog-chart">' +
    '<div class="backlog-chart-header">' +
      '<div class="backlog-chart-title">📊 Backlog by SE' +
        (backlogState.asOf ? ' <span style="font-weight:400;color:var(--text-secondary);font-size:11px">· updated ' + escHtml(backlogState.asOf) + '</span>' : '') +
      '</div>' +
      '<div class="backlog-legend">' + legendHtml + '</div>' +
    '</div>' +
    '<div class="backlog-rows">' + rowsHtml + '</div>' +
  '</div>';
}


function casesApplySearch(issues) {
  let filtered = issues;
  const kw = jiraState.search.trim().toLowerCase();
  const proj = jiraState.searchProject.trim().toUpperCase();
  if (kw) filtered = filtered.filter(function(i) {
    return i.fields.summary.toLowerCase().includes(kw) || i.key.toLowerCase().includes(kw);
  });
  if (proj) filtered = filtered.filter(function(i) {
    return i.fields.project.key.toUpperCase().includes(proj);
  });
  return filtered;
}

function renderCases() {
  const el = document.getElementById('screen-cases-content');
  if (!el) return;
  const backlogHtml = renderBacklogChart();
  const token = localStorage.getItem('uyt_jira_token');
  if (!token) {
    el.innerHTML = backlogHtml + '<div class="cal-connect-prompt"><div class="cal-connect-icon">🎫</div><h3>Connect Jira</h3><p>Sign in with Atlassian to see your open cases.</p><button class="connect-btn" onclick="triggerJiraOAuth()">Sign in with Atlassian</button></div>';
    return;
  }
  if (jiraState.loading) {
    el.innerHTML = backlogHtml + '<div class="cal-connect-prompt"><div class="cal-connect-icon">⏳</div><h3>Loading cases…</h3></div>';
    return;
  }
  if (jiraState.error) {
    el.innerHTML = backlogHtml + '<div class="cal-connect-prompt"><div class="cal-connect-icon">⚠️</div><h3>Error loading cases</h3><p>' + escHtml(jiraState.error) + '</p><button class="connect-btn" onclick="fetchJiraIssues()">Try again</button></div>';
    return;
  }
  if (!jiraState.issues) {
    el.innerHTML = backlogHtml + '<div class="cal-connect-prompt"><div class="cal-connect-icon">⏳</div><h3>Loading cases…</h3></div>';
    fetchJiraIssues();
    return;
  }

  const issues = casesApplySearch(jiraState.issues);

  // Group by project
  const byProject = {};
  issues.forEach(function(issue) {
    const proj = issue.fields.project.key;
    if (!byProject[proj]) byProject[proj] = { name: issue.fields.project.name, issues: [] };
    byProject[proj].issues.push(issue);
  });

  // Search bar
  const searchHtml = '<div class="mail-search-bar">' +
    '<input class="mail-search-input" placeholder="🔍 Keyword…" value="' + escHtml(jiraState.search) + '" oninput="jiraState.search=this.value;renderCases()">' +
    '<input class="mail-search-input" placeholder="📁 Project (e.g. OSM)…" value="' + escHtml(jiraState.searchProject) + '" oninput="jiraState.searchProject=this.value;renderCases()">' +
    '</div>';

  const groupsHtml = Object.entries(byProject).map(function(entry) {
    const key = entry[0], proj = entry[1];
    const isExpanded = jiraState.expanded[key] !== false; // default expanded
    const safeKey = key.replace(/'/g,'');
    const toggle = isExpanded
      ? '<button class="mail-label-toggle" onclick="casesToggle(\'' + safeKey + '\',false)">▾</button>'
      : '<button class="mail-label-toggle" onclick="casesToggle(\'' + safeKey + '\',true)">▸</button>';
    const colHeader = isExpanded
      ? '<div class="cases-col-header"><span>Key</span><span>Summary</span><span>Status</span></div>'
      : '';
    const rows = isExpanded ? proj.issues.map(function(issue) {
      return '<a class="cases-issue" href="https://snyksec.atlassian.net/browse/' + escHtml(issue.key) + '" target="_blank">' +
        '<span class="cases-issue-key">' + escHtml(issue.key) + '</span>' +
        '<span class="cases-issue-summary">' + escHtml(issue.fields.summary) + '</span>' +
        '<span class="cases-issue-status">' + escHtml(issue.fields.status.name) + '</span>' +
        '</a>';
    }).join('') : '';
    return '<div class="mail-label-group">' +
      '<div class="mail-label-header">' + toggle +
        '<span class="mail-label-name">' + escHtml(key) + '</span>' +
        '<span class="mail-label-badge" style="background:var(--primary)">' + proj.issues.length + '</span>' +
        '<span class="mail-label-total">' + escHtml(proj.name) + '</span>' +
      '</div>' +
      colHeader +
      '<div class="cases-issue-list">' + rows + '</div>' +
      '</div>';
  }).join('') || '<div style="padding:24px;text-align:center;color:var(--text-secondary)">No cases match</div>';

  const sfLinksHtml = '<div class="cases-sf-links">' +
    '<a href="https://snyksec.lightning.force.com/lightning/r/Dashboard/01ZPU000004pbPp2AI/view?queryScope=userFolders" target="_blank" class="cases-sf-btn">📊 Case Trends &amp; Data</a>' +
    '<a href="https://snyksec.lightning.force.com/lightning/o/Case/list?filterName=All_Unassigned_Cases" target="_blank" class="cases-sf-btn">📋 All Unassigned Cases</a>' +
    '</div>';

  el.innerHTML = backlogHtml +
    '<div class="mail-header"><div class="mail-meta">Last updated ' + escHtml(jiraState.asOf || '') + ' · ' + issues.length + ' open</div>' +
    '<button class="connect-btn" onclick="fetchJiraIssues()" style="padding:8px 16px;font-size:13px">↺ Refresh</button></div>' +
    sfLinksHtml + searchHtml + groupsHtml; // NOSONAR
}


/* ============================================================
   Settings Panel
   ============================================================ */

function openSettings() {
  document.getElementById('settings-panel').classList.add('open');
  document.getElementById('settings-overlay').classList.add('open');
  renderSettingsPanel();
}

function closeSettings() {
  document.getElementById('settings-panel').classList.remove('open');
  document.getElementById('settings-overlay').classList.remove('open');
}

function renderSettingsPanel() {
  const p    = state.prefs;
  const body = document.getElementById('settings-body');
  const connected = calIsConnected();

  body.innerHTML = `
    <!-- Profile -->
    <div class="settings-section">
      <div class="settings-section-title">Profile</div>
      <div class="settings-row">
        <div class="settings-label">Your name</div>
        <input class="settings-input" style="width:140px" id="pref-name" type="text"
          placeholder="e.g. Alex" value="${escHtml(calState.userProfile?.name || p.userName)}">
      </div>
      ${calState.userProfile?.name ? `<div style="font-size:11px;color:var(--text-secondary);margin-top:4px">From your Google account</div>` : ''}
    </div>



    <!-- Appearance -->
    <div class="settings-section">
      <div class="settings-section-title">Appearance</div>
      <div class="settings-row" style="flex-direction:column;align-items:flex-start;gap:12px">
        <div class="settings-label">Color scheme</div>
        <div class="theme-swatches">${renderThemeSwatches(p.colorScheme)}</div>
      </div>
      <div class="settings-row" style="${p.colorScheme !== 'modern' ? 'opacity:0.4;pointer-events:none' : ''}">
        <div class="settings-label">
          Dark mode
          <span class="settings-sublabel">Modern theme only</span>
        </div>
        <label class="toggle">
          <input type="checkbox" id="pref-dark" ${p.darkMode ? 'checked' : ''}>
          <div class="toggle-track"></div>
        </label>
      </div>
      ${(p.darkMode === true || p.darkMode === 'true') && p.colorScheme === 'modern' ? `
      <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border)">
        <div class="settings-label" style="margin-bottom:8px;font-size:12px;color:var(--text-secondary)">🌀 Whovian</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button onclick="setTardis('none')" class="tardis-btn ${p.tardisBackground === 'none' || !p.tardisBackground ? 'active' : ''}">None</button>
          <button onclick="setTardis('tardis')" class="tardis-btn ${p.tardisBackground === 'tardis' ? 'active' : ''}">Tardis</button>
          <button onclick="setTardis('interior')" class="tardis-btn ${p.tardisBackground === 'interior' ? 'active' : ''}">Bigger on the inside</button>
          <button onclick="setTardis('tally')" class="tardis-btn ${p.tardisBackground === 'tally' ? 'active' : ''}">Tally</button>
        </div>
      </div>
      ` : ''}
    </div>

    <!-- Time & Planner -->
    <div class="settings-section">
      <div class="settings-section-title">Time &amp; Planner</div>
      <div class="settings-row">
        <div class="settings-label">Day starts at</div>
        <select class="settings-select" id="pref-start">${hourOptions(p.startHour, p.use12HourClock)}</select>
      </div>
      <div class="settings-row">
        <div class="settings-label">Day ends at</div>
        <select class="settings-select" id="pref-end">${hourOptions(p.endHour, p.use12HourClock)}</select>
      </div>
      <div class="settings-row">
        <div class="settings-label">12-hour clock</div>
        <label class="toggle">
          <input type="checkbox" id="pref-12h" ${p.use12HourClock ? 'checked' : ''}>
          <div class="toggle-track"></div>
        </label>
      </div>
    </div>

    <!-- Content -->
    <div class="settings-section">
      <div class="settings-section-title">Content</div>
      <div class="settings-row">
        <div class="settings-label">
          Daily quote
          <span class="settings-sublabel">Show a motivational quote on the dashboard</span>
        </div>
        <label class="toggle">
          <input type="checkbox" id="pref-quotes" ${p.showZenQuotes ? 'checked' : ''}>
          <div class="toggle-track"></div>
        </label>
      </div>
    </div>


    <!-- Jira -->
    <div class="settings-section">
      <div class="settings-section-title">Jira</div>
      <div class="cal-connect-box">
        ${localStorage.getItem('uyt_jira_token') ? `
          <div class="setup-connected-badge">✓ Connected to Jira</div>
          <button class="cal-connect-btn" style="margin-top:10px;background:none;border:1.5px solid var(--border);color:var(--text)" onclick="localStorage.removeItem('uyt_jira_token');localStorage.removeItem('uyt_jira_cloud');renderSettingsPanel()">Disconnect</button>
        ` : `
          <p>Sign in with Atlassian to see your open Jira cases.</p>
          <a href="#" onclick="triggerJiraOAuth();return false;" class="cal-connect-btn" style="display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:white">
            Sign in with Atlassian
          </a>
        `}
        ${localStorage.getItem('uyt_jira_token') ? `
          <div style="margin-top:12px">
            <div class="settings-label" style="margin-bottom:6px">Projects to show (leave empty for all)</div>
            ${getJiraProjects().map((p, i) => '<div class="slack-channel-row"><span class="slack-channel-name">' + escHtml(p.key) + '</span><span class="slack-channel-id">' + escHtml(p.name) + '</span><button class="slack-channel-remove" onclick="removeJiraProject(' + i + ')">✕</button></div>').join('')}
            <div class="cal-input-row" style="margin-top:8px">
              <input class="cal-client-input" id="jira-proj-key" placeholder="Project key (e.g. SCIR)" style="flex:1">
              <input class="cal-client-input" id="jira-proj-name" placeholder="Name" style="flex:1">
              <button class="cal-connect-btn" onclick="addJiraProject()">Add</button>
            </div>
          </div>
        ` : ''}
      </div>
    </div>

    <!-- Tools URLs -->
    <div class="settings-section">
      <div class="settings-section-title">Your Tools</div>
      <div class="cal-connect-box">
        <div class="settings-label" style="margin-bottom:6px">Salesforce Cases URL</div>
        <div class="cal-input-row" style="margin-bottom:12px">
          <input class="cal-client-input" id="sf-url-input" type="text"
            placeholder="https://yourorg.lightning.force.com/lightning/o/Case/list"
            value="${escHtml(localStorage.getItem('uyt_salesforce_url') || '')}">
          <button class="cal-connect-btn" onclick="saveToolUrl('uyt_salesforce_url','sf-url-input')">Save</button>
        </div>
        <div class="settings-label" style="margin-bottom:6px">Workday Tasks URL</div>
        <div class="cal-input-row">
          <input class="cal-client-input" id="wd-url-input" type="text"
            placeholder="https://wd103.myworkday.com/yourorg/d/task/..."
            value="${escHtml(localStorage.getItem('uyt_workday_url') || '')}">
          <button class="cal-connect-btn" onclick="saveToolUrl('uyt_workday_url','wd-url-input')">Save</button>
        </div>
      </div>
    </div>

    <!-- Slack Token -->
    <div class="settings-section">
      <div class="settings-section-title">Slack</div>
      <div class="cal-connect-box">
        ${localStorage.getItem('uyt_slack_token') ? `
          <div class="setup-connected-badge">✓ Connected to Slack</div>
          <button class="cal-connect-btn" style="margin-top:10px;background:none;border:1.5px solid var(--border);color:var(--text)" onclick="localStorage.removeItem('uyt_slack_token');renderSettingsPanel()">Disconnect</button>
        ` : `
          <p>Sign in with Slack to enable the digest. Uses your existing SSO — no passwords needed.</p>
          <a href="#" onclick="triggerSlackOAuth();return false;" class="cal-connect-btn" style="display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/></svg>
            Sign in with Slack
          </a>
        `}
        <details style="margin-top:12px">
          <summary style="font-size:12px;color:var(--text-secondary);cursor:pointer">Having trouble? Paste token manually</summary>
          <div class="cal-input-row" style="margin-top:8px">
            <input class="cal-client-input" id="slack-manual-token" type="password" placeholder="xoxp-...">
            <button class="cal-connect-btn" onclick="const t=document.getElementById('slack-manual-token').value.trim();if(t){localStorage.setItem('uyt_slack_token',t);renderSettingsPanel();}">Save</button>
          </div>
        </details>
      </div>
    </div>

    <!-- Slack Channels -->
    <div class="settings-section">
      <div class="settings-section-title">Slack Channels</div>
      <div class="cal-connect-box">
        <p>Channels included in your digest. Add by channel ID (right-click channel in Slack → Copy link → last part of URL).</p>
        <div>${getSlackChannels().map((c, i) => `<div class="slack-channel-row"><span class="slack-channel-name">#${escHtml(c.name)}</span><code class="slack-channel-id">${escHtml(c.id)}</code><button class="slack-channel-remove" onclick="removeSlackChannel(${i})">✕</button></div>`).join('')}</div>
        <div class="cal-input-row" style="margin-top:10px;flex-wrap:wrap;gap:6px">
          <input class="cal-client-input" id="slack-ch-id" placeholder="Channel ID (C0885...)" style="flex:1;min-width:120px">
          <input class="cal-client-input" id="slack-ch-name" placeholder="Name (support-leads)" style="flex:1;min-width:120px">
          <button class="cal-connect-btn" onclick="addSlackChannel()">Add</button>
        </div>
      
    
    

    <!-- Gmail Excluded Labels -->
    <div class="settings-section">
      <div class="settings-section-title">Gmail</div>
      <div class="cal-connect-box">
        <p>Labels to exclude from your unread count and Mail page. Only labels with unread mail appear here.</p>
        ${calState.gmailBreakdown && calState.gmailBreakdown.length > 0 ? `
          <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:10px">
            ${calState.gmailBreakdown.map(l => {
              const excluded = getGmailExcluded().includes(l.id);
              return '<div class="slack-channel-row"><span class="slack-channel-name">' + escHtml(l.name) + '</span><span class="slack-channel-id">' + l.unread + ' unread</span><button class="slack-channel-remove" onclick="toggleGmailExclude(' + JSON.stringify(l.id) + ')" title="' + (excluded ? 'Re-include' : 'Exclude') + '" style="color:' + (excluded ? 'var(--primary)' : 'var(--text-secondary)') + '">' + (excluded ? '↩' : '✕') + '</button></div>';
            }).join('')}
          </div>
        ` : '<p style="font-size:12px;color:var(--text-secondary)">Load mail to see label breakdown here.</p>'}
      </div>
    </div>

    <!-- Google Calendar -->
    <div class="settings-section">
      <div class="settings-section-title">Google Calendar</div>
      ${connected ? `
        <div class="cal-connect-box">
          <div class="cal-connected-row">
            <div class="cal-status-dot"></div>
            <div class="cal-status-label">Connected${calState.userProfile?.name ? ` as ${escHtml(calState.userProfile.name)}` : ''}</div>
            <button class="cal-disconnect-btn" onclick="calDisconnect()">Disconnect</button>
          </div>
        </div>
      ` : `
        <div class="cal-connect-box">
          <p>
            Connect your Google Calendar to see upcoming events on the dashboard and in your daily planner.
            You'll need a Google OAuth Client ID —
            <a href="https://console.cloud.google.com/apis/credentials" target="_blank">create one here</a>
            (set the authorized origin to <code>https://klm-snyk.github.io</code> and
            <code>http://localhost:4200</code> for local testing).
          </p>
          <div class="cal-input-row">
            <input
              class="cal-client-input"
              id="gcal-client-id-input"
              type="text"
              placeholder="Your Google Client ID (…apps.googleusercontent.com)"
              value="${escHtml(calState.clientId || '')}">
            <button class="cal-connect-btn" onclick="calConnect()">Connect</button>
          </div>
        </div>
      `}
    </div>

    <!-- Coming Soon -->
    <div class="settings-section">
      <div class="settings-section-title">Coming Soon</div>
      <div class="settings-row">
        <div class="settings-label">
          Cases
          <span class="settings-sublabel">JIRA or Salesforce caseload</span>
        </div>
        <span style="font-size:11px;color:var(--text-secondary);font-weight:600;background:var(--surface);padding:3px 8px;border-radius:99px">Soon</span>
      </div>
    </div>
  `;

  bindSettingEvents();
}

function renderThemeSwatches(selected) {
  const themes = [
    { id: 'modern', color: '#6366F1', label: 'Modern' },
    { id: 'earth',  color: '#8C6A4A', label: 'Earth'  },
    { id: 'nature', color: '#5A8A6A', label: 'Nature' },
    { id: 'sunny',  color: '#D4A574', label: 'Sunny'  },
    { id: 'purple', color: '#9B6FA8', label: 'Violet' },
  ];
  return themes.map(t => `
    <div class="theme-option" onclick="selectTheme('${t.id}')">
      <div class="theme-swatch ${selected === t.id ? 'selected' : ''}" style="background:${t.color}"></div>
      <span class="theme-swatch-label">${t.label}</span>
    </div>
  `).join('');
}

function hourOptions(selectedHour, use12) {
  let html = '';
  for (let h = 0; h <= 23; h++) {
    const label = formatTime(h, 0, use12);
    html += `<option value="${h}" ${h === selectedHour ? 'selected' : ''}>${label}</option>`;
  }
  return html;
}

function selectTheme(themeId) {
  state.prefs.colorScheme = themeId;
  if (themeId !== 'modern') state.prefs.darkMode = false;
  savePrefs(state.prefs);
  applyTheme(state.prefs);
  renderSettingsPanel();
  if (state.screen === 'dashboard') renderDashboard();
}

function bindSettingEvents() {
  const nameEl = document.getElementById('pref-name');
  if (nameEl) nameEl.addEventListener('change', () => {
    state.prefs.userName = nameEl.value.trim();
    savePrefs(state.prefs);
    if (state.screen === 'dashboard') renderDashboard();
  });

  const darkEl = document.getElementById('pref-dark');
  if (darkEl) darkEl.addEventListener('change', () => {
    state.prefs.darkMode = darkEl.checked;
    savePrefs(state.prefs);
    applyTheme(state.prefs);
    renderSettingsPanel();
  });

  const startEl = document.getElementById('pref-start');
  if (startEl) startEl.addEventListener('change', () => {
    state.prefs.startHour = Number(startEl.value);
    savePrefs(state.prefs);
    if (state.screen === 'planner') renderPlanner();
  });

  const endEl = document.getElementById('pref-end');
  if (endEl) endEl.addEventListener('change', () => {
    state.prefs.endHour = Number(endEl.value);
    savePrefs(state.prefs);
    if (state.screen === 'planner') renderPlanner();
  });

  const h12El = document.getElementById('pref-12h');
  if (h12El) h12El.addEventListener('change', () => {
    state.prefs.use12HourClock = h12El.checked;
    savePrefs(state.prefs);
    const s = document.getElementById('pref-start');
    const e = document.getElementById('pref-end');
    if (s) s.innerHTML = hourOptions(state.prefs.startHour, state.prefs.use12HourClock);
    if (e) e.innerHTML = hourOptions(state.prefs.endHour, state.prefs.use12HourClock);
    if (state.screen === 'planner') renderPlanner();
  });

  const quotesEl = document.getElementById('pref-quotes');
  if (quotesEl) quotesEl.addEventListener('change', () => {
    state.prefs.showZenQuotes = quotesEl.checked;
    savePrefs(state.prefs);
    if (state.screen === 'dashboard') renderDashboard();
  });
}

/* ============================================================
   About Panel
   ============================================================ */

function openAbout() {
  document.getElementById('about-panel').classList.add('open');
  document.getElementById('about-overlay').classList.add('open');
}

function closeAbout() {
  document.getElementById('about-panel').classList.remove('open');
  document.getElementById('about-overlay').classList.remove('open');
}


function saveToolUrl(key, inputId) {
  const url = document.getElementById(inputId)?.value.trim();
  if (url) { localStorage.setItem(key, url); renderSettingsPanel(); }
}



function addJiraProject() {
  const key = document.getElementById('jira-proj-key')?.value.trim().toUpperCase();
  const name = document.getElementById('jira-proj-name')?.value.trim();
  if (!key) return;
  const projects = getJiraProjects();
  if (!projects.find(p => p.key === key)) { projects.push({ key, name: name || key }); localStorage.setItem('uyt_jira_projects', JSON.stringify(projects)); }
  renderSettingsPanel();
}

function removeJiraProject(index) {
  const projects = getJiraProjects();
  projects.splice(index, 1);
  localStorage.setItem('uyt_jira_projects', JSON.stringify(projects));
  renderSettingsPanel();
}

function triggerJiraOAuth() {
  const width = 600, height = 700;
  const left = Math.round(window.screenX + (window.outerWidth - width) / 2);
  const top = Math.round(window.screenY + (window.outerHeight - height) / 2);
  const popup = window.open(
    'https://uyt-slack-digest.kar-marsten.workers.dev/jira/start',
    'jira-oauth',
    'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top + ',toolbar=no,menubar=no'
  );
  function _handleJiraMessage(event) {
    if (event.origin !== 'https://klm-snyk.github.io') return;
    if (event.data?.type === 'jira-token') {
      localStorage.setItem('uyt_jira_token', event.data.token);
      localStorage.setItem('uyt_jira_cloud', event.data.cloud || '');
      window.removeEventListener('message', _handleJiraMessage);
      if (popup && !popup.closed) popup.close();
      if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
      if (typeof renderCases === 'function') renderCases();
    }
  }
  window.addEventListener('message', _handleJiraMessage);
  const poll = setInterval(function() {
    if (popup.closed) {
      clearInterval(poll);
      if (localStorage.getItem('uyt_jira_token')) {
        if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
        if (typeof renderCases === 'function') renderCases();
      }
    }
  }, 500);
}

function triggerSlackOAuth() {
  const width = 600, height = 700;
  const left = Math.round(window.screenX + (window.outerWidth - width) / 2);
  const top = Math.round(window.screenY + (window.outerHeight - height) / 2);
  const popup = window.open(
    'https://uyt-slack-digest.kar-marsten.workers.dev/oauth/start',
    'slack-oauth',
    'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top + ',toolbar=no,menubar=no'
  );

  // Listen for postMessage from popup
  function _handleSlackMessage(event) {
    if (event.origin !== 'https://klm-snyk.github.io') return;
    if (event.data?.type === 'slack-token' && event.data.token) {
      localStorage.setItem('uyt_slack_token', event.data.token);
      window.removeEventListener('message', _handleSlackMessage);
      if (popup && !popup.closed) popup.close();
      if (typeof renderSetupStep === 'function') renderSetupStep();
      if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
      if (typeof renderDashboard === 'function') renderDashboard();
      // Auto-fetch digest now that token is available
      if (!slackDigestState.html) {
        setTimeout(function() {
          slackDigestState.loading = true;
          renderDashboard();
          fetchSlackDigest().then(function() { renderDashboard(); renderSlack(); });
        }, 500);
      }
    }
  }
  window.addEventListener('message', _handleSlackMessage);

  // Also poll for popup close as fallback
  const poll = setInterval(function() {
    if (popup.closed) {
      clearInterval(poll);
      if (localStorage.getItem('uyt_slack_token')) {
        if (typeof renderSetupStep === 'function') renderSetupStep();
        if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
        if (typeof renderDashboard === 'function') renderDashboard();
      }
    }
  }, 500);
}

function setTardis(value) {
  state.prefs.tardisBackground = value;
  savePrefs(state.prefs);
  applyTheme(state.prefs);
  renderSettingsPanel();
}


/* ============================================================
   Slack Digest — AI-powered via Anthropic API + Slack MCP
   ============================================================ */

const slackDigestState = {
  loading: false,
  error: null,
  html: localStorage.getItem('uyt_digest_html') || null,
  asOf: localStorage.getItem('uyt_digest_asof') || null,
  counts: JSON.parse(localStorage.getItem('uyt_digest_counts') || '{"people":0,"work":0,"incidents":0}'),
  handover: JSON.parse(localStorage.getItem('uyt_digest_handover') || 'null'),
  workday: JSON.parse(localStorage.getItem('uyt_digest_workday') || 'null'),
};

async function fetchSlackDigest() {
  const workerUrl = 'https://uyt-slack-digest.kar-marsten.workers.dev';
  if (!workerUrl) {
    slackDigestState.error = 'Add your Worker URL in Settings first.';
    slackDigestState.loading = false;
    renderDashboard();
    return;
  }

  slackDigestState.loading = true;
  slackDigestState.error = null;
  renderDashboard();

  try {
    const channels = getSlackChannels();
    const res = await fetch(workerUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ channels, userName: calState.userProfile?.name || state.prefs.userName || 'the user', userEmail: calState.userProfile?.email || '', slackToken: localStorage.getItem('uyt_slack_token') || '' }) });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    const data = await res.json();
    const digestHtml = data.html || '';
    slackDigestState.handover = data.handover || null;
    slackDigestState.workday = data.workday || null;
    localStorage.setItem('uyt_digest_workday', JSON.stringify(slackDigestState.workday));
    slackDigestState.html = digestHtml || '<div class="digest-empty">No results</div>';
    slackDigestState.error = null;
    slackDigestState.asOf = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    // Count <li> items per section using regex
    const countSection = (html, heading) => {
      const hi = html.indexOf(heading);
      if (hi === -1) return 0;
      const end = html.indexOf('</div>', html.indexOf('</ul>', hi));
      const sec = html.slice(hi, end);
      return (sec.match(/<li(?![^>]*digest-empty)/g) || []).length;
    };
    slackDigestState.counts = {
      people:    countSection(digestHtml, 'Onboarding'),
      work:      countSection(digestHtml, 'Work Items'),
      incidents: countSection(digestHtml, 'Incidents'),
    };
    // Persist to localStorage so it shows instantly on next page load
    localStorage.setItem('uyt_digest_html', slackDigestState.html);
    localStorage.setItem('uyt_digest_asof', slackDigestState.asOf);
    localStorage.setItem('uyt_digest_counts', JSON.stringify(slackDigestState.counts));
    localStorage.setItem('uyt_digest_handover', JSON.stringify(slackDigestState.handover));
  } catch (e) {
    console.error('Slack digest error:', e);
    slackDigestState.error = e.message || 'Failed to load digest.';
    slackDigestState.html = null;
  } finally {
    slackDigestState.loading = false;
    renderDashboard();
  }
}
/* ============================================================
   Dashboard
   ============================================================ */

function renderDashboard() {
  const el = document.getElementById('dash-content');
  const p  = state.prefs;
  const now = new Date();
  const profileName = calState.userProfile?.name || p.userName;
  const greeting = `${getGreeting()}${profileName ? `, ${profileName}` : ''}`;
  const quote = getDailyQuote();
  const events = calUpcomingEvents();

  // Build events card content
  let eventsCardContent = '';
  if (!calIsConnected()) {
    eventsCardContent = `
      <div class="dash-card-value">—</div>
      <div class="dash-card-sub">Connect your Google Calendar to see upcoming events</div>
      <div class="dash-card-action" onclick="openSettings()" style="cursor:pointer">
        Connect calendar ${ICONS.arrowRight}
      </div>`;
  } else if (calState.fetchError) {
    eventsCardContent = `
      <div class="dash-card-value" style="font-size:16px;font-weight:500">Unable to load events</div>
      <div class="dash-card-sub">${escHtml(calState.fetchError)}</div>
      <div class="dash-card-action" onclick="openSettings()" style="cursor:pointer">
        Reconnect calendar ${ICONS.arrowRight}
      </div>`;
  } else if (events.length === 0) {
    eventsCardContent = `
      <div class="dash-card-value" style="font-size:16px;font-weight:500">All clear</div>
      <div class="dash-card-sub">No upcoming events in the next 7 days</div>`;
  } else {
    const todayEvents = calTodayEvents();
    eventsCardContent = `
      <div class="dash-card-value" style="font-size:22px">${todayEvents.length} today</div>
      <div class="event-list">
        ${events.slice(0, 4).map(e => `
          <a class="event-item" href="${escHtml(e.link)}" target="_blank">
            <div class="event-time-col">${calFormatEventTime(e)}</div>
            <div class="event-details">
              <div class="event-title">${escHtml(e.title)}</div>
              <div class="event-date-label">${calFormatEventDate(e)}</div>
            </div>
          </a>
        `).join('')}
      </div>`;
  }

  // NOSONAR
  el.innerHTML = `
    <div class="dashboard-greeting">
      <div class="time-display" id="live-time">${formatCurrentTime()}</div>
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:space-between;">
        <h3 style="margin:0;">${escHtml(greeting)}</h3>
        <button class="connect-btn" onclick="${calIsConnected() ? 'calDisconnect()' : 'calConnect()'}">
          ${calIsConnected() ? 'Sign out' : 'Connect to Google'}
        </button>
      </div>
      <div class="date-display">${formatDate(now)}</div>
    </div>

    <div class="dashboard-layout">
      <div class="dashboard-main">
        <div class="dashboard-cards">
          <div class="dash-card" onclick="calIsConnected() && navigate('mail')" style="${calIsConnected() ? 'cursor:pointer' : ''}">
            <div class="dash-card-header">
              <div class="dash-card-icon">${ICONS.calendar}</div>
              <div class="dash-card-title">Gmail</div>
            </div>
            ${!calIsConnected() ? `
              <div class="dash-card-value">—</div>
              <div class="dash-card-sub">Connect Google to see your inbox</div>
              <div class="dash-card-action" onclick="openSettings();event.stopPropagation()" style="cursor:pointer">Connect ${ICONS.arrowRight}</div>
            ` : calState.unreadCount === null ? `
              <div class="dash-card-value">—</div>
              <div class="dash-card-sub">Loading inbox…</div>
            ` : calState.unreadCount === 0 ? `
              <div class="dash-card-value" style="font-size:22px">0 📭</div>
              <div class="dash-card-sub">${getInboxZeroMessage()}</div>
              <div class="dash-card-action">View mail ${ICONS.arrowRight}</div>
            ` : `
              <div class="dash-card-value" style="font-size:28px;font-weight:700">${calState.unreadCount}${calState.unreadCountCapped ? '+' : ''}</div>
              <div class="dash-card-sub">unread email${calState.unreadCount === 1 ? '' : 's'}</div>
              ${calState.gmailBreakdown && calState.gmailBreakdown.length > 0 ? `
                <div style="margin-top:6px;display:flex;flex-direction:column;gap:3px">
                  ${calState.gmailBreakdown.slice(0,4).map(l => `<div class="sf-tier-row"><span class="sf-tier-label" style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(l.name)}</span><span class="sf-tier-stat">${l.unread}</span></div>`).join('')}
                </div>
              ` : ''}
              <div class="dash-card-action" style="margin-top:6px">View all ${ICONS.arrowRight}</div>
            `}
          </div>

          <div class="dash-card" onclick="navigate('slack')" style="cursor:pointer">
            <div class="dash-card-header">
              <div class="dash-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/></svg>
              </div>
              <div class="dash-card-title">Slack Digest</div>
            </div>
            ${slackDigestState.loading ? `
              <div class="dash-card-sub" style="margin-top:8px">⏳ Loading digest…</div>
            ` : slackDigestState.html ? `
              <div class="sf-tier-row" style="margin-top:8px">
                <span class="sf-tier-label" style="background:#DBEAFE;color:#1E40AF;font-size:10px">👥 Onboarding</span>
                <span class="sf-tier-stat">${slackDigestState.counts?.people || 0} item${(slackDigestState.counts?.people || 0) === 1 ? '' : 's'}</span>
              </div>
              <div class="sf-tier-row">
                <span class="sf-tier-label" style="background:#D1FAE5;color:#065F46;font-size:10px">🔧 Work Items</span>
                <span class="sf-tier-stat">${slackDigestState.counts?.work || 0} item${(slackDigestState.counts?.work || 0) === 1 ? '' : 's'}</span>
              </div>
              <div class="sf-tier-row">
                <span class="sf-tier-label" style="background:#FEE2E2;color:#991B1B;font-size:10px">🚨 Escalations</span>
                <span class="sf-tier-stat">${slackDigestState.counts?.incidents || 0} item${(slackDigestState.counts?.incidents || 0) === 1 ? '' : 's'}</span>
              </div>
              <div class="dash-card-action" style="margin-top:8px">View digest ${ICONS.arrowRight}</div>
            ` : `
              <div class="dash-card-sub" style="font-size:12px;line-height:1.8">${getSlackChannels().map(c => '#' + c.name).join(' · ')}</div>
              <div class="dash-card-action" style="margin-top:8px">Get digest ${ICONS.arrowRight}</div>
            `}
          </div>

          <div class="dash-card" onclick="window.open(localStorage.getItem('uyt_workday_url') || 'https://wd103.myworkday.com','_blank')">
            <div class="dash-card-header">
              <div class="dash-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
              </div>
              <div class="dash-card-title">Workday</div>
            </div>
            ${slackDigestState.workday && slackDigestState.workday.length > 0 ? `
              <div style="margin-top:6px;display:flex;flex-direction:column;gap:4px;max-height:120px;overflow-y:auto">
                ${slackDigestState.workday.slice(0,5).map(w => `
                  <div style="font-size:12px;display:flex;gap:6px;align-items:baseline">
                    <span style="color:var(--text-secondary);flex-shrink:0">${escHtml(w.time)}</span>
                    <span style="color:var(--text)">${renderSlackText(w.text.slice(0,80))}${w.text.length>80?'…':''}</span>
                  </div>
                `).join('')}
              </div>
              <div class="dash-card-action" style="margin-top:6px">Open in Workday ${ICONS.arrowRight}</div>
            ` : slackDigestState.workday && slackDigestState.workday.length === 0 ? `
              <div class="dash-card-sub" style="margin-top:6px;font-size:11px">No recent Workday notifications</div>
              <div class="dash-card-action">Open in Workday ${ICONS.arrowRight}</div>
            ` : `
              <div class="dash-card-value">—</div>
              <div class="dash-card-sub">Tasks &amp; actions</div>
              <div class="dash-card-action">Open in Workday ${ICONS.arrowRight}</div>
            `}
          </div>

          <div class="dash-card" onclick="navigate('cases')" style="cursor:pointer">
            <div class="dash-card-header">
              <div class="dash-card-icon">${ICONS.cases}</div>
              <div class="dash-card-title">Cases</div>
            </div>
            ${jiraState.loading ? '<div class="dash-card-sub" style="margin-top:8px">⏳ Loading…</div>' :
              jiraState.issues && jiraState.issues.length > 0 ? (() => {
                const byProj = {};
                jiraState.issues.forEach(i => { const k = i.fields.project.key; byProj[k] = (byProj[k]||0)+1; });
                return Object.entries(byProj).map(([k,c]) => '<div class="sf-tier-row"><span class="sf-tier-label">' + escHtml(k) + '</span><span class="sf-tier-stat">' + c + ' open</span></div>').join('') +
                  '<div class="dash-card-action" style="margin-top:6px">View all ' + ICONS.arrowRight + '</div>';
              })() :
              jiraState.issues ? '<div class="dash-card-sub">No open cases ✅</div>' :
              '<div class="dash-card-sub">Your open Jira cases</div><div class="dash-card-action">View cases ' + ICONS.arrowRight + '</div>'}
          </div>

          <div class="dash-card" onclick="navigate('drive')">
            <div class="dash-card-header">
              <div class="dash-card-icon">${ICONS.cases}</div>
              <div class="dash-card-title">Google Drive</div>
            </div>
            ${!calIsConnected() ? `
              <div class="dash-card-value">—</div>
              <div class="dash-card-sub">Connect Google to see shared docs &amp; mentions</div>
              <div class="dash-card-action" onclick="event.stopPropagation();openSettings()" style="cursor:pointer">Connect ${ICONS.arrowRight}</div>
            ` : calState.driveLoading ? `
              <div class="dash-card-sub" style="margin-top:8px">⏳ Loading Drive files…</div>
            ` : (() => {
              const sharedSheets  = calState.driveShared.filter(f => f.type === 'sheet').length;
              const sharedDocs    = calState.driveShared.filter(f => f.type === 'doc').length;
              const sharedSlides  = calState.driveShared.filter(f => f.type === 'slides').length;
              const mentionSheets = calState.driveMentions.filter(f => f.type === 'sheet').length;
              const mentionDocs   = calState.driveMentions.filter(f => f.type === 'doc').length;
              const mentionSlides = calState.driveMentions.filter(f => f.type === 'slides').length;
              return `
              <div class="sf-tier-row">
                <span class="sf-tier-label sf-tier-platinum">Shared</span>
                <span class="sf-tier-stat">${sharedSheets} 📊 · ${sharedDocs} 📄 · ${sharedSlides} <svg viewBox="0 0 48 48" width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M37 45H11c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h19l9 9v31c0 1.1-.9 2-2 2z" fill="#FFBA00"/><path d="M40 12h-7c-.6 0-1-.4-1-1V4l8 8z" fill="#FF9F00"/><path d="M31 23H17v12h14V23zm-2 10H19v-8h10v8z" fill="#fff"/></svg></span>
              </div>
              <div class="sf-tier-row">
                <span class="sf-tier-label sf-tier-gold">Mentions</span>
                <span class="sf-tier-stat">${mentionSheets} 📊 · ${mentionDocs} 📄 · ${mentionSlides} <svg viewBox="0 0 48 48" width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M37 45H11c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h19l9 9v31c0 1.1-.9 2-2 2z" fill="#FFBA00"/><path d="M40 12h-7c-.6 0-1-.4-1-1V4l8 8z" fill="#FF9F00"/><path d="M31 23H17v12h14V23zm-2 10H19v-8h10v8z" fill="#fff"/></svg></span>
              </div>
              <div class="sf-tier-row">
                <span class="sf-tier-label" style="background:#D1FAE5;color:#065F46">Created</span>
                <span class="sf-tier-stat">${calState.driveCreated.filter(f=>f.type==='sheet').length} 📊 · ${calState.driveCreated.filter(f=>f.type==='doc').length} 📄 · ${calState.driveCreated.filter(f=>f.type==='slides').length} <svg viewBox="0 0 48 48" width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M37 45H11c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h19l9 9v31c0 1.1-.9 2-2 2z" fill="#FFBA00"/><path d="M40 12h-7c-.6 0-1-.4-1-1V4l8 8z" fill="#FF9F00"/><path d="M31 23H17v12h14V23zm-2 10H19v-8h10v8z" fill="#fff"/></svg></span>
              </div>
              <div class="dash-card-sub" style="margin-top:6px">Last 30 days · click to browse</div>
              `;
            })()}
          </div>
        </div>

        ${p.showZenQuotes ? `
        <div class="dash-card quote-card" style="margin-top:16px">
          <div class="dash-card-header">
            <div class="dash-card-icon">${ICONS.quote}</div>
            <div class="dash-card-title" style="color:rgba(255,255,255,0.8)">Daily Quote</div>
          </div>
          <div class="dash-card-value">"${escHtml(quote.text)}"</div>
          <div class="dash-card-sub">— ${escHtml(quote.author)}</div>
        </div>` : ''}
      </div>

      <div class="dashboard-sidebar">
        <div class="dash-card dashboard-sidebar-events">
          <div class="dash-card-header">
            <div class="dash-card-icon">${ICONS.calendar}</div>
            <div class="dash-card-title">Upcoming Events</div>
          </div>
          ${eventsCardContent}
        </div>
      </div>
    </div>
  `;

  startClock();
}

let clockInterval = null;

function formatCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: state.prefs.use12HourClock,
  });
}

function startClock() {
  if (clockInterval) clearInterval(clockInterval);
  clockInterval = setInterval(() => {
    const el = document.getElementById('live-time');
    if (el) el.textContent = formatCurrentTime();
  }, 10000);
}

/* ============================================================
   Drive Screen
   ============================================================ */

function renderDrive() {
  const el = document.getElementById('drive-content');
  if (!el) return;

  if (!calIsConnected()) {
    el.innerHTML = `
      <div class="cal-connect-prompt">
        <div class="cal-connect-icon">📁</div>
        <h3>Connect Google Drive</h3>
        <p>Connect your Google account to see docs and sheets shared with you or where you're mentioned.</p>
        <button class="connect-btn" onclick="calConnect()">Connect to Google</button>
      </div>`;
    return;
  }

  if (calState.driveLoading) {
    el.innerHTML = `<div class="cal-connect-prompt">
      <div class="cal-connect-icon">⏳</div>
      <h3>Loading Drive files…</h3>
      <p>Checking shared files, mentions, and files you created. This may take a few seconds.</p>
    </div>`;
    return;
  }

  const allFiles = [
    ...calState.driveShared.map(f => ({ ...f, category: 'shared' })),
    ...calState.driveMentions
      .filter(f => !calState.driveShared.find(s => s.id === f.id))
      .map(f => ({ ...f, category: 'mentioned' })),
    ...calState.driveCreated
      .filter(f => !calState.driveShared.find(s => s.id === f.id) && !calState.driveMentions.find(m => m.id === f.id))
      .map(f => ({ ...f, category: 'created' })),
  ].sort((a, b) => new Date(b.modified) - new Date(a.modified));

  const formatRelative = (iso) => {
    const d = new Date(iso);
    const now = new Date();
    const diffH = Math.floor((now - d) / 3600000);
    if (diffH < 1) return 'just now';
    if (diffH < 24) return `${diffH}h ago`;
    const diffD = Math.floor(diffH / 24);
    if (diffD === 1) return 'yesterday';
    return `${diffD}d ago`;
  };

  el.innerHTML = `
    <div class="drive-toolbar">
      <input class="drive-search" id="drive-search" type="text" placeholder="Search files…" oninput="filterDrive()">
      <div class="drive-filters">
        <button class="drive-filter ${_driveFilters.size === 0 ? 'active' : ''}" data-filter="all" onclick="setDriveFilter(this,'all')">All</button>
        <button class="drive-filter ${_driveFilters.has('sheet') ? 'active' : ''}" data-filter="sheet" onclick="setDriveFilter(this,'sheet')">📊 Sheets</button>
        <button class="drive-filter ${_driveFilters.has('slides') ? 'active' : ''}" data-filter="slides" onclick="setDriveFilter(this,'slides')"><svg viewBox="0 0 48 48" width="13" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M37 45H11c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h19l9 9v31c0 1.1-.9 2-2 2z" fill="#FFBA00"/><path d="M40 12h-7c-.6 0-1-.4-1-1V4l8 8z" fill="#FF9F00"/><path d="M31 23H17v12h14V23zm-2 10H19v-8h10v8z" fill="#fff"/></svg> Slides</button>
        <button class="drive-filter ${_driveFilters.has('doc') ? 'active' : ''}" data-filter="doc" onclick="setDriveFilter(this,'doc')">📄 Docs</button>
        <button class="drive-filter ${_driveFilters.has('shared') ? 'active' : ''}" data-filter="shared" onclick="setDriveFilter(this,'shared')">Shared with me</button>
        <button class="drive-filter ${_driveFilters.has('mentioned') ? 'active' : ''}" data-filter="mentioned" onclick="setDriveFilter(this,'mentioned')">Mentions</button>
        <button class="drive-filter ${_driveFilters.has('created') ? 'active' : ''}" data-filter="created" onclick="setDriveFilter(this,'created')">Created by me</button>
      </div>
    </div>

    <div class="drive-list" id="drive-list">
      ${allFiles.map(f => `
        <a class="drive-item" href="${escHtml(f.link)}" target="_blank"
           data-type="${f.type}" data-category="${f.category}"
           data-name="${escHtml(f.name.toLowerCase())}">
          <span class="drive-item-icon">${f.type === 'sheet' ? '📊' : '📄'}</span>
          <div class="drive-item-details">
            <div class="drive-item-name">${escHtml(f.name)}</div>
            <div class="drive-item-meta">
              <span class="drive-badge drive-badge--${f.category}">${f.category === 'shared' ? 'Shared' : f.category === 'mentioned' ? 'Mentioned' : 'Created'}</span>
              ${f.sharedBy ? `<span>by ${escHtml(f.sharedBy)}</span>` : ''}
              <span>${formatRelative(f.modified)}</span>
            </div>
          </div>
        </a>
      `).join('')}
    </div>
  `;
}

let _driveFilters = new Set();

function setDriveFilter(btn, filter) {
  if (filter === 'all') {
    _driveFilters.clear();
  } else {
    if (_driveFilters.has(filter)) {
      _driveFilters.delete(filter);
    } else {
      _driveFilters.add(filter);
    }
  }
  document.querySelectorAll('.drive-filter').forEach(b => {
    const f = b.dataset.filter;
    b.classList.toggle('active', f === 'all' ? _driveFilters.size === 0 : _driveFilters.has(f));
  });
  filterDrive();
}

function filterDrive() {
  const search = (document.getElementById('drive-search')?.value || '').toLowerCase();
  const typeFilters     = ['sheet', 'doc'].filter(f => _driveFilters.has(f));
  const categoryFilters = ['shared', 'mentioned', 'created'].filter(f => _driveFilters.has(f));

  document.querySelectorAll('.drive-item').forEach(item => {
    const matchType     = typeFilters.length === 0     || typeFilters.includes(item.dataset.type);
    const matchCategory = categoryFilters.length === 0 || categoryFilters.includes(item.dataset.category);
    const matchSearch   = !search || item.dataset.name.includes(search);
    item.style.display = matchType && matchCategory && matchSearch ? '' : 'none';
  });
}

// Calendar view state — persists across renders
const calView = {
  mode: 'day',       // 'day' | 'week' | 'month'
  date: new Date(),  // anchor date
};

/* ============================================================
   Calendar Screen
   ============================================================ */

function renderCalendar() {
  const el = document.getElementById('calendar-content');
  if (!el) return;

  // ── Static banners (always shown) ──
  const oncallBanner = calState.oncall ? `
    <div class="cal-banner cal-banner--oncall">
      <span>🚨</span>
      <span>On-call today: <strong>${escHtml(calState.oncall)}</strong></span>
    </div>` : `
    <div class="cal-banner cal-banner--oncall">
      <span>🚨</span>
      <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center">
        ${calState.oncallLast ? `<span>Last weekend: <strong>${escHtml(calState.oncallLast)}</strong></span>` : ''}
        ${calState.oncallNext ? `<span>Next weekend: <strong>${escHtml(calState.oncallNext)}</strong></span>` : ''}
        ${!calState.oncallLast && !calState.oncallNext ? '<span>No on-call scheduled this week</span>' : ''}
      </div>
    </div>`;

  const oooBanner = calState.ooo.length ? `
    <div class="cal-banner cal-banner--ooo">
      <span>🏖️</span>
      <span>Out today: <strong>${calState.ooo.map(escHtml).join(', ')}</strong></span>
    </div>` : '';

  const upcomingBanner = calState.upcoming.length ? `
    <div class="cal-banner cal-banner--upcoming">
      <span>📌</span>
      <div>
        <strong>Coming up in the next 30 days:</strong>
        <div class="upcoming-list">
          ${calState.upcoming.map(e => {
            const label = e.dateLabel || new Date(e.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const icon = e.type === 'recharge' ? '🔋' : '📌';
            return `<span class="upcoming-chip">${icon} ${label} — ${escHtml(e.title)}</span>`;
          }).join('')}
        </div>
      </div>
    </div>` : '';

  const staticBanners = oncallBanner + oooBanner + upcomingBanner;

  // ── Not connected ──
  if (!calIsConnected()) {
    el.innerHTML = `
      ${staticBanners}
      <div class="cal-connect-prompt">
        <div class="cal-connect-icon">📆</div>
        <h3>Connect Google Calendar</h3>
        <p>Connect your Google Calendar to see today's meetings, who's on-call, who's OOO, and upcoming events.</p>
        <button class="connect-btn" onclick="calConnect()">Connect to Google</button>
      </div>`;
    return;
  }

  // ── Nav label ──
  const navLabel = calViewLabel();

  // ── View tabs + nav ──
  const viewControls = `
    <div class="cal-view-controls">
      <div class="cal-view-tabs">
        <button class="cal-view-tab ${calView.mode === 'day'   ? 'active' : ''}" onclick="setCalView('day')">Day</button>
        <button class="cal-view-tab ${calView.mode === 'week'  ? 'active' : ''}" onclick="setCalView('week')">Week</button>
        <button class="cal-view-tab ${calView.mode === 'month' ? 'active' : ''}" onclick="setCalView('month')">Month</button>
      </div>
      <div class="cal-nav-row">
        <button class="planner-nav-btn" onclick="calendarNav(-1)">
          <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <span class="cal-nav-label">${navLabel}</span>
        <button class="planner-nav-btn" onclick="calendarNav(1)">
          <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <button class="planner-today-btn" onclick="calendarGoToday()">Today</button>
      </div>
    </div>`;

  // ── Render current view ──
  let viewHtml = '';
  if (calView.mode === 'day')   viewHtml = renderCalDayView();
  if (calView.mode === 'week')  viewHtml = renderCalWeekView();
  if (calView.mode === 'month') viewHtml = renderCalMonthView();

  el.innerHTML = staticBanners + viewControls + viewHtml;

  // Scroll to current hour in day view
  if (calView.mode === 'day') {
    setTimeout(() => {
      const cur = el.querySelector('.current-hour');
      if (cur) cur.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);

    // Wire up note saving
    el.querySelectorAll('.time-block-notes').forEach(ta => {
      ta.addEventListener('input', () => {
        saveNote(ta.dataset.date, Number(ta.dataset.hour), ta.value);
        ta.style.height = 'auto';
        ta.style.height = ta.scrollHeight + 'px';
      });
      if (ta.value) {
        ta.style.height = 'auto';
        ta.style.height = ta.scrollHeight + 'px';
      }
    });
  }
}

function calViewLabel() {
  const d = calView.date;
  if (calView.mode === 'day') {
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }
  if (calView.mode === 'week') {
    const start = weekStart(d);
    const end   = new Date(start); end.setDate(end.getDate() + 6);
    const sLabel = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const eLabel = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${sLabel} – ${eLabel}`;
  }
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function weekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  return d;
}

function setCalView(mode) {
  calView.mode = mode;
  renderCalendar();
}

function calendarNav(delta) {
  const d = new Date(calView.date);
  if (calView.mode === 'day')   d.setDate(d.getDate() + delta);
  if (calView.mode === 'week')  d.setDate(d.getDate() + delta * 7);
  if (calView.mode === 'month') d.setMonth(d.getMonth() + delta);
  calView.date = d;
  renderCalendar();
}

function calendarGoToday() {
  calView.date = new Date();
  renderCalendar();
}

function eventsForDate(date) {
  const key = isoDateKey(date);
  return calState.events.filter(e => {
    if (!e.start) return false;
    // Extract date portion directly from string to avoid timezone shift
    return e.start.slice(0, 10) === key;
  });
}

function eventHour(event) {
  if (!event.start) return 0;
  // All-day events have no time component
  if (event.start.length === 10) return 0;
  // Parse hour from local time portion of ISO string
  return new Date(event.start).getHours();
}
function renderCalDayView() {
  const p = state.prefs;
  const d = calView.date;
  const now = new Date();
  const isToday = isoDateKey(d) === isoDateKey(now);
  const dateKey = isoDateKey(d);
  const notes = loadNotes();
  const dayEvents = eventsForDate(d);

  let html = '<div class="planner-body">';
  for (let h = p.startHour; h < p.endHour; h++) {
    const savedNote = (notes[dateKey] && notes[dateKey][h]) || '';
    const isCurrent = isToday && now.getHours() === h;
    const hourEvents = dayEvents.filter(e => eventHour(e) === h);
    const pills = hourEvents.map(e =>
      `<a class="time-block-meeting-pill" href="${escHtml(e.link)}" target="_blank">${escHtml(e.title)}</a>`
    ).join('');
    html += `
      <div class="time-block${isCurrent ? ' current-hour' : ''}">
        <div class="time-label">${formatTime(h, 0, p.use12HourClock)}</div>
        <div class="time-block-content">
          ${pills}
          <textarea class="time-block-notes" rows="1" placeholder="Notes..."
            data-hour="${h}" data-date="${dateKey}">${escHtml(savedNote)}</textarea>
        </div>
      </div>`;
  }
  html += '</div>';
  return html;
}

// ── Week View ──
function renderCalWeekView() {
  const p = state.prefs;
  const start = weekStart(calView.date);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start); d.setDate(d.getDate() + i); return d;
  });
  const now = new Date();

  const headers = days.map(d => {
    const isToday = isoDateKey(d) === isoDateKey(now);
    return `<div class="week-col-header${isToday ? ' today' : ''}">
      <span class="week-day-name">${d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
      <span class="week-day-num${isToday ? ' today' : ''}">${d.getDate()}</span>
    </div>`;
  }).join('');

  let rows = '';
  for (let h = p.startHour; h < p.endHour; h++) {
    rows += `<div class="week-row">
      <div class="week-time-label">${formatTime(h, 0, p.use12HourClock)}</div>`;
    days.forEach(d => {
      const isToday = isoDateKey(d) === isoDateKey(now);
      const isCurrent = isToday && now.getHours() === h;
      const dayEvents = eventsForDate(d).filter(e => eventHour(e) === h);
      rows += `<div class="week-cell${isCurrent ? ' current-hour' : ''}">
        ${dayEvents.map(e =>
          `<a class="week-event-pill" href="${escHtml(e.link)}" target="_blank">${escHtml(e.title)}</a>`
        ).join('')}
      </div>`;
    });
    rows += '</div>';
  }

  return `<div class="week-grid">
    <div class="week-header-row">
      <div class="week-time-label"></div>
      ${headers}
    </div>
    <div class="week-body">${rows}</div>
  </div>`;
}

// ── Month View ──
let _selectedMonthDay = null; // isoDateKey of selected day

function renderCalMonthView() {
  const d = calView.date;
  const now = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);
  const startPad = firstDay.getDay();

  // Default selected day to today if in current month, else 1st
  if (!_selectedMonthDay ||
      !_selectedMonthDay.startsWith(`${year}-${String(month+1).padStart(2,'0')}`)) {
    const todayInMonth = isoDateKey(now).startsWith(`${year}-${String(month+1).padStart(2,'0')}`);
    _selectedMonthDay = todayInMonth ? isoDateKey(now) : isoDateKey(firstDay);
  }

  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const headers = dayNames.map(n => `<div class="month-day-name">${n}</div>`).join('');

  let cells = '';
  for (let i = 0; i < startPad; i++) {
    cells += '<div class="month-cell month-cell--empty"></div>';
  }
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const cellDate = new Date(year, month, day);
    const cellKey  = isoDateKey(cellDate);
    const isToday    = cellKey === isoDateKey(now);
    const isSelected = cellKey === _selectedMonthDay;
    const dayEvents  = eventsForDate(cellDate);
    cells += `<div class="month-cell${isToday ? ' today' : ''}${isSelected ? ' selected' : ''}"
                   onclick="selectMonthDay('${cellKey}')">
      <span class="month-cell-num${isToday ? ' today' : ''}">${day}</span>
      ${dayEvents.slice(0, 2).map(e =>
        `<span class="month-event-pill">${escHtml(e.title)}</span>`
      ).join('')}
      ${dayEvents.length > 2 ? `<span class="month-more">+${dayEvents.length - 2} more</span>` : ''}
    </div>`;
  }

  // Day detail panel
  const selDate = new Date(_selectedMonthDay + 'T00:00:00');
  const selEvents = eventsForDate(selDate);
  const selLabel = selDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const detailHtml = `
    <div class="month-detail-panel">
      <div class="month-detail-header">${selLabel}</div>
      ${selEvents.length === 0 ? `
        <div class="month-detail-empty">No events</div>
      ` : selEvents.map(e => `
        <a class="month-detail-event" href="${escHtml(e.link)}" target="_blank">
          <div class="month-detail-time">${calFormatEventTime(e)}</div>
          <div class="month-detail-title">${escHtml(e.title)}</div>
        </a>
      `).join('')}
    </div>`;

  return `<div class="month-layout">
    <div class="month-grid-wrap">
      <div class="month-header-row">${headers}</div>
      <div class="month-body">${cells}</div>
    </div>
    ${detailHtml}
  </div>`;
}

function selectMonthDay(key) {
  _selectedMonthDay = key;
  renderCalendar();
}
 // no-op, kept for safety


/* ============================================================
   Daily Planner
   ============================================================ */

function renderPlanner() {
  const p = state.prefs;
  const date = state.plannerDate;
  const notes = loadNotes();
  const dateKey = isoDateKey(date);
  const now = new Date();
  const isToday = isoDateKey(now) === dateKey;

  const navEl = document.getElementById('planner-nav-date');
  if (navEl) {
    navEl.innerHTML = `
      <strong>${formatDateShort(date)}</strong>
      <span class="day-name">${date.toLocaleDateString('en-US', { weekday: 'long' })}</span>
    `;
  }

  const todayBtn = document.getElementById('planner-today-btn');
  if (todayBtn) todayBtn.style.display = isToday ? 'none' : '';

  const body = document.getElementById('planner-blocks');
  if (!body) return;

  let html = '';
  for (let h = p.startHour; h < p.endHour; h++) {
    const savedNote = (notes[dateKey] && notes[dateKey][h]) || '';
    const isCurrent = isToday && now.getHours() === h;
    html += `
      <div class="time-block${isCurrent ? ' current-hour' : ''}">
        <div class="time-label">${formatTime(h, 0, p.use12HourClock)}</div>
        <div class="time-block-content">
          <textarea class="time-block-notes" rows="2" placeholder="Add notes..."
            data-hour="${h}" data-date="${dateKey}">${escHtml(savedNote)}</textarea>
        </div>
      </div>
    `;
  }
  body.innerHTML = html;

  if (isToday) {
    setTimeout(() => {
      const cur = body.querySelector('.current-hour');
      if (cur) cur.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }

  body.querySelectorAll('.time-block-notes').forEach(ta => {
    ta.addEventListener('input', () => {
      saveNote(ta.dataset.date, Number(ta.dataset.hour), ta.value);
      ta.style.height = 'auto';
      ta.style.height = ta.scrollHeight + 'px';
    });
    if (ta.value) {
      ta.style.height = 'auto';
      ta.style.height = ta.scrollHeight + 'px';
    }
  });
}

function plannerChangeDay(delta) {
  const d = new Date(state.plannerDate);
  d.setDate(d.getDate() + delta);
  state.plannerDate = d;
  renderPlanner();
}

function plannerGoToday() {
  state.plannerDate = new Date();
}

/* ============================================================
   Helpers
   ============================================================ */

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ============================================================
   Init
   ============================================================ */

/* ============================================================
   Setup Wizard
   ============================================================ */

const SETUP_KEY = 'uyt_setup_complete';

const setupSteps = [
  'welcome',
  'google',
  'slack',
  'jira',
  'tools',
  'preferences',
  'done',
];

let setupStep = 0;

function isSetupComplete() {
  return !!localStorage.getItem(SETUP_KEY);
}

function startSetup() {
  setupStep = 0;
  document.getElementById('setup-wizard').style.display = 'flex';
  document.querySelector('.app').style.display = 'none';
  renderSetupStep();
}

function completeSetup() {
  localStorage.setItem(SETUP_KEY, '1');
  document.getElementById('setup-wizard').style.display = 'none';
  document.querySelector('.app').style.display = 'flex';
  navigate('dashboard');
  calInit();
  slackInit();
}

function setupNext() {
  if (setupStep < setupSteps.length - 1) {
    setupStep++;
    renderSetupStep();
  } else {
    completeSetup();
  }
}

function setupBack() {
  if (setupStep > 0) {
    setupStep--;
    renderSetupStep();
  }
}

function renderSetupStep() {
  const total = setupSteps.length;
  const step  = setupSteps[setupStep];

  // Progress bar
  const pct = Math.round((setupStep / (total - 1)) * 100);
  document.getElementById('setup-progress').innerHTML = `
    <div class="setup-progress-bar">
      <div class="setup-progress-fill" style="width:${pct}%"></div>
    </div>
    <div class="setup-step-label">Step ${setupStep + 1} of ${total}</div>
  `;

  const content = document.getElementById('setup-content');

  if (step === 'welcome') {
    content.innerHTML = '<div class="setup-icon">⚡</div>' +
      '<h1 class="setup-title">Welcome to Blink!</h1>' +
      '<p class="setup-desc">Blink puts your whole workday in one place — calendar, Slack, emails, and files. Setup takes about 2 minutes.</p>' +
      '<div class="setup-feature-list">' +
        '<div class="setup-feature">📆 Your calendar and upcoming meetings</div>' +
        '<div class="setup-feature">💬 A daily Slack digest of what matters</div>' +
        '<div class="setup-feature">📬 Gmail unread count</div>' +
        '<div class="setup-feature">📁 Google Drive files shared with you</div>' +
      '</div>' +
      '<div class="setup-actions">' +
        '<button class="setup-btn-primary" onclick="setupNext()">Let\'s get started →</button>' +
      '</div>';
  }

  else if (step === 'google') {
    const connected = calIsConnected();
    const name = escHtml(calState.userProfile?.name || 'Google User');
    content.innerHTML = '<div class="setup-icon">🔗</div>' +
      '<h1 class="setup-title">Step 1: Connect Google</h1>' +
      '<p class="setup-desc">Blink needs access to your Google account to show your calendar, Gmail, and Drive files.</p>' +
      (connected
        ? '<div class="setup-connected-badge">✓ Connected as ' + name + '</div><p style="font-size:13px;color:var(--text-secondary);margin-top:8px">You\'re all set! Click Next to continue.</p>'
        : '<button class="setup-btn-secondary" onclick="setupConnectGoogle()" style="margin-top:8px">Sign in with Google</button>' +
          '<p style="font-size:12px;color:var(--text-secondary);margin-top:12px">Blink only reads your data — it never sends emails or modifies your calendar.</p>'
      ) +
      '<div class="setup-actions">' +
        '<button class="setup-btn-ghost" onclick="setupNext()">Skip for now</button>' +
        (connected ? '<button class="setup-btn-primary" onclick="setupNext()">Next →</button>' : '') +
      '</div>';
    // Poll until Google connects then auto-advance
    if (!calIsConnected()) {
      const _poll = setInterval(function() {
        if (calIsConnected()) {
          clearInterval(_poll);
          setTimeout(function() { setupNext(); }, 800);
        }
      }, 500);
    }
  }

  else if (step === 'slack') {
    const hasToken = !!localStorage.getItem('uyt_slack_token');
    const savedToken = escHtml(localStorage.getItem('uyt_slack_token') || '');
    content.innerHTML = '<div class="setup-icon">💬</div>' +
      '<h1 class="setup-title">Step 2: Connect Slack</h1>' +
      '<p class="setup-desc">Blink reads your Slack channels to build a daily digest. Click below to sign in — no passwords or tokens needed.</p>' +
      '<div class="setup-step-cta">' +
        '<p style="margin:0 0 12px;font-size:13px;color:var(--text)">Sign in with your Slack account to give Blink access to your channels. It uses your existing SSO — no passwords needed.</p>' +
        '<a href="#" onclick="triggerSlackOAuth();return false;" class="setup-btn-primary" style="display:inline-flex;align-items:center;gap:8px;text-decoration:none;margin-bottom:16px">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/></svg>' +
          'Sign in with Slack ↗' +
        '</a>' +
        '<div class="setup-steps-list">' +
          '<div class="setup-step-item"><div class="setup-step-num">1</div><div>Click <strong>Sign in with Slack</strong> above</div></div>' +
          '<div class="setup-step-item"><div class="setup-step-num">2</div><div>A popup will open — sign in with your Snyk Slack account (SSO)</div></div>' +
          '<div class="setup-step-item"><div class="setup-step-num">3</div><div>Approve access — the popup closes automatically and you are connected</div></div>' +
        '</div>' +
      '</div>' +
            (hasToken ? '<div class="setup-connected-badge" style="margin-top:8px">✓ Slack token saved</div>' : '') +
      '<div class="setup-actions">' +
        '<button class="setup-btn-ghost" onclick="setupBack()">← Back</button>' +
        '<button class="setup-btn-ghost" onclick="setupNext()">Skip for now</button>' +
        '<button class="setup-btn-primary" onclick="setupNext()">Next →</button>' +
      '</div>';
  }

  else if (step === 'jira') {
    const hasJira = !!localStorage.getItem('uyt_jira_token');
    content.innerHTML = '<div class="setup-icon">🎫</div>' +
      '<h1 class="setup-title">Step 3: Connect Jira</h1>' +
      '<p class="setup-desc">Sign in with Atlassian to see your open Jira cases in Blink. Uses your existing SSO — no passwords needed.</p>' +
      (hasJira ? '<div class="setup-connected-badge">✓ Connected to Jira</div><p style="font-size:13px;color:var(--text-secondary);margin-top:8px">You are all set!</p>' :
        '<a href="#" onclick="triggerJiraOAuth();return false;" class="setup-btn-primary" style="display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:white;margin-top:8px">Sign in with Atlassian</a>' +
        '<p style="font-size:12px;color:var(--text-secondary);margin-top:12px">Blink only reads your assigned issues — it never modifies Jira data.</p>'
      ) +
      '<div class="setup-actions">' +
        '<button class="setup-btn-ghost" onclick="setupBack()">← Back</button>' +
        '<button class="setup-btn-ghost" onclick="setupNext()">Skip for now</button>' +
        (hasJira ? '<button class="setup-btn-primary" onclick="setupNext()">Next →</button>' : '') +
      '</div>';
    // Poll for Jira connection
    if (!hasJira) {
      const _poll = setInterval(function() {
        if (localStorage.getItem('uyt_jira_token')) {
          clearInterval(_poll);
          setTimeout(function() { setupNext(); }, 800);
        }
      }, 500);
    }
  }

  else if (step === 'tools') {
    const sfUrl = escHtml(localStorage.getItem('uyt_salesforce_url') || '');
    const wdUrl = escHtml(localStorage.getItem('uyt_workday_url') || '');
    content.innerHTML = '<div class="setup-icon">🔧</div>' +
      '<h1 class="setup-title">Step 3: Your Tools</h1>' +
      '<p class="setup-desc">Add links to Salesforce and Workday so the dashboard buttons take you straight there.</p>' +
      '<div class="setup-field-label">Salesforce Cases URL <span style="font-weight:400;color:var(--text-secondary)">(optional)</span></div>' +
      '<div class="cal-input-row" style="margin-bottom:16px">' +
        '<input class="cal-client-input" id="setup-sf-url" type="text" placeholder="https://yourorg.lightning.force.com/lightning/o/Case/list" value="' + sfUrl + '">' +
        '<button class="cal-connect-btn" onclick="setupSaveSalesforce()">Save</button>' +
      '</div>' +
      '<div class="setup-field-label">Workday Tasks URL <span style="font-weight:400;color:var(--text-secondary)">(optional)</span></div>' +
      '<div class="cal-input-row" style="margin-bottom:8px">' +
        '<input class="cal-client-input" id="setup-wd-url" type="text" placeholder="https://wd103.myworkday.com/yourorg/d/task/..." value="' + wdUrl + '">' +
        '<button class="cal-connect-btn" onclick="setupSaveWorkday()">Save</button>' +
      '</div>' +
      '<p style="font-size:12px;color:var(--text-secondary);margin-top:8px">Not sure? Ask your manager or skip — you can add these later in Settings.</p>' +
      '<div class="setup-actions">' +
        '<button class="setup-btn-ghost" onclick="setupBack()">← Back</button>' +
        '<button class="setup-btn-ghost" onclick="setupNext()">Skip for now</button>' +
        '<button class="setup-btn-primary" onclick="setupNext()">Next →</button>' +
      '</div>';
  }

  else if (step === 'preferences') {
    const p = state.prefs;
    const themes = [
      { id: 'modern', color: '#6366F1', label: 'Modern' },
      { id: 'earth',  color: '#8C6A4A', label: 'Earth'  },
      { id: 'nature', color: '#5A8A6A', label: 'Nature' },
      { id: 'sunny',  color: '#D4A574', label: 'Sunny'  },
      { id: 'purple', color: '#9B6FA8', label: 'Violet' },
    ];
    const swatches = themes.map(t =>
      '<div class="theme-option" onclick="setupSelectTheme(\'' + t.id + '\')">' +
        '<div class="theme-swatch ' + (p.colorScheme === t.id ? 'selected' : '') + '" style="background:' + t.color + '"></div>' +
        '<span class="theme-swatch-label">' + t.label + '</span>' +
      '</div>'
    ).join('');
    const nameVal = escHtml(calState.userProfile?.name || p.userName);
    content.innerHTML = '<div class="setup-icon">🎨</div>' +
      '<h1 class="setup-title">Step 4: Make it yours</h1>' +
      '<p class="setup-desc">Almost done! Just a couple of quick preferences.</p>' +
      '<div class="setup-field-label">What\'s your name?</div>' +
      '<input class="cal-client-input" id="setup-name" type="text" placeholder="e.g. Alex" value="' + nameVal + '" style="margin-bottom:20px;width:100%;box-sizing:border-box">' +
      '<div class="setup-field-label">Pick a color theme</div>' +
      '<div class="theme-swatches" style="margin-bottom:8px">' + swatches + '</div>' +
      '<div class="setup-actions">' +
        '<button class="setup-btn-ghost" onclick="setupBack()">← Back</button>' +
        '<button class="setup-btn-primary" onclick="setupSavePrefs()">Next →</button>' +
      '</div>';
  }

  else if (step === 'done') {
    const hasJira = !!localStorage.getItem('uyt_jira_token');
    const hasSF = !!localStorage.getItem('uyt_salesforce_url');
    const hasWD = !!localStorage.getItem('uyt_workday_url');
    const hasSlack = !!localStorage.getItem('uyt_slack_token');
    const conn = calIsConnected();
    content.innerHTML = '<div class="setup-icon">🎉</div>' +
      '<h1 class="setup-title">You\'re ready!</h1>' +
      '<p class="setup-desc">Blink is set up. Here\'s what\'s connected:</p>' +
      '<div class="setup-feature-list">' +
        (conn ? '<div class="setup-feature">✅ Google — calendar, Gmail &amp; Drive</div>' : '<div class="setup-feature" style="opacity:0.5">○ Google — connect anytime from Settings</div>') +
        (hasSlack ? '<div class="setup-feature">✅ Slack — digest ready</div>' : '<div class="setup-feature" style="opacity:0.5">○ Slack — add your token in Settings</div>') +
        (hasJira ? '<div class="setup-feature">✅ Jira connected</div>' : '<div class="setup-feature" style="opacity:0.5">○ Jira — connect anytime from Settings</div>') +
        (hasSF ? '<div class="setup-feature">✅ Salesforce linked</div>' : '<div class="setup-feature" style="opacity:0.5">○ Salesforce — add URL in Settings</div>') +
        (hasWD ? '<div class="setup-feature">✅ Workday linked</div>' : '<div class="setup-feature" style="opacity:0.5">○ Workday — add URL in Settings</div>') +
      '</div>' +
      '<p style="font-size:13px;color:var(--text-secondary);margin-top:8px">Change anything later — just click the ⚙️ gear icon in the top right.</p>' +
      '<div class="setup-actions">' +
        '<button class="setup-btn-ghost" onclick="setupBack()">← Back</button>' +
        '<button class="setup-btn-primary" onclick="completeSetup()">Open Blink →</button>' +
      '</div>';
  }
}

// Setup helper functions
function setupConnectGoogle() {
  // Ensure client ID is set before connecting
  const clientId = '590264295133-lqo15vq4qt9b8ups64sftbiqlasp0ssk.apps.googleusercontent.com';
  calState.clientId = clientId;
  localStorage.setItem('uyt_cal_client_id', clientId);
  calConnect();
}


function setupSaveSalesforce() {
  const url = document.getElementById('setup-sf-url')?.value.trim();
  if (url) { localStorage.setItem('uyt_salesforce_url', url); }
}

function setupSaveWorkday() {
  const url = document.getElementById('setup-wd-url')?.value.trim();
  if (url) { localStorage.setItem('uyt_workday_url', url); }
}

function setupSavePrefs() {
  const name = document.getElementById('setup-name')?.value.trim();
  if (name) { state.prefs.userName = name; savePrefs(state.prefs); }
  setupNext();
}

function setupSelectTheme(id) {
  state.prefs.colorScheme = id;
  savePrefs(state.prefs);
  applyTheme(state.prefs);
  renderSetupStep();
}

document.addEventListener('DOMContentLoaded', async () => {
  applyTheme(state.prefs);

  // Nav
  document.querySelectorAll('.nav-item[data-screen]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.screen));
  });

  // Settings
  document.getElementById('settings-close').addEventListener('click', closeSettings);
  document.getElementById('settings-overlay').addEventListener('click', closeSettings);

  // About
  document.getElementById('about-close').addEventListener('click', closeAbout);
  document.getElementById('about-overlay').addEventListener('click', closeAbout);

  // Planner nav (only wire up if elements exist)
  const plannerPrev = document.getElementById('planner-prev');
  const plannerNext = document.getElementById('planner-next');
  const plannerToday = document.getElementById('planner-today-btn');
  if (plannerPrev)  plannerPrev.addEventListener('click', () => plannerChangeDay(-1));
  if (plannerNext)  plannerNext.addEventListener('click', () => plannerChangeDay(1));
  if (plannerToday) plannerToday.addEventListener('click', plannerGoToday);

  // If this is a popup returning from Jira OAuth, notify parent and close
  if (window.opener && window.location.hash.includes('jira-token=')) {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get('jira-token');
    const cloud = params.get('jira-cloud');
    if (token) {
      window.opener.postMessage({ type: 'jira-token', token, cloud }, 'https://klm-snyk.github.io');
      window.close();
    }
  }

  // If this is a popup window returning from Slack OAuth, notify parent and close
  if (window.opener && window.location.hash.includes('slack-token=')) {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get('slack-token');
    if (token) {
      window.opener.postMessage({ type: 'slack-token', token: token }, 'https://klm-snyk.github.io');
      window.close();
    }
  }

  // Handle Slack OAuth callback — token arrives in URL fragment
  const hash = window.location.hash;
  let _returnedFromSlackOAuth = false;
  if (hash.includes('slack-token=')) {
    const params = new URLSearchParams(hash.slice(1));
    const token = params.get('slack-token');
    if (token) {
      localStorage.setItem('uyt_slack_token', token);
      localStorage.removeItem('uyt_pre_oauth_state');
      window.history.replaceState(null, '', window.location.pathname);
      _returnedFromSlackOAuth = true;
    }
  }
  // Handle Jira OAuth callback
  if (hash.includes('jira-token=')) {
    const params = new URLSearchParams(hash.slice(1));
    const token = params.get('jira-token');
    const cloud = params.get('jira-cloud');
    if (token) { localStorage.setItem('uyt_jira_token', token); localStorage.setItem('uyt_jira_cloud', cloud || ''); window.history.replaceState(null, '', window.location.pathname); }
  }
  if (hash.includes('jira-error=')) {
    const params = new URLSearchParams(hash.slice(1));
    console.warn('Jira OAuth error:', params.get('jira-error'));
    window.history.replaceState(null, '', window.location.pathname);
  }

  if (hash.includes('slack-error=')) {
    const params = new URLSearchParams(hash.slice(1));
    console.warn('Slack OAuth error:', params.get('slack-error'));
    localStorage.removeItem('uyt_pre_oauth_state');
    window.history.replaceState(null, '', window.location.pathname);
    _returnedFromSlackOAuth = true;
  }

  if (!isSetupComplete()) {
    startSetup();
    // If returning from Slack OAuth, jump to tools step
    if (_returnedFromSlackOAuth) {
      setupStep = setupSteps.indexOf('tools');
      renderSetupStep();
    }
  } else {
    document.querySelector('.app').style.display = 'flex';
    navigate('dashboard');
    try {
      await calInit();
      slackInit();
      // Fetch Gmail label breakdown lazily
    if (calIsConnected()) calFetchGmailLabelBreakdown().then(() => renderDashboard());
    // Auto-fetch Jira issues if connected
    if (localStorage.getItem('uyt_jira_token') && !jiraState.issues) {
      setTimeout(function() { fetchJiraIssues(); }, 2000);
    }
    // Auto-fetch digest if no cache — small delay to ensure token is ready
      if (!slackDigestState.html && localStorage.getItem('uyt_slack_token')) {
        setTimeout(function() {
          slackDigestState.loading = true;
          renderDashboard();
          fetchSlackDigest().then(() => { renderDashboard(); renderSlack(); });
        }, 1500);
      }
    } catch(e) { console.error('Init error:', e); }
  }
});
