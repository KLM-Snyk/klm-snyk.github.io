# Blink — New Chat Context Prompt

Paste this at the start of a new conversation to bring Claude up to speed.

---

## Project: Blink
A browser-native workday dashboard for support managers at Snyk. Built with vanilla JS/HTML/CSS, hosted on GitHub Pages, no framework or bundler.

**Live:** https://klm-snyk.github.io/Blink/
**Repo:** https://github.com/KLM-Snyk/klm-snyk.github.io
**Local path:** `/Users/kar/Desktop/Blink/`
**App subfolder:** `/Users/kar/Desktop/Blink/Blink/`
**Current version:** v18.2

---

## Key Files
- `Blink/index.html` — HTML structure, nav, screens, setup wizard (~297 lines — verify before committing)
- `Blink/js/app.js` — main app (~114k chars)
- `Blink/js/calendar.js` — Google OAuth, Calendar/Gmail/Drive API calls
- `Blink/js/slack.js` — Slack state helpers
- `Blink/js/preferences.js` — user preferences, applyTheme, tardisBackground
- `Blink/css/styles.css` — all styling
- `/mnt/user-data/outputs/slack-digest-worker.js` — Cloudflare Worker (latest)
- `.github/workflows/deploy.yml` — GitHub Actions deployment (split build/deploy jobs)
- `.github/workflows/snyk.yml` — Snyk security scan (currently DISABLED — token auth pending)

## Git Workflow
```bash
cd "/Users/kar/Desktop/Blink"
git add -A && git commit -m "message" && git push
```
**CRITICAL:** Always run `node --check Blink/js/app.js` before committing.
**CRITICAL:** Always verify `tail -5` and `wc -l` on index.html before committing. Correct line count: ~297 lines. Truncation bug has occurred multiple times — Desktop Commander times out mid-write.
**NEVER** rewrite index.html in full — always use targeted `edit_block` or Python string replace on specific sections only.

---

## Architecture

### Cloudflare Worker
- URL: `https://uyt-slack-digest.kar-marsten.workers.dev`
- Paid plan. Routes: Slack OAuth (`/oauth/start`, `/oauth/callback`), Jira OAuth (`/jira/start`, `/jira/callback`), Jira issues (`/jira/issues`), Slack digest (POST `/`), debug IMs (`/debug/ims`)
- Env vars: `ANTHROPIC_API_KEY`, `SLACK_MCP_TOKEN`, `ALLOWED_ORIGIN`=`https://klm-snyk.github.io`, `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`, `JIRA_CLIENT_ID`, `JIRA_CLIENT_SECRET`
- APP_URL hardcoded as `https://klm-snyk.github.io/Blink` in worker
- Region Handover: detects `SupportGlobalHandover` bot (`U0BEK3SPCTY`) first, then falls back to text matching

### Google OAuth
- Client ID (pre-filled): `590264295133-lqo15vq4qt9b8ups64sftbiqlasp0ssk.apps.googleusercontent.com`
- Scopes: calendar.readonly, userinfo.profile, userinfo.email, gmail.readonly, drive.readonly

### Slack OAuth
- App ID: `A0BAVHH5YK1`, Client ID: `7392382433.11369595202647`
- Reverted to original app — new app workspace approval flow was too complex
- Token stored in `localStorage('uyt_slack_token')`
- Scopes: `channels:history,groups:history,im:history,im:read,mpim:history,mpim:read,channels:read,groups:read,search:read,users:read`
- **PENDING**: `im:read` scope needs Snyk workspace admin approval for Workday DM tile

### Jira OAuth
- Atlassian app Client ID: `91rd7QrCqItzlGmCrI4J4A0LsqJ5k2QX` (note: 9th char is capital I not lowercase l)
- Flow: popup → `/jira/start` → Atlassian SSO → `/jira/callback` → postMessage → token saved
- Cloud ID: `f1ea8f1e-6a6b-488d-b3db-945c5189b31a` (snyksec.atlassian.net)
- Scopes: `read:jira-work`, `read:jira-user`
- App is private — managers must be added as Contributors at developer.atlassian.com

---

## Features Implemented (v18.2)

### Dashboard Cards
- **Gmail** — INBOX-only unread count (label API), per-label breakdown (INBOX always first, top 4), clicking navigates to Mail screen
- **Slack Digest** — counts auto-fetch after OAuth (1.5s delay); cached; auto-fetches when token saved via OAuth
- **Workday** — last 60 days Workday DM notifications (pending `im:read` approval)
- **Cases** — open Jira issues by project; auto-fetches on load (2s delay); clicking navigates to Cases screen
- **Google Drive** — shared/mentioned/created counts
- **Upcoming Events** — today and future only; maxResults:50; country code matching anywhere in title

### Mail Screen
- 30-day messages (`newer_than:30d`) — unread only (`is:unread`)
- Grouped by label (INBOX first, `Label_*` IDs hidden, CATEGORY_ labels excluded)
- Collapsible groups; INBOX expanded by default, others collapsed
- 10 per page with Prev/Next pagination
- 3-column layout: Date | Sender | Subject (CSS grid)
- Search: keyword, sender, date (pill-style inputs)
- Client-side only — no AI, no worker

### Cases Screen
- Open Jira issues assigned to current user
- Grouped by project, collapsible (`casesToggle` function)
- Search by keyword + project key (pill-style inputs)
- SF quick links bar: "📊 Case Trends & Data" + "📋 All Unassigned Cases" (hardcoded SF URLs)
- Auto-fetches on navigate if token present
- Weeping Angel overlay during fetch

### Settings
- Gmail excluded labels (denylist, `toggleGmailExclude`)
- Jira section: Sign in with Atlassian + project key management
- Slack: Sign in with Slack popup + "Having trouble? Paste token manually" fallback
- Whovian section (dark mode + Modern theme only): None / Tardis / Bigger on the inside / Tally
- Dark mode toggle immediately re-renders settings to show/hide Whovian section

### Setup Wizard (7-step)
1. Welcome
2. Google — SSO, auto-advances after connect
3. Slack — SSO popup, auto-triggers after Google
4. Jira — SSO popup, polls for connection, skip option
5. Your Tools — Salesforce + Workday URLs
6. Preferences — name, theme
7. Done — checklist

### Whovian Easter Eggs (dark mode + Modern theme only)
- `tardis1.png`, `tardis3.jpg`, `TallyMarks.jpeg`
- `angel.webp` — Weeping Angel overlay during refresh/fetch
- Triggered by: `refreshApp()`, `fetchSlackDigestFull()`, `fetchMailMessages()`, `fetchJiraIssues()`
- NOT documented in About or README (easter eggs)

---

## localStorage Keys
- `uyt_setup_complete`, `uyt_gcal_token`, `uyt_gcal_expiry`, `uyt_cal_client_id`
- `uyt_user_profile` — {name, email, picture}
- `uyt_slack_token` — xoxp- user token
- `uyt_slack_channels` — [{id, name}]
- `uyt_salesforce_url`, `uyt_workday_url`
- `uyt_digest_html`, `uyt_digest_asof`, `uyt_digest_counts`, `uyt_digest_handover`, `uyt_digest_workday`
- `uyt_work_prefs` — all prefs including tardisBackground
- `uyt_jira_token`, `uyt_jira_cloud`, `uyt_jira_projects` — [{key, name}]
- `uyt_gmail_excluded_labels` — [labelId] denylist
- `uyt_gmail_unread`, `uyt_gmail_breakdown` — cached counts
- `uyt_mail_messages`, `uyt_mail_asof` — cached mail
- `uyt_jira_issues`, `uyt_jira_asof` — cached cases

## Default Slack Channels
- `C0885BMRNBA` — support-leads
- `C0AFSPT6YK1` — the-four-horsemen-of-support
- `C07JV4M7BAT` — cx-support-sla
- `C08K5GUMVHS` — cs-support-chatter
- `C0B6KKVED7G` — handover channel (fetched separately, NOT in digest)

---

## Security
- `sanitizeHtml()` function strips `<script>`, `on*` handlers, `javascript:`, `data:` from external HTML
- Applied to Slack digest HTML before injection into DOM
- 4 medium Snyk Code findings remain (false positives — all values go through `escHtml()`)
- Snyk GitHub Actions workflow exists but disabled pending SNYK_TOKEN secret setup
- Snyk account moved from KarMarsten to KLM-Snyk org

## Pending / Known Issues
1. **Slack `im:read` scope** — Snyk workspace admin approval pending. Blocks Workday DM tile.
2. **Snyk workflow** — `.github/workflows/snyk.yml` disabled. Needs `SNYK_TOKEN` secret added to repo.
3. **4 Snyk Code XSS findings** — false positives, need to be ignored via Snyk web UI (app.snyk.io under KLM-Snyk account)
4. **index.html truncation** — Desktop Commander times out mid-write. Always verify line count before committing.

## Upcoming Features
- Salesforce case trends, opened/closed today
- Escalations view on Cases screen
- Status page information
- Workday tasks (direct Workday API)
