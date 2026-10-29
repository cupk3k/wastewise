# Change from the project plan: Figma prototype → React web app

## What changed

The project plan says we would build a **"Figma-based prototype"**. We built the prototype as a **React web app** (a Progressive Web App, PWA) hosted free on Vercel instead. It covers everything the plan promised: home feed, sorting guide, drop-off locator, collection schedule, reporting form and management dashboard, with simulated data only.

**The team needs to decide:** update the plan's wording (suggested text below), or also import the app's screens into Figma (for example with the html.to.design plugin) so the "Figma" wording still holds. Check with Dr. Dhevisha whether the change needs her approval.

## Why

- **Faster to build.** One person could build all 14 screens and their links in code faster than drawing and wiring every state in Figma.
- **Real interaction.** Testers can actually type a report, attach a photo from their own phone and see its status change in the management view. A Figma prototype can only fake these with fixed screens.
- **Better usability test.** Because the app really works, task times and errors from the test reflect real use, not clicking through hotspots.
- **Works offline.** After one visit the app opens without Wi-Fi, which protects the demo if the venue Wi-Fi fails.
- **Opens from the QR code on any phone.** Visitors scan the poster and use the app in their own browser, with no Figma account or app needed.
- **Still RM 0.** React, Vite, GitHub and Vercel's free tier cost nothing.

## Suggested replacement wording

### Project description

> Current: *(paste the plan's current sentence that mentions the "Figma-based prototype")*
>
> **New:** "...an interactive, mobile-first web app prototype (a Progressive Web App built with React and hosted free on Vercel). Residents can open it on their own phones by scanning a QR code, and it also works offline. The prototype uses simulated data only and does not send information to building management or the council."

### Materials list

> Current: *(paste the plan's current materials list; replace any Figma item with the lines below)*
>
> **New:**
> - "React and Vite (free, open-source) to build the prototype"
> - "GitHub (free) to store the code"
> - "Vercel (free tier) to host the live prototype"
> - "Smartphones (iOS and Android) for testing and the demo"
> - "Free QR code generator for the poster"
>
> Cost: RM 0.

### Outputs

> Current: *(paste the plan's current prototype output)*
>
> **New:** "A working mobile web app prototype with 14 linked screens (resident app and management view), accessible from a QR code and usable offline, with simulated data. Screenshots of every screen are included in the report as a backup."
