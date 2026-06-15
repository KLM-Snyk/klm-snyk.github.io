// ============================================================
// Slack Integration
// Uses Slack User OAuth Token (xoxp-) to fetch thread mentions
// No backend required — runs entirely in the browser
// ============================================================

const SLACK_TOKEN_KEY  = 'uyt_slack_token';
const SLACK_API_BASE   = 'https://slack.com/api';

const slackState = {
  token: null,
  threadCount: null,
  fetchError: null,
};

// ── Bootstrap ───────────────────────────────────────────────

function slackInit() {
  const token = localStorage.getItem(SLACK_TOKEN_KEY) || '';
  if (token) {
    slackState.token = token;
    slackFetchThreads().then(() => {
      if (typeof renderDashboard === 'function') renderDashboard();
    });
  }
}

function slackIsConnected() {
  return !!slackState.token;
}

// ── Connect / Disconnect ─────────────────────────────────────

function slackConnect() {
  const input = (document.getElementById('slack-token-input')?.value || '').trim();
  if (!input) {
    alert('Please paste your Slack User OAuth Token first.');
    return;
  }
  if (!input.startsWith('xoxp-')) {
    alert('That doesn\'t look right — Slack User OAuth Tokens start with xoxp-');
    return;
  }
  slackState.token = input;
  localStorage.setItem(SLACK_TOKEN_KEY, input);

  slackFetchThreads().then(() => {
    if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
    if (typeof renderDashboard     === 'function') renderDashboard();
  });
}

function slackDisconnect() {
  slackState.token       = null;
  slackState.threadCount = null;
  slackState.fetchError  = null;
  localStorage.removeItem(SLACK_TOKEN_KEY);
  if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
  if (typeof renderDashboard     === 'function') renderDashboard();
}

// ── API calls ────────────────────────────────────────────────

async function slackFetchThreads() {
  slackState.fetchError = null;
  if (!slackState.token) return;

  try {
    // Use subscriptions.thread.getView to get unread thread mentions
    const res = await fetch(`${SLACK_API_BASE}/subscriptions.thread.getView`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${slackState.token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      slackState.fetchError = `Slack API error (${res.status})`;
      slackState.threadCount = null;
      return;
    }

    const data = await res.json();
    console.log('Slack threads data:', data);

    if (!data.ok) {
      if (data.error === 'invalid_auth' || data.error === 'token_revoked') {
        slackDisconnect();
        return;
      }
      slackState.fetchError = `Slack error: ${data.error}`;
      slackState.threadCount = null;
      return;
    }

    // Count threads with unread replies
    const threads = data.threads?.entries || [];
    slackState.threadCount = threads.filter(t => t.unread_replies > 0).length;

  } catch (err) {
    console.warn('Slack fetch error:', err);
    slackState.fetchError = 'Unable to reach Slack.';
    slackState.threadCount = null;
  }
}
