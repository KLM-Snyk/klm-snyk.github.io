# UseYourTools for Work

A browser-based workday management tool — built for the web from the ground up, inspired by the [UseYourTools iOS app](https://github.com/KarMarsten/UseYourTools).

**Live site:** https://klm-snyk.github.io/UseYourTools/

---

## What it does

UseYourTools for Work gives you a single place to manage your workday:

- **Dashboard** — personalized greeting, live clock, upcoming Google Calendar events, and a daily motivational quote
- **Daily Planner** — hour-by-hour time blocks for your full workday, notes auto-saved as you type, navigate between days
- **Cases** — your caseload from JIRA or Salesforce *(integration coming soon)*
- **Settings** — 5 color themes, dark mode, configurable work hours, 12/24h clock, and integration toggles

---

## Integrations

| Integration | Status |
|---|---|
| Google Calendar | Working |
| Gmail unread count | Working |
| JIRA | Coming soon |
| Salesforce | Coming soon |
| Outlook | Coming soon |

---

## Tech

- Pure HTML, CSS, and JavaScript - no framework, no build step
- Deploys automatically via GitHub Pages
- All settings and planner notes persist in localStorage

---

## Running locally

Run npx serve . then open http://localhost:3000/UseYourTools

Make sure your local port matches exactly what is registered in Google Cloud Console. If your server starts on a different port, add that origin too.

---

## Google Calendar and Gmail setup

Both Google Calendar and Gmail are connected in a single OAuth flow.

### 1. Create a Google Cloud project

Go to https://console.cloud.google.com and create a new project or use an existing one.

### 2. Enable the required APIs

In your project, enable all three:
- Google Calendar API
- Gmail API
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
4. Your name, calendar events, and Gmail unread count will load automatically

### Troubleshooting

- 401 invalid_client or no registered origin: Add your exact origin URL to Authorized JavaScript origins in Google Cloud Console
- 403 insufficient authentication scopes: Disconnect and reconnect - your old token is missing the Gmail scope
- Calendar or Gmail not loading after refresh: Token may have expired (1 hour limit) - reconnect to get a fresh token

Clicking Disconnect in Settings or Sign out on the dashboard fully clears your token, profile, and cached events.

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

## Roadmap

- Google Calendar integration - done
- Gmail unread count on dashboard - done
- JIRA and Salesforce case list with Kanban view - planned
- PDF export for daily schedule - planned
- Event creation and editing - planned
- Notifications and reminders - planned
