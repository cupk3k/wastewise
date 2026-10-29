import { Link } from '../router.jsx'
import { PageHeader } from '../components/ui.jsx'
import { t } from '../i18n.js'

export default function NotFound() {
  return (
    <div className="page">
      <PageHeader title={t('notFound.title')} back="/" />
      <div className="empty">
        <p>{t('notFound.body')}</p>
        <Link to="/" className="btn btn--primary">{t('notFound.home')}</Link>
      </div>
    </div>
  )
}
