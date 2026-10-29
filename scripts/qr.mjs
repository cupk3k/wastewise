// QR code for the poster, pointing at the live prototype. Run with `npm run qr`.
// Black on white with a quiet zone and medium-high error correction, so it scans from print.
import { mkdir } from 'node:fs/promises'
import QRCode from 'qrcode'

const URL_ = 'https://wastewise-desa-mentari.vercel.app'
const OUT = new URL('../docs/qr/', import.meta.url).pathname
const opts = { errorCorrectionLevel: 'Q', margin: 4 }

await mkdir(OUT, { recursive: true })
await QRCode.toFile(`${OUT}wastewise-qr.png`, URL_, { ...opts, width: 1200 })
await QRCode.toFile(`${OUT}wastewise-qr.svg`, URL_, { ...opts, type: 'svg' })
console.log(`saved docs/qr/wastewise-qr.png and .svg for ${URL_}`)
