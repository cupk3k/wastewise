// "Add to Home Screen" gate. On phones and tablets WasteWise only works from the home screen
// icon: opened in the browser, this sheet covers the app and can't be closed. Tabs switch
// between the iPhone and Android steps (the phone's own one is picked first). Computers are
// not blocked, so the app can still be shown on a laptop.
import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { LANGUAGES, t } from '../i18n.js'
import { usePrefs } from '../prefs.jsx'

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

/** True when the app must be added to the home screen before it can be used. */
export function useInstallGate() {
  const [blocked, setBlocked] = useState(() => platform() !== 'other' && !isStandalone())
  useEffect(() => {
    const check = () => setBlocked(platform() !== 'other' && !isStandalone())
    const mq = window.matchMedia?.('(display-mode: standalone)')
    mq?.addEventListener?.('change', check)
    window.addEventListener('appinstalled', check)
    return () => {
      mq?.removeEventListener?.('change', check)
      window.removeEventListener('appinstalled', check)
    }
  }, [])
  return blocked
}

export default function InstallSheet() {
  const os = platform()
  const [tab, setTab] = useState(os === 'android' ? 'android' : 'ios')
  const [canPrompt, setCanPrompt] = useState(!!deferredPrompt)
  const [installed, setInstalled] = useState(false)
  const { lang, setLang } = usePrefs()
  const other = LANGUAGES[lang === 'en' ? 'ms' : 'en']
  const sheetRef = useRef(null)

  useEffect(() => {
    sheetRef.current?.focus()
    const ready = () => setCanPrompt(true)
    window.addEventListener('wastewise:install-ready', ready)
    return () => window.removeEventListener('wastewise:install-ready', ready)
  }, [])

  async function installNow() {
    const prompt = deferredPrompt
    deferredPrompt = null
    setCanPrompt(false)
    if (!prompt) return
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') setInstalled(true)
  }

  return (
    <div className="sheet-backdrop">
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="install-title" tabIndex={-1} ref={sheetRef}>
        <button
          className="lang-btn sheet__lang"
          onClick={() => setLang(other.code)}
          aria-label={`${other.short}, ${t('home.switchLanguage')}`}
          lang={other.code}
        >
          {other.short}
        </button>
        <div className="sheet__head">
          <PhoneArt os={tab} />
          <div>
            <h2 id="install-title">{t('install.title')}</h2>
            <p className="muted">{t('install.lead')}</p>
          </div>
        </div>

        <div className="segmented sheet__tabs" role="tablist" aria-label={t('install.tabsLabel')}>
          {['ios', 'android'].map((which) => (
            <button
              key={which}
              role="tab"
              id={`install-tab-${which}`}
              aria-selected={tab === which}
              aria-controls="install-steps"
              className={`segmented__item ${tab === which ? 'segmented__item--on' : ''}`}
              onClick={() => setTab(which)}
            >
              {t(`install.tab.${which}`)}
            </button>
          ))}
        </div>

        <div id="install-steps" role="tabpanel" aria-labelledby={`install-tab-${tab}`}>
          <ol className="sheet__steps">
            {t(tab === 'ios' ? 'install.iosSteps' : 'install.androidSteps').map((step, i) => (
              <li key={`${tab}${i}`}><StepText text={step} /></li>
            ))}
          </ol>
          <p className="footnote">{t(tab === 'ios' ? 'install.iosOther' : 'install.androidOther')}</p>
        </div>

        {tab === 'android' && os === 'android' && canPrompt && (
          <button className="btn btn--primary btn--block" onClick={installNow}>{t('install.installNow')}</button>
        )}
        {installed && <p className="ok-note" role="status">{t('install.openFromIcon')}</p>}
        <p className="sheet__after">{t('install.after')}</p>
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
