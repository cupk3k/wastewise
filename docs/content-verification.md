# Content verification

Every piece of content the prototype shows, and whether it has been checked. Status comes from the code as of 29 October 2026.

**Status meanings**
- **Placeholder**: made up to fill the layout; must be replaced with real details.
- **Sample**: realistic but not checked; shown with a "Sample" tag in the app.
- **Verified**: checked against the source listed; the "Sample" tag can be removed.

**Where the text is:** every piece of text is in `src/data/lang/en.js` (English) and `src/data/lang/ms.js` (Bahasa Melayu), with the same keys. The other files in `src/data/` hold the structure: block positions, bin colours, map positions, collection days and the `sample` flags.

**How to update:** send the verified details and source to Jing Liang, who edits the files in `src/data/` (both languages). For drop-off points and schedule, `sample: true` is changed to `sample: false` only once the row below is filled in. Fill in the last column with the source (document, website, person and role) and the date it was checked.

## Site: blocks and map (`src/data/site.js`)

| Item | Current status | Source needed | Who verifies | Verified source + date |
|---|---|---|---|---|
| Block names "Blok 1" to "Blok 10" | Placeholder (not tagged in the app) | Real block names and count at Desa Mentari | Research team | |
| Block positions on the site map | Placeholder | Rough site layout (site plan, Google Maps, or a walk-through) | Research team | |
| Spots list (bin centre, lift lobby, corridor, staircase, car park, monsoon drain, playground, roadside) | Sample | Confirm these places exist at Desa Mentari | Research team | |

## Sorting guide (`src/data/guide.js` + `guide` in `lang/en.js` / `lang/ms.js`)

Currently general Malaysian practice, not checked against an official source. The guide screens show no "Sample" tag.

| Item | Current status | Source needed | Who verifies | Verified source + date |
|---|---|---|---|---|
| Paper: blue recycling bin, yes/no lists, tips | Sample | SWCorp / KPKT recycling guidance; what Desa Mentari's bin centres actually provide | Research team | |
| Plastic: orange recycling bin, resin numbers 1, 2, 5, yes/no lists | Sample | SWCorp / KPKT; confirm whether plastic bags are accepted locally | Research team | |
| Cans & metal: orange recycling bin, yes/no lists | Sample | SWCorp / KPKT | Research team | |
| Glass: brown recycling bin, yes/no lists | Sample | SWCorp / KPKT; confirm a glass bin exists on site | Research team | |
| E-waste: e-waste collection point, yes/no lists | Sample | DOE (Department of Environment) e-waste guidance; MBPJ e-waste programme | Research team | |
| Food waste: general waste in a tied bag; used cooking oil to the oil drum | Sample | SWCorp / MBPJ; confirm whether food waste is separated locally | Research team | |
| Bulky waste: scheduled bulky pickup | Sample | MBPJ or contractor bulky waste rules | Research team | |
| Hazardous: keep separate; batteries, lamps, chemicals, medicines | Sample | DOE scheduled waste guidance; where residents can actually take these | Research team | |
| General waste: general waste bin, yes/no lists | Sample | SWCorp / MBPJ | Research team | |
| Bin colours (blue = paper, orange = plastic & metal, brown = glass) | Sample | National recycling bin colour scheme (KPKT / SWCorp); colours of the bins actually on site | Research team | |

## Drop-off points (`src/data/places.js` + `places` in `lang/en.js` / `lang/ms.js`)

All tagged "Sample" in the app.

| Item | Current status | Source needed | Who verifies | Verified source + date |
|---|---|---|---|---|
| Recycling corner, beside Blok 3 bin centre: paper, plastic, metal; daily 7 am – 10 pm | Sample | JMB / building management; site visit | Research team | |
| Community hall recycling bins: paper, plastic, glass; Mon – Sat 8 am – 6 pm | Sample | JMB / building management; site visit | Research team | |
| E-waste & battery bin, community hall lobby: e-waste, hazardous; Mon – Sat 8 am – 6 pm | Sample | JMB / building management; site visit | Research team | |
| Bulky waste point, car park P2 beside Blok 8: pickup days only | Sample | JMB / waste contractor | Research team | |
| Used cooking oil drum, Blok 7 bin centre: daily | Sample | JMB / building management; site visit | Research team | |
| Map position of each point | Placeholder | Site layout | Research team | |

## Collection schedule (`src/data/places.js` + `schedule` in `lang/en.js` / `lang/ms.js`)

All tagged "Sample schedule" in the app.

| Item | Current status | Source needed | Who verifies | Verified source + date |
|---|---|---|---|---|
| General waste: Mon, Wed, Fri from 7:00 am | Sample | Waste collection contractor or MBPJ schedule for Desa Mentari | Research team | |
| Recyclables: Tue from 9:00 am | Sample | Contractor / MBPJ | Research team | |
| Bulky waste: 2nd and 4th Saturday from 8:00 am | Sample | Contractor / MBPJ | Research team | |

## Announcements (`src/data/announcements.js` for dates + `announcements` in `lang/en.js` / `lang/ms.js`)

All tagged "Sample" in the app. These are illustrative; replace with real notices only if the JMB provides them.

| Item | Current status | Source needed | Who verifies | Verified source + date |
|---|---|---|---|---|
| Christmas Day collection moved to 26 December (posted 18 Dec 2026) | Sample | JMB / contractor notice | Research team | |
| Gotong-royong clean-up, Sat 5 Dec 2026, community hall (posted 1 Dec) | Sample | JMB / residents' association | Research team | |
| E-waste collection drive, Sat 12 Dec 2026, community hall car park (posted 28 Nov) | Sample | JMB / MBPJ | Research team | |
| Dengue notice: check for standing water (posted 20 Nov) | Sample | MBPJ / Ministry of Health dengue advice | Research team | |
| Bulky waste to the P2 point on pickup days only (posted 10 Nov) | Sample | JMB | Research team | |
| "Posted by Desa Mentari JMB" byline | Sample | JMB permission to use its name | Research team | |

**Date check before demo day:** the Christmas notice is dated 18 December, one day *after* demo day (17 December). The gotong-royong (5 Dec) and e-waste drive (12 Dec) will already be in the past on demo day. Decide whether to move these dates.

## Bahasa Melayu translation (`src/data/lang/ms.js`)

Drafted by the prototype owner, not by a fluent speaker. It covers every screen, the sorting guide, drop-off points, schedule, announcements and the sample reports.

| Item | Current status | Source needed | Who verifies | Verified source + date |
|---|---|---|---|---|
| All interface text (buttons, headings, messages) | Draft | Read through by a fluent BM speaker | Team member fluent in BM | |
| Sorting guide terms (bin names, waste types, items) | Draft | Match SWCorp / KPKT official BM terms, and the printed infographic | Team member fluent in BM + research team | |
| Announcements and sample reports | Draft | Read through by a fluent BM speaker | Team member fluent in BM | |

## Reports (`src/data/reports.js`)

Simulated by design; these stay simulated.

| Item | Current status | Source needed | Who verifies | Verified source + date |
|---|---|---|---|---|
| 7 problem types (overflowing bin, missed collection, illegal dumping, bulky waste left out, clogged drain, standing water, other) | Sample | Optional: confirm with the JMB which problems are most common | Research team | |
| Teams a report can be assigned to (JMB maintenance team, waste collection contractor, MBPJ referred) | Sample | Optional: who actually handles each problem | Research team | |
| 7 seed reports WW-0101 to WW-0107, with photos and timelines | Sample (simulated) | None; they exist to show the dashboard | — | — |
