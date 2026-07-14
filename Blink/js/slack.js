// ============================================================
// Slack Integration
// Channel activity summary via Cloudflare Worker
// ============================================================

const SLACK_TOKEN_KEY = 'uyt_slack_token';

const slackState = {
  token: null,
  threadCount: null,
  fetchError: null,
};

function slackInit() {
  const token = localStorage.getItem(SLACK_TOKEN_KEY) || '';
  if (token) {
    slackState.token = token;
    // Don't fetch directly — CORS blocked. Worker handles Slack calls.
  }
}

function slackIsConnected() {
  return !!slackState.token;
}

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
  if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
  if (typeof renderDashboard     === 'function') renderDashboard();
}

function slackDisconnect() {
  slackState.token       = null;
  slackState.threadCount = null;
  slackState.fetchError  = null;
  localStorage.removeItem(SLACK_TOKEN_KEY);
  // Also clear cached digest data — otherwise stale Slack digest/Workday
  // content keeps showing on the dashboard even though nothing's connected,
  // since slackDigestState is initialized straight from these localStorage
  // keys regardless of current connection state.
  localStorage.removeItem('uyt_digest_html');
  localStorage.removeItem('uyt_digest_asof');
  localStorage.removeItem('uyt_digest_counts');
  localStorage.removeItem('uyt_digest_handover');
  localStorage.removeItem('uyt_digest_workday');
  if (typeof slackDigestState !== 'undefined') {
    slackDigestState.html = null;
    slackDigestState.asOf = null;
    slackDigestState.counts = { people: 0, work: 0, incidents: 0 };
    slackDigestState.handover = null;
    slackDigestState.workday = null;
    slackDigestState.error = null;
  }
  if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
  if (typeof renderDashboard     === 'function') renderDashboard();
}
