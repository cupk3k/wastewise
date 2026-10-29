// ─────────────────────────────────────────────────────────────
// WASTE-SORTING GUIDE — structure only. The text (names, bins,
// what goes in, tips) is under `guide` in lang/en.js and lang/ms.js.
// General Malaysian practice. Bin colours follow the national
// recycling bin scheme (blue = paper, orange = plastic & metal,
// brown = glass). The research team should verify each item
// against official sources (e.g. SWCorp, KPKT, MBPJ) and
// against what Desa Mentari's bin centres actually provide.
// `where` lists the drop-off points (places.js) for each type.
// ─────────────────────────────────────────────────────────────

import { text } from '../i18n.js'

const GUIDE = [
  { id: 'paper', color: '#2f6fb3', tint: '#e3eef9', where: ['recycling-corner', 'community-hall'] },
  { id: 'plastic', color: '#d9731a', tint: '#fcebdc', where: ['recycling-corner', 'community-hall'] },
  { id: 'metal', color: '#8a6d1f', tint: '#f4ecd6', where: ['recycling-corner'] },
  { id: 'glass', color: '#7a4b2a', tint: '#f1e4da', where: ['community-hall'] },
  { id: 'ewaste', color: '#5a4fa3', tint: '#e8e6f6', where: ['ewaste-bin'] },
  { id: 'food', color: '#3f8a3a', tint: '#e2f1df', where: ['oil-drum'] },
  { id: 'bulky', color: '#4b5b66', tint: '#e4e9ec', where: ['bulky-point'] },
  { id: 'hazardous', color: '#b3261e', tint: '#f8e1df', where: ['ewaste-bin'] },
  { id: 'general', color: '#3d4a45', tint: '#e5e9e7', where: [] },
]

/** The guide in the current language. */
export function guideList() {
  return GUIDE.map((g) => ({ ...g, ...text('guide', g.id) }))
}

export function guideById(id) {
  const g = GUIDE.find((x) => x.id === id)
  return g && { ...g, ...text('guide', g.id) }
}
