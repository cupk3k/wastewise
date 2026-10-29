# WasteWise Desa Mentari

Mobile-first React prototype for the CSPH project (FET, Tutorial 4, Group 1).
Frontend only. All data is simulated and stored in the browser's localStorage.
Nothing is sent to building management or the council.

Live: https://wastewise-desa-mentari.vercel.app

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project → Import** the repository.
3. Framework preset: **Vite** (detected automatically). Build command `npm run build`, output `dist`.
4. Deploy. `vercel.json` already rewrites all routes to `index.html`, so deep links like `/guide/plastic` work.

Use the Vercel URL for the QR-code poster.

## Screens

| Route | Screen |
|---|---|
| `/` | Home: next collection, shortcuts, open reports, announcements |
| `/announcements/:id` | Announcement or activity detail |
| `/schedule` | Weekly collection schedule |
| `/guide` | Waste-sorting guide with item search |
| `/guide/:id` | Category detail: what goes in, what doesn't, where to drop it |
| `/recycle` | Drop-off points with site map, nearest first, filter by type |
| `/recycle/:id` | Drop-off point detail |
| `/report` | Report form: category, block + spot, description, photo |
| `/report/sent/:id` | Confirmation with reference number |
| `/reports`, `/reports/:id` | My reports with progress and update timeline |
| `/settings` | Your block, management view link, reset demo data |
| `/admin`, `/admin/reports/:id` | Management dashboard: filter, assign, change status, add note |

## Editing content

All content lives in `src/data/`. Each file has a header comment.

- `site.js`: block names and map positions. **Placeholders**, replace with the real Desa Mentari blocks.
- `guide.js`: sorting guide. Verify against official sources.
- `places.js`: drop-off points and collection schedule. **Sample data**; keep `sample: true` until verified.
- `announcements.js`: sample notices.
- `reports.js`: report categories, statuses and the seed reports.

## Docs and screenshots

Team docs are in `docs/` (overview, content verification, usability test kit, limitations, demo-day checklist, plan changes).

```bash
npx playwright install chromium   # once
npm run screenshots               # PNG of every screen in docs/screenshots/ (full-length ones in full/)
npm run qr                        # poster QR code for the live URL, in docs/qr/
```

## Usability testing

Before each tester: **Settings → Reset demo data**. This clears reports made on that device and restores the seed reports.

Suggested timed tasks (from the project plan):
1. Find the nearest drop-off point for plastic bottles.
2. Report illegal dumping at your block with a photo, then find its status.

## Offline

`public/sw.js` caches the app (code, styles and fonts) during the first visit, so it still opens without Wi-Fi on demo day.
Open the site once on each demo phone while online beforehand. To make it feel like an app, use
"Add to Home Screen".

## Project structure

```
src/
  main.jsx          entry, service worker registration
  App.jsx           route table
  router.jsx        small history router (no extra dependency)
  store.jsx         state + localStorage persistence
  styles.css        all styles
  components/       icons, shell (tab bar), shared UI, sample photos
  screens/          resident screens
  admin/            management view
  data/             all content and mock data
```
