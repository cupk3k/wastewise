import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from './router.jsx'
import { StoreProvider } from './store.jsx'
import { PrefsProvider } from './prefs.jsx'
import App from './App.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider>
      <StoreProvider>
        <PrefsProvider>
          <App />
        </PrefsProvider>
      </StoreProvider>
    </RouterProvider>
  </StrictMode>
)

// Offline support (production builds only, so dev reloads stay fresh).
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => navigator.serviceWorker.ready)
      .then((reg) => {
        const urls = performance.getEntriesByType('resource').map((e) => e.name)
        reg.active?.postMessage({ type: 'cache', urls })
      })
      .catch(() => {})
  })
}
