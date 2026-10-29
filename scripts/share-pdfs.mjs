// Phone-sized PDFs of docs/share/*.html, for sending in WhatsApp (they open in the app,
// no zooming needed). Run with `npm run share-pdfs` after editing the HTML.
import { readdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const DIR = new URL('../docs/share/', import.meta.url)
const NAMES = { 'happy-path': 'WasteWise-happy-path-tests', 'open-questions': 'WasteWise-open-questions' }

const browser = await chromium.launch()
const page = await browser.newPage()
for (const file of (await readdir(DIR)).filter((f) => f.endsWith('.html'))) {
  const base = file.replace(/\.html$/, '')
  await page.goto(new URL(file, DIR).href, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const out = new URL(`${NAMES[base] || base}.pdf`, DIR).pathname
  await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true })
  console.log(`saved docs/share/${NAMES[base] || base}.pdf`)
}
await browser.close()
