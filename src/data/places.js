// ─────────────────────────────────────────────────────────────
// RECYCLING DROP-OFF POINTS & COLLECTION SCHEDULE
// ALL SAMPLE DATA. Replace with verified details from the JMB,
// MBPJ or the waste contractor before showing them as fact.
// Keep `sample: true` on anything not yet verified — the app
// shows a "Sample" tag on those entries.
// ─────────────────────────────────────────────────────────────

export const PLACES = [
  {
    id: 'recycling-corner',
    name: 'Recycling corner',
    where: 'Ground floor, beside Blok 3 bin centre',
    x: 58, y: 22,
    accepts: ['paper', 'plastic', 'metal'],
    hours: 'Daily, 7:00 am – 10:00 pm',
    notes: 'Three bins: blue (paper), orange (plastic & cans).',
    sample: true,
  },
  {
    id: 'community-hall',
    name: 'Community hall recycling bins',
    where: 'Next to the community hall entrance',
    x: 44, y: 60,
    accepts: ['paper', 'plastic', 'glass'],
    hours: 'Mon – Sat, 8:00 am – 6:00 pm',
    notes: 'Glass bottles and jars go in the brown bin only.',
    sample: true,
  },
  {
    id: 'ewaste-bin',
    name: 'E-waste & battery bin',
    where: 'Community hall lobby',
    x: 40, y: 62,
    accepts: ['ewaste', 'hazardous'],
    hours: 'Mon – Sat, 8:00 am – 6:00 pm',
    notes: 'Small electronics and batteries only. Tape battery ends.',
    sample: true,
  },
  {
    id: 'bulky-point',
    name: 'Bulky waste point',
    where: 'Car park P2, beside Blok 8',
    x: 24, y: 88,
    accepts: ['bulky'],
    hours: 'Pickup days only (see schedule)',
    notes: 'Place items here only on the evening before pickup.',
    sample: true,
  },
  {
    id: 'oil-drum',
    name: 'Used cooking oil drum',
    where: 'Blok 7 bin centre',
    x: 86, y: 54,
    accepts: ['food'],
    hours: 'Daily',
    notes: 'Pour cooled oil from a closed bottle. No food scraps.',
    sample: true,
  },
]

// Weekday numbers: 0 = Sunday … 6 = Saturday
export const SCHEDULE = [
  {
    id: 'general',
    name: 'General waste',
    days: [1, 3, 5],
    time: 'From 7:00 am',
    note: 'Bags must be tied and inside the bin centre by 7:00 am.',
    color: '#3d4a45',
    sample: true,
  },
  {
    id: 'recycling',
    name: 'Recyclables',
    days: [2],
    time: 'From 9:00 am',
    note: 'Collected from the recycling corner and community hall bins.',
    color: '#d9731a',
    sample: true,
  },
  {
    id: 'bulky',
    name: 'Bulky waste',
    days: [6],
    weeks: [2, 4],
    time: 'From 8:00 am',
    note: '2nd and 4th Saturday of the month, at the bulky waste point.',
    color: '#4b5b66',
    sample: true,
  },
]

export function placeById(id) {
  return PLACES.find((p) => p.id === id)
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const dayName = (d) => DAY_NAMES[d]
export const dayShort = (d) => DAY_NAMES[d].slice(0, 3)

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
  return SCHEDULE.map((s) => ({ item: s, date: nextRun(s, from) }))
    .filter((x) => x.date)
    .sort((a, b) => a.date - b.date)[0]
}
