// ─────────────────────────────────────────────────────────────
// ANNOUNCEMENTS — sample notices for the prototype.
// Dates are illustrative; replace with real notices if the
// JMB provides them. Structure only: the text (kind, title,
// body, when/where) is under `announcements` in lang/en.js and
// lang/ms.js. `action` adds a button to the notice.
// ─────────────────────────────────────────────────────────────

import { text } from '../i18n.js'

const ANNOUNCEMENTS = [
  { id: 'holiday-collection', date: '2026-12-18' },
  { id: 'gotong-royong', date: '2026-12-01' },
  { id: 'ewaste-drive', date: '2026-11-28', action: { to: '/guide/ewaste', label: 'whatEwaste' } },
  { id: 'dengue', date: '2026-11-20', action: { to: '/report', label: 'reportWater', primary: true } },
  { id: 'bulky-reminder', date: '2026-11-10', action: { to: '/schedule', label: 'pickupDates' } },
]

/** Announcements in the current language. */
export function announcementList() {
  return ANNOUNCEMENTS.map((a) => ({ ...a, ...text('announcements', a.id) }))
}

export function announcementById(id) {
  const a = ANNOUNCEMENTS.find((x) => x.id === id)
  return a && { ...a, ...text('announcements', a.id) }
}
