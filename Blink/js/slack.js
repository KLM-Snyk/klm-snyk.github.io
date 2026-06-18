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
  if (typeof renderSettingsPanel === 'function') renderSettingsPanel();
  if (typeof renderDashboard     === 'function') renderDashboard();
}
