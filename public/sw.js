// WasteWise service worker — makes the app work offline after the first visit.
// Pages: network first, fall back to the cached app shell.
// Assets and fonts: serve from cache, refresh in the background.
const CACHE = 'wastewise-v2'
const isCacheable = (url) =>
  url.origin === self.location.origin ||
  url.hostname === 'fonts.googleapis.com' ||
  url.hostname === 'fonts.gstatic.com'
const SHELL = ['/', '/index.html', '/manifest.webmanifest', '/icon.svg', '/icon-192.png', '/icon-512.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then(async (c) => {
        await c.addAll(SHELL)
        // The built JS and CSS have hashed names, so read them from the page itself.
        const html = await (await c.match('/index.html')).text()
        await c.addAll([...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((m) => m[1]))
      })
      .then(() => self.skipWaiting())
  )
})

// The first visit loads before this worker exists, so the page sends what it loaded (fonts too).
self.addEventListener('message', (event) => {
  if (event.data?.type !== 'cache' || !Array.isArray(event.data.urls)) return
  const urls = event.data.urls.filter((u) => typeof u === 'string' && isCacheable(new URL(u)))
  event.waitUntil(
    caches.open(CACHE).then((c) =>
      Promise.all(urls.map((u) => c.match(u).then((hit) => hit || c.add(u).catch(() => {}))))
    )
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put('/index.html', copy))
          return res
        })
        .catch(() => caches.match('/index.html'))
    )
    return
  }

  if (!isCacheable(url)) return

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      // ignoreVary: a module script asks with an Origin header the pre-cached copy didn't have.
      const cached = await cache.match(req, { ignoreVary: true })
      const network = fetch(req)
        .then((res) => {
          if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone())
          return res
        })
        .catch(() => cached)
      return cached || network
    })
  )
})
