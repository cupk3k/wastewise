import Icon from './Icon.jsx'
import { Link, usePath } from '../router.jsx'
import { useStore } from '../store.jsx'
import { t } from '../i18n.js'
import InstallSheet from './InstallSheet.jsx'

const TABS = [
  { to: '/', label: 'home', icon: 'home', match: (p) => p === '/' || p.startsWith('/announcements') || p.startsWith('/schedule') },
  { to: '/guide', label: 'sort', icon: 'sort', match: (p) => p.startsWith('/guide') },
  { to: '/report', label: 'report', icon: 'report', match: (p) => p.startsWith('/report') && !p.startsWith('/reports'), primary: true },
  { to: '/recycle', label: 'recycle', icon: 'recycle', match: (p) => p.startsWith('/recycle') },
  { to: '/reports', label: 'reports', icon: 'list', match: (p) => p.startsWith('/reports') },
]

export function DemoBanner({ admin }) {
  return (
    <div className={`demo-banner ${admin ? 'demo-banner--admin' : ''}`} role="note">
      {t(admin ? 'shell.bannerAdmin' : 'shell.banner')}
    </div>
  )
}

export function ResidentShell({ children }) {
  const path = usePath()
  const { saveError } = useStore()
  return (
    <div className="shell">
      <DemoBanner />
      {saveError && <div className="save-error">{t('shell.saveError')}</div>}
      <main className="shell__main">{children}</main>
      <InstallSheet />
      <nav className="tabbar" aria-label={t('shell.tabsLabel')}>
        {TABS.map((tab) => {
          const active = tab.match(path)
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`tab ${active ? 'tab--active' : ''} ${tab.primary ? 'tab--primary' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <span className="tab__icon"><Icon name={tab.icon} size={tab.primary ? 24 : 22} /></span>
              <span className="tab__label">{t(`shell.tabs.${tab.label}`)}</span>
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
      {saveError && <div className="save-error">{t('shell.saveError')}</div>}
      <main className="shell__main shell__main--admin">{children}</main>
    </div>
  )
}
