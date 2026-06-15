// ============================================================
// Salesforce Cases — AI-powered via Anthropic API + Salesforce MCP
// No Salesforce token stored in browser — queries run server-side
// ============================================================

const SF_CACHE_KEY    = 'uyt_sf_cases';
const SF_CACHE_TS_KEY = 'uyt_sf_cases_ts';
const SF_CACHE_TTL    = 5 * 60 * 1000; // 5 minutes

const sfState = {
  loading: false,
  error:   null,
  data:    null, // { platinum: { open, escalated }, gold: { open, escalated }, asOf }
};

// ── Bootstrap ───────────────────────────────────────────────

function sfInit() {
  // Load from cache if fresh
  try {
    const ts   = Number(localStorage.getItem(SF_CACHE_TS_KEY) || 0);
    const data = localStorage.getItem(SF_CACHE_KEY);
    if (data && Date.now() - ts < SF_CACHE_TTL) {
      sfState.data = JSON.parse(data);
    }
  } catch (e) {
    // ignore
  }
}

// ── Fetch via Anthropic API + Salesforce MCP ─────────────────

async function sfFetchCases() {
  if (sfState.loading) return;
  sfState.loading = true;
  sfState.error   = null;
  if (typeof renderDashboard === 'function') renderDashboard();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        mcp_servers: [
          {
            type: 'url',
            url: 'https://api.salesforce.com/platform/mcp/v1/custom/snykemployee',
            name: 'salesforce-mcp',
          }
        ],
        system: 'You are a data assistant. Query Salesforce and return ONLY a valid JSON object, no explanation, no markdown. The JSON must have this exact shape: {"platinum":{"open":0,"escalated":0},"gold":{"open":0,"escalated":0}}',
        messages: [
          {
            role: 'user',
            content: `Use the Salesforce MCP to query the Case object. 
Return the count of open cases (Status != 'Closed') grouped by Account.Customer_Service_Level__c for Platinum and Gold tiers, and for each tier also return the count where IsEscalated = true.
Return ONLY this JSON shape with real numbers filled in:
{"platinum":{"open":0,"escalated":0},"gold":{"open":0,"escalated":0}}`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API error ${response.status}`);
    }

    const result = await response.json();
    const text = result.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');

    const data = JSON.parse(jsonMatch[0]);
    data.asOf = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    sfState.data  = data;
    sfState.error = null;

    // Cache it
    localStorage.setItem(SF_CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(SF_CACHE_TS_KEY, String(Date.now()));

  } catch (err) {
    console.error('SF cases fetch error:', err);
    sfState.error = err.message || 'Failed to load cases';
  } finally {
    sfState.loading = false;
    if (typeof renderDashboard === 'function') renderDashboard();
  }
}
