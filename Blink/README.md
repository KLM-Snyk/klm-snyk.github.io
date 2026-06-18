# ⚡ Blink

**Your workday in the blink of an eye.**

Blink is a browser-native workday dashboard for support managers. It brings together Google Calendar, Slack, Drive, and your work tools into a single fast, no-install interface.

**Live:** https://klm-snyk.github.io/Blink/

---

## Features

### Dashboard
- Gmail unread count
- Slack Digest summary (Onboarding · Work Items · Escalations)
- Google Drive activity (shared, mentioned, created)
- Workday tasks link
- Salesforce Cases link
- Upcoming Events sidebar (next meetings)

### Calendar
- Day / Week / Month views
- On-call banner (last & next weekend)
- OOO banner (who's out today)
- Recharge days & holidays (next 30 days)
- Click any day in Month view → event detail sidebar

### Slack Digest
- Region Handover banner (Prior / Incoming / Next shift)
- AI-powered digest of key channels
- Configurable channel list
- Auto-fetches on page load

### Google Drive
- Shared with me (last 30 days)
- Mentioned in comments
- Created by me
- Filter by Sheets / Docs / Slides / category

---

## Setup

1. Visit https://klm-snyk.github.io/Blink/
2. Complete the setup wizard (first visit only)
3. Connect Google (Calendar, Gmail, Drive)
4. Add Cloudflare Worker URL for Slack Digest
5. Add Salesforce & Workday URLs

### Cloudflare Worker (Slack Digest)
Deploy `slack-digest-worker.js` to Cloudflare Workers with these environment variables:
- `ANTHROPIC_API_KEY` — your Anthropic API key
- `SLACK_MCP_TOKEN` — your Slack `xoxp-` user token
- `ALLOWED_ORIGIN` — `https://klm-snyk.github.io`

---

## Tech Stack
- Vanilla JS / HTML / CSS — no framework, no bundler
- Google Identity Services (OAuth)
- Google Calendar, Gmail, Drive APIs
- Slack API (via Cloudflare Worker proxy)
- Anthropic Claude API (digest categorization)
- Cloudflare Workers (CORS proxy + AI calls)
- GitHub Pages (hosting)

---

## Coming Soon
- Live Salesforce case data
- Snowflake case backlog
- Workday org chart & tasks
- Notifications & reminders
