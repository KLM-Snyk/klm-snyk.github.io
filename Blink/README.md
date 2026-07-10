# ![Blink](blink-icon.png) Blink

**Your workday in the blink of an eye.**

Blink is a browser-native workday dashboard for support managers. It provides a single pane of glass for your key tools — no installs, no separate logins, no context switching.

**Live:** https://klm-snyk.github.io/Blink/

---

## Key Features

### Dashboard
- **Gmail** — inbox-only unread count with per-label breakdown; click to open Mail screen
- **Slack Digest** — Onboarding · Work Items · Escalations counts; auto-fetches on load
- **Workday** — last 60 days of Workday Slack DM notifications
- **JIRA** — open Jira issues assigned to you, grouped by project; auto-fetches on load
- **Google Drive** — files shared with you, @mentions & created by you (last 30 days)
- **Upcoming Events** — next meetings from Google Calendar

### Mail Screen
- 30-day unread messages grouped by label (Inbox always first)
- Collapsible label groups, 10 messages per page with Prev/Next pagination
- 3-column layout: Date | Sender | Subject
- Search by keyword, sender, or date
- Client-side only — no email content leaves your browser

### Calendar
- Day / Week / Month views
- On-call banner — who was on-call last weekend and who is next
- OOO banner — who is out today
- Upcoming holidays & recharge days — next 30 days

### Slack Digest
- Region Handover banner — Prior / Incoming / Next shift with agent counts
- AI-powered digest: Onboarding/People · Work Items · Incidents & Escalations
- Auto-fetches on page load; cached for instant display on return visits
- Configurable channel list per user

### JIRA Screen
- Open Jira issues assigned to you, grouped by project
- Collapsible project groups with keyword and project search
- Configurable project filter in Settings
- Each issue links directly to Jira

### Support Case Trends & Data
- Live embedded Looker dashboards: Current Support Backlog, Cases Taken Today, Cases Closed Today
- Add more by adding an entry to the `TRENDS_EMBEDS` / `TRENDS_EMBEDS_ROW2` arrays in `app.js` — just a title and embed URL, no other code changes needed
- "Sign in to Looker" button on this screen (also in the wizard and Settings) — opens Looker in a popup so you can sign in via SSO if the dashboards appear blank. Unlike Google/Slack/Jira, Blink doesn't store a token for this; it just needs your browser to hold an active Looker session
- Requires Looker embedding to be enabled and the domain allow-listed by a Looker admin; also depends on your SSO provider allowing itself to be iframed

### Google Drive
- Files shared with you, @mentioned in comments, and created by you (last 30 days)
- Filter by: Sheets / Docs / Slides / Shared / Mentions / Created
- Keyword search

---

## Setup (for new users)

1. Visit https://klm-snyk.github.io/Blink/
2. The setup wizard guides you through:
   - **Google** — Sign in with Google (one click)
   - **Slack** — Sign in with Slack (SSO popup)
   - **Jira** — Sign in with Atlassian (SSO popup)
   - **Looker** — Sign in via popup so the Trends screen's embedded dashboards can pick up your session (optional; no token stored, just needs an active browser session with Looker)
   - **Preferences** — name and color theme

---

## Settings
- Google connect/disconnect
- Gmail excluded labels (hide labels from unread count and Mail page)
- Slack connect/disconnect + channel list
- Jira connect/disconnect + project key filter
- Looker sign-in (same popup as the wizard step)
- Salesforce & Workday URLs
- 5 color themes + dark mode

---

## For Admins

### Google OAuth
Pre-filled Client ID — no setup needed for users.
Authorized origin: `https://klm-snyk.github.io`

### Cloudflare Worker
URL: `https://uyt-slack-digest.kar-marsten.workers.dev`
Source: private repo `KLM-Snyk/blink-worker` (kept out of this public repo — see `.gitignore`)

Handles: Slack OAuth, Jira OAuth, Slack API calls, Workday DM fetch, Anthropic digest categorization.

Environment variables:
- `ANTHROPIC_API_KEY`
- `SLACK_CLIENT_ID` / `SLACK_CLIENT_SECRET`
- `JIRA_CLIENT_ID` / `JIRA_CLIENT_SECRET`
- `ALLOWED_ORIGIN` = `https://klm-snyk.github.io`

### Slack App
Each user signs in via OAuth popup — no token copying needed.
Scopes: `channels:history, channels:read, groups:history, groups:read, im:history, im:read, mpim:history, mpim:read, search:read, users:read`

### Jira App
Each user signs in via Atlassian OAuth popup.
Scopes: `read:jira-work, read:jira-user`
Add managers as Contributors on the app at developer.atlassian.com.

---

## Tech Stack
- Vanilla JS / HTML / CSS — no framework, no bundler
- Google Identity Services (OAuth 2.0)
- Google Calendar, Gmail, Drive APIs
- Slack API via Cloudflare Worker proxy
- Atlassian Jira REST API via Cloudflare Worker proxy
- Anthropic Claude API (digest categorization)
- Cloudflare Workers (server-side proxy)
- GitHub Pages (hosting)

---

## Coming Soon
- Status page information
- Workday tasks (direct Workday API)
