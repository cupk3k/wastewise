import Icon from '../components/Icon.jsx'
import { announcementById } from '../data/announcements.js'
import { formatDate, PageHeader, SampleTag } from '../components/ui.jsx'
import { Link } from '../router.jsx'
import NotFound from './NotFound.jsx'

export default function Announcement({ id }) {
  const a = announcementById(id)
  if (!a) return <NotFound />
  return (
    <div className="page">
      <PageHeader title="Announcement" back="/" />
      <article className="article">
        <div className="article__meta">
          <span className="notice__kind">{a.kind}</span>
          <SampleTag />
        </div>
        <h2 className="article__title">{a.title}</h2>
        <p className="muted">Posted {formatDate(new Date(a.date), { day: 'numeric', month: 'long', year: 'numeric' })} by Desa Mentari JMB</p>

        {a.event && (
          <dl className="event-box">
            <div>
              <dt><Icon name="calendar" size={18} /> When</dt>
              <dd>{a.event.when}</dd>
            </div>
            <div>
              <dt><Icon name="pin" size={18} /> Where</dt>
              <dd>{a.event.where}</dd>
            </div>
          </dl>
        )}

        {a.body.map((p, i) => (
          <p key={i} className="article__p">{p}</p>
        ))}

        {a.id === 'dengue' && (
          <Link to="/report" className="btn btn--primary btn--block">Report standing water</Link>
        )}
        {a.id === 'ewaste-drive' && (
          <Link to="/guide/ewaste" className="btn btn--ghost btn--block">What counts as e-waste?</Link>
        )}
        {a.id === 'bulky-reminder' && (
          <Link to="/schedule" className="btn btn--ghost btn--block">See pickup dates</Link>
        )}
      </article>
    </div>
  )
}
