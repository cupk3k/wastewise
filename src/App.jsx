import { Routes, usePath } from './router.jsx'
import { AdminShell, ResidentShell } from './components/Shell.jsx'
import Home from './screens/Home.jsx'
import Announcement from './screens/Announcement.jsx'
import { GuideDetail, GuideList } from './screens/Guide.jsx'
import { RecycleDetail, RecycleList } from './screens/Recycle.jsx'
import Schedule from './screens/Schedule.jsx'
import ReportForm from './screens/ReportForm.jsx'
import { MyReports, ReportDetail, ReportSent } from './screens/MyReports.jsx'
import Settings from './screens/Settings.jsx'
import NotFound from './screens/NotFound.jsx'
import { AdminDashboard, AdminReport } from './admin/Admin.jsx'

const residentRoutes = [
  { path: '/', element: () => <Home /> },
  { path: '/announcements/:id', element: (p) => <Announcement id={p.id} /> },
  { path: '/schedule', element: () => <Schedule /> },
  { path: '/guide', element: () => <GuideList /> },
  { path: '/guide/:id', element: (p) => <GuideDetail id={p.id} /> },
  { path: '/recycle', element: () => <RecycleList /> },
  { path: '/recycle/:id', element: (p) => <RecycleDetail id={p.id} /> },
  { path: '/report', element: () => <ReportForm /> },
  { path: '/report/sent/:id', element: (p) => <ReportSent id={p.id} /> },
  { path: '/reports', element: () => <MyReports /> },
  { path: '/reports/:id', element: (p) => <ReportDetail id={p.id} /> },
  { path: '/settings', element: () => <Settings /> },
]

const adminRoutes = [
  { path: '/admin', element: () => <AdminDashboard /> },
  { path: '/admin/reports/:id', element: (p) => <AdminReport id={p.id} /> },
]

export default function App() {
  const path = usePath()
  if (path.startsWith('/admin')) {
    return (
      <AdminShell>
        <Routes key={path} routes={adminRoutes} fallback={<NotFound />} />
      </AdminShell>
    )
  }
  return (
    <ResidentShell>
      <Routes key={path} routes={residentRoutes} fallback={<NotFound />} />
    </ResidentShell>
  )
}
