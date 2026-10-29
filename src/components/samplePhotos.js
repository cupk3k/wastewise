// Illustrated stand-ins for report photos (so seed data and testers
// without a photo to hand still see something). Labelled as samples.

const bag = (x, y, s = 1, c = '#2b2f2e') =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 40c0-22 8-34 22-34s22 12 22 34c0 6-10 10-22 10S0 46 0 40z" fill="${c}"/><path d="M16 7l6-7 6 7" stroke="${c}" stroke-width="4" fill="none"/></g>`

const label = `<rect x="12" y="12" width="118" height="30" rx="15" fill="rgba(0,0,0,.55)"/><text x="71" y="32" font-family="sans-serif" font-size="14" fill="#fff" text-anchor="middle">Sample photo</text>`

const SCENES = {
  overflow: `
    <rect width="480" height="320" fill="#cfd6d3"/>
    <rect y="210" width="480" height="110" fill="#9aa39f"/>
    <rect x="40" y="40" width="400" height="12" fill="#b9c1bd"/>
    <g fill="#2f6b4f"><rect x="70" y="110" width="90" height="120" rx="6"/><rect x="190" y="110" width="90" height="120" rx="6"/><rect x="310" y="110" width="90" height="120" rx="6"/></g>
    <g fill="#24543e"><rect x="64" y="100" width="102" height="14" rx="4"/><rect x="184" y="100" width="102" height="14" rx="4"/><rect x="304" y="100" width="102" height="14" rx="4"/></g>
    ${bag(80, 62, 1.1)}${bag(200, 58, 1.2, '#3a3f3d')}${bag(320, 64, 1)}${bag(30, 220, 1.3)}${bag(140, 236, 1.1, '#3a3f3d')}${bag(260, 240, 1.2)}${bag(380, 226, 1.3, '#3a3f3d')}
    <rect x="220" y="270" width="26" height="18" fill="#e9e3d2" transform="rotate(-14 233 279)"/>
    <circle cx="350" cy="292" r="8" fill="#c94f3a"/>
    ${label}`,
  dumping: `
    <rect width="480" height="320" fill="#d7dcd4"/>
    <rect y="200" width="480" height="120" fill="#a59f8f"/>
    <rect y="196" width="480" height="8" fill="#8c877a"/>
    <g fill="#c9c2b2"><rect x="70" y="210" width="60" height="40" transform="rotate(-8 100 230)"/><rect x="120" y="230" width="70" height="44" transform="rotate(6 155 252)"/></g>
    <g fill="#e8e3d6"><rect x="200" y="218" width="44" height="58"/><rect x="250" y="226" width="44" height="52" transform="rotate(10 272 252)"/></g>
    <g fill="#b0583f"><rect x="310" y="250" width="40" height="10"/><rect x="318" y="238" width="40" height="10"/><rect x="306" y="262" width="40" height="10"/></g>
    ${bag(360, 216, 1.2, '#4a4f4c')}
    <path d="M60 270l40-20 30 25-50 15z" fill="#8f8a7d"/>
    ${label}`,
  drain: `
    <rect width="480" height="320" fill="#c8d1cc"/>
    <rect y="120" width="480" height="200" fill="#8e9894"/>
    <rect y="170" width="480" height="90" fill="#5d6a66"/>
    <rect y="200" width="480" height="60" fill="#4b6f75" opacity=".8"/>
    <g fill="#e5f0f4" opacity=".9"><rect x="80" y="196" width="40" height="16" rx="8" transform="rotate(-12 100 204)"/><rect x="250" y="206" width="44" height="16" rx="8" transform="rotate(8 272 214)"/></g>
    <g fill="#d6403a"><circle cx="160" cy="214" r="8"/></g>
    <path d="M300 200c20-10 40 6 60-2s30 10 40 4v20H300z" fill="#e8e6dd" opacity=".9"/>
    ${bag(380, 176, .9, '#2b2f2e')}
    ${label}`,
  generic: `
    <rect width="480" height="320" fill="#d5dbd8"/>
    <rect y="220" width="480" height="100" fill="#a3aca8"/>
    ${bag(150, 170, 1.6)}${bag(230, 186, 1.4, '#3a3f3d')}
    ${label}`,
}

const cache = {}

export function samplePhoto(name) {
  if (!cache[name]) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320">${SCENES[name] || SCENES.generic}</svg>`
    cache[name] = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  }
  return cache[name]
}

/** Resize a picked image file to a small JPEG data URL for localStorage. */
export function compressImage(file, maxSide = 900, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read the file.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('This file is not a supported image.'))
      img.onload = () => {
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}
