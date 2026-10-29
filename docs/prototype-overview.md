# WasteWise Desa Mentari: prototype overview

CSPH (Community Service for Planetary Health), FET, Tutorial 4, Group 1. Lecturer: Dr. Dhevisha Sukumarran.
Prototype owner: Jing Liang. Demo day: Thursday 17 December 2026, 4–6 pm.

**Live prototype:** <https://wastewise-desa-mentari.vercel.app>

## Purpose

WasteWise is a mobile-first web app for residents of Desa Mentari. It brings together waste collection notices, a sorting guide, recycling drop-off points and a way to report waste problems. A management view shows how building management (the JMB) would see and handle those reports.

It is a **prototype with simulated data**. Nothing is sent to the JMB, MBPJ or anyone else. Every screen shows a yellow "Prototype with simulated data" banner. Anything not yet verified carries a "Sample" tag.

## Features mapped to the project plan

| Project plan commitment | Where it is in the prototype |
|---|---|
| Mobile-first interactive prototype, 8–12+ linked screens | 14 linked screens (list below), built for phone width and installable to the home screen |
| Home feed with collection announcements | Home: "Next collection" board, plus announcements tagged *Collection change* and *Reminder* |
| Community activity announcements | Home announcements tagged *Community activity*, *Recycling drive* and *Health notice*, each with a detail page |
| Visual waste-sorting guide (plastic, paper, e-waste, food waste at minimum) | Guide: 9 categories (paper, plastic, cans & metal, glass, e-waste, food waste, bulky, hazardous, general), each with bin colour, what goes in, what doesn't, tips and where to drop it; item search |
| Recycling drop-off locator | Drop-off points: site map, "I live in" block picker, nearest first, filter by waste type, walking distance and time |
| Collection schedule | Schedule: weekly view of general waste, recyclables and bulky waste, with the next date for each |
| Waste-reporting form (category, location, description, photo) | Report: 7 problem types, block and spot, description, photo from camera or gallery (or a sample photo) |
| Management dashboard with statuses Submitted / Under review / Resolved | Management view: counts per status, filter by status and problem type, assign a team, change status, add a note |
| Data consistent across form, My reports and dashboard | One shared store: a report sent from the form appears in My reports and the dashboard; a status change in the dashboard shows in My reports straight away (also across open tabs) |
| Only verified info shown as fact | Drop-off points, schedule and announcements are tagged "Sample". See `content-verification.md` for what is still unverified |
| Offline backup | Service worker caches the app after the first visit, so it opens without Wi-Fi |
| Bahasa Melayu and English (plan's infographic is BM + English) | Whole app in both languages, English by default; BM/EN button on Home, or Settings → Language |
| Usable on every phone | Dark mode (Settings). On phones the app must be added to the home screen: until then a page with iPhone and Android steps covers it (computers aren't blocked) |
| Software / hosting budget RM 0 | Free tools only: React, Vite, GitHub, Vercel free tier |

## Screens

| # | Route | Screen |
|---|---|---|
| 1 | `/` | Home: next collection board, shortcuts, your open reports, announcements |
| 2 | `/announcements/:id` | Announcement or community activity detail (when, where, details) |
| 3 | `/schedule` | Weekly collection schedule with the next date for each type |
| 4 | `/guide` | Sorting guide: pick a waste type or search an item |
| 5 | `/guide/:id` | One waste type: which bin, what goes in, what doesn't, tips, drop-off points |
| 6 | `/recycle` | Drop-off points: site map, nearest first from your block, filter by type |
| 7 | `/recycle/:id` | One drop-off point: location, distance, hours, what it accepts |
| 8 | `/report` | Report a problem: type, block and spot, description, photo |
| 9 | `/report/sent/:id` | Report sent: reference number and summary |
| 10 | `/reports` | My reports with a progress bar for each |
| 11 | `/reports/:id` | One report: details, photo, who is handling it, update timeline |
| 12 | `/settings` | Language, dark mode, Add to Home Screen guide, your block, management view, reset demo data |
| 13 | `/admin` | Management dashboard: all reports, status counts, filters |
| 14 | `/admin/reports/:id` | Handle one report: assign, change status, add a note for the resident |

Screenshots of every screen are in `docs/screenshots/` (see "Screenshots" below). The poster QR code is in `docs/qr/`. A point-by-point comparison with the project plan, with happy-path tests, is in `plan-alignment.md`.

## Tech stack

- React 19 with Vite 7, plain JavaScript. No other runtime dependencies.
- A small built-in router (`src/router.jsx`) and inline SVG icons.
- State in the browser's localStorage (key `wastewise.demo.v1`), shared across tabs. Photos are shrunk to at most 900 px before saving.
- A hand-written service worker (`public/sw.js`) for offline use, and a web app manifest for "Add to Home Screen".
- Hosted on Vercel (free tier), deployed from GitHub (`cupk3k/wastewise`).
- All content in `src/data/` so teammates can update text without touching screens. Every piece of text, in English and Bahasa Melayu, is in `src/data/lang/en.js` and `src/data/lang/ms.js`.
- Language and dark mode are saved per phone (`wastewise.prefs.v1`), separate from the demo data.
- On phones and tablets the app only works from the home screen icon. Opened in the browser, a page with step-by-step iPhone and Android instructions covers it and can't be closed. Computers aren't blocked, so it can still be shown on a laptop.

## Run locally

Needs Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build locally
```

## Deploy

The GitHub repository is linked to Vercel (project `wastewise-desa-mentari`, live at https://wastewise-desa-mentari.vercel.app). Every push to `main` deploys automatically. `vercel.json` sends every route to the app, so deep links such as `/guide/plastic` work when opened directly or from a QR code.

## Screenshots

```bash
npx playwright install chromium   # once
npm run screenshots               # builds the app, saves PNGs to docs/screenshots/
```

Each screen is captured at 390 × 844 (a typical phone) from freshly reset demo data. `npm run screenshots -- --lang ms` saves the Bahasa Melayu set in `docs/screenshots/ms/`, and `--theme dark` the dark set in `docs/screenshots/dark/`.
