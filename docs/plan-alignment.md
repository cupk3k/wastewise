# Prototype vs project plan

How the WasteWise prototype lines up with `CSPH_FET_Tutorial4_Group1_ProjectPlan.docx`, and the happy-path tests that show each item. Checked 29 October 2026 against <https://wastewise-desa-mentari.vercel.app>.

✅ matches the plan · ⚠️ partly / needs team action · ✏️ differs from the plan wording · ➖ not the app's job (another deliverable)

## 1. Alignment

### Problem and causes (Week 2)

| Plan says | Prototype | |
|---|---|---|
| Cause: no clear access to collection schedules, recycling and waste separation info | Home "Next collection" board, Schedule, Sorting guide, Drop-off points | ✅ |
| Cause: no direct, transparent channel to report overflowing bins, missed collections, illegal dumping to the JMB | Report form (7 problem types incl. all three) + My reports + management view | ✅ (simulated) |
| Cause: low awareness of source segregation | Sorting guide with bin colours, yes/no lists and tips; dengue and bulky-waste notices | ✅ |

### Table 1: project possibilities

| Plan possibility | Prototype | |
|---|---|---|
| Clear guide to sorting household waste; *check against credible sources* | 9 categories with bin colour, what goes in, what doesn't, tips | ✅ built, ⚠️ not yet checked against SWCorp/KPKT/MBPJ (`content-verification.md`) |
| Display **verified** collection details and recycling information | Schedule and 5 drop-off points, all tagged "Sample" | ⚠️ built, nothing verified yet |
| Announcements for recycling drives and clean-up activities | Gotong-royong, e-waste drive, dengue, bulky waste, holiday collection notices | ✅ (sample) |
| Form for issue category, location and description | Problem type, block + spot, description, plus photo | ✅ |
| Dashboard with sample reports; report details and statuses must match | Management view; one shared store, so form, My reports and dashboard always agree | ✅ |
| QR-code posters and printable guidance | QR code in `docs/qr/`; poster and infographic are the team's | ✅ QR · ➖ poster/infographic |

### Activities

| # | Activity | Prototype | |
|---|---|---|---|
| 1–2 | Information needs, literature research | — | ➖ research team |
| 3 | Verify information; **exclude unverified service information** | Unverified items are shown but tagged "Sample" instead of excluded | ✏️ decide: remove unverified items before demo day, or reword to "label unverified information as sample" |
| 4–5 | Plan and design the prototype | 14 linked screens | ✅ |
| 6 | Reporting interface (category, location, description) | Report form | ✅ |
| 7 | Management dashboard, sample reports, simulated data | Management view, 7 seed reports | ✅ |
| 8 | QR-code posters linking to the prototype | QR code generated | ✅ (poster ➖) |
| 9 | Usability test with ~10 users | `usability-test-kit.md` | ✅ ready to run |
| 10 | Refine after feedback | After the tests | — |
| 11–12 | Final submission, limitations and recommendations | `limitations-and-recommendations.md`, screenshots | ✅ (report ➖) |

### Outputs and deliverables

| Plan output | Prototype | |
|---|---|---|
| "Interactive **Figma** Digital Prototype" | React web app (PWA) on Vercel | ✏️ see `plan-changes.md` |
| Mobile-first, at least 8 to 12 linked screens | 14 linked screens, phone-first, installable | ✅ |
| Home feed with clear waste collection announcements | Home | ✅ |
| Visual waste-sorting guide (plastics, paper, e-waste, food waste) | All four, plus metal, glass, bulky, hazardous, general | ✅ |
| Local recycling drop-off locator and collection schedule for Desa Mentari | Site map, nearest first by block; weekly schedule | ✅ (sample data) |
| Reporting form: upload photos, choose categories, input locations | All three | ✅ |
| Admin view with dummy reports, statuses "Submitted", "Under Review", "Resolved" | Same three statuses, assign + notes | ✅ |
| QR-code poster that launches the prototype | QR code ready; poster design ➖ | ✅ |
| Infographic in Bahasa Melayu and English | App also switches between English (default) and Bahasa Melayu | ➖ infographic is separate · ✅ app is bilingual (BM text needs a fluent speaker's check) |
| Usability dataset: navigation, readability, visual hierarchy, reporting form | Questionnaire covers all four | ✅ |
| Report: iterations, feature comparison, usability findings, limitations, recommendations | Limitations/recommendations and this comparison drafted | ⚠️ team writes the rest |

### Success indicators

| Plan says | Prototype | |
|---|---|---|
| Questionnaire on navigation, readability, satisfaction | Likert items in the test kit | ✅ |
| Timed tasks: nearest drop-off point; submit report with photo | Tasks 1 and 2 in the test kit | ✅ |
| Brief post-test interviews | Open questions, asked aloud | ✅ |

### Anticipated problems

| Plan says | Prototype | |
|---|---|---|
| "Figma requires a stable internet connection"; backup with PDFs, screenshots, hotspot | The app itself works offline after one visit; screenshots in `docs/screenshots/`; hotspot in checklist | ✅ better than planned (✏️ wording mentions Figma) |
| Populate with realistic Desa Mentari data (actual street names, realistic reports) | Reports are realistic; **block names are placeholders "Blok 1–10"** | ⚠️ need real block names and layout |
| Budget: software/hosting RM 0 | React, Vite, GitHub, Vercel free | ✅ |

### Still open (team)

1. Real Desa Mentari block names and rough layout.
2. Verify schedule, drop-off points and sorting guide, or remove what can't be verified (activity 3).
3. Plan wording: Figma → web app (`plan-changes.md`).
4. Have a fluent BM speaker check `src/data/lang/ms.js`.
5. Sample announcement dates around demo day (Christmas notice is dated 18 Dec, after demo day).

## 2. Happy-path tests

Run on a phone with the live link. **Start state:** Home → gear icon (top right) → **Reset demo data** → **OK**. The app is then on Blok 6.

Steps HP4, HP5, HP7 and HP10 were run on the live site on 29 Oct 2026 and gave the results below.

### HP1. Home feed and announcements
*Plan: Output "Home feed with clear waste collection announcements"; Table 1 "community recycling activities".*
1. Open the link. **Expect:** yellow "Prototype with simulated data" banner; "Next collection" board with a day and waste type, tagged "Sample schedule".
2. Scroll to **Announcements**, tap **Gotong-royong clean-up this Saturday**. **Expect:** When, Where and details, a "Sample" tag.
3. Tap back. **Expect:** Home again.

### HP2. Collection schedule
*Plan: Output "collection schedule"; Table 1 "recycling information".*
1. Home → **Full schedule**. **Expect:** Mon–Sun row; General waste, Recyclables, Bulky waste, each with time, rule and next date.
2. **Expect:** the soonest date matches the Home "Next collection" board.

### HP3. Sorting guide
*Plan: Output "Visual waste-sorting guide"; Table 1 "waste-sorting education".*
1. Tab **Sort**. **Expect:** 9 waste types, each with its bin colour.
2. Tap **Plastic**. **Expect:** "Orange recycling bin", "Yes, these go here", "Not these", tips, drop-off points.
3. Back, type **battery** in the search. **Expect:** Hazardous; tapping it shows "Keep separate" and the E-waste & battery bin.
4. Repeat for **Paper**, **E-waste**, **Food waste** (the four the plan names).

### HP4. Drop-off locator (timed task 1)
*Plan: Output "recycling drop-off locator"; Success indicators "locating the nearest recycling drop-off point".*
1. Tab **Recycle**. **Expect:** "I live in: Blok 6", site map with your block highlighted.
2. **Expect:** first card **Community hall recycling bins**, tagged "Nearest", about 100 m.
3. Tap the **Plastic** filter. **Expect:** only points that take plastic.
4. Tap the first card. **Expect:** location, distance, hours, what it accepts, "Sample location" note.
5. Back, change "I live in" to **Blok 3**. **Expect:** nearest becomes **Recycling corner** (about 40 m).

### HP5. Report a problem with a photo (timed task 2)
*Plan: Activity 6; Output "reporting form (upload photos, choose categories, input locations)"; Success indicators "submitting a simulated waste report with photo".*
1. Tab **Report**. Choose **Illegal dumping**.
2. Block **Blok 6**, Spot **Roadside**. Type a description.
3. Tap **Take or choose a photo** and pick a picture (or **Use a sample photo instead**). **Expect:** photo preview.
4. Tap **Send report**. **Expect:** "Report sent", reference **WW-0108**, status Submitted.
5. Tap **Track this report**. **Expect:** report page with photo and "Submitted" in the timeline.
6. *(Check)* Open Report again and tap **Send report** with nothing chosen. **Expect:** the form says what is missing and doesn't send.

### HP6. My reports
*Plan: Table 1 "report details and statuses match".*
1. Tab **My reports**. **Expect:** WW-0108 (Submitted) at the top, WW-0107 (Submitted), WW-0104 (Resolved).
2. Tap **WW-0104**. **Expect:** Handled by JMB maintenance team, updates timeline ending in Resolved.

### HP7. Management view and status change
*Plan: Activity 7; Output "Admin/Community management view ... Submitted, Under Review, Resolved".*
1. Home → gear → **Open management view**. **Expect:** counts for All, Submitted, Under review, Resolved; WW-0108 listed with "Photo".
2. Tap **WW-0108**. Set **Assigned to: JMB maintenance team**. Type a note, tap **Mark under review**. **Expect:** status Under review, your note in History.
3. Tap **Mark resolved**. **Expect:** "This report is resolved."
4. Tap the back arrow (to the dashboard), then **Resident app** (top left), then **My reports** → WW-0108. **Expect:** Resolved, Handled by JMB maintenance team, your note under the Under review update.

### HP8. Offline
*Plan: Anticipated problems "technical disruptions"; Materials "QR code ... on their own phones".*
1. While online, open the link once and wait for Home to load.
2. Optional: **Add to Home Screen** (iPhone: Share → Add to Home Screen; Android: ⋮ → Install app).
3. Turn on airplane mode. Reopen the app (or the link). **Expect:** Home, Sort, Recycle and Report all open.
4. Send a report offline. **Expect:** it works and appears in My reports (it is saved on the phone).

### HP9. QR code
*Plan: Output "QR-code poster ... launch the digital prototype immediately".*
1. Show `docs/qr/wastewise-qr.png` on a screen or print it.
2. Scan with an iPhone Camera and an Android camera. **Expect:** Home of the live app opens.

### HP10. Reset between testers
*Plan: Activity 9 (usability testing with ~10 users).*
1. Home → gear → **Reset demo data** → **OK**. **Expect:** "Demo data reset."; My reports shows only WW-0107 and WW-0104; management view back to 7 (2 Submitted, 2 Under review, 3 Resolved).

### HP11. Language switch
*Plan: Outputs "simple Bahasa Melayu and English" (infographic); Target audience: Desa Mentari residents.*
1. On Home, tap **BM** (top right). **Expect:** everything turns to Bahasa Melayu ("Kutipan seterusnya", tabs "Utama", "Asingkan", "Lapor"…); the button now says **EN**.
2. Open Sort → Plastik, Recycle, My reports → WW-0104. **Expect:** guide, drop-off points, sample reports and statuses ("Selesai") all in BM.
3. Reload the page. **Expect:** still BM. Tap **EN** to go back.

### HP12. Dark mode
*Plan: Usability "text readability".*
1. Gear → **Dark mode** on. **Expect:** dark background, light text; bin colours, status chips and the map still readable.
2. Reload. **Expect:** still dark. Turn it off again.

### HP13. Add to Home Screen guide
*Plan: Materials "QR code ... on their own phones"; Anticipated problems (offline).*
1. On a phone, open the link in Safari (iPhone) or Chrome (Android). **Expect:** a sheet "Add WasteWise to your home screen" with three steps for that phone and a small picture of where to tap.
2. Tap **Not now**. **Expect:** it closes and doesn't come back on other pages during this visit.
3. Gear → **Add to Home Screen → Show me how**. **Expect:** the sheet opens again.
4. Follow the steps, then open WasteWise from the new home screen icon. **Expect:** no sheet, and Settings says "WasteWise is on your home screen."
