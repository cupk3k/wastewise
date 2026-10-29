import Icon from './Icon.jsx'
import { Link, useBack } from '../router.jsx'
import { statusOf } from '../data/reports.js'
import { samplePhoto } from './samplePhotos.js'

export function PageHeader({ title, back, right, subtitle }) {
  const goBack = useBack(back || '/')
  return (
    <header className="page-header">
      {back !== undefined ? (
        <button className="icon-btn" onClick={goBack} aria-label="Go back">
          <Icon name="back" />
        </button>
      ) : (
        <span className="icon-btn-spacer" />
      )}
      <div className="page-header__titles">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {right || <span className="icon-btn-spacer" />}
    </header>
  )
}

export function StatusChip({ status, report }) {
  const s = status || statusOf(report)
  const cls = s === 'Resolved' ? 'resolved' : s === 'Under review' ? 'review' : 'submitted'
  return <span className={`status status--${cls}`}>{s}</span>
}

export function SampleTag({ children = 'Sample' }) {
  return (
    <span className="sample-tag" title="Simulated data for the prototype — not verified service information">
      {children}
    </span>
  )
}

export function RowLink({ to, children, className = '' }) {
  return (
    <Link to={to} className={`row-link ${className}`}>
      <div className="row-link__body">{children}</div>
      <Icon name="chevron" size={18} className="row-link__chev" />
    </Link>
  )
}

export function Photo({ src, alt, className = '' }) {
  if (!src) return null
  const url = src.startsWith('sample:') ? samplePhoto(src.slice(7)) : src
  return <img className={`photo ${className}`} src={url} alt={alt} />
}

export function formatDateTime(ms) {
  return new Date(ms).toLocaleString('en-MY', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function timeAgo(ms) {
  const mins = Math.round((Date.now() - ms) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs} h ago`
  const days = Math.round(hrs / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

export function formatDate(d, opts = { weekday: 'long', day: 'numeric', month: 'long' }) {
  return d.toLocaleDateString('en-MY', opts)
}
