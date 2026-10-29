// "Add to Home Screen" guide. Opens by itself on phones whenever WasteWise is used in the
// browser instead of from the home screen icon; once added, it never shows again there.
// "Not now" hides it until the next visit. Settings can open it again any time.
import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { t } from '../i18n.js'

const DISMISS_KEY = 'wastewise.installSheet.dismissed' // sessionStorage: one "Not now" per visit
const OPEN_EVENT = 'wastewise:install-guide'

// Chrome on Android offers its own install prompt; keep it so "Install now" can use it.
let deferredPrompt = null
if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    window.dispatchEvent(new Event('wastewise:install-ready'))
  })
}

export function isStandalone() {
  return window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true
}

export function platform() {
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios'
  if (/Android/.test(ua)) return 'android'
  return 'other'
}

export function openInstallGuide() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

function dismissedThisVisit() {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    return false
  }
}

export default function InstallSheet() {
  const os = platform()
  const [open, setOpen] = useState(() => os !== 'other' && !isStandalone() && !dismissedThisVisit())
  const [canPrompt, setCanPrompt] = useState(!!deferredPrompt)
  const sheetRef = useRef(null)

  useEffect(() => {
    const show = () => setOpen(!isStandalone())
    const ready = () => setCanPrompt(true)
    const installed = () => setOpen(false)
    window.addEventListener(OPEN_EVENT, show)
    window.addEventListener('wastewise:install-ready', ready)
    window.addEventListener('appinstalled', installed)
    return () => {
      window.removeEventListener(OPEN_EVENT, show)
      window.removeEventListener('wastewise:install-ready', ready)
      window.removeEventListener('appinstalled', installed)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    sheetRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && notNow()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function notNow() {
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {
      /* ignore */
    }
    setOpen(false)
  }

  async function installNow() {
    const prompt = deferredPrompt
    deferredPrompt = null
    setCanPrompt(false)
    if (!prompt) return
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') setOpen(false)
  }

  if (!open) return null

  const lists = os === 'other' ? ['ios', 'android'] : [os]

  return (
    <div className="sheet-backdrop" onClick={notNow}>
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-title"
        tabIndex={-1}
        ref={sheetRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="icon-btn sheet__close" onClick={notNow} aria-label={t('install.close')}>
          <Icon name="x" />
        </button>
        <div className="sheet__head">
          <PhoneArt os={lists[0]} />
          <div>
            <h2 id="install-title">{t('install.title')}</h2>
            <p className="muted">{t('install.lead')}</p>
          </div>
        </div>

        {lists.map((which) => (
          <div key={which}>
            {lists.length > 1 && <h3 className="sheet__os">{which === 'ios' ? 'iPhone / iPad' : 'Android'}</h3>}
            <ol className="sheet__steps">
              {t(which === 'ios' ? 'install.iosSteps' : 'install.androidSteps').map((step, i) => (
                <li key={i}><StepText text={step} /></li>
              ))}
            </ol>
            {which === 'ios' && <p className="footnote">{t('install.iosOther')}</p>}
          </div>
        ))}

        {canPrompt && os === 'android' && (
          <button className="btn btn--primary btn--block" onClick={installNow}>{t('install.installNow')}</button>
        )}
        <button className="btn btn--ghost btn--block" onClick={notNow}>{t('install.notNow')}</button>
      </div>
    </div>
  )
}

// Swap {share} and {menu} in a step for the icon the person will see on their phone.
function StepText({ text }) {
  return text.split(/(\{share\}|\{menu\})/).map((part, i) => {
    if (part === '{share}') return <span key={i} className="step-icon"><Icon name="share" size={16} /></span>
    if (part === '{menu}') return <span key={i} className="step-icon"><Icon name="dots" size={16} /></span>
    return part
  })
}

// Small phone drawing with the button to tap circled.
function PhoneArt({ os }) {
  const ios = os === 'ios'
  return (
    <svg className="sheet__art" viewBox="0 0 80 120" role="img" aria-label={t('install.imageAlt')}>
      <rect x="6" y="2" width="68" height="116" rx="12" className="art-phone" />
      <rect x="11" y="10" width="58" height="100" rx="6" className="art-screen" />
      <rect x="11" y="10" width="58" height="13" rx="6" className="art-bar" />
      <rect x="17" y="30" width="34" height="5" rx="2.5" className="art-line" />
      <rect x="17" y="40" width="46" height="18" rx="4" className="art-card" />
      <rect x="17" y="63" width="46" height="5" rx="2.5" className="art-line" />
      <rect x="17" y="72" width="30" height="5" rx="2.5" className="art-line" />
      {ios ? (
        <>
          <rect x="11" y="96" width="58" height="14" rx="6" className="art-bar" />
          <circle cx="40" cy="103" r="8.5" className="art-ring" />
          <g transform="translate(34 97) scale(.5)" className="art-icon">
            <path d="M12 3v12" /><path d="m8 7 4-4 4 4" /><path d="M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1" />
          </g>
        </>
      ) : (
        <>
          <circle cx="61" cy="16.5" r="7" className="art-ring" />
          <g className="art-dots">
            <circle cx="61" cy="13" r="1.2" /><circle cx="61" cy="16.5" r="1.2" /><circle cx="61" cy="20" r="1.2" />
          </g>
        </>
      )}
    </svg>
  )
}
