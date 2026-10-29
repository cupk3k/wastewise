import Icon from '../components/Icon.jsx'
import { Link } from '../router.jsx'
import { useStore } from '../store.jsx'
import { categoryById, createdAt, statusOf, STATUSES } from '../data/reports.js'
import { blockById } from '../data/site.js'
import { formatDateTime, PageHeader, Photo, StatusChip, timeAgo } from '../components/ui.jsx'
import NotFound from './NotFound.jsx'

export function ReportSent({ id }) {
  const { reports } = useStore()
  const r = reports.find((x) => x.id === id)
  if (!r) return <NotFound />
  return (
    <div className="page page--center">
      <div className="sent">
        <span className="sent__icon"><Icon name="check" size={40} stroke={2.5} /></span>
        <h1>Report sent</h1>
        <p>Building management will review it. You can follow its progress in My reports.</p>
        <div className="sent__ref">
          <span>Reference number</span>
          <strong>{r.id}</strong>
        </div>
        <dl className="sent__summary">
          <div><dt>Problem</dt><dd>{categoryById(r.category)?.name}</dd></div>
          <div><dt>Location</dt><dd>{blockById(r.block)?.name}, {r.spot}</dd></div>
          <div><dt>Status</dt><dd><StatusChip report={r} /></dd></div>
        </dl>
        <Link to={`/reports/${r.id}`} className="btn btn--primary btn--block" replace>Track this report</Link>
        <Link to="/" className="btn btn--ghost btn--block" replace>Back to home</Link>
      </div>
    </div>
  )
}

export function MyReports() {
  const { reports } = useStore()
  const mine = reports.filter((r) => r.mine).sort((a, b) => createdAt(b) - createdAt(a))

  return (
    <div className="page">
      <PageHeader title="My reports" subtitle={`${mine.length} report${mine.length === 1 ? '' : 's'}`} />
      {mine.length === 0 ? (
        <div className="empty">
          <p>You haven't reported anything yet. Seen an overflowing bin or dumped rubbish?</p>
          <Link to="/report" className="btn btn--primary">Report a problem</Link>
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
              <span className="muted">{blockById(r.block)?.name}, {r.spot}</span>
              <Progress status={statusOf(r)} />
              <span className="report-card__time">Sent {timeAgo(createdAt(r))}</span>
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
    <ol className="progress" aria-label={`Progress: ${status}`}>
      {STATUSES.map((s, i) => (
        <li key={s} className={i <= idx ? 'progress__step progress__step--done' : 'progress__step'}>
          <span className="progress__bar" />
          <span className="progress__label">{s}</span>
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
          <p>{h.note}</p>
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
      <Photo src={r.photo} alt="Reported problem" className="photo--wide" />
      <dl className="facts">
        <div><dt>Problem</dt><dd>{categoryById(r.category)?.name}</dd></div>
        <div><dt>Location</dt><dd>{blockById(r.block)?.name}, {r.spot}</dd></div>
        <div><dt>Handled by</dt><dd>{r.assignee}</dd></div>
        <div><dt>Description</dt><dd>{r.description}</dd></div>
      </dl>
      <section className="section">
        <h2>Updates</h2>
        <Timeline history={r.history} />
      </section>
    </div>
  )
}
