# ![Blink](blink-icon.png) Blink

**Your workday in the blink of an eye.**

Blink is a browser-native workday dashboard for support managers. It provides a single pane of glass for your key tools — no installs, no separate logins, no context switching.

**Live:** https://klm-snyk.github.io/Blink/

---

## Key Features

### Dashboard
- **Gmail** — inbox-only unread count with per-label breakdown; click to open Mail screen
- **Slack Digest** — Onboarding · Work Items · Escalations counts; auto-fetches on load
- **Workday** — glance tile showing Pending / Approved / Updates counts (estimated from message wording); click through to the full Workday screen
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

### Workday Screen
- Notifications come from Workday's own Slack app (a Slack DM Blink reads via the Worker) — not a direct Workday API integration
- Quick-actions bar at the top (My Tasks, Take time off, View time off balance, Lookup a coworker) — currently all point to the Workday home page; per-action deep links can be added later if available
- Grouped into three categories, inferred from each message's leading emoji: **📝 Pending** (no recognized emoji — typically an approval card), **✔️ Approved** (confirmations of something already done), **✨ Updates** (informational). This is a heuristic based on message wording, not a real Workday task-status check
- Slack's raw `<url|display text>` link syntax and `<@USERID>` mention tokens are parsed into clean text rather than shown raw; mentioned user IDs are resolved to real names via Slack's `users.info` API (cached in the browser) instead of showing a raw ID
- Items with an embedded link (e.g. a date range) show a small caret — click to expand and see the detail, with a real link back to Workday if it's a genuine `myworkday.com` URL
- "Sign in to Workday" available in the wizard and Settings — same popup-based pattern as Looker (see below): no token stored, just ensures your browser has an active Workday session

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
- This is Blink's primary path for Salesforce-derived case data — there's no direct Salesforce integration; a Salesforce Cases URL quick link is still available in Settings for anyone who wants it, but it's not part of the wizard

### Google Drive
- Files shared with you, @mentioned in comments, and created by you (last 30 days)
- Filter by: Sheets / Docs / Slides / Shared / Mentions / Created
- Keyword search

### Snyk Status Banner
- Checks `status.snyk.io`'s public Statuspage API (`/api/v2/status.json`) on load and every 5 minutes
- If the aggregate indicator isn't "none" (i.e. not "All Systems Operational"), shows a banner at the top of the Dashboard with the exact status description, linking to the status page
- No auth required — runs for every user regardless of what they've connected, including during the setup wizard

---

## Setup (for new users)

1. Visit https://klm-snyk.github.io/Blink/
2. The setup wizard guides you through:
   - **Google** — Sign in with Google (one click)
   - **Slack** — Sign in with Slack (SSO popup)
   - **Jira** — Sign in with Atlassian (SSO popup)
   - **Looker** — Sign in via popup so the Trends screen's embedded dashboards can pick up your session (optional; no token stored, just needs an active browser session with Looker)
   - **Workday** — Sign in via popup, same pattern as Looker (optional; no token stored)
   - **Preferences** — name and color theme

Salesforce isn't part of the wizard — Looker's embedded dashboards are the primary path for that data. A Salesforce URL quick link can still be added anytime in Settings if wanted.

---

## Settings
- Google connect/disconnect
- Gmail excluded labels (hide labels from unread count and Mail page)
- Slack connect/disconnect + channel list
- Jira connect/disconnect + project key filter
- Looker sign-in (same popup as the wizard step)
- Workday sign-in (same popup as the wizard step)
- Salesforce Cases URL (optional quick link, not part of the wizard)
- 5 color themes + dark mode

---

## For Admins

### Google OAuth
Pre-filled Client ID — no setup needed for users.
Authorized origin: `https://klm-snyk.github.io`

### Cloudflare Worker
URL: `https://uyt-slack-digest.kar-marsten.workers.dev`
Source: private repo `KLM-Snyk/blink-worker` (kept out of this public repo — see `.gitignore`)

Handles: Slack OAuth, Jira OAuth, Slack API calls (digest, Workday DM fetch, user-name resolution), Anthropic digest categorization, Google Sheets-backed backlog data (legacy route, no longer used by the UI).

Environment variables:
- `ANTHROPIC_API_KEY`
- `SLACK_CLIENT_ID` / `SLACK_CLIENT_SECRET`
- `JIRA_CLIENT_ID` / `JIRA_CLIENT_SECRET`
- `ALLOWED_ORIGIN` = `https://klm-snyk.github.io`
- `SLACK_MCP_TOKEN` — shared fallback Slack token
- `GOOGLE_SHEETS_CLIENT_EMAIL` / `GOOGLE_SHEETS_PRIVATE_KEY` — legacy, only used by the unused `/looker/backlog` route

### Slack App
Each user signs in via OAuth popup — no token copying needed.
Scopes: `channels:history, channels:read, groups:history, groups:read, im:history, im:read, mpim:history, mpim:read, search:read, users:read`

The Workday DM is discovered by paginating through all of a user's IM channels (`conversations.list`) looking for a fixed bot user ID — accounts with 200+ DM conversations need this pagination, a single unpaginated page can miss it.

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
- Per-action Workday quick-link URLs (currently all point to the home page)
- More dashboards on Support Case Trends & Data — this screen will keep growing
