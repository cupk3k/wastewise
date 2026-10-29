# Limitations and recommendations

## Limitations of the prototype

- **Simulated data only.** Reports, statuses, announcements, drop-off points and the collection schedule are sample data made for the prototype. Nothing is sent to the JMB, the waste contractor or MBPJ, and no real report is ever handled.
- **Data stays on one device.** Everything is saved in the phone's browser storage (localStorage). A report made on one phone does not appear on another phone, and clearing the browser or pressing "Reset demo data" deletes it. The management view only shows reports made on the same device.
- **No real routing to the JMB or MBPJ.** Assigning a report to "JMB maintenance team", "Waste collection contractor" or "MBPJ (referred)" only changes a label. No one is notified, and residents get no real updates.
- **No sign-in on the management view.** Anyone with the link can open `/admin` and change report statuses. This is fine for a demo but would not be acceptable with real data.
- **Unverified content.** Drop-off points, opening hours and the collection schedule are sample data (tagged "Sample" in the app). Block names and the site map are placeholders. The sorting guide follows general Malaysian practice and has not yet been checked against official sources. See `content-verification.md`.
- **Approximate distances.** Walking distances come from rough positions on a drawn site map, not real measurements or GPS.
- **English only.** The printed infographic is in Bahasa Melayu and English, but the app is in English only.
- **Not reviewed for accessibility.** Colour contrast, text size and screen-reader support have not been formally tested.
- **Small, informal test.** The usability test uses about 10 convenience testers, so results show likely problems rather than measuring all residents.

## Recommendations for a real deployment

1. **Get JMB approval first.** Agree with the Desa Mentari JMB who owns the app, who answers reports and how fast, and get permission to use the JMB's name in notices.
2. **Use verified service information.** Get the collection schedule from the waste contractor or MBPJ, confirm every drop-off point and its hours on site, and check the sorting guide against SWCorp, KPKT and MBPJ guidance. Name a person responsible for keeping it up to date.
3. **Add a backend and notifications.** Store reports on a server so residents and management see the same data on any device, and notify residents when their report status changes (push notification, SMS or WhatsApp).
4. **Secure the management view.** Add sign-in with staff accounts and roles, and keep a log of who changed what.
5. **Protect residents' data.** Collect only what is needed, explain how report photos and locations are used, and follow Malaysia's Personal Data Protection Act 2010 (PDPA).
6. **Add Bahasa Melayu, Chinese and Tamil.** Offer the app in the languages residents actually use, with a language switch on every screen.
7. **Do an accessibility review.** Check colour contrast, larger text, screen-reader labels and simple wording, and test with older residents.
8. **Test with more residents.** Repeat the usability test with a larger and more varied group of actual Desa Mentari residents, including ones who rarely use apps.
9. **Plan for residents without smartphones.** Keep printed notices at bin centres and lift lobbies, and a phone or WhatsApp number for reports.
