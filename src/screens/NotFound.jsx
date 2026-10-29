import { Link } from '../router.jsx'
import { PageHeader } from '../components/ui.jsx'

export default function NotFound() {
  return (
    <div className="page">
      <PageHeader title="Page not found" back="/" />
      <div className="empty">
        <p>This page doesn't exist or the item was removed when the demo data was reset.</p>
        <Link to="/" className="btn btn--primary">Go to home</Link>
      </div>
    </div>
  )
}
