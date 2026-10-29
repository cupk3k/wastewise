// ─────────────────────────────────────────────────────────────
// SITE DATA — edit this file to match Desa Mentari.
// Block names and positions are PLACEHOLDERS until the team
// confirms the real block list. x/y are positions on the
// 0–100 site map used for the locator and distance estimates.
// ─────────────────────────────────────────────────────────────

import en from './lang/en.js'

export const BLOCKS = [
  { id: 'b1', name: 'Blok 1', x: 14, y: 18 },
  { id: 'b2', name: 'Blok 2', x: 34, y: 14 },
  { id: 'b3', name: 'Blok 3', x: 54, y: 16 },
  { id: 'b4', name: 'Blok 4', x: 76, y: 20 },
  { id: 'b5', name: 'Blok 5', x: 18, y: 46 },
  { id: 'b6', name: 'Blok 6', x: 42, y: 44 },
  { id: 'b7', name: 'Blok 7', x: 80, y: 48 },
  { id: 'b8', name: 'Blok 8', x: 16, y: 76 },
  { id: 'b9', name: 'Blok 9', x: 46, y: 80 },
  { id: 'b10', name: 'Blok 10', x: 78, y: 78 },
]

// Where in or around a block a problem can be. The English names are what reports
// store; the text for each language is under `spots` in lang/en.js and lang/ms.js.
export const SPOTS = Object.values(en.spots)

// Approximate metres per map unit (site is roughly 600 m across).
const METRES_PER_UNIT = 6

export function blockById(id) {
  return BLOCKS.find((b) => b.id === id)
}

export function distanceMetres(a, b) {
  const d = Math.hypot(a.x - b.x, a.y - b.y) * METRES_PER_UNIT
  return Math.max(20, Math.round(d / 10) * 10)
}

export function walkMinutes(metres) {
  return Math.max(1, Math.round(metres / 80))
}
