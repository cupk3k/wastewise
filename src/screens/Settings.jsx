import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import { Link } from '../router.jsx'
import { useStore } from '../store.jsx'
import { usePrefs } from '../prefs.jsx'
import { LANGUAGES, t } from '../i18n.js'
import { BLOCKS } from '../data/site.js'
import { PageHeader } from '../components/ui.jsx'

export default function Settings() {
  const { myBlock, setBlock, resetDemo } = useStore()
  const { lang, setLang, theme, setTheme } = usePrefs()
  const [done, setDone] = useState(false)

  return (
    <div className="page">
      <PageHeader title={t('settings.title')} back="/" />

      <section className="section">
        <h2>{t('settings.language')}</h2>
        <div className="segmented" role="radiogroup" aria-label={t('settings.language')}>
          {Object.values(LANGUAGES).map((l) => (
            <button
              key={l.code}
              role="radio"
              aria-checked={lang === l.code}
              className={`segmented__item ${lang === l.code ? 'segmented__item--on' : ''}`}
              onClick={() => setLang(l.code)}
              lang={l.code}
            >
              {l.name}
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <label className="switch-row">
          <span className="switch-row__text">
            <strong><Icon name="moon" size={18} /> {t('settings.dark')}</strong>
            <span className="muted">{t('settings.darkHelp')}</span>
          </span>
          <input
            type="checkbox"
            role="switch"
            className="switch"
            checked={theme === 'dark'}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          />
        </label>
      </section>

      <section className="section">
        <h2>{t('settings.yourBlock')}</h2>
        <p className="muted">{t('settings.blockHelp')}</p>
        <label className="field">
          <span className="visually-hidden">{t('settings.blockLabel')}</span>
          <select value={myBlock} onChange={(e) => setBlock(e.target.value)}>
            {BLOCKS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </label>
      </section>

      <section className="section">
        <h2>{t('settings.management')}</h2>
        <p className="muted">{t('settings.managementHelp')}</p>
        <Link to="/admin" className="btn btn--ghost btn--block"><Icon name="shield" size={18} /> {t('settings.openManagement')}</Link>
      </section>

      <section className="section">
        <h2>{t('settings.demo')}</h2>
        <p className="muted">{t('settings.demoHelp')}</p>
        <button
          className="btn btn--danger btn--block"
          onClick={() => {
            if (window.confirm(t('settings.resetConfirm'))) {
              resetDemo()
              setDone(true)
            }
          }}
        >
          <Icon name="refresh" size={18} /> {t('settings.reset')}
        </button>
        {done && <p className="ok-note" role="status">{t('settings.resetDone')}</p>}
      </section>

      <section className="section about">
        <h2>{t('settings.about')}</h2>
        <p>{t('settings.aboutText')}</p>
      </section>
    </div>
  )
}
