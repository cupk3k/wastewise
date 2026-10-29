# Change from the project plan: Figma prototype → React web app

## What changed

The project plan (`CSPH_FET_Tutorial4_Group1_ProjectPlan.docx`) says we would build a **Figma-based prototype**. We built it as a **React web app** (a Progressive Web App, PWA) hosted free on Vercel instead: <https://wastewise-desa-mentari.vercel.app>. It covers everything the plan promised: home feed, sorting guide, drop-off locator, collection schedule, reporting form with photo and management dashboard, with simulated data only. See `plan-alignment.md` for the point-by-point check.

**The team needs to decide:** update the plan's wording (suggested text below), or also import the app's screens into Figma (for example with the html.to.design plugin) so the "Figma" wording still holds. Check with Dr. Dhevisha whether the change needs her approval.

## Why

- **Faster to build.** One person could build all 14 screens and their links in code faster than drawing and wiring every state in Figma.
- **Real interaction.** Testers can actually type a report, attach a photo from their own phone and see its status change in the management view. A Figma prototype can only fake these with fixed screens.
- **Better usability test.** Because the app really works, task times and errors from the test reflect real use, not clicking through hotspots.
- **Works offline.** After one visit the app opens without Wi-Fi. The plan's own risk section says Figma needs a stable connection; this removes that risk.
- **Opens from the QR code on any phone.** Visitors scan the poster and use the app in their browser, with no Figma account or app needed.
- **Still RM 0** for software and hosting. React, Vite, GitHub and Vercel's free tier cost nothing.

## Suggested replacement wording

The plan mentions Figma in six places. Each is quoted below with suggested new text.

### 1. Project Description: short description (max 50 words)

> **Current:** "WasteWise Desa Mentari is a Figma-based prototype designed to improve access to waste management information. It features waste-sorting guidance, recycling information, and a simulated waste-reporting system. The project also includes communication materials to help residents access relevant information about community waste management."
>
> **New (47 words):** "WasteWise Desa Mentari is a mobile web app prototype that improves access to waste management information. It features waste-sorting guidance, recycling information and a simulated waste-reporting system, and opens from a QR code. The project also includes communication materials to help residents access community waste management information."

### 2. Materials and Resources: digital tools

> **Current:** "Figma (Free Education / Starter Plan): The primary design platform used to build the interactive wireframes, user interface (UI) screens, reporting forms, simulated community dashboard, and clickable prototypes."
>
> **New:** "React and Vite (free, open-source), GitHub and Vercel (free plans): Used to build and host the interactive mobile web app prototype, including the user interface screens, reporting form, simulated community dashboard and offline support. The live prototype opens in any phone browser and can be added to the home screen."

### 3. Materials and Resources: demo day posters

> **Current:** "...a scannable QR code linking straight to the live Figma prototype so evaluators and visitors can interact with it on their own phones."
>
> **New:** "...a scannable QR code linking straight to the live web app prototype so evaluators and visitors can interact with it on their own phones."

### 4. How do you plan to source the described materials?

> **Current:** "We will utilize free student or educational accounts for Figma and Canva, avoiding expensive software licensing fees."
>
> **New:** "We will use free plans of Canva, GitHub and Vercel, and free open-source tools (React, Vite), avoiding software licensing and hosting fees."

### 5. Outputs and Deliverables

> **Current:** "Interactive Figma Digital Prototype (1 Functional System): A mobile-first interactive prototype comprising at least 8 to 12 linked screens, covering: ..."
>
> **New:** "Interactive Mobile Web App Prototype (1 Functional System): A mobile-first interactive prototype comprising 14 linked screens, covering: ..." (the bullet list underneath stays as it is)

### 6. Anticipated Problems: technical disruptions

> **Current:** "Since Figma requires a stable internet connection, poor Wi-Fi or network congestion during the testing session or Demo Day could lead to lagging screens. Mitigation Plan: We will ensure offline accessibility by downloading interactive PDFs and high-fidelity screenshots of all core screens. Team members will also prepare personal mobile data hotspots as immediate backups."
>
> **New:** "Poor Wi-Fi or network congestion during the testing session or Demo Day could stop the prototype from loading. Mitigation Plan: The web app is built to work offline once it has been opened on a phone, so demo phones will be prepared in advance. We will also keep high-resolution screenshots of all screens as a PDF, and team members will prepare personal mobile data hotspots as immediate backups."

## Not affected

- **Budget:** unchanged. Software and hosting stay RM 0; the RM 60 total (printing, snacks, stationery) is the same.
- **Canva** is still used for the poster and infographic.
- **Usability testing, outputs and success indicators** are unchanged; the test kit follows them (`usability-test-kit.md`).
