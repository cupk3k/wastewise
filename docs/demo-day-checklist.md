# Demo day checklist

Demo day: **Thursday 17 December 2026, 4–6 pm.**

## One week before

- [ ] Final version deployed on Vercel. URL: **https://wastewise-desa-mentari.vercel.app** (checked 29 Oct 2026: deep links and offline after one visit both work)
- [ ] QR code: use `docs/qr/wastewise-qr.png` (or `.svg` for large prints). It encodes the final URL; if the URL ever changes, edit it in `scripts/qr.mjs` and run `npm run qr`. Paste it onto the poster.
- [ ] Test the QR code on the printed poster with an **iPhone** (Camera app) and an **Android** phone (Camera or Google Lens). Both open the Home screen.
- [ ] Open a deep link directly, e.g. `https://wastewise-desa-mentari.vercel.app/guide/plastic`, to confirm it loads.
- [ ] Run `npm run screenshots` and check every PNG in `docs/screenshots/`.
- [ ] Export the screenshots as a single PDF as well (backup to show on a laptop or print).
- [ ] Check the dates in sample announcements still make sense on 17 December (see `content-verification.md`).

## Day before (on every demo phone)

- [ ] Open the site **once while online** and tap through Home, Guide, Drop-off points, Report, My reports and Management view. This saves the app on the phone for offline use.
- [ ] **Add to Home Screen** (iPhone: Safari → Share → Add to Home Screen. Android: Chrome → ⋮ → Add to Home screen / Install app).
- [ ] Test offline: turn on airplane mode, open the app from the home screen icon, check that pages open. Turn airplane mode off again.
- [ ] Save a test photo of rubbish or a bin on each phone for the report task.
- [ ] Charge every phone; bring a power bank and cables.
- [ ] Copy the screenshot PDF to each phone and a laptop.

## On the day, before visitors arrive

- [ ] **Reset demo data** on every demo phone (gear icon on Home → Reset demo data → OK).
- [ ] Check the app shows Blok 6 on Home.
- [ ] Set up a **phone hotspot** as backup Wi-Fi, in case the venue Wi-Fi fails.
- [ ] Poster QR code visible and scannable from about 30 cm.
- [ ] Usability test kit ready: observation sheets, timer, Google Form link or QR.

## If something fails

| Problem | Backup |
|---|---|
| Venue Wi-Fi down | Use the phone hotspot; the app also opens offline on phones prepared the day before |
| Visitor's phone can't open the QR link | Hand them a prepared demo phone |
| Site won't load at all | Show the screenshot PDF on a laptop or phone |
| Demo data looks messy after many visitors | Gear icon → Reset demo data → OK |
