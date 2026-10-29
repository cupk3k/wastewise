// Language switching. All text lives in data/lang/en.js and data/lang/ms.js.
// The app stores English values (statuses, spots, assignees, automatic notes, sample
// reports) so saved data never depends on the language; tl() shows them in the current one.
import en from './data/lang/en.js'
import ms from './data/lang/ms.js'

export const LANGUAGES = { en, ms }
let active = en

export function setLanguage(code) {
  active = LANGUAGES[code] || en
}

export const currentLanguage = () => active
export const locale = () => active.locale

const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj)

/** Interface text by key, e.g. t('home.nextCollection') or t('recycle.walk', { m: 100, min: 1 }). */
export function t(key, vars) {
  const s = get(active.ui, key) ?? get(en.ui, key) ?? key
  return vars ? fill(s, vars) : s
}

export function fill(s, vars) {
  if (Array.isArray(s)) return s.map((x) => fill(x, vars))
  return String(s).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m))
}

/** Content block by section and id, e.g. text('guide', 'paper'), falling back to English. */
export function text(section, id) {
  return active[section]?.[id] ?? en[section]?.[id] ?? {}
}

const storedMaps = new Map()
function storedMap(lang) {
  if (!storedMaps.has(lang.code)) {
    const m = new Map()
    const pair = (a, b) => { if (a && b) m.set(a, b) }
    for (const group of ['status', 'notes', 'assignees', 'spots']) {
      for (const k of Object.keys(en[group])) pair(en[group][k], lang[group]?.[k])
    }
    for (const id of Object.keys(en.seed)) {
      pair(en.seed[id].description, lang.seed?.[id]?.description)
      en.seed[id].notes.forEach((n, i) => pair(n, lang.seed?.[id]?.notes?.[i]))
    }
    storedMaps.set(lang.code, m)
  }
  return storedMaps.get(lang.code)
}

/** A stored English value (status, spot, assignee, sample text) in the current language. */
export function tl(value) {
  if (active === en || value == null) return value
  return storedMap(active).get(value) ?? value
}
