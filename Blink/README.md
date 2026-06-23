# ⚡ Blink

**Your workday in the blink of an eye.**

Blink is a browser-native workday dashboard for support managers at Snyk. It brings together Google Calendar, Slack, Drive, and your work tools into a single fast, no-install interface.

**Live:** https://klm-snyk.github.io/Blink/

---

## Features

### Dashboard
- Gmail unread count
- Slack Digest summary (Onboarding · Work Items · Escalations) with auto-fetch on load
- Google Drive activity (shared, mentioned, created — docs, sheets & slides)
- Workday tasks link (configurable)
- Salesforce Cases link (configurable)
- Upcoming Events sidebar (next meetings from Google Calendar)

### Calendar
- Day / Week / Month views
- On-call banner (last & next weekend from on-call calendar)
- OOO banner (who's out today)
- Recharge days & holidays (next 30 days)
- Click any day in Month view → event detail sidebar
- Declined events filtered out automatically

### Slack Digest
- **Region Handover banner** — Prior / Incoming / Next shift with agent counts (Block Kit rendered)
- AI-powered digest of key channels (Onboarding / Work Items / Incidents & Escalations)
- Configurable channel list per user
- Auto-fetches on page load, cached for instant display on return visits
- Per-user Slack token (xoxp-) — each user reads their own channels, no bot invitations needed

### Google Drive
- Shared with me (last 30 days)
- Mentioned in comments (via Drive Comments API)
- Created by me
- Filter by Sheets / Docs / Slides / Shared / Mentions / Created

---

## Setup (for new users)

1. Visit https://klm-snyk.github.io/Blink/
2. The setup wizard will guide you through:
   - **Google** — click "Sign in with Google" (one click, no Client ID needed)
   - **Slack** — paste your `xoxp-` user token (get from your Blink admin)
   - **Your Tools** — paste your Salesforce and Workday URLs (optional)
   - **Preferences** — pick your name and color theme

---

## For Admins

### Cloudflare Worker (Slack Digest)
A shared Cloudflare Worker handles all Slack API calls server-side (avoids CORS).
Each user's `xoxp-` token is passed from their browser to the worker per-request — the worker never stores user tokens.

Deploy `slack-digest-worker.js` to Cloudflare Workers with these environment variables:
- `ANTHROPIC_API_KEY` — Anthropic API key for digest categorization
- `SLACK_MCP_TOKEN` — fallback Slack token (optional if all users have their own)
- `ALLOWED_ORIGIN` — `https://klm-snyk.github.io`

### Google OAuth
The Google OAuth Client ID is pre-filled — no setup needed for users.
Authorized JavaScript origin: `https://klm-snyk.github.io`

### Distributing Slack tokens
Each user generates their **own** `xoxp-` token — you don't create tokens for them.
Their token is tied to their personal Slack account and only reads channels they are already a member of.

Steps for each user:
1. Go to api.slack.com/apps → **UseYourTools** → **OAuth & Permissions**
2. Copy the **User OAuth Token** (starts with `xoxp-`)
3. Paste it into Blink during setup (or Settings → Slack)

This means each manager's digest is automatically personalized to their own Slack access — no admin involvement per user.

---

## Tech Stack
- Vanilla JS / HTML / CSS — no framework, no bundler
- Google Identity Services (OAuth 2.0)
- Google Calendar, Gmail, Drive APIs
- Slack API (via Cloudflare Worker — no CORS issues)
- Anthropic Claude API (digest categorization)
- Cloudflare Workers (server-side proxy)
- GitHub Pages (hosting)

---

## Coming Soon
- Live Salesforce case data
- Snowflake case backlog
- Workday org chart & tasks
- Notifications & reminders
