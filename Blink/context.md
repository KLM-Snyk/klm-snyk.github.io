# Blink — New Chat Context Prompt

Paste this at the start of a new conversation to bring Claude up to speed.

---

## Project: Blink
A browser-native workday dashboard for support managers at Snyk. Built with vanilla JS/HTML/CSS, hosted on GitHub Pages, no framework or bundler.

**Live:** https://klm-snyk.github.io/Blink/
**Repo:** https://github.com/KLM-Snyk/klm-snyk.github.io
**Local path:** `/Users/kar/Desktop/Blink/`
**App subfolder:** `/Users/kar/Desktop/Blink/Blink/`
**Current version:** v18.22

---

## Key Files
- `Blink/index.html` — HTML structure, nav, screens, setup wizard (~316 lines — verify before committing; grew from ~297 after adding the Trends screen)
- `Blink/js/app.js` — main app
- `Blink/js/calendar.js` — Google OAuth, Calendar/Gmail/Drive API calls
- `Blink/js/slack.js` — Slack state helpers
- `Blink/js/preferences.js` — user preferences, applyTheme, tardisBackground
- `Blink/css/styles.css` — all styling
- `.github/workflows/deploy.yml` — GitHub Actions deployment (split build/deploy jobs)
- `.github/workflows/snyk.yml` — Snyk security scan (currently DISABLED — token auth pending)

### Cloudflare Worker source — now in its own private repo
The Worker is **no longer** written to `/mnt/user-data/outputs/`. Its source lives at:
- **Canonical, version-controlled copy:** `/Users/kar/Desktop/blink-worker/slack-digest-worker.js`, pushed to the **private** repo `https://github.com/KLM-Snyk/blink-worker`
- A second, gitignored local copy also exists at `/Users/kar/Desktop/Blink/worker/slack-digest-worker.js` (kept out of the public Blink repo via `.gitignore` — the Worker's source must never be committed to the public repo since it can contain internal channel IDs, spreadsheet IDs, etc.)
- **When editing the Worker going forward, edit the `blink-worker` repo copy and treat it as the source of truth.** The two copies were in sync as of v18.20 but there is no automated sync between them — if both get edited independently they will drift.
- To deploy: paste the file's contents into the Cloudflare dashboard's Worker editor and hit Deploy. There is no CI/CD for the Worker.

## Git Workflow
```bash
cd "/Users/kar/Desktop/Blink"
git add -A && git commit -m "message" && git push
```
**CRITICAL:** Always run `node --check Blink/js/app.js` (and `Blink/js/calendar.js`, `Blink/js/slack.js`, `Blink/js/preferences.js` if touched) before committing.
**CRITICAL:** Always verify `tail -5` and `wc -l` on index.html before committing. Correct line count: ~316 lines (was ~297 before the Trends screen was added). Truncation bug has occurred multiple times — Desktop Commander times out mid-write.
**NEVER** rewrite index.html in full — always use targeted `edit_block` or Python string replace on specific sections only.
**Cache-busting:** every deploy that touches `app.js`, `calendar.js`, `slack.js`, or `preferences.js` should bump the `?v=X.X` query string on all four `<script>` tags at the bottom of `index.html` (currently `18.22`), or browsers may serve stale cached JS/CSS.

---

## Architecture

### Cloudflare Worker
- URL: `https://uyt-slack-digest.kar-marsten.workers.dev`
- Paid plan. Routes: Slack OAuth (`/oauth/start`, `/oauth/callback`), Jira OAuth (`/jira/start`, `/jira/callback`), Jira issues (`/jira/issues`), Slack digest (POST `/`), debug IMs (`/debug/ims`), Google Sheets-backed backlog data (`/looker/backlog` — see "Dead code" note below, no longer used by the frontend)
- Env vars: `ANTHROPIC_API_KEY`, `SLACK_MCP_TOKEN`, `ALLOWED_ORIGIN`=`https://klm-snyk.github.io`, `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`, `JIRA_CLIENT_ID`, `JIRA_CLIENT_SECRET`, `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY` (service-account creds for `/looker/backlog`, currently unused by the UI but still functional)
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

## Features Implemented (v18.20)

### Dashboard Cards
- **Gmail** — INBOX-only unread count (label API), per-label breakdown (INBOX always first, top 4), clicking navigates to Mail screen. Fixed this session: total count previously came from a `messages.list?q=is:unread` search query, which can lag real mailbox state significantly (observed 30+ min); now uses `labels.get`'s `messagesUnread` counter (same reliable source the breakdown already used), so total and breakdown are always consistent.
- **Slack Digest** — counts auto-fetch after OAuth (1.5s delay); cached; auto-fetches when token saved via OAuth
- **Workday** — last 60 days Workday DM notifications (pending `im:read` approval)
- **JIRA** — open Jira issues by project; auto-fetches on load (2s delay); clicking navigates to JIRA screen (renamed from "Cases" this session)
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

### JIRA Screen (renamed from "Cases" this session)
- Open Jira issues assigned to current user
- Grouped by project, collapsible (`casesToggle` function)
- Search by keyword + project key (pill-style inputs)
- SF quick links bar: "📊 Case Trends & Data" + "📋 All Unassigned Cases" (hardcoded SF URLs)
- Auto-fetches on navigate if token present
- Weeping Angel overlay during fetch
- **Note:** only the visible label changed to "JIRA" — the internal `data-screen`/element ID is still `"cases"` (`screen-cases`, `screen-cases-content`, `renderCases()`, `fetchJiraIssues()`, etc.). Don't go looking for a `"jira"` screen id, it doesn't exist.
- The backlog-by-SE stacked column chart that used to sit at the top of this screen was **removed** this session (superseded by the new Trends screen's Looker embed). The chart's code (`backlogState`, `fetchBacklogData()`, `renderBacklogChart()`, `BACKLOG_COLORS`, and the `.backlog-*` CSS rules) is still in `app.js`/`styles.css` but is **dead code — nothing calls it anymore**. Candidate for full removal if reused nowhere else.

### Support Case Trends & Data Screen (new this session)
- New nav item + screen (`data-screen="trends"`, `screen-trends-content`), added right after JIRA in the nav
- Embeds live Looker dashboards directly via `<iframe>` — no backend data pipeline needed
- Config lives in `app.js`: `TRENDS_EMBEDS` (array of `{title, url}`, rendered as a single half-width block centered at the top) and `TRENDS_EMBEDS_ROW2` (array of `{title, url}`, rendered side-by-side below it). To add more dashboards, just add entries — no other code changes needed.
- Current entries: "Current Support Backlog" (`.../embed/looks/6881`), "Cases Taken Today" (`.../embed/looks/6884`), "Cases Closed Today" (`.../embed/looks/6883`) — all on `snykanalytics.eu.looker.com`
- **Important:** Looker embed URLs must use the `/embed/looks/{id}` path, not the plain `/looks/{id}` path — the latter renders Looker's full app chrome or may not render at all
- **Open question, untested as of v18.20:** whether the org's SSO provider allows itself to be iframed. If the person isn't already logged into Looker in that browser, the embed may render blank rather than showing a login prompt inline. This needs a Looker admin to (a) enable embedding and (b) allow-list `klm-snyk.github.io`, neither of which has been confirmed done yet.
- No theming: cross-origin iframe content can't be restyled from Blink's CSS (browser security boundary). Looker does support server-side embed theming via its own Admin settings, but that's a Looker-side config task, not something Blink's code can touch.

### Settings
- Gmail excluded labels (denylist, `toggleGmailExclude`)
- Jira section: Sign in with Atlassian + project key management
- Slack: Sign in with Slack popup + "Having trouble? Paste token manually" fallback
- Whovian section (dark mode + Modern theme only): None / Tardis / Bigger on the inside / Tally
- Dark mode toggle immediately re-renders settings to show/hide Whovian section

### Setup Wizard (7-step)
1. Welcome
2. Google — SSO, auto-advances after connect
3. Slack — SSO popup, auto-advances after connect
4. Jira — SSO popup, auto-advances after connect
5. Looker — popup to `snykanalytics.eu.looker.com` (see "Looker SSO" note below — not a real OAuth token exchange, "success" is inferred from the popup closing)
6. Preferences — name, theme
7. Done — checklist
- The old "Your Tools" (Salesforce/Workday URLs) step was **removed** — those are still configurable in Settings, just no longer a dedicated wizard step.
- **Fixed this session:** every step title used to have a hardcoded "Step N:" prefix that drifted out of sync with the real dynamic step counter (`Step ${setupStep+1} of ${total}` shown above the content) — Jira and Tools both said "Step 3", which is the "two Step 3s" bug. All hardcoded numbers were removed from step titles; the dynamic counter is now the only source of truth for step numbering.
- Steps 2–4 (Slack/Jira) and step 5 (Looker) all auto-advance once their popup completes, guarded against double-firing and against auto-advancing when the wizard isn't actually on that step (e.g. reconnecting from Settings).

### Looker SSO (new this session, different mechanism than Slack/Google/Jira)
- Looker's iframe embeds on the Trends screen rely on the browser's **ambient session cookie** with Looker, not a token Blink requests/stores. There is nothing to "connect" in the OAuth sense.
- `triggerLookerSSO()` opens `https://snykanalytics.eu.looker.com/` in a real popup (`window.open()`, not an iframe — a popup is its own top-level browsing context, so SSO framing restrictions don't apply to it the way they might to an embedded iframe). The person signs in via normal SSO there.
- There's no token to receive back, so "success" is inferred from the popup closing and recorded as a timestamp in `uyt_looker_last_signin` — purely a UX hint ("last signed in: ..."), not a real verified-connection check.
- Entry points: wizard step 5, a "Looker" section in Settings, and a small persistent "Sign in to Looker" bar at the top of the Trends screen itself (the most useful spot, since that's where a blank dashboard would actually be noticed).
- All three call the same `triggerLookerSSO()` function.

### Sign Out (`signOutAll()`)
- Clears Google, Slack, and Jira together (`calDisconnect()`, `slackDisconnect()`, `jiraDisconnect()`) so "Sign out" actually means sign out of everything, not just Google.
- `jiraDisconnect()` is new this session — Jira previously had no reusable disconnect function, just an inline `localStorage.removeItem` chain on one Settings button.
- **Does NOT** reset `uyt_setup_complete` or reopen the wizard — that was tried and then explicitly reverted per user request. Signing out just returns to a disconnected dashboard; the person reconnects via Settings.


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
- `uyt_looker_last_signin` — timestamp (ms) of last "Sign in to Looker" popup close; UX hint only, not a verified connection check

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
- 4 medium Snyk Code findings remain (false positives — all values go through `escHtml()` / `renderSlackText()`, or are validated URLs)
- Snyk GitHub Actions workflow exists but disabled pending SNYK_TOKEN secret setup
- Snyk account moved from KarMarsten to KLM-Snyk org

## Pending / Known Issues
1. **Slack `im:read` scope** — Snyk workspace admin approval pending. Blocks Workday DM tile.
2. **Snyk workflow** — `.github/workflows/snyk.yml` disabled. Needs `SNYK_TOKEN` secret added to repo.
3. **4 Snyk Code XSS findings** — false positives, confirmed via `snyk code test` on the local repo (Org: kars-music-box-default). All 4 at app.js lines 817 (Mail screen), 1029 (Workday screen), 1207 (JIRA screen), 2061 (Dashboard). Each was individually traced: every point where actual external data (message text, file/issue names, extracted links) enters the HTML is properly escaped via `escHtml()` / `renderSlackText()` (which escapes `&`/`<`/`>` *before* applying markdown formatting) or validated via `isSafeWorkdayUrl()`. Snyk's taint analysis flags them anyway because it can't verify a hand-written sanitizer (as opposed to a recognized library like DOMPurify) actually neutralizes the data flow from a network/storage source to the `innerHTML` sink. Need to be marked as ignored via the Snyk web UI (app.snyk.io under KLM-Snyk account) since `snyk code test` doesn't have a `--ignore` flag equivalent to the open-source `snyk ignore` command.
4. **index.html truncation** — Desktop Commander times out mid-write. Always verify line count before committing.
5. **Looker embed SSO framing still not fully confirmed** — the "Sign in to Looker" popup (wizard/Settings/Trends screen) mitigates this by giving the person an easy way to (re-)establish their Looker session, but it's not been verified end-to-end that the Trends iframes then render correctly. Still may need a Looker admin to confirm embedding is enabled/allow-listed for `klm-snyk.github.io`.
6. **Dead backlog-chart code — REMOVED (v18.94).** `backlogState`, `fetchBacklogData()`, `renderBacklogChart()`, `BACKLOG_COLORS`, and the `.backlog-*` CSS are gone from the frontend. On the Worker side, the `/looker/backlog` route, `SHEETS_SPREADSHEET_ID`/`SHEETS_TAB_NAME` constants, and the Google service-account JWT helpers (`getGoogleAccessToken()`, `importGooglePrivateKey()`, `base64url()`) were also removed — confirmed via search they weren't used anywhere else in the Worker. The `GOOGLE_SHEETS_CLIENT_EMAIL`/`GOOGLE_SHEETS_PRIVATE_KEY` Cloudflare secrets are now safe to delete too, if not already done.
7. **Two copies of the Worker source on disk** — see "Cloudflare Worker source" note under Key Files. Edit `/Users/kar/Desktop/blink-worker/` going forward, not the gitignored copy inside the Blink project.
8. **Support Cases — simplified to a plain Salesforce link (v18.85), Snowflake-in-Blink abandoned.** The Dashboard tile and nav item both just do `window.open('https://snyksec.lightning.force.com/lightning/o/Case/list?filterName=All_Unassigned_Cases')` now — same URL already used for the JIRA screen's "All Unassigned Cases" quick link. **History, for context:** this was originally going to be a live Snowflake-backed screen (`PROD_MODELED.GTM.SUPPORT_CASES`), first with a shared service-account key-pair JWT, then reworked to per-user OAuth (mirroring the Jira pattern) once it became clear key-pair auth centralizes too much access in one account. Both approaches were fully built (Worker routes, `supportCasesState`, `renderSupportCases()`, `triggerSnowflakeOAuth()`, a Settings section) but ultimately blocked: creating the required Snowflake OAuth Security Integration needs account-level `CREATE INTEGRATION` privilege (`ACCOUNTADMIN` or an explicitly-granted role), which the user's working role (`ROLE_VIEWER`) doesn't have. Getting Claude to reach Snowflake through the Worker without that admin step was also investigated and ruled out — Claude.ai's MCP connectors are tied to the person's claude.ai account/browser session, not something a raw API key (which is all the Worker has) can inherit or "log in as." **User's decision: not worth pursuing admin approval for this.** All of that code (frontend and Worker) has been fully removed for cleanliness — confirmed zero remaining references to `supportCases`/`Snowflake` in either `app.js` or the Worker file. If support-case data is needed from Snowflake going forward, the workflow is asking Claude directly to query the Snowflake MCP connector on demand (as already demonstrated for a 6-month case-complexity analysis) — not through Blink. Don't proactively suggest rebuilding this unless asked.

## Upcoming Features
- Escalations view on JIRA screen
- Status page information
- Workday tasks (direct Workday API)
- Possible: configurable Trends embeds UI in Settings (currently hardcoded arrays in `app.js` by design — user chose hardcode-for-now over building an add/remove UI)

## Fixed: OAuth tokens expiring with no refresh (v18.93)
User reported "connectivity gets dropped very quickly" across multiple integrations. Root cause confirmed by code inspection: **neither Jira nor Slack ever implemented token refresh**, despite both having the pieces in place to support it.

- **Jira (severe — ~1hr token life):** `offline_access` scope was already being requested at `/jira/start` (specifically what makes Atlassian issue a `refresh_token`), but the callback discarded `tokenData.refresh_token` entirely, only ever passing back `access_token`. Atlassian access tokens expire in about an hour, so Jira was silently disconnecting roughly every hour with no way to renew short of a full manual re-auth.
- **Also found along the way:** the Worker's `/jira/issues` route always returned HTTP 200 regardless of whether the underlying Atlassian call actually succeeded — it just relayed Atlassian's JSON body verbatim. This meant even *with* refresh logic added, the frontend would have had no way to detect an expired-token failure to know it should refresh. Fixed to propagate the real upstream status code.
- **Slack (only if Token Rotation is enabled for this app — unconfirmed either way):** same pattern — `authed_user.refresh_token` was never checked for or stored. If this Slack app has Token Rotation enabled in its settings, tokens expire ~12h; if not, this fix is a defensive no-op since there'd be nothing to refresh.

**Fix, both services:** Worker callbacks (`/oauth/callback`, `/jira/callback`) now capture the refresh token and pass it back to the frontend via the URL hash (`&jira-refresh=`/`&slack-refresh=`), stored in `uyt_jira_refresh_token`/`uyt_slack_refresh_token`. New Worker routes `/jira/refresh` and `/oauth/refresh` exchange a stored refresh token for a fresh access token (both providers rotate the refresh token itself on each use, so the new one must overwrite the old). Frontend `fetchJiraIssues()`/`fetchSlackDigest()` now retry once automatically on a 401: call the refresh endpoint, update the stored token, retry the original request — all transparent to the person, no re-auth prompt unless the refresh token itself has also expired/been revoked. `jiraDisconnect()`/`slackDisconnect()` updated to also clear the new refresh-token keys.

**Note:** this only fixes tokens expiring on their own schedule. If someone explicitly revokes access (e.g. via their Google/Slack/Atlassian account security settings) or an org admin revokes the app, no refresh token will save that — a real re-auth is still required in that case, which is expected/correct behavior, not a bug.
