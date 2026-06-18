# Blink

A browser-based workday management tool — built for the web from the ground up, inspired by the [Blink iOS app](https://github.com/KarMarsten/Blink).

**Live site:** https://klm-snyk.github.io/Blink/

---

## What it does

Blink gives you a single place to manage your workday across four screens:

- **Dashboard** — personalized greeting, live clock, and four at-a-glance cards: Slack Threads, Cases, Google Drive, and Upcoming Events. Gmail and daily quote below.
- **Calendar** — today's meetings overlaid on an hourly time block planner, with on-call banner, OOO strip, and a 30-day upcoming events header (holidays + recharge days)
- **Drive** — searchable list of Google Docs and Sheets shared with you, where you are mentioned, or that you created in the last 30 days — with multi-select filters
- **Cases** — links to your Salesforce case queue (live data integration planned)

---

## Integrations

| Integration | Status |
|---|---|
| Google Calendar | Working |
| Gmail unread count | Working |
| Google Drive | Working |
| Slack Threads | Pending admin approval |
| On-call calendar | Working |
| OOO calendar | Working |
| Recharge / Holiday calendar | Working |
| Salesforce Cases | Link only (live data planned) |

---

## Tech

- Pure HTML, CSS, and JavaScript - no framework, no build step
- Deploys automatically via GitHub Pages
- All settings and planner notes persist in localStorage

---

## Running locally

Run npx serve . then open http://localhost:3000/Blink

Make sure your local port matches exactly what is registered in Google Cloud Console. If your server starts on a different port, add that origin too.

---

## Google setup (Calendar, Gmail, and Drive)

All three Google integrations connect in a single OAuth flow.

### 1. Create a Google Cloud project

Go to https://console.cloud.google.com and create a new project or use an existing one.

### 2. Enable the required APIs

In your project, enable all four:
- Google Calendar API
- Gmail API
- Google Drive API
- People API (for your name and profile)

### 3. Create an OAuth 2.0 Client ID

1. Go to APIs and Services then Credentials
2. Click Create Credentials then OAuth 2.0 Client ID
3. Choose Web application as the type
4. Under Authorized JavaScript origins, add these two entries:
   - https://klm-snyk.github.io
   - http://localhost:3000

   WARNING: The origin must match exactly what is in your browser address bar including the port. If you are running locally on a different port such as 4200 or 8080, add that instead. A mismatch causes a 401 invalid_client no registered origin error.

5. Leave Authorized redirect URIs empty - not needed for this app
6. Click Save and copy your Client ID

### 4. Connect in the app

1. Open the app and click Connect to Google (top right of dashboard)
2. Paste your Client ID when prompted and click Connect
3. Approve the Google OAuth consent screen
4. Your name, calendar events, Gmail unread count, and Drive files will load automatically

### Troubleshooting

- 401 invalid_client or no registered origin: Add your exact origin URL to Authorized JavaScript origins in Google Cloud Console
- 403 insufficient authentication scopes: Disconnect and reconnect - your old token is missing a scope
- 403 on Drive: Make sure the Google Drive API is enabled in your Cloud project
- Data not loading after refresh: Token may have expired (1 hour limit) - reconnect to get a fresh token

Clicking Disconnect in Settings or Sign out on the dashboard fully clears your token, profile, and cached data.

---

## Color themes

Ported directly from the iOS app:

| Theme | Primary color |
|---|---|
| Modern (default) | Indigo #6366F1 with dark mode support |
| Earth-Tone | Brown #8C6A4A |
| Cheerful Nature | Green #5A8A6A |
| Sunny Sky | Gold #D4A574 |
| Imagination Run Wild | Violet #9B6FA8 |

---

## What's working

- Google Calendar — meetings on dashboard and Calendar screen
- Gmail — unread count with inbox link
- Google Drive — shared, mentioned, and created files (last 30 days) with multi-select filters
- On-call banner in Calendar screen
- OOO strip in Calendar screen
- Recharge days and holidays in Calendar (next 30 days)
- 5 color themes + dark mode
- All data saved locally — no account needed

---

## Coming soon

- Slack Threads — unread count (pending Slack admin approval)
- Salesforce Cases — live Platinum and Gold open case and escalation counts
- Gmail inbox summary (beyond unread count)
- PDF export for daily schedule
- Event creation and editing from the Calendar screen
- Notifications and reminders
