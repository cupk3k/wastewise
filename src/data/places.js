// ─────────────────────────────────────────────────────────────
// RECYCLING DROP-OFF POINTS & COLLECTION SCHEDULE
// ALL SAMPLE DATA. Replace with verified details from the JMB,
// MBPJ or the waste contractor before showing them as fact.
// Keep `sample: true` on anything not yet verified — the app
// shows a "Sample" tag on those entries.
// Structure only: names, locations, hours and notes are under
// `places` and `schedule` in lang/en.js and lang/ms.js.
// ─────────────────────────────────────────────────────────────

import { locale, text } from '../i18n.js'

const PLACES = [
  {
    id: 'recycling-corner',
    x: 58, y: 22,
    accepts: ['paper', 'plastic', 'metal'],
    sample: true,
  },
  {
    id: 'community-hall',
    x: 44, y: 60,
    accepts: ['paper', 'plastic', 'glass'],
    sample: true,
  },
  {
    id: 'ewaste-bin',
    x: 40, y: 62,
    accepts: ['ewaste', 'hazardous'],
    sample: true,
  },
  {
    id: 'bulky-point',
    x: 24, y: 88,
    accepts: ['bulky'],
    sample: true,
  },
  {
    id: 'oil-drum',
    x: 86, y: 54,
    accepts: ['food'],
    sample: true,
  },
]

// Weekday numbers: 0 = Sunday … 6 = Saturday
const SCHEDULE = [
  {
    id: 'general',
    days: [1, 3, 5],
    color: '#3d4a45',
    sample: true,
  },
  {
    id: 'recycling',
    days: [2],
    color: '#d9731a',
    sample: true,
  },
  {
    id: 'bulky',
    days: [6],
    weeks: [2, 4],
    color: '#4b5b66',
    sample: true,
  },
]

/** Drop-off points in the current language. */
export function placeList() {
  return PLACES.map((p) => ({ ...p, ...text('places', p.id) }))
}

export function placeById(id) {
  const p = PLACES.find((x) => x.id === id)
  return p && { ...p, ...text('places', p.id) }
}

/** Collection schedule in the current language. */
export function scheduleList() {
  return SCHEDULE.map((s) => ({ ...s, ...text('schedule', s.id) }))
}

/** Short weekday name (0 = Sunday) in the current language. */
export const dayShort = (d) => new Date(2024, 0, 7 + d).toLocaleDateString(locale(), { weekday: 'short' })

function weekOfMonth(date) {
  return Math.floor((date.getDate() - 1) / 7) + 1
}

function runsOn(item, date) {
  if (!item.days.includes(date.getDay())) return false
  if (item.weeks && !item.weeks.includes(weekOfMonth(date))) return false
  return true
}

/** Next date (today included) that this schedule item runs. */
export function nextRun(item, from = new Date()) {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  for (let i = 0; i < 62; i++) {
    if (runsOn(item, d)) return new Date(d)
    d.setDate(d.getDate() + 1)
  }
  return null
}

/** Soonest upcoming collection of any type. */
export function nextCollection(from = new Date()) {
  return scheduleList().map((s) => ({ item: s, date: nextRun(s, from) }))
    .filter((x) => x.date)
    .sort((a, b) => a.date - b.date)[0]
}
