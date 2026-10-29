// Per-device preferences (language, dark mode). Kept apart from the demo data,
// so "Reset demo data" doesn't change them.
import { createContext, Fragment, useContext, useLayoutEffect, useMemo, useState } from 'react'
import { setLanguage } from './i18n.js'

const KEY = 'wastewise.prefs.v1'
const PrefsContext = createContext(null)

export function loadPrefs() {
  try {
    const p = JSON.parse(localStorage.getItem(KEY) || '{}')
    return { lang: p.lang === 'ms' ? 'ms' : 'en', theme: p.theme === 'dark' ? 'dark' : 'light' }
  } catch {
    return { lang: 'en', theme: 'light' }
  }
}

export function PrefsProvider({ children }) {
  const [prefs, setPrefs] = useState(loadPrefs)
  setLanguage(prefs.lang) // before the children render, so t() is already in the right language

  useLayoutEffect(() => {
    const root = document.documentElement
    root.lang = prefs.lang
    root.dataset.theme = prefs.theme
    try {
      localStorage.setItem(KEY, JSON.stringify(prefs))
    } catch {
      /* private mode: preferences last until the tab closes */
    }
  }, [prefs])

  const value = useMemo(
    () => ({
      ...prefs,
      setLang: (lang) => setPrefs((p) => ({ ...p, lang })),
      setTheme: (theme) => setPrefs((p) => ({ ...p, theme })),
    }),
    [prefs]
  )

  // Re-mount the app on a language change so every screen re-reads its text.
  return (
    <PrefsContext.Provider value={value}>
      <Fragment key={prefs.lang}>{children}</Fragment>
    </PrefsContext.Provider>
  )
}

export function usePrefs() {
  return useContext(PrefsContext)
}
