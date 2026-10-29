import Icon from '../components/Icon.jsx'
import { Link } from '../router.jsx'
import { useStore } from '../store.jsx'
import { usePrefs } from '../prefs.jsx'
import { LANGUAGES, t, tl } from '../i18n.js'
import { announcementList } from '../data/announcements.js'
import { nextCollection, scheduleList, nextRun } from '../data/places.js'
import { blockById } from '../data/site.js'
import { statusOf } from '../data/reports.js'
import { formatDate, SampleTag, StatusChip } from '../components/ui.jsx'

function relativeDay(date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.round((date - today) / 86400000)
  if (diff === 0) return t('time.today')
  if (diff === 1) return t('time.tomorrow')
  return formatDate(date, { weekday: 'long' })
}

export default function Home() {
  const { myBlock, reports } = useStore()
  const { lang, setLang } = usePrefs()
  const other = LANGUAGES[lang === 'en' ? 'ms' : 'en']
  const next = nextCollection()
  const block = blockById(myBlock)
  const openMine = reports.filter((r) => r.mine && statusOf(r) !== 'Resolved')
  const recycling = scheduleList().find((s) => s.id === 'recycling')
  const nextRecycling = nextRun(recycling)

  return (
    <div className="page page--home">
      <header className="home-top">
        <div>
          <p className="home-top__place">{t('home.place', { block: block?.name })}</p>
          <h1 className="home-top__brand">WasteWise</h1>
        </div>
        <div className="home-top__actions">
          <button
            className="lang-btn"
            onClick={() => setLang(other.code)}
            aria-label={`${other.short}, ${t('home.switchLanguage')}`}
            lang={other.code}
          >
            {other.short}
          </button>
          <Link to="/settings" className="icon-btn icon-btn--soft" aria-label={t('home.settings')}>
            <Icon name="settings" />
          </Link>
        </div>
      </header>

      {next && (
        <Link to="/schedule" className="collection-board">
          <div className="collection-board__head">
            <span>{t('home.nextCollection')}</span>
            <SampleTag>{t('common.sampleSchedule')}</SampleTag>
          </div>
          <p className="collection-board__day">{relativeDay(next.date)}</p>
          <p className="collection-board__what">
            {t('home.what', { name: next.item.name, time: next.item.time.toLowerCase() })}
          </p>
          <p className="collection-board__date">{formatDate(next.date)}</p>
          <div className="collection-board__foot">
            <span>{t('home.recyclablesNext', { date: formatDate(nextRecycling, { weekday: 'short', day: 'numeric', month: 'short' }) })}</span>
            <span className="collection-board__more">{t('home.fullSchedule')} <Icon name="chevron" size={16} /></span>
          </div>
        </Link>
      )}

      <section className="quick" aria-label={t('home.shortcuts')}>
        <Link to="/guide" className="quick__item">
          <span className="quick__icon quick__icon--sort"><Icon name="sort" /></span>
          <span>{t('home.whereGo')}</span>
        </Link>
        <Link to="/recycle" className="quick__item">
          <span className="quick__icon quick__icon--recycle"><Icon name="recycle" /></span>
          <span>{t('home.dropOff')}</span>
        </Link>
        <Link to="/report" className="quick__item">
          <span className="quick__icon quick__icon--report"><Icon name="report" /></span>
          <span>{t('home.report')}</span>
        </Link>
      </section>

      {openMine.length > 0 && (
        <section className="section">
          <div className="section__head">
            <h2>{t('home.openReports')}</h2>
            <Link to="/reports" className="text-link">{t('home.seeAll')}</Link>
          </div>
          <div className="stack">
            {openMine.slice(0, 2).map((r) => (
              <Link key={r.id} to={`/reports/${r.id}`} className="mini-report">
                <span className="mini-report__id">{r.id}</span>
                <span className="mini-report__text">{tl(r.description)}</span>
                <StatusChip report={r} />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="section__head">
          <h2>{t('home.announcements')}</h2>
        </div>
        <div className="notice-list">
          {announcementList().map((a) => (
            <Link key={a.id} to={`/announcements/${a.id}`} className={`notice notice--${a.id}`}>
              <span className="notice__kind">{a.kind}</span>
              <span className="notice__title">{a.title}</span>
              <span className="notice__date">
                {formatDate(new Date(a.date), { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </Link>
          ))}
        </div>
        <p className="footnote">{t('home.announcementsNote')}</p>
      </section>
    </div>
  )
}
