import Icon from './Icon.jsx'
import { Link, usePath } from '../router.jsx'
import { useStore } from '../store.jsx'

const TABS = [
  { to: '/', label: 'Home', icon: 'home', match: (p) => p === '/' || p.startsWith('/announcements') || p.startsWith('/schedule') },
  { to: '/guide', label: 'Sort', icon: 'sort', match: (p) => p.startsWith('/guide') },
  { to: '/report', label: 'Report', icon: 'report', match: (p) => p.startsWith('/report') && !p.startsWith('/reports'), primary: true },
  { to: '/recycle', label: 'Recycle', icon: 'recycle', match: (p) => p.startsWith('/recycle') },
  { to: '/reports', label: 'My reports', icon: 'list', match: (p) => p.startsWith('/reports') },
]

export function DemoBanner({ admin }) {
  return (
    <div className={`demo-banner ${admin ? 'demo-banner--admin' : ''}`} role="note">
      {admin ? 'Management view prototype with simulated reports' : 'Prototype with simulated data'}
    </div>
  )
}

export function ResidentShell({ children }) {
  const path = usePath()
  const { saveError } = useStore()
  return (
    <div className="shell">
      <DemoBanner />
      {saveError && <div className="save-error">{saveError}</div>}
      <main className="shell__main">{children}</main>
      <nav className="tabbar" aria-label="Main">
        {TABS.map((t) => {
          const active = t.match(path)
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`tab ${active ? 'tab--active' : ''} ${t.primary ? 'tab--primary' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <span className="tab__icon"><Icon name={t.icon} size={t.primary ? 24 : 22} /></span>
              <span className="tab__label">{t.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export function AdminShell({ children }) {
  const { saveError } = useStore()
  return (
    <div className="shell shell--admin">
      <DemoBanner admin />
      {saveError && <div className="save-error">{saveError}</div>}
      <main className="shell__main shell__main--admin">{children}</main>
    </div>
  )
}
