import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from './router.jsx'
import { StoreProvider } from './store.jsx'
import App from './App.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </RouterProvider>
  </StrictMode>
)

// Offline support (production builds only, so dev reloads stay fresh).
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
