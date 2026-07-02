# ![Blink](blink-icon.png) Blink

**Your workday in the blink of an eye.**

Blink is a browser-native workday dashboard for support managers. It provides a single pane of glass for your key tools — no installs, no separate logins, no context switching.

**Live:** https://klm-snyk.github.io/Blink/

---

## Key Features

### Single pane of glass
Log in once with Google and Slack SSO — everything loads automatically.

### Dashboard
- **Gmail** — inbox-only unread count with per-label breakdown (clicking navigates to Mail screen)
- **Slack Digest** — summary card (Onboarding · Work Items · Escalations counts)
- **Workday** — last 60 days of Workday Slack DM notifications
- **Cases** — open Jira issues assigned to you, grouped by project
- **Google Drive** — files shared with you, @mentions & created by you (last 30 days)
- **Upcoming Events** — next meetings from Google Calendar

### Mail Screen
- 30-day unread messages grouped by label (Inbox always first)
- Collapsible label groups, 10 messages per page with Prev/Next
- 3-column layout: Date | Sender | Subject
- Search by keyword, sender, or date
- Client-side only — no email content leaves your browser

### Calendar
- Day / Week / Month views
- On-call banner — who was on-call last weekend and who is next
- OOO banner — who is out today
- Upcoming holidays & recharge days — next 30 days

### Slack Digest
- **Region Handover banner** — Prior / Incoming / Next shift with agent counts
- **AI-powered digest** broken into 3 categories: Onboarding/People · Work Items · Incidents & Escalations
- Auto-fetches on page load; cached for instant display on return visits
- Configurable channel list per user

### Cases Screen
- Open Jira issues assigned to you, grouped by project
- Configurable project filter in Settings
- Each issue links directly to Jira
- Sign in with Atlassian SSO (OAuth popup)

### Google Drive
- Files shared with you, files where you are @mentioned, and files created by you (last 30 days)
- Filter by: Sheets / Docs / Slides / Shared / Mentions / Created
- Keyword search

---

## Setup (for new users)

1. Visit https://klm-snyk.github.io/Blink/
2. The setup wizard guides you through:
   - **Google** — click "Sign in with Google" (one click, no configuration needed)
   - **Slack** — click "Sign in with Slack" (SSO popup, no token needed)
   - **Your Tools** — paste your Salesforce and Workday URLs (optional)
   - **Preferences** — pick your name and color theme

---

## Settings
- Google connect/disconnect
- Gmail excluded labels (hide labels from unread count and Mail page)
- Slack connect/disconnect
- Slack channels (add/remove by ID+name)
- Jira connect/disconnect + project key filter
- Salesforce & Workday URLs
- 5 color themes + dark mode

---

## For Admins

### Google OAuth
Pre-filled Client ID — no setup needed for users.
Authorized origin: `https://klm-snyk.github.io`

### Cloudflare Worker
URL: `https://uyt-slack-digest.kar-marsten.workers.dev`

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

---

## Tech Stack
- Vanilla JS / HTML / CSS — no framework, no bundler
- Google Identity Services (OAuth 2.0)
- Google Calendar, Gmail, Drive APIs
- Slack API via Cloudflare Worker proxy
- Atlassian Jira REST API via Cloudflare Worker proxy
- Anthropic Claude API (digest categorization)
- Cloudflare Workers (server-side proxy, paid plan)
- GitHub Pages (hosting)

---

## Coming Soon
- Salesforce case trends, opened & closed today
- Status page information
- Workday tasks (direct Workday API)
