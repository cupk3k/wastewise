// ─────────────────────────────────────────────────────────────
// ANNOUNCEMENTS — sample notices for the prototype.
// Dates are illustrative; replace with real notices if the
// JMB provides them.
// ─────────────────────────────────────────────────────────────

export const ANNOUNCEMENTS = [
  {
    id: 'holiday-collection',
    kind: 'Collection change',
    title: 'Christmas Day collection moved to 26 December',
    date: '2026-12-18',
    body: [
      'There will be no general waste collection on Friday, 25 December 2026.',
      'Collection for that day moves to Saturday, 26 December, from 7:00 am. Please keep bags inside the bin centre and do not leave them in corridors over the holiday.',
    ],
  },
  {
    id: 'gotong-royong',
    kind: 'Community activity',
    title: 'Gotong-royong clean-up this Saturday',
    date: '2026-12-01',
    event: { when: 'Saturday, 5 December 2026, 8:00 am – 11:00 am', where: 'Meet at the community hall' },
    body: [
      'Join neighbours to clear the monsoon drains and playground area around Blok 5 to Blok 8.',
      'Gloves, rubbish bags and drinking water are provided. Wear covered shoes.',
    ],
  },
  {
    id: 'ewaste-drive',
    kind: 'Recycling drive',
    title: 'E-waste collection drive on 12 December',
    date: '2026-11-28',
    event: { when: 'Saturday, 12 December 2026, 9:00 am – 1:00 pm', where: 'Community hall car park' },
    body: [
      'Bring old phones, chargers, cables, small appliances and batteries.',
      'Large items such as fridges and washing machines are accepted if you register with the JMB office by 10 December.',
    ],
  },
  {
    id: 'dengue',
    kind: 'Health notice',
    title: 'Dengue cases reported nearby — check for standing water',
    date: '2026-11-20',
    body: [
      'Aedes mosquitoes breed in clean standing water: flower pot trays, containers, old tyres and discarded furniture.',
      'Spend 10 minutes each week emptying containers at home. Report rubbish piles that collect rainwater using the Report tab.',
    ],
  },
  {
    id: 'bulky-reminder',
    kind: 'Reminder',
    title: 'Bulky waste goes to the P2 point on pickup days only',
    date: '2026-11-10',
    body: [
      'Furniture and mattresses left at the bin centre block collection and trap rainwater.',
      'Bring bulky items to the bulky waste point the evening before the 2nd or 4th Saturday pickup.',
    ],
  },
]

export function announcementById(id) {
  return ANNOUNCEMENTS.find((a) => a.id === id)
}
