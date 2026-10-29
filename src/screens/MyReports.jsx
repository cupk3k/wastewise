import Icon from '../components/Icon.jsx'
import { Link } from '../router.jsx'
import { useStore } from '../store.jsx'
import { categoryById, createdAt, statusOf, STATUSES } from '../data/reports.js'
import { blockById } from '../data/site.js'
import { formatDateTime, PageHeader, Photo, StatusChip, timeAgo } from '../components/ui.jsx'
import { t, tl } from '../i18n.js'
import NotFound from './NotFound.jsx'

export function ReportSent({ id }) {
  const { reports } = useStore()
  const r = reports.find((x) => x.id === id)
  if (!r) return <NotFound />
  return (
    <div className="page page--center">
      <div className="sent">
        <span className="sent__icon"><Icon name="check" size={40} stroke={2.5} /></span>
        <h1>{t('sent.title')}</h1>
        <p>{t('sent.body')}</p>
        <div className="sent__ref">
          <span>{t('sent.reference')}</span>
          <strong>{r.id}</strong>
        </div>
        <dl className="sent__summary">
          <div><dt>{t('sent.problem')}</dt><dd>{categoryById(r.category)?.name}</dd></div>
          <div><dt>{t('sent.location')}</dt><dd>{blockById(r.block)?.name}, {tl(r.spot)}</dd></div>
          <div><dt>{t('sent.status')}</dt><dd><StatusChip report={r} /></dd></div>
        </dl>
        <Link to={`/reports/${r.id}`} className="btn btn--primary btn--block" replace>{t('sent.track')}</Link>
        <Link to="/" className="btn btn--ghost btn--block" replace>{t('sent.home')}</Link>
      </div>
    </div>
  )
}

export function MyReports() {
  const { reports } = useStore()
  const mine = reports.filter((r) => r.mine).sort((a, b) => createdAt(b) - createdAt(a))

  return (
    <div className="page">
      <PageHeader title={t('reports.title')} subtitle={t(mine.length === 1 ? 'reports.countOne' : 'reports.countOther', { n: mine.length })} />
      {mine.length === 0 ? (
        <div className="empty">
          <p>{t('reports.empty')}</p>
          <Link to="/report" className="btn btn--primary">{t('reports.reportButton')}</Link>
        </div>
      ) : (
        <div className="stack">
          {mine.map((r) => (
            <Link key={r.id} to={`/reports/${r.id}`} className="report-card">
              <div className="report-card__top">
                <span className="report-card__id">{r.id}</span>
                <StatusChip report={r} />
              </div>
              <strong>{categoryById(r.category)?.name}</strong>
              <span className="muted">{blockById(r.block)?.name}, {tl(r.spot)}</span>
              <Progress status={statusOf(r)} />
              <span className="report-card__time">{t('reports.sent', { ago: timeAgo(createdAt(r)) })}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Progress({ status }) {
  const idx = STATUSES.indexOf(status)
  return (
    <ol className="progress" aria-label={t('reports.progress', { status: tl(status) })}>
      {STATUSES.map((s, i) => (
        <li key={s} className={i <= idx ? 'progress__step progress__step--done' : 'progress__step'}>
          <span className="progress__bar" />
          <span className="progress__label">{tl(s)}</span>
        </li>
      ))}
    </ol>
  )
}

export function Timeline({ history }) {
  return (
    <ol className="timeline">
      {[...history].reverse().map((h, i) => (
        <li key={i} className={`timeline__item ${i === 0 ? 'timeline__item--latest' : ''}`}>
          <div className="timeline__head">
            <StatusChip status={h.status} />
            <time>{formatDateTime(h.at)}</time>
          </div>
          <p>{tl(h.note)}</p>
        </li>
      ))}
    </ol>
  )
}

export function ReportDetail({ id }) {
  const { reports } = useStore()
  const r = reports.find((x) => x.id === id)
  if (!r || !r.mine) return <NotFound />
  return (
    <div className="page">
      <PageHeader title={r.id} back="/reports" />
      <Progress status={statusOf(r)} />
      <Photo src={r.photo} alt={t('reports.photoAlt')} className="photo--wide" />
      <dl className="facts">
        <div><dt>{t('reports.problem')}</dt><dd>{categoryById(r.category)?.name}</dd></div>
        <div><dt>{t('reports.location')}</dt><dd>{blockById(r.block)?.name}, {tl(r.spot)}</dd></div>
        <div><dt>{t('reports.handledBy')}</dt><dd>{tl(r.assignee)}</dd></div>
        <div><dt>{t('reports.description')}</dt><dd>{tl(r.description)}</dd></div>
      </dl>
      <section className="section">
        <h2>{t('reports.updates')}</h2>
        <Timeline history={r.history} />
      </section>
    </div>
  )
}
