# ![Blink](blink-icon.png) Blink

**Your workday in the blink of an eye.**

Blink is a browser-native workday dashboard for support managers. It provides a single pane of glass for your key tools — no installs, no separate logins, no context switching.

**Live:** https://klm-snyk.github.io/Blink/

---

## Key Features

### Single pane of glass
Log in once with Google and get an instant view of everything that matters — Google Suite, Slack, and your shift calendar all in one place.

### Dashboard
- **Gmail** — unread email count (numeric indicator; full email management is not in scope for v1)
- **Slack Digest** — summary card showing counts for each category; click through for the full digest
- **Google Drive** — files shared with you or created by you in the last 30 days
- **Workday** — direct link to your Workday task inbox
- **Salesforce Cases** — direct link to your case queue
- **Upcoming Events** — next meetings from your Google Calendar

### Calendar
- Day / Week / Month views
- **On-call banner** — who was on-call last weekend and who is next
- **OOO banner** — who is out today
- **Upcoming holidays & recharge days** — next 30 days
- Click any day in Month view to see full event list in a side panel

### Slack Digest
- **Region Handover banner** — Prior / Incoming / Next shift with agent counts, rendered from Slack Block Kit
- **AI-powered digest** broken into 3 categories:
  - 👥 Onboarding / People
  - 🔧 Work Items
  - 🚨 Incidents & Escalations
- Searches channels you are already a member of (personalized per user)
- Auto-fetches on page load; cached for instant display on return visits
- Configurable channel list per user

### Google Drive
- Files shared with you, files where you are @mentioned in comments, and files created by you — all from the last 30 days
- Filter by: Sheets / Docs / Slides / Shared with me / Mentions / Created by me
- Keyword search across all files

---

## Upcoming Features

### Workday
- Tasks assigned to you pulled directly from Workday

### Cases
- JIRA cases where you are the owner
- JIRA report list
- Salesforce case & escalation trends
- SF cases opened today
- SF cases closed today
- Status page information

---

## Setup (for new users)

1. Visit https://klm-snyk.github.io/Blink/
2. The setup wizard guides you through:
   - **Google** — click "Sign in with Google" (one click, no configuration needed)
   - **Slack** — click the link to get your personal `xoxp-` token, paste it in
   - **Your Tools** — paste your Salesforce and Workday URLs (optional)
   - **Preferences** — pick your name and color theme

---

## For Admins

### Google OAuth
The Google OAuth Client ID is pre-filled — no setup needed for users.
Authorized JavaScript origin: `https://klm-snyk.github.io`

### Cloudflare Worker (Slack Digest)
A shared Cloudflare Worker handles all Slack API calls server-side (avoids browser CORS restrictions).
Each user's `xoxp-` token is passed per-request — the worker never stores user tokens.

Deploy `slack-digest-worker.js` to Cloudflare Workers with:
- `ANTHROPIC_API_KEY` — Anthropic API key for digest categorization
- `SLACK_MCP_TOKEN` — fallback token (optional)
- `ALLOWED_ORIGIN` — `https://klm-snyk.github.io`

### Slack tokens (self-serve — no admin action needed)
Each user gets their own `xoxp-` token from the UseYourTools Slack app:
1. Go to [api.slack.com/apps/A0BAVHH5YK1/oauth](https://api.slack.com/apps/A0BAVHH5YK1/oauth)
2. Copy the **User OAuth Token** (starts with `xoxp-`)
3. Paste it into Blink during setup

Each user's token reads only channels they are already a member of — fully personalized, no bot invitations needed.

---

## Tech Stack
- Vanilla JS / HTML / CSS — no framework, no bundler
- Google Identity Services (OAuth 2.0)
- Google Calendar, Gmail, Drive APIs
- Slack API via Cloudflare Worker proxy (no CORS)
- Anthropic Claude API (digest categorization)
- Cloudflare Workers (server-side proxy, paid plan)
- GitHub Pages (hosting)
