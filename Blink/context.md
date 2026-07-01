# Blink — New Chat Context Prompt

Paste this at the start of a new conversation to bring Claude up to speed.

---

## Project: Blink
A browser-native workday dashboard for support managers at Snyk. Built with vanilla JS/HTML/CSS, hosted on GitHub Pages, no framework or bundler.

**Live:** https://klm-snyk.github.io/Blink/
**Repo:** https://github.com/KLM-Snyk/klm-snyk.github.io
**Local path:** `/Users/kar/Desktop/Blink/`
**App subfolder:** `/Users/kar/Desktop/Blink/Blink/`
**Current version:** v14.9

---

## Key Files
- `Blink/index.html` — HTML structure, nav, screens, setup wizard
- `Blink/js/app.js` — main app (dashboard, calendar, drive, slack, cases, settings, setup wizard, navigation)
- `Blink/js/calendar.js` — Google OAuth, Calendar/Gmail/Drive API calls
- `Blink/js/slack.js` — Slack state and connect/disconnect helpers
- `Blink/js/preferences.js` — user preferences, applyTheme, tardisBackground
- `Blink/css/styles.css` — all styling including dark mode, Whovian backgrounds
- `/mnt/user-data/outputs/slack-digest-worker.js` — Cloudflare Worker (latest version)

---

## Git Workflow
```bash
cd "/Users/kar/Desktop/Blink"
git add -A
git commit -m "message"
git push
```
Always run `node --check Blink/js/app.js` before committing to catch syntax errors.

---

## Architecture

### Hosting
- GitHub Pages — `klm-snyk.github.io` repo, deploys from main branch root
- Landing page at root, Blink app at `/Blink/` subfolder

### Cloudflare Worker
- URL: `https://uyt-slack-digest.kar-marsten.workers.dev`
- **Paid plan** (no timeout issues)
- Handles: Slack API calls, Slack OAuth flow, Jira OAuth flow, Workday DM fetch, Anthropic categorization
- Env vars: `ANTHROPIC_API_KEY`, `SLACK_MCP_TOKEN`, `ALLOWED_ORIGIN`=`https://klm-snyk.github.io`, `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`, `JIRA_CLIENT_ID`, `JIRA_CLIENT_SECRET`

### Google OAuth
- Client ID (pre-filled in app): `590264295133-lqo15vq4qt9b8ups64sftbiqlasp0ssk.apps.googleusercontent.com`
- Authorized origin: `https://klm-snyk.github.io`
- Scopes: `calendar.readonly`, `userinfo.profile`, `userinfo.email`, `gmail.readonly`, `drive.readonly`

### Slack OAuth
- App ID: `A0BAVHH5YK1`, Client ID: `7392382433.11369595202647`
- Client Secret in Cloudflare as `SLACK_CLIENT_SECRET`
- OAuth flow: popup → `/oauth/start` → Slack SSO → `/oauth/callback` → postMessage to parent → token saved
- Token stored in `localStorage('uyt_slack_token')`
- Scopes: `channels:history,groups:history,im:history,im:read,mpim:history,mpim:read,channels:read,groups:read,search:read,users:read`
- **Note:** Snyk workspace admin approval for reinstall is pending — `im:read` may not work for all users yet

### Jira OAuth (NEW — just built)
- Atlassian app Client ID: `91rd7QrCqltzlGmCrI4J4A0LsqJ5k2QX`
- Client Secret in Cloudflare as `JIRA_CLIENT_SECRET`
- OAuth flow: popup → `/jira/start` → Atlassian SSO → `/jira/callback` → postMessage to parent → token saved
- Token stored in `localStorage('uyt_jira_token')`, cloud ID in `localStorage('uyt_jira_cloud')`
- Scopes: `read:jira-work`, `read:jira-user`
- Worker endpoint: `/jira/issues?t=TOKEN&c=CLOUD_ID&p=PROJECT_KEYS`
- Cloud ID: `f1ea8f1e-6a6b-488d-b3db-945c5189b31a` (snyksec.atlassian.net)

---

## Features Implemented

### Dashboard
- Gmail unread count
- Slack Digest card (Onboarding/Work Items/Escalations counts) → navigates to Slack screen
- Workday card (last 60 days of Workday DM notifications — pending `im:read` approval)
- Cases card (open Jira issues by project) → navigates to Cases screen
- Google Drive card (shared/mentioned/created counts)
- Upcoming Events sidebar (today and future only)
- Weeping Angel overlay during refresh when Whovian background active

### Calendar Screen
- Day / Week / Month views
- Fetches from start of current month (maxResults: 100) so past events visible
- Upcoming events filtered to today+future only
- On-call banner (yellow), OOO banner (blue), upcoming 30 days banner
- Dark mode variants for banners

### Slack Screen
- Region Handover banner at top — fetches from `C0B6KKVED7G`, renders Slack Block Kit (carousel cards)
- AI-powered digest of 4 channels (categorized by Anthropic)
- Auto-fetches on page load if no cached digest
- Cached in localStorage for instant display
- Refresh button grays out and shows spinner while loading

### Cases Screen (NEW)
- Sign in with Atlassian button → OAuth popup
- Jira issues assigned to current user, grouped by project
- Configurable project list in Settings
- Each issue links to Jira

### Drive Screen
- Searchable file list: Shared / Mentioned / Created
- Filters: All / Sheets / Slides / Docs / Shared / Mentions / Created
- Google Slides SVG icon for presentations

### Setup Wizard (6-step)
1. Welcome
2. Google — one-click SSO, pre-filled Client ID, auto-advances after connect
3. Slack — "Sign in with Slack" popup, auto-triggers after Google connects
4. Your Tools — Salesforce URL + Workday URL
5. Preferences — name, theme picker
6. Done — checklist

### Settings Panel
- Google connect/disconnect
- Jira — Sign in with Atlassian, project key management
- Slack — Sign in with Slack / disconnect, "Having trouble?" manual token fallback
- Slack channels (add/remove by ID+name)
- Your Tools: Salesforce URL + Workday URL
- Theme (5 options), dark mode toggle
- 🌀 Whovian backgrounds (only in dark mode + Modern theme): None / Tardis / Bigger on the inside / Tally
- Dark mode toggle immediately shows/hides Whovian section

### Whovian Easter Eggs (dark mode only)
- **Tardis** — `tardis1.png` (Tardis in space)
- **Bigger on the inside** — `tardis3.jpg` (console room interior)
- **Tally** — `TallyMarks.jpeg`
- **Weeping Angel** (`angel.webp`) — fades in/out as full overlay during refresh, ONLY when Whovian background active + dark mode on

---

## localStorage Keys
- `uyt_setup_complete` — set to '1' after wizard completes
- `uyt_gcal_token` / `uyt_gcal_expiry` / `uyt_cal_client_id`
- `uyt_user_profile` — JSON: {name, email, picture}
- `uyt_slack_token` — xoxp- user token
- `uyt_slack_channels` — JSON array of {id, name}
- `uyt_salesforce_url` — configurable Salesforce URL
- `uyt_workday_url` — configurable Workday URL
- `uyt_digest_html` / `uyt_digest_asof` / `uyt_digest_counts` / `uyt_digest_handover` / `uyt_digest_workday` — cached digest state
- `uyt_work_prefs` — all preferences including tardisBackground
- `uyt_jira_token` — Atlassian access token
- `uyt_jira_cloud` — Atlassian cloud ID
- `uyt_jira_projects` — JSON array of {key, name}

---

## Default Slack Channels
- `C0885BMRNBA` — support-leads
- `C0AFSPT6YK1` — the-four-horsemen-of-support
- `C07JV4M7BAT` — cx-support-sla
- `C08K5GUMVHS` — cs-support-chatter
- `C0B6KKVED7G` — Snyk Support Service (handover channel — fetched separately, NOT in digest)

## Workday
- Bot user ID: `U03PWG49U0J` (DM channel discovered dynamically per user)
- Fetches last 60 days of DM notifications

---

## Pending / Known Issues
1. **Slack `im:read` scope** — Snyk workspace admin approval for app reinstall pending. Until approved, Workday DM tile won't populate.
2. **Cases screen** — just built, needs testing end-to-end with Jira OAuth
3. **Debug route** — `/debug/ims` in worker should be removed once Workday is working
4. **`#support-global-handover-taskforce`** — accidentally in some users' channel list, should be removed (it's the handover channel C0B6KKVED7G)

## Upcoming Features
- Salesforce case trends, opened/closed today
- Status page information
- Workday tasks (requires Workday API — Slack DM history is a proxy for now)
