import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import { Link } from '../router.jsx'
import { useStore } from '../store.jsx'
import { ASSIGNEES, categoryList, categoryById, createdAt, statusOf, STATUSES, updatedAt } from '../data/reports.js'
import { t, tl } from '../i18n.js'
import { blockById } from '../data/site.js'
import { PageHeader, Photo, StatusChip, timeAgo } from '../components/ui.jsx'
import { Timeline } from '../screens/MyReports.jsx'
import NotFound from '../screens/NotFound.jsx'

export function AdminDashboard() {
  const { reports } = useStore()
  const [status, setStatus] = useState('All')
  const [cat, setCat] = useState('all')

  const counts = Object.fromEntries(STATUSES.map((s) => [s, reports.filter((r) => statusOf(r) === s).length]))
  const list = reports
    .filter((r) => status === 'All' || statusOf(r) === status)
    .filter((r) => cat === 'all' || r.category === cat)
    .sort((a, b) => {
      // open reports first, newest first within each group
      const ra = statusOf(a) === 'Resolved' ? 1 : 0
      const rb = statusOf(b) === 'Resolved' ? 1 : 0
      return ra - rb || createdAt(b) - createdAt(a)
    })

  return (
    <div className="page">
      <header className="admin-top">
        <Link to="/" className="admin-top__back"><Icon name="back" size={18} /> {t('admin.residentApp')}</Link>
        <h1>{t('admin.title')}</h1>
        <p className="muted">{t('admin.subtitle')}</p>
      </header>

      <div className="tally" role="group" aria-label={t('admin.statusFilter')}>
        <button className={`tally__item ${status === 'All' ? 'tally__item--on' : ''}`} onClick={() => setStatus('All')} aria-pressed={status === 'All'}>
          <span className="tally__num">{reports.length}</span>
          <span>{t('admin.all')}</span>
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            className={`tally__item tally__item--${s === 'Resolved' ? 'resolved' : s === 'Under review' ? 'review' : 'submitted'} ${status === s ? 'tally__item--on' : ''}`}
            onClick={() => setStatus(s)}
            aria-pressed={status === s}
          >
            <span className="tally__num">{counts[s]}</span>
            <span>{tl(s)}</span>
          </button>
        ))}
      </div>

      <label className="field field--inline">
        <span>{t('admin.problemType')}</span>
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="all">{t('admin.allTypes')}</option>
          {categoryList().map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </label>

      {list.length === 0 ? (
        <p className="empty-inline">{t('admin.noMatch')}</p>
      ) : (
        <div className="admin-list">
          {list.map((r) => (
            <Link key={r.id} to={`/admin/reports/${r.id}`} className={`admin-row ${statusOf(r) === 'Resolved' ? 'admin-row--done' : ''}`}>
              <div className="admin-row__top">
                <span className="report-card__id">{r.id}</span>
                <StatusChip report={r} />
              </div>
              <strong>{categoryById(r.category)?.name}</strong>
              <span className="admin-row__loc">{blockById(r.block)?.name}, {tl(r.spot)}</span>
              <span className="admin-row__desc">{tl(r.description)}</span>
              <span className="admin-row__meta">
                {r.photo && <span className="has-photo"><Icon name="image" size={15} /> {t('admin.photo')}</span>}
                <span>{t('admin.reported', { ago: timeAgo(createdAt(r)) })}</span>
                <span>{tl(r.assignee)}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function AdminReport({ id }) {
  const { reports, setStatus, setAssignee } = useStore()
  const r = reports.find((x) => x.id === id)
  const [note, setNote] = useState('')
  const [flash, setFlash] = useState('')
  if (!r) return <NotFound />

  const current = statusOf(r)
  const nextActions = STATUSES.filter((s) => STATUSES.indexOf(s) > STATUSES.indexOf(current))

  function apply(s) {
    setStatus(r.id, s, note)
    setNote('')
    setFlash(t(`admin.flash.${s}`))
  }

  return (
    <div className="page">
      <PageHeader title={r.id} back="/admin" subtitle={t('admin.lastUpdate', { ago: timeAgo(updatedAt(r)) })} />
      <div className="admin-status">
        <span>{t('admin.currentStatus')}</span>
        <StatusChip report={r} />
      </div>

      <Photo src={r.photo} alt={t('admin.photoAlt')} className="photo--wide" />
      <dl className="facts">
        <div><dt>{t('admin.problem')}</dt><dd>{categoryById(r.category)?.name}</dd></div>
        <div><dt>{t('admin.location')}</dt><dd>{blockById(r.block)?.name}, {tl(r.spot)}</dd></div>
        <div><dt>{t('admin.description')}</dt><dd>{tl(r.description)}</dd></div>
        <div><dt>{t('admin.reportedBy')}</dt><dd>{t(r.mine ? 'admin.residentDevice' : 'admin.residentSimulated')}</dd></div>
      </dl>

      <section className="section panel">
        <h2>{t('admin.handle')}</h2>
        <label className="field">
          <span>{t('admin.assignedTo')}</span>
          <select value={r.assignee} onChange={(e) => setAssignee(r.id, e.target.value)}>
            {ASSIGNEES.map((a) => <option key={a} value={a}>{tl(a)}</option>)}
          </select>
        </label>

        {nextActions.length > 0 ? (
          <>
            <label className="field">
              <span>{t('admin.note')} <span className="optional">{t('common.optional')}</span></span>
              <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder={t('admin.notePlaceholder')} />
            </label>
            <div className="action-row">
              {nextActions.map((s) => (
                <button key={s} className={`btn ${s === 'Resolved' ? 'btn--primary' : 'btn--amber'}`} onClick={() => apply(s)}>
                  {t(`admin.mark.${s}`)}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="ok-note">{t('admin.resolved')}</p>
        )}
        {flash && <p className="ok-note" role="status">{flash}</p>}
      </section>

      <section className="section">
        <h2>{t('admin.history')}</h2>
        <Timeline history={r.history} />
      </section>
    </div>
  )
}
