import Icon from '../components/Icon.jsx'
import { announcementById } from '../data/announcements.js'
import { formatDate, PageHeader, SampleTag } from '../components/ui.jsx'
import { Link } from '../router.jsx'
import { t } from '../i18n.js'
import NotFound from './NotFound.jsx'

export default function Announcement({ id }) {
  const a = announcementById(id)
  if (!a) return <NotFound />
  return (
    <div className="page">
      <PageHeader title={t('announcement.title')} back="/" />
      <article className="article">
        <div className="article__meta">
          <span className="notice__kind">{a.kind}</span>
          <SampleTag />
        </div>
        <h2 className="article__title">{a.title}</h2>
        <p className="muted">
          {t('announcement.posted', { date: formatDate(new Date(a.date), { day: 'numeric', month: 'long', year: 'numeric' }) })}
        </p>

        {a.event && (
          <dl className="event-box">
            <div>
              <dt><Icon name="calendar" size={18} /> {t('announcement.when')}</dt>
              <dd>{a.event.when}</dd>
            </div>
            <div>
              <dt><Icon name="pin" size={18} /> {t('announcement.where')}</dt>
              <dd>{a.event.where}</dd>
            </div>
          </dl>
        )}

        {a.body.map((p, i) => (
          <p key={i} className="article__p">{p}</p>
        ))}

        {a.action && (
          <Link to={a.action.to} className={`btn ${a.action.primary ? 'btn--primary' : 'btn--ghost'} btn--block`}>
            {t(`announcement.${a.action.label}`)}
          </Link>
        )}
      </article>
    </div>
  )
}
