# 🦷 Aligner Journey

A single-file Progressive Web App (PWA) for tracking your clear aligner orthodontic treatment — photos, wear time, pain logs, milestones, and more.

## Features

- **Treatment Setup** – configure upper/lower sets, weeks per set, start date, name
- **Calendar** – visual per-set calendar with active/completed states; extend/postpone any set
- **Daily Wear Tracking** – log hours, 7-day average, overall average, streak counter
- **Multi-Photo System** – customizable categories (smile, open mouth, with aligners, etc.), face-overlay guide, camera capture, gallery, before/after slider, timelapse slideshow
- **Pain & Symptom Tracker** – log pain level + symptoms per day; last 7 entries displayed
- **Milestones** – day-based progress milestones (25%, 50%, 75%, 90%, perfect days, photo count)
- **Statistics** – wear chart (14-day bar chart), days done/left, day-in-set, sets completed
- **Export / Backup** – JSON backup, text report; import backup to restore data
- **Change History** – log each aligner set change; delete individual entries or clear all
- **Notifications** – morning (8:30 AM) + evening (9 PM) reminders; hourly set-change-day alerts from 8 AM until confirmed; in-app enable/test button

## Files

| File | Purpose |
|------|---------|
| `index.html` | Complete app (HTML + CSS + JS, self-contained) |
| `manifest.json` | PWA manifest for installability |
| `sw.js` | Service worker for offline caching |
| `icon-192.png` | App icon 192×192 |
| `icon-512.png` | App icon 512×512 |

## Running Locally

Any static server works:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then open `http://localhost:8080` in Chrome.

## Installing as PWA on Android

1. Open the GitHub Pages URL in **Chrome** on your Android phone
2. Tap the **⋮** menu → **"Add to Home screen"** (or **"Install app"**)
3. Confirm — the app icon appears on your home screen
4. Open it — it runs full-screen like a native app

> After updating `index.html` on GitHub, open the installed app and do a **hard refresh** (or uninstall + reinstall) to get the latest version.

## Storage Model

| What | Where |
|------|-------|
| All settings, logs, notes, photo metadata | `localStorage` key `alignerJourney` |
| Photo image data (base64) | **IndexedDB** `alignerPhotosDB` → `photos` store |
| Hourly notification dedup | `localStorage` key `lastSetNotifHour_YYYY-MM-DD` |

Photos are also **downloaded to your Downloads folder** on capture as a backup.

## Backup & Restore

- **Export JSON** → downloads complete data snapshot
- **Import Backup** → select previously exported JSON to restore everything
- Photo image data is stored in IndexedDB; the JSON export contains references; re-importing restores all metadata

## Notification Caveats

- Notifications use the browser **Notification API** (not server push)
- They fire **only while the app is open or recently active** in Chrome
- If Chrome is killed by Android's battery manager, notifications won't fire
- To improve reliability: keep the app pinned in Android recent apps, and disable battery optimization for Chrome in phone settings
- For true background push (even when app is closed), a backend + VAPID push service would be required (future enhancement)
