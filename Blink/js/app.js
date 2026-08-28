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
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "If you always do what you've always done, you'll always get what you've always gotten.", author: "Henry Ford" },
  { text: "You can't build a reputation on what you are going to do.", author: "Henry Ford" },
  { text: "Genius is one percent inspiration and ninety-nine percent perspiration.", author: "Thomas Edison" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
  { text: "A journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "What gets measured gets managed.", author: "Peter Drucker" },
  { text: "Efficiency is doing things right; effectiveness is doing the right things.", author: "Peter Drucker" },
  { text: "The only place where success comes before work is in the dictionary.", author: "Vince Lombardi" },
  { text: "Perfection is not attainable, but if we chase perfection we can catch excellence.", author: "Vince Lombardi" },
  { text: "Nothing will work unless you do.", author: "Maya Angelou" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.", author: "Winston Churchill" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Continuous effort — not strength or intelligence — is the key to unlocking our potential.", author: "Winston Churchill" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "Well done is better than well said.", author: "Benjamin Franklin" },
  { text: "By failing to prepare, you are preparing to fail.", author: "Benjamin Franklin" },
  { text: "Lost time is never found again.", author: "Benjamin Franklin" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Our greatest glory is not in never falling, but in rising every time we fall.", author: "Confucius" },
  { text: "Do not let what you cannot do interfere with what you can do.", author: "John Wooden" },
  { text: "It's what you learn after you know it all that counts.", author: "John Wooden" },
  { text: "A dream doesn't become reality through magic; it takes sweat, determination, and hard work.", author: "Colin Powell" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" },
  { text: "Whatever the mind can conceive and believe, it can achieve.", author: "Napoleon Hill" },
  { text: "Most of the important things in the world have been accomplished by people who have kept on trying when there seemed to be no hope at all.", author: "Dale Carnegie" },
];

// Real, accurately-attributed quotes from actual scientists/science
// communicators — shown instead of ZEN_QUOTES for the alternate theme.
// Unlike the earlier attempt at this, these are genuine public statements
// (same category as the Churchill/Franklin quotes above), not scripted
// creative dialogue, so there's no copyright concern reproducing them.
const SCIENCE_QUOTES = [
  { text: "The universe is under no obligation to make sense to you.", author: "Neil deGrasse Tyson" },
  { text: "Not only do we live among the stars, the stars live within us.", author: "Neil deGrasse Tyson" },
  { text: "The good thing about science is that it's true whether or not you believe in it.", author: "Neil deGrasse Tyson" },
  { text: "Ignorance of the natural world was not a sin. It's just where you started.", author: "Neil deGrasse Tyson" },
  { text: "We are made of star-stuff.", author: "Carl Sagan" },
  { text: "Somewhere, something incredible is waiting to be known.", author: "Carl Sagan" },
  { text: "Extraordinary claims require extraordinary evidence.", author: "Carl Sagan" },
  { text: "For small creatures such as we, the vastness is bearable only through love.", author: "Carl Sagan" },
  { text: "Science is a way of thinking much more than it is a body of knowledge.", author: "Carl Sagan" },
  { text: "I would rather have questions that can't be answered than answers that can't be questioned.", author: "Richard Feynman" },
  { text: "The first principle is that you must not fool yourself — and you are the easiest person to fool.", author: "Richard Feynman" },
  { text: "What I cannot create, I do not understand.", author: "Richard Feynman" },
  { text: "Study hard what interests you the most, in the most undisciplined, irreverent and original manner possible.", author: "Richard Feynman" },
  { text: "Nothing in life is to be feared, it is only to be understood.", author: "Marie Curie" },
  { text: "Be less curious about people and more curious about ideas.", author: "Marie Curie" },
  { text: "Intelligence is the ability to adapt to change.", author: "Stephen Hawking" },
  { text: "However difficult life may seem, there is always something you can do and succeed at.", author: "Stephen Hawking" },
  { text: "Look up at the stars and not down at your feet.", author: "Stephen Hawking" },
  { text: "The important thing is not to stop questioning. Curiosity has its own reason for existing.", author: "Albert Einstein" },
  { text: "Look deep into nature, and then you will understand everything better.", author: "Albert Einstein" },
  { text: "The most beautiful thing we can experience is the mysterious.", author: "Albert Einstein" },
  { text: "Imagination is more important than knowledge.", author: "Albert Einstein" },
  { text: "What you do makes a difference, and you have to decide what kind of difference you want to make.", author: "Jane Goodall" },
  { text: "If I have seen further it is by standing on the shoulders of giants.", author: "Isaac Newton" },
];

function isWhovianActive() {
  return !!(state.prefs && state.prefs.darkMode && state.prefs.colorScheme === 'modern' &&
    ['tardis', 'interior', 'tally'].includes(state.prefs.tardisBackground));
}

function sanitizeHtml(html) {
  return (html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '');
}


let _cachedDailyQuote = null;

let _cachedQuoteWasWhovian = null;

function getDailyQuote() {
  // Picked once per active pool (lazily, on first call — by which point
  // state.prefs is definitely loaded) so it stays the same across
  // re-renders within a session but shows a fresh one on page reload, and
  // re-picks if the theme itself changes mid-session.
  const isWhovian = isWhovianActive();
  if (_cachedDailyQuote === null || _cachedQuoteWasWhovian !== isWhovian) {
    const pool = isWhovian ? SCIENCE_QUOTES : ZEN_QUOTES;
    _cachedDailyQuote = pool[Math.floor(Math.random() * pool.length)];
    _cachedQuoteWasWhovian = isWhovian;
  }
  return _cachedDailyQuote;
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
  cases:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 010 6v2a1 1 0 001 1h18a1 1 0 001-1v-2a3 3 0 010-6V7a1 1 0 00-1-1H3a1 1 0 00-1 1z"/><path d="M9 9v6" stroke-dasharray="2 2"/></svg>`,
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
    // Always refresh on navigating here — silently (no overlay) if there's
    // cached data to show meanwhile, with the full loading state only for
    // a genuine first load. Keeps the unread count from going stale
    // indefinitely, which is what silently broke before this.
    if (!mailState.loading && calIsConnected()) fetchMailMessages(!!mailState.messages);
  }
  if (screen === 'cases') {
    renderCases();
    if (!jiraState.issues && !jiraState.loading && localStorage.getItem('uyt_jira_token')) fetchJiraIssues();
  }
  if (screen === 'supportcases') {
    renderSupportCases();
    if (!supportCasesState.cases && !supportCasesState.loading && localStorage.getItem('uyt_slack_token')) fetchSupportCases();
  }
  if (screen === 'workday') {
    renderWorkday();
    if (slackIsConnected() && !slackDigestState.workday && !slackDigestState.loading) fetchSlackDigest().then(renderWorkday);
  }
  if (screen === 'trends')    renderTrends();
  if (screen === 'drive')     renderDrive();
  if (screen === 'planner')   renderPlanner();
}

// Shows a themed overlay graphic for one particular theme combination, or a
// plain spinner for every other theme, in the same full-screen overlay slot
// during longer fetches.
function toggleLoadingOverlay(show) {
  const overlay = document.getElementById('angel-overlay');
  if (!overlay) return;
  const tardis = state.prefs?.tardisBackground || 'none';
  const isDark = state.prefs?.darkMode && state.prefs?.colorScheme === 'modern';
  const isWhovian = isDark && ['tardis', 'interior', 'tally'].includes(tardis);
  overlay.classList.toggle('whovian', isWhovian);
  overlay.classList.toggle('active', show);
}

async function refreshApp() {
  if (!calIsConnected()) return;
  // Show spinning state on refresh buttons + full-screen loading overlay
  document.querySelectorAll('.icon-btn[onclick*="refreshApp"]').forEach(b => b.classList.add('refreshing'));
  toggleLoadingOverlay(true);
  calState.driveLoading = true;
  renderDashboard();
  if (state.screen === 'calendar') renderCalendar();
  if (state.screen === 'drive') renderDrive();

  // Mail, Jira, Support Cases, and Workday were previously never refreshed
  // by this button at all — it only ever touched Calendar/Drive-related
  // data, so clicking Refresh while on any of those four screens did
  // nothing visible. Each fetch is called silently (its own loading
  // overlay suppressed via the silent param) since this function already
  // shows one overlay for the whole duration; each only runs when that
  // screen is the one currently active, matching calendar/drive above.
  const screenSpecificFetches = [
    state.screen === 'mail' ? fetchMailMessages(true) : null,
    state.screen === 'cases' ? fetchJiraIssues(true) : null,
    state.screen === 'supportcases' ? fetchSupportCases() : null,
    state.screen === 'workday' ? fetchSlackDigest(true) : null,
  ].filter(Boolean);

  await Promise.all([
    calFetchUpcoming().catch(e => console.warn(e)),
    calFetchUnreadCount(),
    calFetchOncall(),
    calFetchOOO(),
    calFetchUpcomingEvents(),
    calFetchDriveShared(),
    calFetchDriveCreated(),
    ...screenSpecificFetches,
  ]);
  await calFetchDriveMentions();
  calState.driveLoading = false;
  document.querySelectorAll('.icon-btn[onclick*="refreshApp"]').forEach(b => b.classList.remove('refreshing'));
  toggleLoadingOverlay(false);

  renderDashboard();
  if (state.screen === 'calendar') renderCalendar();
  if (state.screen === 'drive') renderDrive();
  if (state.screen === 'mail') renderMail();
  if (state.screen === 'cases') renderCases();
  if (state.screen === 'supportcases') renderSupportCases();
  if (state.screen === 'workday') renderWorkday();
}


// Default channels
const SLACK_DEFAULT_CHANNELS = [
  { id: 'C07JV4M7BAT', name: 'cx-support-sla' },
  { id: 'C08K5GUMVHS', name: 'cs-support-chatter' },
  { id: 'C5CNH3MTM', name: 'cs-support' },
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
  if (!slackIsConnected()) {
    el.innerHTML = `<div class="cal-connect-prompt"><div class="cal-connect-icon">💬</div><h3>Connect Slack</h3><p>Sign in with Slack to see your digest and region handover.</p><button class="connect-btn" onclick="triggerSlackOAuth()">Sign in with Slack</button></div>`;
    return;
  }
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
    ${slackDigestState.error ? `<div class="cal-connect-prompt" style="margin-top:32px"><div class="cal-connect-icon">⚠️</div><h3>Error loading digest</h3><p>${escHtml(slackDigestState.error)}</p><button class="connect-btn" onclick="fetchSlackDigestFull()">Try again</button></div>`
    : slackDigestState.html ? `<div class="slack-digest-full">${sanitizeHtml(slackDigestState.html)}</div><div class="slack-digest-timestamp">Last updated ${escHtml(slackDigestState.asOf||'')}</div>`
    : `<div class="cal-connect-prompt" style="margin-top:32px"><div class="cal-connect-icon">💬</div><h3>Ready to digest</h3><p>Click Refresh Digest to search the last 24 hours across your channels.</p><button class="connect-btn" onclick="fetchSlackDigestFull()">Get Digest</button></div>`}
  `;
}

async function fetchSlackDigestFull() {
  slackDigestState.loading = true;
  renderSlack();
  await fetchSlackDigest();
  renderSlack();
}

function renderSlackAndAutoFetch() {
  renderSlack();
  // Auto-fetch if no digest loaded yet and worker is configured
  if (slackIsConnected() && !slackDigestState.html && !slackDigestState.loading && 'https://uyt-slack-digest.kar-marsten.workers.dev') {
    fetchSlackDigestFull();
  }
}



/* ============================================================
   Mail Screen — grouped by label, collapsible, paginated
   Client-side only — no AI, no worker, no content leaves browser
   ============================================================ */

const mailState = {
  loading: false,
  loadingMore: false,
  messages: JSON.parse(localStorage.getItem('uyt_mail_messages') || 'null'),
  nextPageToken: localStorage.getItem('uyt_mail_next_page_token') || null,
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

// Separate from the exclusion list itself — excluded labels get filtered out
// before they're ever fetched, so mailGetLabelName() has no way to resolve a
// friendly name for one afterward. This snapshots the name at the moment of
// exclusion (while we still have it) so "Currently excluded" in Settings can
// show something recognizable instead of a raw Label_1234567890 ID.
function getGmailExcludedNames() {
  try { return JSON.parse(localStorage.getItem('uyt_gmail_excluded_names') || '{}'); }
  catch { return {}; }
}

// Was called from the Settings panel's X/re-include buttons but never
// actually defined anywhere — clicking those buttons just silently threw a
// ReferenceError in the console, which is why they appeared to do nothing.
function toggleGmailExclude(labelId, labelName) {
  const excluded = getGmailExcluded();
  const idx = excluded.indexOf(labelId);
  if (idx === -1) {
    // Defense in depth: never allow adding INBOX to the exclusion list —
    // excluding your own Inbox doesn't make sense now that it's literally
    // the core unread count, and the Settings UI shouldn't offer it as an
    // option in the first place. Removing/re-including is still always
    // allowed below, in case INBOX is already sitting in an old saved
    // exclusion list from before this was filtered out of the display.
    if (labelId === 'INBOX') return;
    excluded.push(labelId);
    const names = getGmailExcludedNames();
    names[labelId] = labelName || mailGetLabelName(labelId) || labelId;
    localStorage.setItem('uyt_gmail_excluded_names', JSON.stringify(names));
  } else {
    excluded.splice(idx, 1);
    const names = getGmailExcludedNames();
    delete names[labelId];
    localStorage.setItem('uyt_gmail_excluded_names', JSON.stringify(names));
  }
  localStorage.setItem('uyt_gmail_excluded_labels', JSON.stringify(excluded));
  // Mail page's own grouping already checks getGmailExcluded() fresh at
  // render time, so re-rendering it here immediately hides/shows the group
  // without waiting on the async re-fetch below.
  if (typeof renderMail === 'function') renderMail();
  if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
  // Excluded labels are filtered out before they're ever fetched, so
  // re-fetching is what actually applies the new exclusion list (or brings
  // a re-included label back into range) rather than just updating a flag
  // on already-cached data.
  if (typeof calFetchUnreadCount === 'function') {
    calFetchUnreadCount().then(function() {
      if (typeof renderMail === 'function') renderMail();
      if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
      renderDashboard();
    });
  }
}

// Fetches one page of unread messages (up to 100) starting at pageToken
// (null for the first page). No date restriction — "unread" means unread,
// regardless of age; that's applied consistently everywhere mail is fetched.
// extraQuery lets a caller narrow the search (e.g. "in:inbox") on top of the
// base unread/spam/trash/exclusion filters.
async function fetchMailPage(pageToken, extraQuery) {
  const excluded = getGmailExcluded();
  const exclusionClause = excluded.length ? ' ' + excluded.map(id => '-label:' + id).join(' ') : '';
  const q = 'is:unread -in:spam -in:trash' + exclusionClause + (extraQuery ? ' ' + extraQuery : '');
  const params = new URLSearchParams({ q, maxResults: 100 });
  if (pageToken) params.set('pageToken', pageToken);
  const listRes = await fetch(
    'https://gmail.googleapis.com/gmail/v1/users/me/messages?' + params,
    { headers: { Authorization: 'Bearer ' + calState.token } }
  );
  if (!listRes.ok) throw new Error('Failed to list messages');
  const listData = await listRes.json();
  const ids = (listData.messages || []).map(function(m) { return m.id; });
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
  }))).filter(Boolean);
  return { messages, nextPageToken: listData.nextPageToken || null };
}

// silent=true skips the full-screen loading overlay — used for background
// refreshes (navigating to the screen, returning focus after reading an
// email elsewhere) where cached data is already on screen and a disruptive
// overlay would be unwelcome. The explicit "Refresh" button still calls
// this with silent=false for its visible, deliberate loading state.
async function fetchMailMessages(silent) {
  if (!calState.token) return;
  mailState.loading = true;
  mailState.error = null;
  renderMail();
  if (!silent) toggleLoadingOverlay(true);
  try {
    // Fetch Inbox on its own, guaranteed — a noisy high-volume label (an
    // archive folder with constant automated traffic, say) can otherwise
    // completely dominate the general "is:unread" query's first page, since
    // that query sorts by recency across every label combined. That can
    // push genuine Inbox messages so far down they never surface at all,
    // even though the Dashboard tile (which queries Inbox independently via
    // labels.get) correctly shows Inbox has unread mail. Fetching Inbox
    // separately means it always shows up regardless of how noisy anything
    // else is.
    const [inboxResult, generalResult] = await Promise.all([
      fetchMailPage(null, 'in:inbox'),
      fetchMailPage(null),
    ]);
    const seenIds = new Set(inboxResult.messages.map(function(m) { return m.id; }));
    const merged = inboxResult.messages.concat(
      generalResult.messages.filter(function(m) { return !seenIds.has(m.id); })
    );
    merged.sort(function(a, b) { return b.ts - a.ts; });
    mailState.messages = merged;
    mailState.nextPageToken = generalResult.nextPageToken;
    mailState.asOf = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    localStorage.setItem('uyt_mail_messages', JSON.stringify(merged));
    localStorage.setItem('uyt_mail_next_page_token', generalResult.nextPageToken || '');
    localStorage.setItem('uyt_mail_asof', mailState.asOf);
    calFetchGmailLabelBreakdown();
  } catch(e) {
    mailState.error = e.message;
  } finally {
    mailState.loading = false;
    if (!silent) toggleLoadingOverlay(false);
    renderMail();
  }
}

async function loadMoreMail() {
  if (!calState.token || !mailState.nextPageToken || mailState.loadingMore) return;
  mailState.loadingMore = true;
  renderMail();
  try {
    const { messages, nextPageToken } = await fetchMailPage(mailState.nextPageToken);
    const existingIds = new Set(mailState.messages.map(function(m) { return m.id; }));
    const merged = mailState.messages.concat(messages.filter(function(m) { return !existingIds.has(m.id); }));
    merged.sort(function(a, b) { return b.ts - a.ts; });
    mailState.messages = merged;
    mailState.nextPageToken = nextPageToken;
    localStorage.setItem('uyt_mail_messages', JSON.stringify(merged));
    localStorage.setItem('uyt_mail_next_page_token', nextPageToken || '');
  } catch(e) {
    mailState.error = e.message;
  } finally {
    mailState.loadingMore = false;
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
    ? "<button class=\"mail-page-btn\" onclick='mailPage(" + JSON.stringify(safeId) + ",-1)'>← Prev 10</button>"
    : '';
  const nextBtn = msgs.length > start + 10
    ? "<button class=\"mail-page-btn\" onclick='mailPage(" + JSON.stringify(safeId) + ",1)'>Next 10 →</button>"
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

// Same grouping logic as renderMail(), extracted so the Dashboard tile's
// "other labels" breakdown can use the exact same 30-day-scoped data instead
// of Gmail's labels.get counts (which report ALL-TIME unread, not just the
// last 30 days) — those two numbers can differ wildly for an old archive
// label, since labels.get counts everything ever left unread under it,
// while Mail only ever looks at the last 30 days. Returns null if mail
// hasn't been fetched yet, since there's nothing consistent to show.
function computeMailLabelBreakdown() {
  if (!mailState.messages) return null;
  const labelMap = {};
  mailState.messages.forEach(function(m) {
    const assignedLabels = m.labelIds.length ? m.labelIds : (m.inInbox ? ['INBOX'] : []);
    assignedLabels.forEach(function(lid) {
      if (!labelMap[lid]) labelMap[lid] = [];
      if (!labelMap[lid].find(function(x) { return x.id === m.id; })) labelMap[lid].push(m);
    });
  });
  const excluded = getGmailExcluded();
  return Object.keys(labelMap)
    .filter(function(lid) { return lid !== 'INBOX' && !excluded.includes(lid) && mailGetLabelName(lid) !== null; })
    .map(function(lid) { return { id: lid, name: mailGetLabelName(lid), unread: labelMap[lid].filter(function(m) { return m.isUnread; }).length }; })
    .filter(function(l) { return l.unread > 0; })
    .sort(function(a, b) { return b.unread - a.unread; });
}

function setMailFilter(f) { mailState.search = f; renderMail(); }

function renderMail() {
  const el = document.getElementById('screen-mail-content');
  if (!el) return;
  if (!calIsConnected()) {
    el.innerHTML = '<div class="cal-connect-prompt"><div class="cal-connect-icon">📬</div><h3>Connect Google</h3><p>Sign in with Google to see your mail.</p><button class="connect-btn" onclick="openSettings()">Connect</button></div>';
    return;
  }
  if (mailState.loading && !mailState.messages) {
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
    // No exclude button for INBOX — excluding your own Inbox doesn't make
    // sense now that it's the core unread count.
    const excludeBtn = lid !== 'INBOX'
      ? '<button class="mail-label-exclude" onclick="event.stopPropagation();toggleGmailExclude(\'' + lid.replace(/'/g,'') + '\',' + JSON.stringify(labelName || lid).replace(/"/g, '&quot;') + ')" title="Exclude this label from your unread count and Mail page">✕</button>'
      : '';
    return '<div class="mail-label-group">' +
      '<div class="mail-label-header">' + toggle + '<span class="mail-label-name">' + escHtml(labelName) + '</span>' + badge + '<span class="mail-label-total">(' + labelMsgs.length + ')</span>' + excludeBtn + '</div>' +
      colHeader +
      '<div class="mail-list">' + body + '</div>' +
      '</div>';
  }).join('');

  const headerHtml = '<div class="mail-header">' +
    '<div class="mail-meta">Last updated ' + escHtml(mailState.asOf || '') + ' · ' + msgs.length + ' messages' + (mailState.nextPageToken ? ' (more available)' : '') + '</div>' +
    '<div class="mail-meta" style="font-size:11px;color:var(--text-secondary);margin-top:2px" title="This list reads from Gmail\'s search index (is:unread), which can lag a few minutes behind the actual mailbox state. The Dashboard\'s Inbox count uses a more reliable, real-time source and may disagree with this count briefly.">ⓘ Count may lag briefly behind the Dashboard\'s Inbox count</div>' +
    '<button class="connect-btn" onclick="fetchMailMessages()" style="padding:8px 16px;font-size:13px">↺ Refresh</button>' +
    '</div>';

  const loadMoreHtml = mailState.nextPageToken
    ? '<div style="text-align:center;margin-top:16px">' +
        '<button class="connect-btn" onclick="loadMoreMail()" style="padding:10px 20px;' + (mailState.loadingMore ? 'opacity:0.5;pointer-events:none' : '') + '">' +
          (mailState.loadingMore ? '⏳ Loading more…' : '↓ Load more unread mail') +
        '</button>' +
      '</div>'
    : '';

  el.innerHTML = headerHtml + searchHtml + groupsHtml + loadMoreHtml; // NOSONAR
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
  statusFilters: new Set(),
  escalatedOnly: false,
  reportedOnly: false,
  watchingOnly: false,
};

function casesToggleStatusFilter(status) {
  if (jiraState.statusFilters.has(status)) {
    jiraState.statusFilters.delete(status);
  } else {
    jiraState.statusFilters.add(status);
  }
  renderCases();
}

function casesToggleEscalatedOnly() {
  jiraState.escalatedOnly = !jiraState.escalatedOnly;
  renderCases();
}

function casesToggleReportedOnly() {
  jiraState.reportedOnly = !jiraState.reportedOnly;
  renderCases();
}

function casesToggleWatchingOnly() {
  jiraState.watchingOnly = !jiraState.watchingOnly;
  renderCases();
}

function getJiraProjects() {
  try { return JSON.parse(localStorage.getItem('uyt_jira_projects') || '[]'); }
  catch { return []; }
}

function jiraDisconnect() {
  localStorage.removeItem('uyt_jira_token');
  localStorage.removeItem('uyt_jira_cloud');
  localStorage.removeItem('uyt_jira_issues');
  localStorage.removeItem('uyt_jira_asof');
  localStorage.removeItem('uyt_jira_refresh_token');
  jiraState.issues = null;
  jiraState.loading = false;
  jiraState.error = null;
  jiraState.asOf = null;
  if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
  if (typeof renderCases === 'function') renderCases();
  // Previously missing — without this, the Dashboard's JIRA tile kept
  // showing whatever was last rendered until some unrelated event happened
  // to trigger a re-render, which is exactly the "stale for about a minute"
  // delay this was causing. jiraState.issues was already correctly cleared
  // in memory the whole time; nothing was ever telling the tile to reflect it.
  if (typeof renderDashboard === 'function') renderDashboard();
}

// Full sign-out: clears Google, Slack, and Jira together so "Sign out"
// actually signs the person out of everything Blink is connected to, not
// just Google.
function signOutAll() {
  calDisconnect();
  if (typeof slackDisconnect === 'function') slackDisconnect();
  jiraDisconnect();
  if (typeof renderDashboard === 'function') renderDashboard();
}


// Atlassian access tokens expire in about an hour. Exchanges the stored
// refresh_token for a new access token (and new refresh_token — Atlassian
// rotates it each time, so the old one becomes invalid) via the Worker.
async function refreshJiraToken() {
  const refreshToken = localStorage.getItem('uyt_jira_refresh_token');
  if (!refreshToken) return false;
  try {
    const res = await fetch('https://uyt-slack-digest.kar-marsten.workers.dev/jira/refresh?rt=' + encodeURIComponent(refreshToken));
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('uyt_jira_token', data.token);
      if (data.refresh) localStorage.setItem('uyt_jira_refresh_token', data.refresh);
      return true;
    }
  } catch (e) { /* fall through to false */ }
  return false;
}

async function fetchJiraIssues(silent) {
  let token = localStorage.getItem('uyt_jira_token');
  const cloud = localStorage.getItem('uyt_jira_cloud');
  if (!token || !cloud) return;
  jiraState.loading = true;
  jiraState.error = null;
  renderCases();
  if (!silent) toggleLoadingOverlay(true);
  const projects = getJiraProjects().map(function(p) { return p.key; }).join(',');
  // Also matches issues linked (via customfield_12416, confirmed live
  // against real data) to one of the person's own open Salesforce cases —
  // pulled from the same Support Cases data already loaded, matched by name
  // the same way renderSupportCases() does.
  const myName = (calState.userProfile?.name || state.prefs.userName || '').trim();
  const myCaseNumbers = (supportCasesState.cases || [])
    .filter(function(c) { return myName && c.owner && c.owner.toLowerCase().includes(myName.toLowerCase()); })
    .map(function(c) { return c.caseId; })
    .filter(Boolean);
  const buildUrl = function(t) {
    return 'https://uyt-slack-digest.kar-marsten.workers.dev/jira/issues?t=' + encodeURIComponent(t) + '&c=' + encodeURIComponent(cloud) + (projects ? '&p=' + encodeURIComponent(projects) : '') + (myCaseNumbers.length ? '&cases=' + encodeURIComponent(myCaseNumbers.join(',')) : '');
  };
  try {
    let res = await fetch(buildUrl(token), { headers: { 'Content-Type': 'application/json' } });
    // Atlassian tokens only last ~1 hour — without this retry, the
    // connection would silently start failing every hour, requiring a full
    // manual re-auth even though a valid refresh_token was sitting unused.
    if (res.status === 401) {
      const refreshed = await refreshJiraToken();
      if (refreshed) {
        token = localStorage.getItem('uyt_jira_token');
        res = await fetch(buildUrl(token), { headers: { 'Content-Type': 'application/json' } });
      }
    }
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
    if (!silent) toggleLoadingOverlay(false);
    renderCases();
    renderDashboard();
  }
}

function casesToggle(key, val) { jiraState.expanded[key] = val; renderCases(); }

/* ============================================================
   Support Case Trends & Data
   ============================================================ */

// Snowflake-sourced metrics relayed via a Slack Canvas — same pattern as
// Support Cases, since Blink has no live Snowflake access. NOT live; only
// as current as the last on-demand refresh. Currently covers Submitted vs
// Solved (Support-wide) and MTTR. R&D-linked views (which need a larger,
// separate Jira pull to determine which cases have a linked issue) are a
// planned follow-up, not included yet.
const TRENDS_CANVAS_ID = 'F0BSZGUQ97D';

const trendsDataState = {
  loading: false,
  monthly: null,  // [{period, submitted, solved}, ...] — period is "YYYY-MM"
  mttr: null,     // {average, median, count} — raw display strings from the canvas
  backlogByOwner: null, // [{owner, open, pending, onHold, waitingForInternal, meetingScheduled, total}, ...]
  resolutionTimeTrend: null, // [{period, medianDays}, ...] — period is "YYYY-MM"
  // [{period, supportOnlyMedianDays, rdMedianDays}, ...] — sourced from two
  // Salesforce report exports (Google Drive), not Snowflake — the Jira
  // linkage field isn't synced there. See canvas note for details.
  resolutionTimeSplitTrend: null,
  error: null,
  asOf: null,
};

// Structurally similar to parseCasesCanvasHtml() — walks H2 headings and
// associates the table immediately following each with that heading, but
// differentiates parsing by heading text since the two tables here have
// different column shapes (monthly trend, metric/value pairs, or per-owner
// backlog breakdown).
function parseTrendsCanvasHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const result = { monthly: [], mttr: null, backlogByOwner: [], resolutionTimeTrend: [], resolutionTimeSplitTrend: [] };
  let currentHeading = '';
  function walk(nodes) {
    nodes.forEach(function(node) {
      const tag = (node.tagName || '').toUpperCase();
      if (tag === 'H2') {
        currentHeading = node.textContent.trim();
      } else if (tag === 'TABLE') {
        const rows = Array.from(node.querySelectorAll('tr')).slice(1); // skip header row
        if (/submitted vs solved/i.test(currentHeading)) {
          rows.forEach(function(tr) {
            const cells = Array.from(tr.children).map(function(c) { return c.textContent.trim(); });
            if (cells.length >= 3) {
              result.monthly.push({ period: cells[0], submitted: Number(cells[1]) || 0, solved: Number(cells[2]) || 0 });
            }
          });
        } else if (/support only vs r&d/i.test(currentHeading)) {
          rows.forEach(function(tr) {
            const cells = Array.from(tr.children).map(function(c) { return c.textContent.trim(); });
            if (cells.length >= 3) {
              result.resolutionTimeSplitTrend.push({ period: cells[0], supportOnlyMedianDays: Number(cells[1]) || 0, rdMedianDays: Number(cells[2]) || 0 });
            }
          });
        } else if (/median resolution time/i.test(currentHeading)) {
          rows.forEach(function(tr) {
            const cells = Array.from(tr.children).map(function(c) { return c.textContent.trim(); });
            if (cells.length >= 2) {
              result.resolutionTimeTrend.push({ period: cells[0], medianDays: Number(cells[1]) || 0 });
            }
          });
        } else if (/mttr/i.test(currentHeading)) {
          const metrics = {};
          rows.forEach(function(tr) {
            const cells = Array.from(tr.children).map(function(c) { return c.textContent.trim(); });
            if (cells.length >= 2) metrics[cells[0].toLowerCase()] = cells[1];
          });
          result.mttr = {
            average: metrics['average'] || '',
            median: metrics['median'] || '',
            count: metrics['resolved cases in window'] || '',
          };
        } else if (/case backlog by engineer/i.test(currentHeading)) {
          rows.forEach(function(tr) {
            const cells = Array.from(tr.children).map(function(c) { return c.textContent.trim(); });
            if (cells.length >= 7) {
              result.backlogByOwner.push({
                owner: cells[0],
                open: Number(cells[1]) || 0,
                pending: Number(cells[2]) || 0,
                onHold: Number(cells[3]) || 0,
                waitingForInternal: Number(cells[4]) || 0,
                meetingScheduled: Number(cells[5]) || 0,
                total: Number(cells[6]) || 0,
              });
            }
          });
        }
      }
      if (node.children && node.children.length) walk(Array.from(node.children));
    });
  }
  if (doc.body) walk(Array.from(doc.body.children));
  return result;
}

async function fetchTrendsData() {
  const token = localStorage.getItem('uyt_slack_token');
  if (!token) return;
  trendsDataState.loading = true;
  trendsDataState.error = null;
  renderTrends();
  try {
    const res = await fetch('https://uyt-slack-digest.kar-marsten.workers.dev/slack/read-trends-canvas?t=' + encodeURIComponent(token));
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    const parsed = parseTrendsCanvasHtml(data.html || '');
    trendsDataState.monthly = parsed.monthly;
    trendsDataState.mttr = parsed.mttr;
    trendsDataState.backlogByOwner = parsed.backlogByOwner;
    trendsDataState.resolutionTimeTrend = parsed.resolutionTimeTrend;
    trendsDataState.resolutionTimeSplitTrend = parsed.resolutionTimeSplitTrend;
    trendsDataState.asOf = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  } catch (e) {
    trendsDataState.error = e.message;
  } finally {
    trendsDataState.loading = false;
    renderTrends();
  }
}

// Custom tooltip for chart hover points — native SVG <title> tooltips
// proved unreliable across browsers (slow, inconsistent, or not firing at
// all even with pointer-events set correctly), so this uses a plain
// positioned div driven by mouse events instead, which is dependable
// everywhere. Shared by both trend charts below; one div, reused.
function chartTooltipShow(evt, text) {
  let el = document.getElementById('chart-tooltip');
  if (!el) {
    el = document.createElement('div');
    el.id = 'chart-tooltip';
    el.style.cssText = 'position:fixed;z-index:10000;pointer-events:none;background:var(--text);color:var(--bg);font-size:11px;font-weight:600;padding:4px 8px;border-radius:6px;white-space:nowrap;transform:translate(-50%,-130%)';
    document.body.appendChild(el);
  }
  el.textContent = text;
  el.style.left = evt.clientX + 'px';
  el.style.top = evt.clientY + 'px';
  el.style.display = 'block';
}

function chartTooltipHide() {
  const el = document.getElementById('chart-tooltip');
  if (el) el.style.display = 'none';
}

// Builds a hand-rolled SVG line chart — Blink has no charting library, and
// pulling one in for a single chart isn't worth it. Two series (Submitted/
// Solved), circle markers, no always-visible value labels (20 months of
// two series collided with each other and the line) — hover a point for
// its exact value instead, via a larger invisible hit-target circle.
function buildTrendsLineChartSvg(monthlyData) {
  const W = 700, H = 290;
  const padL = 50, padR = 16, padT = 30, padB = 46;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const n = monthlyData.length;
  const allVals = monthlyData.flatMap(function(m) { return [m.submitted, m.solved]; });
  const maxVal = Math.max.apply(null, allVals.concat([1])) * 1.08;
  const xFor = function(i) { return n <= 1 ? padL : padL + (i / (n - 1)) * plotW; };
  const yFor = function(v) { return padT + plotH - (v / maxVal) * plotH; };

  const buildLine = function(key) {
    return monthlyData.map(function(m, i) { return xFor(i).toFixed(1) + ',' + yFor(m[key]).toFixed(1); }).join(' ');
  };
  // No always-visible value labels — with 20 months now covered (was 13),
  // labels for both series collided with each other and the line. Larger
  // invisible hover targets sit on top of each small visible marker, same
  // approach as the resolution-time chart below.
  const buildPointsAndLabels = function(key, color, label) {
    return monthlyData.map(function(m, i) {
      const x = xFor(i), y = yFor(m[key]);
      const tipText = escHtml(m.period) + ' ' + label + ': ' + m[key];
      return '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="2.5" fill="' + color + '"></circle>' +
        '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="9" fill="transparent" pointer-events="all" style="cursor:default" onmouseenter="chartTooltipShow(event,\'' + tipText + '\')" onmousemove="chartTooltipShow(event,\'' + tipText + '\')" onmouseleave="chartTooltipHide()"></circle>';
    }).join('');
  };
  // Rotated at a slight -30° slant (matching the backlog chart's approach
  // to fitting many labels), rather than sitting flat and crowding into
  // each other — this was the main source of the clunky look.
  const xLabels = monthlyData.map(function(m, i) {
    const x = xFor(i);
    // period is "YYYY-MM" — show month + 2-digit year (Jan 25, Feb 25...),
    // matching the Resolution Time chart's format for consistency.
    const parts = m.period.split('-');
    const label = new Date(Number(parts[0]), Number(parts[1]) - 1, 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    const labelY = padT + plotH + 14;
    return '<text x="' + x.toFixed(1) + '" y="' + labelY + '" font-size="9" fill="var(--text-secondary)" text-anchor="end" transform="rotate(-30 ' + x.toFixed(1) + ' ' + labelY + ')">' + escHtml(label) + '</text>';
  }).join('');
  // Faint horizontal gridline at zero for a visual baseline
  const zeroY = yFor(0).toFixed(1);
  // Y-axis title, rotated — standard chart convention, in addition to the
  // color-key legend rendered separately above the chart.
  const yAxisTitle = '<text x="14" y="' + (padT + plotH / 2) + '" font-size="9" fill="var(--text-secondary)" text-anchor="middle" transform="rotate(-90 14 ' + (padT + plotH / 2) + ')">Number of Cases</text>';

  return '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:auto;display:block" xmlns="http://www.w3.org/2000/svg">' +
    yAxisTitle +
    '<line x1="' + padL + '" y1="' + zeroY + '" x2="' + (W - padR) + '" y2="' + zeroY + '" stroke="var(--border)" stroke-width="1"></line>' +
    '<polyline points="' + buildLine('submitted') + '" fill="none" stroke="#6366F1" stroke-width="2"></polyline>' +
    '<polyline points="' + buildLine('solved') + '" fill="none" stroke="#10B981" stroke-width="2"></polyline>' +
    buildPointsAndLabels('submitted', '#6366F1', 'Submitted') +
    buildPointsAndLabels('solved', '#10B981', 'Solved') +
    xLabels +
    '</svg>';
}

// Single-series version of buildTrendsLineChartSvg — median resolution
// time in days (not a whole-number count, unlike the Submitted/Solved
// chart), so labels keep one decimal place for real precision.
function buildResolutionTimeLineChartSvg(monthlyData) {
  const W = 700, H = 250;
  const padL = 42, padR = 16, padT = 24, padB = 46;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const n = monthlyData.length;
  const maxVal = Math.max.apply(null, monthlyData.map(function(m) { return m.medianDays; }).concat([1])) * 1.08;
  const xFor = function(i) { return n <= 1 ? padL : padL + (i / (n - 1)) * plotW; };
  const yFor = function(v) { return padT + plotH - (v / maxVal) * plotH; };

  const linePoints = monthlyData.map(function(m, i) { return xFor(i).toFixed(1) + ',' + yFor(m.medianDays).toFixed(1); }).join(' ');
  // No always-visible value labels — with 20 closely-spaced points they
  // collided with each other and the line. A larger invisible circle sits
  // on top of each small visible marker purely as a hover target (the
  // visible dot alone was too small to reliably hover on a responsively
  // scaled SVG); a custom tooltip (see chartTooltipShow) shows the
  // 2-decimal value on hover, since native SVG <title> proved unreliable.
  const pointsAndLabels = monthlyData.map(function(m, i) {
    const x = xFor(i), y = yFor(m.medianDays);
    const tipText = escHtml(m.period) + ': ' + m.medianDays.toFixed(2) + ' days';
    return '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="2.5" fill="#F59E0B"></circle>' +
      '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="9" fill="transparent" pointer-events="all" style="cursor:default" onmouseenter="chartTooltipShow(event,\'' + tipText + '\')" onmousemove="chartTooltipShow(event,\'' + tipText + '\')" onmouseleave="chartTooltipHide()"></circle>';
  }).join('');
  // Rotated at a slight -30° slant — 20 months in this window need it even
  // more than the 13-month Submitted/Solved chart above.
  const xLabels = monthlyData.map(function(m, i) {
    const x = xFor(i);
    const parts = m.period.split('-');
    const label = new Date(Number(parts[0]), Number(parts[1]) - 1, 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    const labelY = padT + plotH + 14;
    return '<text x="' + x.toFixed(1) + '" y="' + labelY + '" font-size="9" fill="var(--text-secondary)" text-anchor="end" transform="rotate(-30 ' + x.toFixed(1) + ' ' + labelY + ')">' + escHtml(label) + '</text>';
  }).join('');
  const zeroY = yFor(0).toFixed(1);
  const yAxisTitle = '<text x="14" y="' + (padT + plotH / 2) + '" font-size="9" fill="var(--text-secondary)" text-anchor="middle" transform="rotate(-90 14 ' + (padT + plotH / 2) + ')">Median Days</text>';

  return '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:auto;display:block" xmlns="http://www.w3.org/2000/svg">' +
    yAxisTitle +
    '<line x1="' + padL + '" y1="' + zeroY + '" x2="' + (W - padR) + '" y2="' + zeroY + '" stroke="var(--border)" stroke-width="1"></line>' +
    '<polyline points="' + linePoints + '" fill="none" stroke="#F59E0B" stroke-width="2"></polyline>' +
    pointsAndLabels +
    xLabels +
    '</svg>';
}

// Two-series version, for Support Only vs R&D median resolution time.
// Data source is different from the other charts here — this comes from
// two Salesforce report exports (via Google Drive), not the Snowflake/
// Slack-Canvas relay, since the Jira-linkage field isn't synced into
// Snowflake. Same visual pattern as buildTrendsLineChartSvg otherwise:
// no always-visible labels (would collide across 20 months × 2 series),
// hover-only via the shared custom tooltip.
function buildResolutionTimeSplitChartSvg(monthlyData) {
  const W = 700, H = 260;
  const padL = 42, padR = 16, padT = 24, padB = 46;
  const plotW = W - padL - padR, plotH = H - padT - padB;
  const n = monthlyData.length;
  const allVals = monthlyData.flatMap(function(m) { return [m.supportOnlyMedianDays, m.rdMedianDays]; });
  const maxVal = Math.max.apply(null, allVals.concat([1])) * 1.08;
  const xFor = function(i) { return n <= 1 ? padL : padL + (i / (n - 1)) * plotW; };
  const yFor = function(v) { return padT + plotH - (v / maxVal) * plotH; };

  const buildLine = function(key) {
    return monthlyData.map(function(m, i) { return xFor(i).toFixed(1) + ',' + yFor(m[key]).toFixed(1); }).join(' ');
  };
  const buildPoints = function(key, color, label) {
    return monthlyData.map(function(m, i) {
      const x = xFor(i), y = yFor(m[key]);
      const tipText = escHtml(m.period) + ' ' + label + ': ' + m[key].toFixed(2) + ' days';
      return '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="2.5" fill="' + color + '"></circle>' +
        '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="9" fill="transparent" pointer-events="all" style="cursor:default" onmouseenter="chartTooltipShow(event,\'' + tipText + '\')" onmousemove="chartTooltipShow(event,\'' + tipText + '\')" onmouseleave="chartTooltipHide()"></circle>';
    }).join('');
  };
  const xLabels = monthlyData.map(function(m, i) {
    const x = xFor(i);
    const parts = m.period.split('-');
    const label = new Date(Number(parts[0]), Number(parts[1]) - 1, 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    const labelY = padT + plotH + 14;
    return '<text x="' + x.toFixed(1) + '" y="' + labelY + '" font-size="9" fill="var(--text-secondary)" text-anchor="end" transform="rotate(-30 ' + x.toFixed(1) + ' ' + labelY + ')">' + escHtml(label) + '</text>';
  }).join('');
  const zeroY = yFor(0).toFixed(1);
  const yAxisTitle = '<text x="14" y="' + (padT + plotH / 2) + '" font-size="9" fill="var(--text-secondary)" text-anchor="middle" transform="rotate(-90 14 ' + (padT + plotH / 2) + ')">Median Days</text>';

  return '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:auto;display:block" xmlns="http://www.w3.org/2000/svg">' +
    yAxisTitle +
    '<line x1="' + padL + '" y1="' + zeroY + '" x2="' + (W - padR) + '" y2="' + zeroY + '" stroke="var(--border)" stroke-width="1"></line>' +
    '<polyline points="' + buildLine('supportOnlyMedianDays') + '" fill="none" stroke="#6366F1" stroke-width="2"></polyline>' +
    '<polyline points="' + buildLine('rdMedianDays') + '" fill="none" stroke="#DC2626" stroke-width="2"></polyline>' +
    buildPoints('supportOnlyMedianDays', '#6366F1', 'Support Only') +
    buildPoints('rdMedianDays', '#DC2626', 'R&D') +
    xLabels +
    '</svg>';
}

// Stacked bar chart for backlog-by-engineer — one bar per owner, segments
// colored by status, matching the visual pattern of the Salesforce report
// this was built to mirror. Horizontally scrollable rather than squeezed
// to fit, same as that report, since 33 owners at a readable bar width
// don't fit one screen width either way.
const BACKLOG_STATUS_ORDER = ['open', 'pending', 'onHold', 'waitingForInternal', 'meetingScheduled'];
const BACKLOG_STATUS_COLORS = { open: '#67E8C4', pending: '#10B981', onHold: '#1E293B', waitingForInternal: '#F5D485', meetingScheduled: '#3B82F6' };
const BACKLOG_STATUS_LABELS = { open: 'Open', pending: 'Pending', onHold: 'On-Hold', waitingForInternal: 'Waiting for Internal', meetingScheduled: 'Meeting Scheduled' };

// Which owner+status segment is currently drilled into, if any — cleared
// on re-render of a different selection, not persisted across screens.
let backlogDrilldownSelection = null; // {owner, statusKey} | null

function backlogDrilldownClick(owner, statusKey) {
  backlogDrilldownSelection = { owner: owner, statusKey: statusKey };
  renderTrends();
}

function backlogDrilldownClear() {
  backlogDrilldownSelection = null;
  renderTrends();
}

function buildBacklogStackedBarSvg(byOwner) {
  const barW = 26, gap = 10, padL = 40, padR = 10, padT = 16, padB = 90;
  const n = byOwner.length;
  const W = padL + padR + n * (barW + gap);
  const H = 260;
  const plotH = H - padT - padB;
  const maxTotal = Math.max.apply(null, byOwner.map(function(o) { return o.total; }).concat([1]));
  const yFor = function(v) { return plotH - (v / maxTotal) * plotH; };

  const bars = byOwner.map(function(o, i) {
    const x = padL + i * (barW + gap);
    let cumulative = 0;
    const segments = BACKLOG_STATUS_ORDER.map(function(key) {
      const val = o[key];
      if (!val) return '';
      const yTop = padT + yFor(cumulative + val);
      const segH = yFor(cumulative) - yFor(cumulative + val);
      cumulative += val;
      const isSelected = backlogDrilldownSelection && backlogDrilldownSelection.owner === o.owner && backlogDrilldownSelection.statusKey === key;
      const strokeAttrs = isSelected ? ' stroke="var(--primary)" stroke-width="2"' : '';
      const safeOwner = o.owner.replace(/'/g, "\\'");
      return '<rect x="' + x + '" y="' + yTop.toFixed(1) + '" width="' + barW + '" height="' + Math.max(segH, 0.5).toFixed(1) + '" fill="' + BACKLOG_STATUS_COLORS[key] + '"' + strokeAttrs + ' style="cursor:pointer" onclick="backlogDrilldownClick(\'' + safeOwner + '\',\'' + key + '\')"><title>' + escHtml(o.owner) + ' — ' + BACKLOG_STATUS_LABELS[key] + ': ' + val + ' (click to see cases)</title></rect>';
    }).join('');
    const totalLabel = '<text x="' + (x + barW / 2) + '" y="' + (padT + yFor(o.total) - 4) + '" font-size="9" fill="var(--text-secondary)" text-anchor="middle">' + o.total + '</text>';
    // Owner name rotated -45deg to fit 33 names without overlapping
    const nameLabel = '<text x="' + (x + barW / 2) + '" y="' + (padT + plotH + 12) + '" font-size="9" fill="var(--text-secondary)" text-anchor="end" transform="rotate(-45 ' + (x + barW / 2) + ' ' + (padT + plotH + 12) + ')">' + escHtml(o.owner) + '</text>';
    return segments + totalLabel + nameLabel;
  }).join('');

  return '<div style="overflow-x:auto"><svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" style="display:block" xmlns="http://www.w3.org/2000/svg">' +
    '<line x1="' + padL + '" y1="' + (padT + plotH) + '" x2="' + (W - padR) + '" y2="' + (padT + plotH) + '" stroke="var(--border)" stroke-width="1"></line>' +
    bars +
    '</svg></div>';
}
function renderTrends() {
  const el = document.getElementById('screen-trends-content');
  if (!el) return;
  const sfLinksHtml = '<div class="cases-sf-links">' +
    '<a href="https://snyksec.lightning.force.com/lightning/r/Dashboard/01ZPU000004pbPp2AI/view?queryScope=userFolders" target="_blank" class="cases-sf-btn">📊 Case Trends &amp; Data</a>' +
    '<a href="https://snyksec.lightning.force.com/lightning/o/Case/list?filterName=All_Unassigned_Cases" target="_blank" class="cases-sf-btn">📋 All Unassigned Cases</a>' +
    '</div>';

  // Submitted vs Solved + MTTR — relayed from Snowflake via Slack Canvas,
  // not live. Rendered as a hand-rolled SVG line chart (see
  // buildTrendsLineChartSvg) since Blink has no charting library.
  let snowflakeSectionHtml = '';
  if (!localStorage.getItem('uyt_slack_token')) {
    snowflakeSectionHtml = '';
  } else if (trendsDataState.loading && !trendsDataState.monthly) {
    snowflakeSectionHtml = '<div class="cal-connect-prompt" style="margin-bottom:20px"><div class="cal-connect-icon">⏳</div><h3>Loading trends…</h3></div>';
  } else if (trendsDataState.error) {
    snowflakeSectionHtml = '<div class="cal-connect-prompt" style="margin-bottom:20px"><div class="cal-connect-icon">⚠️</div><h3>Error loading trends</h3><p>' + escHtml(trendsDataState.error) + '</p><button class="connect-btn" onclick="fetchTrendsData()">Try again</button></div>';
  } else if (trendsDataState.monthly && trendsDataState.monthly.length) {
    const chartSvg = buildTrendsLineChartSvg(trendsDataState.monthly);
    const legendHtml = '<div style="display:flex;gap:16px;margin-bottom:8px;font-size:11px;color:var(--text-secondary)">' +
      '<span><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#6366F1;margin-right:4px;vertical-align:middle"></span>Submitted</span>' +
      '<span><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#10B981;margin-right:4px;vertical-align:middle"></span>Solved</span>' +
    '</div>';
    // Median MTTR callout removed — the separate Median Resolution Time
    // chart now covers this same metric in a richer, trend-over-time form,
    // making a single flat number here redundant.
    snowflakeSectionHtml = '<div class="dash-card" style="margin-bottom:20px;flex:1 1 380px;min-width:0">' +
      '<div class="dash-card-header"><div><div class="dash-card-title">Submitted vs Solved</div><div class="dash-card-sub" style="margin-top:2px">Since January 2025</div></div></div>' +
      legendHtml +
      '<div style="margin-top:6px">' + chartSvg + '</div>' +
      '<div style="margin-top:12px;text-align:right">' +
        '<button class="connect-btn" onclick="fetchTrendsData()" style="padding:4px 10px;font-size:11px">↺ Reload</button>' +
      '</div>' +
    '</div>';
  } else if (!trendsDataState.loading) {
    fetchTrendsData();
  }

  // Backlog by engineer — stacked bar, one bar per current case owner,
  // colored by status. Mirrors the Salesforce report this was built from.
  let backlogHtml = '';
  if (trendsDataState.backlogByOwner && trendsDataState.backlogByOwner.length) {
    const sorted = trendsDataState.backlogByOwner.slice().sort(function(a, b) { return a.owner.localeCompare(b.owner); });
    const backlogLegend = '<div style="display:flex;gap:14px;margin-bottom:8px;font-size:11px;color:var(--text-secondary);flex-wrap:wrap">' +
      BACKLOG_STATUS_ORDER.map(function(key) {
        return '<span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:' + BACKLOG_STATUS_COLORS[key] + ';margin-right:4px;vertical-align:middle"></span>' + BACKLOG_STATUS_LABELS[key] + '</span>';
      }).join('') +
    '</div>';
    const totalBacklog = sorted.reduce(function(sum, o) { return sum + o.total; }, 0);

    // Drill-down panel — reuses case-level detail already loaded from the
    // Support Cases canvas (which holds every owner's individual cases,
    // not just the logged-in person's), rather than pulling fresh data.
    // Only works for owners already populated there — says so explicitly
    // rather than silently showing nothing for the rest.
    let drilldownHtml = '';
    if (backlogDrilldownSelection) {
      const sel = backlogDrilldownSelection;
      const statusLabel = BACKLOG_STATUS_LABELS[sel.statusKey];
      const hasOwnerData = (supportCasesState.cases || []).some(function(c) { return c.owner === sel.owner; });
      if (!supportCasesState.cases) {
        drilldownHtml = '<div style="margin-top:14px;padding:12px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);font-size:12px;color:var(--text-secondary)">Loading case detail…</div>';
        if (localStorage.getItem('uyt_slack_token') && !supportCasesState.loading) fetchSupportCases();
      } else if (!hasOwnerData) {
        drilldownHtml = '<div style="margin-top:14px;padding:12px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);font-size:12px;color:var(--text-secondary)">' +
          escHtml(sel.owner) + '\'s individual cases haven\'t been loaded into the Support Cases canvas yet — this chart shows the aggregate count (' + (sorted.find(function(o){return o.owner===sel.owner;})[sel.statusKey] || 0) + '), but drill-down needs their section populated there first.' +
          ' <button class="connect-btn" onclick="backlogDrilldownClear()" style="padding:3px 10px;font-size:11px;margin-left:6px">Close</button>' +
        '</div>';
      } else {
        const matches = supportCasesState.cases.filter(function(c) { return c.owner === sel.owner && c.status === statusLabel; });
        const rowsHtml = matches.map(function(c) {
          const safeUrl = c.caseUrl && /^https:\/\//.test(c.caseUrl) ? c.caseUrl : null;
          const tag = safeUrl ? 'a' : 'div';
          const hrefAttr = safeUrl ? ' href="' + escHtml(safeUrl) + '" target="_blank" rel="noopener"' : '';
          return '<' + tag + ' class="cases-issue"' + hrefAttr + '>' +
            '<span class="cases-issue-key">' + escHtml(c.caseId) + '</span>' +
            '<span class="cases-issue-summary">' + escHtml(c.subject || '(no subject)') + '</span>' +
            '<span class="cases-issue-status">' + escHtml(c.lastModified || '') + '</span>' +
          '</' + tag + '>';
        }).join('') || '<div style="padding:12px;text-align:center;color:var(--text-secondary);font-size:12px">No matching cases found in the loaded canvas data.</div>';
        drilldownHtml = '<div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--border)">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
            '<div style="font-size:13px;font-weight:600">' + escHtml(sel.owner) + ' — ' + escHtml(statusLabel) + ' (' + matches.length + ')</div>' +
            '<button class="connect-btn" onclick="backlogDrilldownClear()" style="padding:3px 10px;font-size:11px">Close</button>' +
          '</div>' +
          '<div class="cases-issue-list">' + rowsHtml + '</div>' +
        '</div>';
      }
    }

    backlogHtml = '<div class="dash-card" style="margin-bottom:20px">' +
      '<div class="dash-card-header"><div class="dash-card-title">Case Backlog by Engineer</div></div>' +
      backlogLegend +
      buildBacklogStackedBarSvg(sorted) +
      '<div style="margin-top:12px;font-size:11px;color:var(--text-secondary)">' +
        totalBacklog + ' open cases across ' + sorted.length + ' engineers · Not live — refreshed occasionally on request. Click a bar segment to see its cases.' +
      '</div>' +
      drilldownHtml +
    '</div>';
  }

  // Support Only vs R&D split — a distinct data source from everything
  // else here (two Salesforce report exports via Google Drive, not
  // Snowflake, since the Jira-linkage field isn't synced there). Sits
  // side by side with Submitted vs Solved, replacing the combined Median
  // Resolution Time chart (removed from the UI per user request — the
  // canvas data and build function for it are left in place, unused,
  // rather than torn out, since removal wasn't explicitly requested).
  let resolutionTimeSplitHtml = '';
  if (trendsDataState.resolutionTimeSplitTrend && trendsDataState.resolutionTimeSplitTrend.length) {
    const splitLegend = '<div style="display:flex;gap:16px;margin-bottom:8px;font-size:11px;color:var(--text-secondary)">' +
      '<span><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#6366F1;margin-right:4px;vertical-align:middle"></span>Support Only</span>' +
      '<span><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#DC2626;margin-right:4px;vertical-align:middle"></span>R&D</span>' +
    '</div>';
    resolutionTimeSplitHtml = '<div class="dash-card" style="margin-bottom:20px;flex:1 1 380px;min-width:0">' +
      '<div class="dash-card-header"><div><div class="dash-card-title">Median Resolution Time — Support Only vs R&D</div><div class="dash-card-sub" style="margin-top:2px">Since January 2025</div></div></div>' +
      splitLegend +
      buildResolutionTimeSplitChartSvg(trendsDataState.resolutionTimeSplitTrend) +
      '<div style="margin-top:12px;font-size:11px;color:var(--text-secondary)">' +
        'Sourced from Salesforce report exports, not Snowflake — split by whether the case has a linked Jira issue. Not live — refreshed occasionally on request.' +
      '</div>' +
    '</div>';
  }

  // Side by side on wide screens, stacked on narrow ones — flex-wrap
  // handles the fallback automatically without a separate mobile path.
  const trendChartsRowHtml = (snowflakeSectionHtml || resolutionTimeSplitHtml)
    ? '<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start">' + snowflakeSectionHtml + resolutionTimeSplitHtml + '</div>'
    : '';

  el.innerHTML = sfLinksHtml + backlogHtml + trendChartsRowHtml;
}

/* ============================================================
   Workday screen — full detail, moved off the dashboard tile
   ============================================================ */

const WORKDAY_QUICK_ACTIONS = ['My Tasks', 'Take time off', 'View time off balance', 'Lookup a coworker'];

function renderWorkday() {
  const el = document.getElementById('screen-workday-content');
  if (!el) return;

  const quickActionsHtml = '<div class="workday-quick-actions">' +
    WORKDAY_QUICK_ACTIONS.map(function(label) {
      return '<a href="' + WORKDAY_HOME_URL + '" target="_blank" class="workday-quick-action-btn">' + escHtml(label) + '</a>';
    }).join('') +
  '</div>';

  if (!slackIsConnected()) {
    el.innerHTML = quickActionsHtml + '<div class="cal-connect-prompt"><div class="cal-connect-icon">🏢</div><h3>Sign in required</h3><p>Sign in to see your Workday notifications here.</p><button class="connect-btn" onclick="triggerSlackOAuth()">Sign in</button></div>';
    return;
  }
  if (slackDigestState.loading && !slackDigestState.workday) {
    el.innerHTML = quickActionsHtml + '<div class="cal-connect-prompt"><div class="cal-connect-icon">⏳</div><h3>Loading Workday notifications…</h3></div>';
    return;
  }
  if (!slackDigestState.workday || slackDigestState.workday.length === 0) {
    el.innerHTML = quickActionsHtml + '<div class="cal-connect-prompt"><div class="cal-connect-icon">🏢</div><h3>No recent Workday notifications</h3><p>Nothing from the last 30 days.</p></div>';
    return;
  }

  const cats = categorizeWorkdayItems(slackDigestState.workday);
  const summaryHtml = '<div class="workday-summary-row">' +
    '<div class="sf-tier-row" title="Estimated from message wording — not a real Workday task-status check">' +
      '<span class="sf-tier-label" style="background:#FEE2E2;color:#991B1B;font-size:11px">📝 Pending</span>' +
      '<span class="sf-tier-stat">' + cats.pending.length + '</span>' +
    '</div>' +
    '<div class="sf-tier-row">' +
      '<span class="sf-tier-label" style="background:#D1FAE5;color:#065F46;font-size:11px">✔️ Approved</span>' +
      '<span class="sf-tier-stat">' + cats.confirmations.length + '</span>' +
    '</div>' +
    '<div class="sf-tier-row">' +
      '<span class="sf-tier-label" style="background:#DBEAFE;color:#1E40AF;font-size:11px">✨ Updates</span>' +
      '<span class="sf-tier-stat">' + cats.updates.length + '</span>' +
    '</div>' +
    '<div class="sf-tier-row">' +
      '<span class="sf-tier-label" style="background:var(--surface2);color:var(--text-secondary);font-size:11px">ℹ️ Other</span>' +
      '<span class="sf-tier-stat">' + cats.other.length + '</span>' +
    '</div>' +
  '</div>';

  function renderGroup(title, items) {
    if (!items.length) return '';
    const rows = items.map(function(w) {
      const parsed = parseWorkdaySlackText(w.text);
      const hasDetail = parsed.links.length > 0;
      const caretHtml = hasDetail ? '<span class="workday-item-caret">▸</span>' : '';
      const rowOnclick = hasDetail ? 'onclick="toggleWorkdayItem(this)" style="cursor:pointer"' : '';
      const summaryHtml = '<div class="workday-item-row" ' + rowOnclick + '>' +
        '<span class="workday-item-time">' + escHtml(w.time) + '</span>' +
        '<span class="workday-item-text">' + renderSlackText(parsed.summary) + '</span>' +
        caretHtml +
      '</div>';
      const detailHtml = hasDetail ? '<div class="workday-item-detail" style="display:none">' +
        parsed.links.map(function(l) {
          const safeUrl = isSafeWorkdayUrl(l.url) ? l.url.replace(/'/g, '%27') : null;
          return safeUrl
            ? '<a href="' + safeUrl + '" target="_blank" class="workday-item-detail-link">' + escHtml(l.text) + '</a>'
            : '<span>' + escHtml(l.text) + '</span>';
        }).join('') +
      '</div>' : '';
      return summaryHtml + detailHtml;
    }).join('');
    return '<div class="workday-group">' +
      '<div class="workday-group-title" onclick="toggleWorkdayGroup(this)" style="cursor:pointer">' +
        '<span class="workday-group-caret">▸</span> ' + title + ' <span class="workday-group-count">(' + items.length + ')</span>' +
      '</div>' +
      '<div class="workday-group-items" style="display:none">' + rows + '</div>' +
    '</div>';
  }

  const groupsHtml = renderGroup('📝 Pending', cats.pending) + renderGroup('✔️ Approved', cats.confirmations) + renderGroup('✨ Updates', cats.updates) + renderGroup('ℹ️ Other', cats.other);

  el.innerHTML = quickActionsHtml +
    '<div class="mail-header"><div class="mail-meta">' + slackDigestState.workday.length + ' notification' + (slackDigestState.workday.length === 1 ? '' : 's') + ' · last 30 days</div></div>' +
    summaryHtml + groupsHtml;
}

/* ============================================================
   Support Cases (Snowflake data relayed via a Slack Canvas)
   ============================================================ */
// NOT live — this only reflects whatever was in the canvas the last time
// someone (or the Refresh button) asked Claude Tag to re-query Snowflake
// and update it. This exists because a genuinely live connection would
// require Snowflake/Salesforce admin approval that isn't available; see
// context.md for the full history of what else was tried and why this is
// where things landed.
//
// PARSING CAVEAT: the canvas-to-HTML conversion in parseCasesCanvasHtml()
// below has not been empirically verified against Slack's real output as of
// this writing — files:read is a newly-added scope, so nobody has
// re-authenticated yet to actually test it. If cases don't show up
// correctly after that, inspect the raw HTML (supportCasesState.rawHtml is
// kept around for exactly this) and adjust the parsing to match.

const CASES_CANVAS_ID = 'F0BSKGT6K61';
const CASES_REFRESH_CHANNEL = 'C0BFMN42UJ0';

const supportCasesState = {
  loading: false,
  refreshRequested: false,
  cases: null,      // all parsed rows, unfiltered
  rawHtml: null,     // kept for debugging the parser against real output
  error: null,
  asOf: null,
  search: '',
  escalatedOnly: false,
  expanded: {},     // status -> bool; default collapsed, same as Jira/Mail
};

function supportCasesToggleEscalatedOnly() {
  supportCasesState.escalatedOnly = !supportCasesState.escalatedOnly;
  renderSupportCases();
}

function supportCasesToggle(status, expand) {
  supportCasesState.expanded[status] = expand;
  renderSupportCases();
}

// Walks the canvas's downloaded HTML structurally (H2 = owner name, the
// table immediately under it = that owner's cases) rather than assuming
// exact nesting, since the real output hasn't been verified yet.
function parseCasesCanvasHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const cases = [];
  let currentOwner = null;
  function walk(nodes) {
    nodes.forEach(function(node) {
      const tag = (node.tagName || '').toUpperCase();
      if (tag === 'H2') {
        currentOwner = node.textContent.trim();
      } else if (tag === 'TABLE') {
        const rows = Array.from(node.querySelectorAll('tr'));
        // Skip the header row (first <tr>, whether it uses <th> or <td>)
        rows.slice(1).forEach(function(tr) {
          const tds = Array.from(tr.children);
          const cells = tds.map(function(c) { return c.textContent.trim(); });
          if (cells.length >= 4) {
            // Case ID cell may contain a link to the Salesforce record — not
            // present on older canvas rows populated before this was added,
            // so this is optional and falls back to plain text cleanly.
            // Slack's Canvas HTML renderer uses a custom <lnk href="..."> tag
            // here, not a standard <a> tag — confirmed against real output.
            const link = tds[0] ? tds[0].querySelector('lnk') : null;
            // 5th "Escalated" column is optional too, for the same reason —
            // older rows populated before this was added just won't have
            // it, and cells[4] will be undefined, correctly falling back to
            // "not escalated" rather than erroring.
            cases.push({
              owner: currentOwner,
              caseId: cells[0],
              caseUrl: link ? link.getAttribute('href') : null,
              status: cells[1],
              subject: cells[2],
              lastModified: cells[3],
              escalated: (cells[4] || '').trim().toLowerCase() === 'yes',
            });
          }
        });
      }
      if (node.children && node.children.length) walk(Array.from(node.children));
    });
  }
  if (doc.body) walk(Array.from(doc.body.children));
  return cases;
}

async function fetchSupportCases() {
  const token = localStorage.getItem('uyt_slack_token');
  if (!token) return;
  supportCasesState.loading = true;
  supportCasesState.error = null;
  renderSupportCases();
  try {
    const res = await fetch('https://uyt-slack-digest.kar-marsten.workers.dev/slack/read-cases-canvas?t=' + encodeURIComponent(token));
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    supportCasesState.rawHtml = data.html;
    supportCasesState.cases = parseCasesCanvasHtml(data.html || '');
    supportCasesState.asOf = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  } catch (e) {
    supportCasesState.error = e.message;
  } finally {
    supportCasesState.loading = false;
    renderSupportCases();
    renderDashboard();
  }
}

// Doesn't wait for or return the refreshed data — it just asks Claude Tag to
// go do the work in Slack, which happens asynchronously on its own time.
async function refreshSupportCasesCanvas() {
  const token = localStorage.getItem('uyt_slack_token');
  if (!token) return;
  supportCasesState.refreshRequested = true;
  renderSupportCases();
  try {
    // Scoped to the logged-in person only — asking for all ~1,000 rows
    // across every owner every time was slow to process and unnecessary;
    // each person just refreshes their own section when they need it.
    const ownerName = (calState.userProfile?.name || state.prefs.userName || '').trim();
    const res = await fetch('https://uyt-slack-digest.kar-marsten.workers.dev/slack/refresh-cases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slackToken: token, ownerName: ownerName }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
  } catch (e) {
    supportCasesState.error = 'Refresh request failed: ' + e.message;
    renderSupportCases();
  }
}

function renderSupportCases() {
  const el = document.getElementById('screen-supportcases-content');
  if (!el) return;

  if (!localStorage.getItem('uyt_slack_token')) {
    el.innerHTML = '<div class="cal-connect-prompt"><div class="cal-connect-icon">🗂️</div><h3>Connect Slack first</h3><p>Support case data is relayed through a Slack Canvas — connect Slack to read it.</p></div>';
    return;
  }
  if (supportCasesState.loading && !supportCasesState.cases) {
    el.innerHTML = '<div class="cal-connect-prompt"><div class="cal-connect-icon">⏳</div><h3>Loading support cases…</h3></div>';
    return;
  }
  if (supportCasesState.error) {
    el.innerHTML = '<div class="cal-connect-prompt" style="margin-top:32px"><div class="cal-connect-icon">⚠️</div><h3>Error loading cases</h3><p>' + escHtml(supportCasesState.error) + '</p><button class="connect-btn" onclick="fetchSupportCases()">Try again</button></div>';
    return;
  }
  if (!supportCasesState.cases) {
    el.innerHTML = '<div class="cal-connect-prompt"><div class="cal-connect-icon">🗂️</div><h3>Ready to load</h3><button class="connect-btn" onclick="fetchSupportCases()">Load cases</button></div>';
    return;
  }

  const myName = (calState.userProfile?.name || state.prefs.userName || '').trim();
  const mine = supportCasesState.cases.filter(function(c) {
    return myName && c.owner && c.owner.toLowerCase().includes(myName.toLowerCase());
  });
  const q = supportCasesState.search.trim().toLowerCase();
  let filtered = q ? mine.filter(function(c) {
    return c.subject.toLowerCase().includes(q) || c.caseId.toLowerCase().includes(q);
  }) : mine;
  if (supportCasesState.escalatedOnly) {
    filtered = filtered.filter(function(c) { return c.escalated; });
  }

  const byStatus = {};
  filtered.forEach(function(c) {
    const s = c.status || 'Unknown';
    if (!byStatus[s]) byStatus[s] = [];
    byStatus[s].push(c);
  });
  const STATUS_ORDER = ['Open', 'New', 'Pending', 'Waiting for Internal', 'On-Hold', 'Scheduled', 'Meeting Scheduled', 'Submitted'];
  const statusEntries = Object.entries(byStatus).sort(function(a, b) {
    const ai = STATUS_ORDER.indexOf(a[0]), bi = STATUS_ORDER.indexOf(b[0]);
    if (ai === -1 && bi === -1) return b[1].length - a[1].length;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  const searchHtml = '<div class="mail-search-bar">' +
    '<input class="mail-search-input" placeholder="🔍 Subject or case number…" value="' + escHtml(supportCasesState.search) + '" oninput="supportCasesState.search=this.value;renderSupportCases()">' +
    '</div>' +
    '<div class="drive-filters" style="margin-bottom:12px">' +
      '<button class="drive-filter ' + (supportCasesState.escalatedOnly ? 'active' : '') + '" onclick="supportCasesToggleEscalatedOnly()">🔥 Escalated only</button>' +
    '</div>';

  const groupsHtml = statusEntries.map(function(entry) {
    const status = entry[0], list = entry[1];
    // "Open" defaults to expanded (the most actionable status); every
    // other status defaults to collapsed. An explicit user toggle always
    // wins over the default, regardless of status.
    const defaultExpanded = status === 'Open';
    const isExpanded = supportCasesState.expanded[status] !== undefined ? supportCasesState.expanded[status] : defaultExpanded;
    const safeStatus = status.replace(/'/g, "\\'");
    const toggle = isExpanded
      ? '<button class="mail-label-toggle" onclick="supportCasesToggle(\'' + safeStatus + '\',false)">▾</button>'
      : '<button class="mail-label-toggle" onclick="supportCasesToggle(\'' + safeStatus + '\',true)">▸</button>';
    const rows = isExpanded ? list.map(function(c) {
      // Older canvas rows populated before the Salesforce link was added
      // won't have caseUrl — falls back to a plain, non-clickable div.
      const safeUrl = c.caseUrl && /^https:\/\//.test(c.caseUrl) ? c.caseUrl : null;
      const tag = safeUrl ? 'a' : 'div';
      const hrefAttr = safeUrl ? ' href="' + escHtml(safeUrl) + '" target="_blank" rel="noopener"' : '';
      const escalatedBadge = c.escalated ? '<span class="cases-issue-reason" style="background:#FEE2E2;color:#991B1B" title="Active escalation">🔥 Escalated</span>' : '';
      return '<' + tag + ' class="cases-issue"' + hrefAttr + '>' +
        '<span class="cases-issue-key">' + escHtml(c.caseId) + '</span>' +
        '<span class="cases-issue-summary">' + escHtml(c.subject || '(no subject)') + escalatedBadge + '</span>' +
        '<span class="cases-issue-status">' + escHtml(c.lastModified || '') + '</span>' +
        '</' + tag + '>';
    }).join('') : '';
    return '<div class="mail-label-group">' +
      '<div class="mail-label-header">' + toggle + '<span class="mail-label-name">' + escHtml(status) + '</span><span class="mail-label-badge" style="background:var(--primary)">' + list.length + '</span></div>' +
      (isExpanded ? '<div class="cases-issue-list">' + rows + '</div>' : '') +
      '</div>';
  }).join('') || '<div style="padding:24px;text-align:center;color:var(--text-secondary)">No open cases match' + (myName ? ' for "' + escHtml(myName) + '"' : '') + '</div>';

  el.innerHTML =
    '<div class="mail-header"><div class="mail-meta">' +
      (supportCasesState.asOf ? 'Canvas last read ' + escHtml(supportCasesState.asOf) : '') +
      ' · ' + filtered.length + ' open' +
    '</div>' +
    // "@Claude Refresh" button removed (not just hidden) — it posts a
    // tagged Slack message that nothing currently processes, since this
    // workspace runs the legacy "Claude in Slack" bot, not Claude Tag. The
    // underlying refreshSupportCasesCanvas() function and its Worker route
    // (/slack/refresh-cases) are left completely intact — re-add this
    // button (and it should work exactly as designed, no other changes
    // needed) once Claude Tag is actually enabled for the workspace. The
    // message it posts already includes the person's name via ownerName,
    // so once Claude Tag can also see the blink-refresh skill in the org's
    // real skill catalog (see /mnt/skills/user/blink-refresh/SKILL.md),
    // it should be able to follow it automatically from that same message.
    '<div style="display:flex;gap:8px">' +
      '<button class="connect-btn" onclick="fetchSupportCases()" style="padding:8px 16px;font-size:13px">↺ Reload canvas</button>' +
    '</div></div>' +
    searchHtml + groupsHtml;
}



// Classifies a single Jira issue's "reason for showing up" — shared by both
// the filter logic (casesApplySearch) and the badge rendering (renderCases),
// so a change to one can't silently drift out of sync with the other.
// Priority mirrors the JQL match clause's own OR order, most specific first:
// case-linked (+ escalated) > reported by you > watched by you > assigned
// (assigned is the default/majority case and gets no special classification).
function classifyJiraIssue(issue, myCaseNumbers, myEscalatedCaseNumbers, myEmail) {
  const linkedCaseId = issue.fields.customfield_12416;
  const isCaseLinked = !!(linkedCaseId && myCaseNumbers.includes(linkedCaseId));
  const isEscalated = isCaseLinked && myEscalatedCaseNumbers.includes(linkedCaseId);
  const isReporter = !isCaseLinked && !!myEmail && !!issue.fields.reporter && (issue.fields.reporter.emailAddress || '').toLowerCase() === myEmail;
  const isWatching = !isCaseLinked && !isReporter && !!(issue.fields.watches && issue.fields.watches.isWatching);
  return { linkedCaseId, isCaseLinked, isEscalated, isReporter, isWatching };
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
  if (jiraState.statusFilters.size > 0) {
    filtered = filtered.filter(function(i) {
      return jiraState.statusFilters.has(i.fields.status.name);
    });
  }
  // Reason-based filters (escalated/reported/watching) all use the same
  // classifyJiraIssue() helper the badges use, so "filter by Watching" is
  // guaranteed to show exactly the issues actually showing a Watching badge.
  if (jiraState.escalatedOnly || jiraState.reportedOnly || jiraState.watchingOnly) {
    const myName = (calState.userProfile?.name || state.prefs.userName || '').trim();
    const myEmail = (calState.userProfile?.email || '').toLowerCase();
    const myCases = (supportCasesState.cases || [])
      .filter(function(c) { return myName && c.owner && c.owner.toLowerCase().includes(myName.toLowerCase()); });
    const myCaseNumbers = myCases.map(function(c) { return c.caseId; }).filter(Boolean);
    const myEscalatedCaseNumbers = myCases.filter(function(c) { return c.escalated; }).map(function(c) { return c.caseId; });
    filtered = filtered.filter(function(i) {
      const c = classifyJiraIssue(i, myCaseNumbers, myEscalatedCaseNumbers, myEmail);
      return (jiraState.escalatedOnly && c.isEscalated) ||
             (jiraState.reportedOnly && c.isReporter) ||
             (jiraState.watchingOnly && c.isWatching);
    });
  }
  return filtered;
}

function renderCases() {
  const el = document.getElementById('screen-cases-content');
  if (!el) return;
  const token = localStorage.getItem('uyt_jira_token');
  if (!token) {
    el.innerHTML = '<div class="cal-connect-prompt"><div class="cal-connect-icon">🎫</div><h3>Connect Jira</h3><p>Sign in with Atlassian to see your open cases.</p><button class="connect-btn" onclick="triggerJiraOAuth()">Sign in with Atlassian</button></div>';
    return;
  }
  if (jiraState.loading) {
    el.innerHTML = '<div class="cal-connect-prompt"><div class="cal-connect-icon">⏳</div><h3>Loading cases…</h3></div>';
    return;
  }
  if (jiraState.error) {
    el.innerHTML = '<div class="cal-connect-prompt"><div class="cal-connect-icon">⚠️</div><h3>Error loading cases</h3><p>' + escHtml(jiraState.error) + '</p><button class="connect-btn" onclick="fetchJiraIssues()">Try again</button></div>';
    return;
  }
  if (!jiraState.issues) {
    el.innerHTML = '<div class="cal-connect-prompt"><div class="cal-connect-icon">⏳</div><h3>Loading cases…</h3></div>';
    fetchJiraIssues();
    return;
  }

  const issues = casesApplySearch(jiraState.issues);

  // Same case-number list used when fetching, so badges reflect exactly
  // why each issue matched (case-linked vs. watching vs. directly assigned
  // — assigned is the default/majority case, so it gets no badge).
  const myName = (calState.userProfile?.name || state.prefs.userName || '').trim();
  const myCases = (supportCasesState.cases || [])
    .filter(function(c) { return myName && c.owner && c.owner.toLowerCase().includes(myName.toLowerCase()); });
  const myCaseNumbers = myCases.map(function(c) { return c.caseId; }).filter(Boolean);
  const myEscalatedCaseNumbers = myCases.filter(function(c) { return c.escalated; }).map(function(c) { return c.caseId; });
  const myEmail = (calState.userProfile?.email || '').toLowerCase();

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

  // Toggle-pill filters — status options are whatever's actually in the
  // full (pre-filter) issue list, so the available buttons always reflect
  // real, current statuses rather than a hardcoded guess.
  const allStatuses = Array.from(new Set((jiraState.issues || []).map(function(i) { return i.fields.status.name; }))).sort();
  const statusFilterHtml = allStatuses.length ? '<div class="drive-filters" style="margin-bottom:12px">' +
    '<button class="drive-filter ' + (jiraState.statusFilters.size === 0 ? 'active' : '') + '" onclick="jiraState.statusFilters.clear();renderCases()">All statuses</button>' +
    allStatuses.map(function(s) {
      const safeS = s.replace(/'/g, "\\'");
      return '<button class="drive-filter ' + (jiraState.statusFilters.has(s) ? 'active' : '') + '" onclick="casesToggleStatusFilter(\'' + safeS + '\')">' + escHtml(s) + '</button>';
    }).join('') +
    '<button class="drive-filter ' + (jiraState.escalatedOnly ? 'active' : '') + '" onclick="casesToggleEscalatedOnly()">🔥 Escalated only</button>' +
    '<button class="drive-filter ' + (jiraState.reportedOnly ? 'active' : '') + '" onclick="casesToggleReportedOnly()">✍️ Reported by me</button>' +
    '<button class="drive-filter ' + (jiraState.watchingOnly ? 'active' : '') + '" onclick="casesToggleWatchingOnly()">👁 Watching</button>' +
    '</div>' : '';

  const groupsHtml = Object.entries(byProject).map(function(entry) {
    const key = entry[0], proj = entry[1];
    const isExpanded = jiraState.expanded[key] === true; // default collapsed
    const safeKey = key.replace(/'/g,'');
    const toggle = isExpanded
      ? '<button class="mail-label-toggle" onclick="casesToggle(\'' + safeKey + '\',false)">▾</button>'
      : '<button class="mail-label-toggle" onclick="casesToggle(\'' + safeKey + '\',true)">▸</button>';
    const colHeader = isExpanded
      ? '<div class="cases-col-header"><span>Key</span><span>Summary</span><span>Status</span></div>'
      : '';
    const rows = isExpanded ? proj.issues.map(function(issue) {
      const c = classifyJiraIssue(issue, myCaseNumbers, myEscalatedCaseNumbers, myEmail);
      const reasonBadge =
        (c.isEscalated ? '<span class="cases-issue-reason" style="background:#FEE2E2;color:#991B1B" title="Case ' + escHtml(c.linkedCaseId) + ' has an active escalation">🔥 Escalated</span>' : '') +
        (c.isCaseLinked
          ? '<span class="cases-issue-reason" style="background:#DBEAFE;color:#1E40AF" title="Linked to your open case ' + escHtml(c.linkedCaseId) + '">🔗 Case</span>'
          : c.isReporter
            ? '<span class="cases-issue-reason" style="background:#EDE9FE;color:#5B21B6" title="You reported this issue">✍️ Reported</span>'
            : c.isWatching
              ? '<span class="cases-issue-reason" style="background:#F1F5F9;color:#475569" title="You are watching this issue">👁 Watching</span>'
              : '');
      return '<a class="cases-issue" href="https://snyksec.atlassian.net/browse/' + escHtml(issue.key) + '" target="_blank">' +
        '<span class="cases-issue-key">' + escHtml(issue.key) + '</span>' +
        '<span class="cases-issue-summary">' + escHtml(issue.fields.summary) + reasonBadge + '</span>' +
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

  el.innerHTML =
    '<div class="mail-header"><div class="mail-meta">Last updated ' + escHtml(jiraState.asOf || '') + ' · ' + issues.length + ' open</div>' +
    '<button class="connect-btn" onclick="fetchJiraIssues()" style="padding:8px 16px;font-size:13px">↺ Refresh</button></div>' +
    searchHtml + statusFilterHtml + groupsHtml; // NOSONAR
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
          <button class="cal-connect-btn" style="margin-top:10px;background:none;border:1.5px solid var(--border);color:var(--text)" onclick="jiraDisconnect()">Disconnect</button>
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


    <!-- Workday -->
    <div class="settings-section">
      <div class="settings-section-title">Workday</div>
      <div class="cal-connect-box">
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:10px">Your Workday notifications actually flow through Slack, so there's no separate token stored here either — this just opens Workday so your browser has an active session for the "Open in Workday" link on the dashboard.</p>
        <a href="#" onclick="triggerWorkdaySSO();return false;" class="cal-connect-btn" style="display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:white">
          Sign in to Workday
        </a>
        ${localStorage.getItem('uyt_workday_last_signin') ? '<p style="font-size:12px;color:var(--text-secondary);margin-top:10px">Last signed in: ' + escHtml(new Date(parseInt(localStorage.getItem('uyt_workday_last_signin'), 10)).toLocaleString()) + '</p>' : ''}
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
          <input class="cal-client-input" id="slack-ch-name" placeholder="Name (support-leads)" style="flex:1;min-width:120px">
          <input class="cal-client-input" id="slack-ch-id" placeholder="Channel ID (C0885...)" style="flex:1;min-width:120px">
          <button class="cal-connect-btn" onclick="addSlackChannel()">Add</button>
        </div>
      
    
    

    <!-- Gmail Excluded Labels -->
    <div class="settings-section">
      <div class="settings-section-title">Gmail</div>
      <div class="cal-connect-box">
        <p>Exclude a label from your unread count and Mail page by clicking the ✕ on its group header on the Mail page itself. Anything excluded shows here so you can bring it back.</p>
        ${getGmailExcluded().length > 0 ? `
          <div style="display:flex;flex-direction:column;gap:4px;margin-top:10px">
            ${(() => {
              const names = getGmailExcludedNames();
              return getGmailExcluded().map(function(id) {
                const displayName = names[id] || id;
                return "<div class=\"slack-channel-row\"><span class=\"slack-channel-name\" style=\"opacity:0.6\">" + escHtml(displayName) + "</span><button class=\"slack-channel-remove\" onclick='toggleGmailExclude(" + JSON.stringify(id) + ")' title=\"Re-include\" style=\"color:var(--primary)\">↩</button></div>";
              }).join('');
            })()}
          </div>
        ` : '<p style="font-size:12px;color:var(--text-secondary);margin-top:8px">Nothing excluded yet.</p>'}
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
  let _jiraAuthHandled = false;

  function _advanceJiraStep() {
    if (setupSteps[setupStep] === 'jira') setupStep++;
  }

  function _handleJiraMessage(event) {
    if (event.origin !== 'https://klm-snyk.github.io') return;
    if (event.data?.type === 'jira-token') {
      if (_jiraAuthHandled) return;
      _jiraAuthHandled = true;
      clearInterval(poll);
      localStorage.setItem('uyt_jira_token', event.data.token);
      localStorage.setItem('uyt_jira_cloud', event.data.cloud || '');
      if (event.data.refresh) localStorage.setItem('uyt_jira_refresh_token', event.data.refresh);
      window.removeEventListener('message', _handleJiraMessage);
      if (popup && !popup.closed) popup.close();
      _advanceJiraStep();
      if (typeof renderSetupStep === 'function') renderSetupStep();
      if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
      if (typeof renderCases === 'function') renderCases();
    }
  }
  window.addEventListener('message', _handleJiraMessage);
  const poll = setInterval(function() {
    if (popup.closed) {
      clearInterval(poll);
      if (_jiraAuthHandled) return;
      if (localStorage.getItem('uyt_jira_token')) {
        _jiraAuthHandled = true;
        _advanceJiraStep();
        if (typeof renderSetupStep === 'function') renderSetupStep();
        if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
        if (typeof renderCases === 'function') renderCases();
      }
    }
  }, 500);
}

// Blink's actual Workday data comes via the
// Slack bot DM (see categorizeWorkdayItems), not a direct Workday API
// integration, so there's no token to store here either. This popup just
// gives the person's browser an active Workday session so the "Open in
// Workday" link actually works, and gives new users an obvious first step.
const WORKDAY_HOME_URL = 'https://wd103.myworkday.com/snyk/d/pex/home.htmld';

function triggerWorkdaySSO() {
  const width = 700, height = 750;
  const left = Math.round(window.screenX + (window.outerWidth - width) / 2);
  const top = Math.round(window.screenY + (window.outerHeight - height) / 2);
  const popup = window.open(
    'https://wd103.myworkday.com/snyk',
    'workday-sso',
    'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top + ',toolbar=no,menubar=no'
  );
  let _workdayHandled = false;
  const poll = setInterval(function() {
    if (popup.closed) {
      clearInterval(poll);
      if (_workdayHandled) return;
      _workdayHandled = true;
      localStorage.setItem('uyt_workday_last_signin', String(Date.now()));
      if (setupSteps[setupStep] === 'workday') setupStep++;
      if (typeof renderSetupStep === 'function') renderSetupStep();
      if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
      if (typeof renderDashboard === 'function') renderDashboard();
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
  let _slackAuthHandled = false;

  function _advanceSlackStep() {
    // Only auto-advance if the wizard is actually sitting on the Slack step —
    // reconnecting from Settings shouldn't move the wizard.
    if (setupSteps[setupStep] === 'slack') setupStep++;
  }

  // Listen for postMessage from popup
  function _handleSlackMessage(event) {
    if (event.origin !== 'https://klm-snyk.github.io') return;
    if (event.data?.type === 'slack-token' && event.data.token) {
      if (_slackAuthHandled) return;
      _slackAuthHandled = true;
      clearInterval(poll);
      localStorage.setItem('uyt_slack_token', event.data.token);
      if (event.data.refresh) localStorage.setItem('uyt_slack_refresh_token', event.data.refresh);
      window.removeEventListener('message', _handleSlackMessage);
      if (popup && !popup.closed) popup.close();
      _advanceSlackStep();
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
      if (_slackAuthHandled) return;
      if (localStorage.getItem('uyt_slack_token')) {
        _slackAuthHandled = true;
        _advanceSlackStep();
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

// Heuristic only — Workday DMs aren't structured data, so this infers "needs
// action" from the leading emoji Workday tends to use: ✅/✔️ = confirmation
// (already done), ✨ = informational update, anything else = likely needs
// action. Not a real task-status check; will misclassify if Workday's
// phrasing/emoji usage varies from what this was designed around.
// Defense in depth: even though the Worker only ever forwards URLs Slack's own
// API returned, re-validate before rendering anything as a clickable link.
function isSafeWorkdayUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const u = new URL(url);
    return u.protocol === 'https:' && u.hostname.endsWith('myworkday.com');
  } catch { return false; }
}

// Heuristic only — Workday DMs aren't structured data, so this groups messages
// by the leading emoji Workday tends to use: ✨/:sparkles: = informational
// update ("Your time off request has been approved"), ✅/✔️/:heavy_check_mark:/
// :white_check_mark: = confirmation of an action you already took ("You
// approved X's time off request"), anything else (no leading emoji, typically
// a rich card with Approve/Deny buttons) = pending, needs your action.
// Slack's raw message text uses shortcode strings like ":heavy_check_mark:",
// not the literal unicode glyph, even though Slack's own UI renders it as one
// — so both forms need checking. Not a real task-status check; will
// misclassify if Workday's phrasing/emoji usage varies from what this was
// designed around.
function categorizeWorkdayItems(items) {
  const CONFIRM_PREFIXES = ['✅', '✔️', ':heavy_check_mark:', ':white_check_mark:', ':ballot_box_with_check:'];
  const UPDATE_PREFIXES = ['✨', ':sparkles:'];
  // "Pending" means an actual actionable request (an Approve/Deny card),
  // not just "anything without a recognized prefix" — that fallback bucket
  // was catching plain FYI messages (e.g. "Welcome Steven") and mislabeling
  // them as needing action.
  const result = { pending: [], confirmations: [], updates: [], other: [] };
  (items || []).forEach(function(w) {
    const t = (w.text || '').trim();
    // Checked before the emoji-prefix rules below — an actual approval
    // (e.g. "Your time off request has been approved.") was landing in
    // Updates just because Workday prefixes it with ✨, which otherwise
    // reads as a generic status update rather than the approval it is.
    if (/\bhas been approved\b/i.test(t)) result.confirmations.push(w);
    else if (CONFIRM_PREFIXES.some(function(p) { return t.startsWith(p); })) result.confirmations.push(w);
    else if (UPDATE_PREFIXES.some(function(p) { return t.startsWith(p); })) result.updates.push(w);
    else if (/\bapprove\b/i.test(t) && /\bdeny\b/i.test(t)) result.pending.push(w);
    else result.other.push(w);
  });
  return result;
}

// Cache of resolved Slack user IDs -> display names, so <@ID> mentions in
// Workday text can show the real name instead of a generic placeholder.
// Slack's raw message text only ever contains the ID, never the name.
const SLACK_USER_NAME_CACHE_KEY = 'uyt_slack_user_names';

function getSlackUserNameCache() {
  try { return JSON.parse(localStorage.getItem(SLACK_USER_NAME_CACHE_KEY) || '{}'); }
  catch { return {}; }
}

function extractMentionIds(items) {
  const ids = new Set();
  (items || []).forEach(function(w) {
    const matches = (w.text || '').match(/<@[A-Z0-9]+>/g) || [];
    matches.forEach(function(m) { ids.add(m.slice(2, -1)); });
  });
  return Array.from(ids);
}

// Fetches any not-yet-cached names via the Worker (which calls Slack's
// users.info — users:read is already part of the requested scope list, so
// no reconnect needed). Returns true if any new names were resolved, so the
// caller knows whether a re-render is worthwhile.
async function resolveSlackUserNames(items) {
  const cache = getSlackUserNameCache();
  const missing = extractMentionIds(items).filter(function(id) { return !cache[id]; });
  if (!missing.length) return false;
  try {
    const token = localStorage.getItem('uyt_slack_token') || '';
    const res = await fetch('https://uyt-slack-digest.kar-marsten.workers.dev/slack/user-names?ids=' + missing.join(',') + '&t=' + encodeURIComponent(token));
    const data = await res.json();
    if (data.ok && data.names) {
      Object.assign(cache, data.names);
      localStorage.setItem(SLACK_USER_NAME_CACHE_KEY, JSON.stringify(cache));
      return true;
    }
  } catch (e) { console.warn('Could not resolve Slack user names:', e); }
  return false;
}

// Slack's raw message text uses its own "mrkdwn" link syntax — <url|display text>
// (or bare <url> with no display text) — rather than real HTML links. Workday's
// messages often bury the actual date range inside one of these, e.g.
// "...request, <https://.../redirect=abc|Mon, Nov 9 - Tue, Nov 10 (8 Hours)>."
// This pulls those links out into a separate array so the summary line can stay
// short and the dates/details can go in an expandable section instead, rather
// than showing the raw <url|text> syntax inline.
function parseWorkdaySlackText(rawText) {
  const links = [];
  // Slack user mentions (<@U03PYB6ERR6>) only ever carry the raw ID in the
  // API's text field — never the display name — so we resolve real names
  // via resolveSlackUserNames() (cached, called after each digest fetch) and
  // fall back to a generic stand-in only if a name hasn't been resolved yet.
  const nameCache = getSlackUserNameCache();
  let summary = (rawText || '').replace(/<@([A-Z0-9]+)>/g, function(match, id) {
    return nameCache[id] || 'this employee';
  });
  const LINK_RE = /<([^|<>]+)(?:\|([^<>]+))?>/g;
  summary = summary.replace(LINK_RE, function(match, url, text) {
    // Strip trailing/embedded emoji shortcodes (e.g. ":arrow_upper_right:")
    // from the link's display text — Workday often tacks one onto the end.
    const cleanText = (text || url).replace(/\s*:[a-z0-9_+-]+:\s*/gi, ' ').trim();
    links.push({ url: url, text: cleanText });
    return '';
  });
  // Clean up leftover punctuation/whitespace where the link used to sit
  summary = summary
    .replace(/\s*,\s*\./g, '.')
    .replace(/\s+\./g, '.')
    .replace(/\s{2,}/g, ' ')
    .trim();
  // Strip Slack's own auto-generated accessibility description for messages
  // with interactive elements (e.g. "Approve button Deny button, with
  // interactive elements") — this describes the buttons for screen readers,
  // it isn't real message content, and showing it verbatim just reads as noise.
  summary = summary
    .replace(/(?:\b[\w-]+\s+button\b[,\s]*)+with interactive elements\.?/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return { summary: summary, links: links };
}

function toggleWorkdayItem(rowEl) {
  const detail = rowEl.nextElementSibling;
  if (!detail) return;
  const isOpen = detail.style.display !== 'none';
  detail.style.display = isOpen ? 'none' : 'block';
  rowEl.classList.toggle('workday-item-row--expanded', !isOpen);
}

function toggleWorkdayGroup(headerEl) {
  const body = headerEl.nextElementSibling;
  if (!body) return;
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  headerEl.classList.toggle('workday-group-title--expanded', !isOpen);
}

const slackDigestState = {
  loading: false,
  error: null,
  html: localStorage.getItem('uyt_digest_html') || null,
  asOf: localStorage.getItem('uyt_digest_asof') || null,
  counts: JSON.parse(localStorage.getItem('uyt_digest_counts') || '{"people":0,"work":0,"incidents":0}'),
  handover: JSON.parse(localStorage.getItem('uyt_digest_handover') || 'null'),
  workday: JSON.parse(localStorage.getItem('uyt_digest_workday') || 'null'),
};

// Only relevant if Slack's Token Rotation is enabled for this app (in which
// case access tokens expire ~12h); harmless no-op otherwise since there'd be
// no refresh token stored to use.
async function refreshSlackToken() {
  const refreshToken = localStorage.getItem('uyt_slack_refresh_token');
  if (!refreshToken) return false;
  try {
    const res = await fetch('https://uyt-slack-digest.kar-marsten.workers.dev/oauth/refresh?rt=' + encodeURIComponent(refreshToken));
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('uyt_slack_token', data.token);
      if (data.refresh) localStorage.setItem('uyt_slack_refresh_token', data.refresh);
      return true;
    }
  } catch (e) { /* fall through to false */ }
  return false;
}

async function fetchSlackDigest(silent) {
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
  if (!silent) toggleLoadingOverlay(true);

  try {
    const channels = getSlackChannels();
    const buildBody = function() {
      return JSON.stringify({ channels, userName: calState.userProfile?.name || state.prefs.userName || 'the user', userEmail: calState.userProfile?.email || '', slackToken: localStorage.getItem('uyt_slack_token') || '' });
    };
    let res = await fetch(workerUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: buildBody() });
    // Only relevant if Token Rotation is enabled for this Slack app — if so,
    // access tokens expire (~12h) and would otherwise just start silently
    // failing with no way to renew short of a full manual re-auth.
    if (res.status === 401) {
      const refreshed = await refreshSlackToken();
      if (refreshed) {
        res = await fetch(workerUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: buildBody() });
      }
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    const data = await res.json();
    const digestHtml = data.html || '';
    slackDigestState.handover = data.handover || null;
    slackDigestState.workday = data.workday || null;
    localStorage.setItem('uyt_digest_workday', JSON.stringify(slackDigestState.workday));
    if (slackDigestState.workday && slackDigestState.workday.length) {
      resolveSlackUserNames(slackDigestState.workday).then(function(changed) {
        if (changed) {
          renderDashboard();
          if (state.screen === 'workday') renderWorkday();
        }
      });
    }
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
    if (!silent) toggleLoadingOverlay(false);
    renderDashboard();
  }
}
/* ============================================================
   Dashboard
   ============================================================ */

// Snyk's status page (status.snyk.io) is hosted on Atlassian Statuspage,
// which exposes a public, CORS-enabled JSON API built specifically for
// third parties to embed a live status badge — no scraping needed, and no
// auth required, so this works even for a user who hasn't connected
// anything else in Blink yet.
let snykStatusInfo = null;

async function checkSnykStatus() {
  try {
    const res = await fetch('https://status.snyk.io/api/v2/status.json');
    if (!res.ok) { snykStatusInfo = null; return; }
    const data = await res.json();
    snykStatusInfo = data.status || null;
    // The aggregate status above only ever gives a generic label like
    // "Degraded Performance" — the actual incident title ("Degraded
    // performance on Security.snyk.io with 502 responses.", etc.) lives on
    // a separate endpoint listing the real unresolved incidents. Prefer
    // that specific title when one exists; fall back to the generic label
    // (e.g. for scheduled maintenance, which isn't listed as an "incident").
    if (snykStatusInfo && snykStatusInfo.indicator !== 'none') {
      try {
        const incRes = await fetch('https://status.snyk.io/api/v2/incidents/unresolved.json');
        if (incRes.ok) {
          const incData = await incRes.json();
          const firstIncident = (incData.incidents || [])[0];
          if (firstIncident && firstIncident.name) {
            snykStatusInfo.description = firstIncident.name;
          }
        }
      } catch (e) {
        // Keep the generic label if this second call fails — not fatal.
      }
    }
  } catch (e) {
    // Fail silently — a status-check failure shouldn't be treated as an
    // outage, and shouldn't block or clutter the rest of the dashboard.
    snykStatusInfo = null;
  } finally {
    renderDashboard();
  }
}

function renderDashboard() {
  const el = document.getElementById('dash-content');
  const p  = state.prefs;
  const now = new Date();
  // Prefer the person's explicitly-typed name over their Google account
  // name — previously this was reversed, so the "What's your name?"
  // preference had no visible effect for anyone with Google connected
  // (essentially everyone who completes the wizard), since the Google
  // profile name always won regardless of what was typed in Preferences.
  const profileName = p.userName || calState.userProfile?.name;
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
    // This message must match calUpcomingEvents()'s actual scope (today
    // only, as of the fix for events bleeding into tomorrow) — it
    // previously said "next 7 days", which became wrong/misleading the
    // moment the underlying function was narrowed to today-only: an empty
    // result now just means today's meetings are done, not that nothing's
    // coming up for a week.
    eventsCardContent = `
      <div class="dash-card-value" style="font-size:16px;font-weight:500">All clear</div>
      <div class="dash-card-sub">No more events today</div>`;
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
  // Truncate defensively — Statuspage's description field is normally a
  // short canned label ("Degraded Performance" etc.), but nothing stops it
  // from being much longer for some incident types, and without a limit
  // here the banner had no bound on how large it could render.
  const snykDescRaw = (snykStatusInfo && snykStatusInfo.description) || '';
  const snykDesc = snykDescRaw.length > 100 ? snykDescRaw.slice(0, 100).trim() + '…' : snykDescRaw;
  const snykStatusHtml = (snykStatusInfo && snykStatusInfo.indicator !== 'none') ? `
    <a href="https://status.snyk.io/" target="_blank" class="snyk-status-banner">
      <span class="snyk-status-banner-text">⚠️ ${escHtml(snykDesc)} — view status page ${ICONS.arrowRight}</span>
    </a>
  ` : '';
  el.innerHTML = `
    ${snykStatusHtml}
    <div class="dashboard-greeting">
      <div class="time-display" id="live-time">${formatCurrentTime()}</div>
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:space-between;">
        <h3 style="margin:0;">${escHtml(greeting)}</h3>
        <button class="connect-btn" onclick="${calIsConnected() ? 'signOutAll()' : 'startSetup()'}">
          ${calIsConnected() ? 'Sign out' : 'Connect'}
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
            ` : (() => {
              // Uses Gmail's labels.get counts (calState.gmailBreakdown),
              // NOT Mail page data — Mail is now paginated (no date limit,
              // but only 100 messages loaded at a time via "Load more"), so
              // its data is often incomplete. labels.get always reports the
              // true, complete unread count for a label immediately, no
              // pagination needed, which is exactly what a glance-view tile
              // needs. Both are now scoped to "all unread, no date limit,"
              // so they'll agree once Mail is fully paginated through.
              const hasOtherUnread = calState.gmailBreakdown && calState.gmailBreakdown.some(l => l.id !== 'INBOX' && l.unread > 0);
              if (calState.unreadCount === 0 && !hasOtherUnread) {
                return `
              <div class="dash-card-value" style="font-size:22px">0 📭</div>
              <div class="dash-card-sub">${getInboxZeroMessage()}</div>
              <div class="dash-card-action">View mail ${ICONS.arrowRight}</div>
            `;
              }
              return `
              <div class="dash-card-value" style="font-size:28px;font-weight:700">${calState.unreadCount}${calState.unreadCountCapped ? '+' : ''}</div>
              <div class="dash-card-sub">unread in the inbox</div>
              ${hasOtherUnread ? `
                <div style="margin-top:6px;display:flex;flex-direction:column;gap:3px">
                  ${calState.gmailBreakdown.filter(l => l.id !== 'INBOX' && l.unread > 0).slice(0,4).map(l => `<div class="sf-tier-row"><span class="sf-tier-label" style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(l.name)}</span><span class="sf-tier-stat">${l.unread}</span></div>`).join('')}
                </div>
              ` : ''}
              <div class="dash-card-action" style="margin-top:6px">View all ${ICONS.arrowRight}</div>
            `;
            })()}
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
            ` : (slackIsConnected() && slackDigestState.html) ? `
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

          <div class="dash-card" onclick="navigate('workday')" style="cursor:pointer">
            <div class="dash-card-header">
              <div class="dash-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
              </div>
              <div class="dash-card-title">Workday</div>
            </div>
            ${(() => {
              if (slackIsConnected() && slackDigestState.workday && slackDigestState.workday.length > 0) {
                const cats = categorizeWorkdayItems(slackDigestState.workday);
                return `
              <div class="sf-tier-row" style="margin-top:8px" title="Estimated from message wording — not a real Workday task-status check">
                <span class="sf-tier-label" style="background:#FEE2E2;color:#991B1B;font-size:10px">📝 Pending</span>
                <span class="sf-tier-stat">${cats.pending.length}</span>
              </div>
              <div class="sf-tier-row">
                <span class="sf-tier-label" style="background:#D1FAE5;color:#065F46;font-size:10px">✔️ Approved</span>
                <span class="sf-tier-stat">${cats.confirmations.length}</span>
              </div>
              <div class="sf-tier-row">
                <span class="sf-tier-label" style="background:#DBEAFE;color:#1E40AF;font-size:10px">✨ Updates</span>
                <span class="sf-tier-stat">${cats.updates.length}</span>
              </div>
              <div class="dash-card-action" style="margin-top:8px">View Workday ${ICONS.arrowRight}</div>
            `; } else if (slackIsConnected() && slackDigestState.workday && slackDigestState.workday.length === 0) { return `
              <div class="dash-card-sub" style="margin-top:6px;font-size:11px">No recent Workday notifications</div>
              <div class="dash-card-action">View Workday ${ICONS.arrowRight}</div>
            `; } else if (slackDigestState.loading) { return `
              <div class="dash-card-sub" style="margin-top:8px">⏳ Loading Workday notifications…</div>
            `; } else { return `
              <div class="dash-card-value">—</div>
              <div class="dash-card-sub">Tasks &amp; actions</div>
              <div class="dash-card-action">View Workday ${ICONS.arrowRight}</div>
            `; }
            })()}
          </div>

          <div class="dash-card" onclick="navigate('cases')" style="cursor:pointer">
            <div class="dash-card-header">
              <div class="dash-card-icon">${ICONS.cases}</div>
              <div class="dash-card-title">JIRA</div>
            </div>
            ${jiraState.loading ? '<div class="dash-card-sub" style="margin-top:8px">⏳ Loading…</div>' :
              jiraState.issues && jiraState.issues.length > 0 ? (() => {
                const byProj = {};
                jiraState.issues.forEach(i => { const k = i.fields.project.key; byProj[k] = (byProj[k]||0)+1; });
                const projEntries = Object.entries(byProj);
                const shown = projEntries.slice(0, 5);
                const remaining = projEntries.length - shown.length;
                return shown.map(([k,c]) => '<div class="sf-tier-row"><span class="sf-tier-label">' + escHtml(k) + '</span><span class="sf-tier-stat">' + c + ' open</span></div>').join('') +
                  (remaining > 0 ? '<div class="dash-card-sub" style="margin-top:4px">+' + remaining + ' more project' + (remaining === 1 ? '' : 's') + ' — view all</div>' : '') +
                  '<div class="dash-card-action" style="margin-top:6px">View all ' + ICONS.arrowRight + '</div>';
              })() :
              jiraState.issues ? '<div class="dash-card-sub">No open cases ✅</div>' :
              '<div class="dash-card-sub">Your open Jira cases</div><div class="dash-card-action">View cases ' + ICONS.arrowRight + '</div>'}
          </div>

          <div class="dash-card" onclick="navigate('supportcases')" style="cursor:pointer">
            <div class="dash-card-header">
              <div class="dash-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7h-3V6a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H4a1 1 0 00-1 1v11a2 2 0 002 2h14a2 2 0 002-2V8a1 1 0 00-1-1zM9 6a1 1 0 011-1h4a1 1 0 011 1v1H9z"/></svg></div>
              <div class="dash-card-title">Support Cases</div>
            </div>
            ${!localStorage.getItem('uyt_slack_token') ? `
              <div class="dash-card-sub">Connect Slack to see cases</div>
            ` : supportCasesState.loading ? '<div class="dash-card-sub" style="margin-top:8px">⏳ Loading…</div>' :
              (() => {
                const myName = (calState.userProfile?.name || state.prefs.userName || '').trim();
                const mine = (supportCasesState.cases || []).filter(c => myName && c.owner && c.owner.toLowerCase().includes(myName.toLowerCase()));
                if (!supportCasesState.cases) return '<div class="dash-card-sub">Your open support cases</div><div class="dash-card-action">View cases ' + ICONS.arrowRight + '</div>';
                if (mine.length === 0) return '<div class="dash-card-sub">No open cases ✅</div>';
                const byStatus = {};
                mine.forEach(c => { const s = c.status || 'Unknown'; byStatus[s] = (byStatus[s]||0)+1; });
                const statusEntries = Object.entries(byStatus).sort(([a],[b]) => (a === 'Open' ? -1 : b === 'Open' ? 1 : 0));
                return statusEntries.map(([s,c]) => '<div class="sf-tier-row"><span class="sf-tier-label">' + escHtml(s) + '</span><span class="sf-tier-stat">' + c + '</span></div>').join('') +
                  '<div class="dash-card-action" style="margin-top:6px">View all ' + ICONS.arrowRight + '</div>';
              })()}
          </div>

          <div class="dash-card" onclick="navigate('drive')">
            <div class="dash-card-header">
              <div class="dash-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg></div>
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
          <span class="drive-item-icon">${f.type === 'sheet' ? '📊' : f.type === 'slides' ? '📽️' : '📄'}</span>
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
  const typeFilters     = ['sheet', 'doc', 'slides'].filter(f => _driveFilters.has(f));
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
  'workday',
  'preferences',
  'done',
];

let setupStep = 0;
let _jiraSetupPoll = null;
let _googleSetupPoll = null;

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
  // The normal page-load bootstrap only fires once, before any wizard steps
  // have run — at that point no tokens exist yet, so its auto-fetch checks
  // all correctly skip. Finishing the wizard doesn't trigger a fresh page
  // load, so without explicitly kicking these off here, a freshly-connected
  // Slack/Jira would never actually get fetched — the dashboard tiles would
  // sit in their default "nothing fetched yet" state indefinitely, looking
  // like nothing is connected even though the tokens are saved correctly.
  if (localStorage.getItem('uyt_slack_token') && !slackDigestState.html) {
    fetchSlackDigest().then(renderDashboard);
  }
  if (localStorage.getItem('uyt_jira_token') && !jiraState.issues) {
    fetchJiraIssues();
  }
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
      '<h1 class="setup-title">Connect Google</h1>' +
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
    // Poll until Google connects then auto-advance — clear any previous
    // poll first, for the same reason as the Jira step's poll below. Also
    // guarded at fire-time against having already moved off this step by
    // the time the delay elapses, so a leftover poll can't advance a second
    // time and skip whatever step comes after Google.
    if (_googleSetupPoll) { clearInterval(_googleSetupPoll); _googleSetupPoll = null; }
    if (!calIsConnected()) {
      _googleSetupPoll = setInterval(function() {
        if (calIsConnected()) {
          clearInterval(_googleSetupPoll);
          _googleSetupPoll = null;
          setTimeout(function() {
            if (setupSteps[setupStep] === 'google') setupNext();
          }, 800);
        }
      }, 500);
    }
  }

  else if (step === 'slack') {
    const hasToken = !!localStorage.getItem('uyt_slack_token');
    const savedToken = escHtml(localStorage.getItem('uyt_slack_token') || '');
    content.innerHTML = '<div class="setup-icon">💬</div>' +
      '<h1 class="setup-title">Connect Slack</h1>' +
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
      '<h1 class="setup-title">Connect Jira</h1>' +
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
    // Poll for Jira connection — clear any previous poll first, since this
    // branch re-runs every time the wizard re-renders while parked on this
    // step. Without that, multiple overlapping intervals could each detect
    // the same token and each call setupNext() independently, double-
    // incrementing setupStep and silently skipping the next wizard step.
    // Also guarded at fire-time against the wizard having already moved off
    // this step via a different path (triggerJiraOAuth's own popup-close
    // handler) by the time this interval's own delay elapses — otherwise
    // this leftover poll can still advance a second time on top of that,
    // skipping whatever step comes right after Jira.
    if (_jiraSetupPoll) { clearInterval(_jiraSetupPoll); _jiraSetupPoll = null; }
    if (!hasJira) {
      _jiraSetupPoll = setInterval(function() {
        if (localStorage.getItem('uyt_jira_token')) {
          clearInterval(_jiraSetupPoll);
          _jiraSetupPoll = null;
          setTimeout(function() {
            if (setupSteps[setupStep] === 'jira') setupNext();
          }, 800);
        }
      }, 500);
    }
  }

  else if (step === 'workday') {
    const hasSignedIn = !!localStorage.getItem('uyt_workday_last_signin');
    content.innerHTML = '<div class="setup-icon">🏢</div>' +
      '<h1 class="setup-title">Connect Workday</h1>' +
      '<p class="setup-desc">This opens Workday so your browser has an active session for the "Open in Workday" link on the dashboard. No separate token is stored.</p>' +
      '<a href="#" onclick="triggerWorkdaySSO();return false;" class="setup-btn-primary" style="display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:white;margin-top:8px">Sign in to Workday</a>' +
      (hasSignedIn ? '<div class="setup-connected-badge" style="margin-top:12px">✓ Signed in to Workday</div>' : '') +
      '<p style="font-size:12px;color:var(--text-secondary);margin-top:12px">A window will open — sign in via SSO, then close it yourself to come back here (this window won\'t close on its own, since it\'s a real page on their own site, not something Blink can control).</p>' +
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
    // Same priority fix as the dashboard greeting — prefer the saved
    // preference over the Google account name for the pre-filled value.
    const nameVal = escHtml(p.userName || calState.userProfile?.name || '');
    content.innerHTML = '<div class="setup-icon">🎨</div>' +
      '<h1 class="setup-title">Make it yours</h1>' +
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
    const hasWD = !!localStorage.getItem('uyt_workday_last_signin');
    const hasSlack = !!localStorage.getItem('uyt_slack_token');
    const conn = calIsConnected();
    content.innerHTML = '<div class="setup-icon">🎉</div>' +
      '<h1 class="setup-title">You\'re ready!</h1>' +
      '<p class="setup-desc">Blink is set up. Here\'s what\'s connected:</p>' +
      '<div class="setup-feature-list">' +
        (conn ? '<div class="setup-feature">✅ Google — calendar, Gmail &amp; Drive</div>' : '<div class="setup-feature" style="opacity:0.5">○ Google — connect anytime from Settings</div>') +
        (hasSlack ? '<div class="setup-feature">✅ Slack — digest ready</div>' : '<div class="setup-feature" style="opacity:0.5">○ Slack — add your token in Settings</div>') +
        (hasJira ? '<div class="setup-feature">✅ Jira connected</div>' : '<div class="setup-feature" style="opacity:0.5">○ Jira — connect anytime from Settings</div>') +
        (hasWD ? '<div class="setup-feature">✅ Workday — signed in</div>' : '<div class="setup-feature" style="opacity:0.5">○ Workday — sign in anytime from Settings</div>') +
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


function setupSavePrefs() {
  const name = document.getElementById('setup-name')?.value.trim();
  if (name) { state.prefs.userName = name; savePrefs(state.prefs); }
  setupNext();
}

function setupSelectTheme(id) {
  // Preserve whatever's currently typed in the name field before this
  // re-renders the whole step — otherwise picking a theme after typing a
  // preferred name (a completely natural order) would silently wipe out
  // the typed name, since the step rebuilds the input from state.prefs
  // fresh, discarding anything not yet explicitly saved via setupSavePrefs.
  const currentName = document.getElementById('setup-name')?.value.trim();
  if (currentName) state.prefs.userName = currentName;
  state.prefs.colorScheme = id;
  savePrefs(state.prefs);
  applyTheme(state.prefs);
  renderSetupStep();
}

document.addEventListener('DOMContentLoaded', async () => {
  applyTheme(state.prefs);

  // Snyk status check — runs unconditionally, no auth needed, so the outage
  // banner shows even during the setup wizard or for a brand-new user.
  // Re-checked periodically (not tied to refreshApp(), which requires a
  // Google connection and would otherwise never run for people who haven't
  // connected anything).
  checkSnykStatus();
  setInterval(checkSnykStatus, 5 * 60 * 1000);

  // Nav
  document.querySelectorAll('.nav-item[data-screen]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.screen));
  });

  // Refresh Mail silently when the window regains focus while the Mail
  // screen is active — covers "clicked an email to read it in Gmail (a new
  // tab/window), then came back to Blink," which otherwise left the unread
  // count stale until the next explicit navigation or manual refresh.
  // Silent (no overlay) since mailState.messages is already populated in
  // this scenario — see fetchMailMessages's silent param.
  window.addEventListener('focus', () => {
    if (state.screen === 'mail' && !mailState.loading && calIsConnected()) {
      fetchMailMessages(!!mailState.messages);
    }
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
    const refresh = params.get('jira-refresh');
    if (token) {
      window.opener.postMessage({ type: 'jira-token', token, cloud, refresh }, 'https://klm-snyk.github.io');
      window.close();
    }
  }

  // If this is a popup window returning from Slack OAuth, notify parent and close
  if (window.opener && window.location.hash.includes('slack-token=')) {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get('slack-token');
    const refresh = params.get('slack-refresh');
    if (token) {
      window.opener.postMessage({ type: 'slack-token', token: token, refresh: refresh }, 'https://klm-snyk.github.io');
      window.close();
    }
  }

  // Handle Slack OAuth callback — token arrives in URL fragment
  const hash = window.location.hash;
  let _returnedFromSlackOAuth = false;
  if (hash.includes('slack-token=')) {
    const params = new URLSearchParams(hash.slice(1));
    const token = params.get('slack-token');
    const refresh = params.get('slack-refresh');
    if (token) {
      localStorage.setItem('uyt_slack_token', token);
      if (refresh) localStorage.setItem('uyt_slack_refresh_token', refresh);
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
    const refresh = params.get('jira-refresh');
    if (token) {
      localStorage.setItem('uyt_jira_token', token);
      localStorage.setItem('uyt_jira_cloud', cloud || '');
      if (refresh) localStorage.setItem('uyt_jira_refresh_token', refresh);
      window.history.replaceState(null, '', window.location.pathname);
    }
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
    // If returning from a failed Slack OAuth (full-page redirect variant),
    // jump past it to the next step — 'tools' was removed a while back, so
    // this now points at 'jira' instead of resolving to indexOf's -1.
    if (_returnedFromSlackOAuth) {
      setupStep = setupSteps.indexOf('jira');
      renderSetupStep();
    }
  } else {
    document.querySelector('.app').style.display = 'flex';
    // Set loading flags for anything about to be fetched BEFORE the first
    // render, so the dashboard shows "Loading…" immediately instead of
    // blank/empty tiles — previously these were only set inside setTimeout
    // delays (added to give tokens time to be ready) or deep inside calInit,
    // both of which fire after this first render already painted an empty state.
    if (localStorage.getItem('uyt_jira_token') && !jiraState.issues) jiraState.loading = true;
    const _validSlackToken = localStorage.getItem(SLACK_TOKEN_KEY);
    if (_validSlackToken) {
      // Same reasoning as calState.token below — slackIsConnected() checks
      // this directly, and slackInit() wouldn't set it until after this
      // first render otherwise, so the Workday/Slack Digest tiles would
      // fail their connected-check and never get a chance to show loading.
      slackState.token = _validSlackToken;
      if (!slackDigestState.html) slackDigestState.loading = true;
    }
    const _validCalToken = localStorage.getItem(CAL_TOKEN_KEY);
    const _hasValidCalToken = _validCalToken && Date.now() < Number(localStorage.getItem(CAL_EXPIRY_KEY) || 0);
    if (_hasValidCalToken) {
      // Set calState.token now (calIsConnected() checks this directly, and
      // calInit() otherwise wouldn't set it until partway through its own
      // async work) so the Drive tile's connected-check passes immediately
      // and its driveLoading flag actually has a chance to show.
      calState.token = _validCalToken;
      calState.driveLoading = true;
    }
    navigate('dashboard');
    try {
      await calInit();
    } catch (e) {
      console.error('calInit error:', e);
    }
    // Everything below is independent of calInit() succeeding — these are
    // separate features (Slack, Jira, Support Cases, digest) and a failure
    // in any one of them shouldn't cascade into silently blocking the
    // others. This was a real, recurring bug: a single throw anywhere in a
    // shared try block aborts everything after it in that same block —
    // already happened once with calInit() blocking this whole section, and
    // happened again with slackInit() blocking Jira/Support Cases/digest
    // specifically (confirmed live: calling fetchSupportCases() directly
    // worked perfectly — 593 cases, zero error — proving the function was
    // never actually reached during normal page load). Each piece below now
    // gets its own try/catch so this class of bug can't recur a third time
    // for some other feature added later.
    try {
      slackInit();
    } catch (e) {
      console.error('slackInit error:', e);
    }
    try {
      // Fetch Gmail label breakdown lazily
      if (calIsConnected()) calFetchGmailLabelBreakdown().then(() => renderDashboard());
    } catch (e) {
      console.error('Gmail label breakdown error:', e);
    }
    try {
      // Auto-fetch Jira issues if connected
      if (localStorage.getItem('uyt_jira_token') && !jiraState.issues) {
        setTimeout(function() { fetchJiraIssues(); }, 2000);
      }
    } catch (e) {
      console.error('Jira auto-fetch scheduling error:', e);
    }
    try {
      // Auto-fetch support cases canvas if connected and not already loaded
      if (localStorage.getItem('uyt_slack_token') && !supportCasesState.cases) {
        setTimeout(function() { fetchSupportCases(); }, 2200);
      }
    } catch (e) {
      console.error('Support Cases auto-fetch scheduling error:', e);
    }
    try {
      // Auto-fetch digest if no cache — small delay to ensure token is ready
      if (!slackDigestState.html && localStorage.getItem('uyt_slack_token')) {
        setTimeout(function() {
          fetchSlackDigest().then(() => { renderDashboard(); renderSlack(); });
        }, 1500);
      }
    } catch (e) {
      console.error('Digest auto-fetch scheduling error:', e);
    }
  }
});
