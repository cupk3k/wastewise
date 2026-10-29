// Saves a PNG of every screen to docs/screenshots/ for the report and the demo-day backup.
// Run with `npm run screenshots` (builds first). Needs `npx playwright install chromium` once.
// Other versions: `npm run screenshots -- --lang ms` (Bahasa Melayu) and/or `--theme dark`;
// those go in docs/screenshots/ms/, docs/screenshots/dark/ or docs/screenshots/ms-dark/.
// Each run starts from fresh seed data at a 390 × 844 phone viewport (saved at 2x pixels).
// docs/screenshots/*.png is what the phone screen shows; full/ has the whole page, tab bar at the end.
import { mkdir } from 'node:fs/promises'
import { preview } from 'vite'
import { chromium } from 'playwright'

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`)
  return i > 0 ? process.argv[i + 1] : fallback
}
const lang = arg('lang', 'en') === 'ms' ? 'ms' : 'en'
const theme = arg('theme', 'light') === 'dark' ? 'dark' : 'light'
const variant = [lang === 'ms' && 'ms', theme === 'dark' && 'dark'].filter(Boolean).join('-')
const OUT = new URL(`../docs/screenshots/${variant ? `${variant}/` : ''}`, import.meta.url)
const FULL = new URL('full/', OUT)
// In a full-page capture the fixed tab bar would land mid-page, so put it in the flow instead.
const STATIC_BARS = '.tabbar { position: static !important; transform: none !important; margin: 0 auto; }'

const SCREENS = [
  ['01-home', '/'],
  ['02-announcement', '/announcements/gotong-royong'],
  ['03-schedule', '/schedule'],
  ['04-guide', '/guide'],
  ['05-guide-plastic', '/guide/plastic'],
  ['06-recycle', '/recycle'],
  ['07-recycle-detail', '/recycle/community-hall'],
  ['08-report-form', '/report'],
  ['09-report-sent', '/report/sent/WW-0107'],
  ['10-my-reports', '/reports'],
  ['11-report-detail', '/reports/WW-0104'],
  ['12-settings', '/settings'],
  ['13-admin', '/admin'],
  ['14-admin-report', '/admin/reports/WW-0106'],
]

await mkdir(FULL, { recursive: true })
const server = await preview({ preview: { port: 4179, strictPort: false } })
const base = server.resolvedUrls.local[0].replace(/\/$/, '')
const browser = await chromium.launch()
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    serviceWorkers: 'block',
  })
  // Language and theme as chosen. The browser here is a desktop one, so the phone-only
  // "Add to Home Screen" gate doesn't cover the screens.
  await context.addInitScript(([l, th]) => {
    localStorage.setItem('wastewise.prefs.v1', JSON.stringify({ lang: l, theme: th }))
  }, [lang, theme])
  const page = await context.newPage()
  for (const [name, path] of SCREENS) {
    await page.goto(base + path, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: new URL(`${name}.png`, OUT).pathname })
    const bars = await page.addStyleTag({ content: STATIC_BARS })
    await page.screenshot({ path: new URL(`${name}.png`, FULL).pathname, fullPage: true })
    await bars.evaluate((el) => el.remove())
    console.log(`saved ${variant || 'en'}/${name}.png  (${path})`)
  }
} finally {
  await browser.close()
  await server.close()
}
