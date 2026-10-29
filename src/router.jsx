// Small history-based router (no extra dependency).
// Gives you: <RouterProvider>, useRoute(), useNavigate(), <Link>, <Routes>.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const RouterContext = createContext(null)

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    if (window.history.state?.idx === undefined) {
      window.history.replaceState({ idx: 0 }, '')
    }
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to, { replace = false } = {}) => {
    if (typeof to === 'number') {
      window.history.go(to)
      return
    }
    if (to === window.location.pathname) return
    const idx = (window.history.state?.idx ?? 0) + (replace ? 0 : 1)
    if (replace) window.history.replaceState({ idx }, '', to)
    else window.history.pushState({ idx }, '', to)
    setPath(to)
    window.scrollTo(0, 0)
  }, [])

  const value = useMemo(() => ({ path, navigate }), [path, navigate])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useNavigate() {
  return useContext(RouterContext).navigate
}

export function usePath() {
  return useContext(RouterContext).path
}

/** Go back if there is in-app history, otherwise go to `fallback`. */
export function useBack(fallback = '/') {
  const navigate = useNavigate()
  return useCallback(() => {
    if ((window.history.state?.idx ?? 0) > 0) navigate(-1)
    else navigate(fallback, { replace: true })
  }, [navigate, fallback])
}

export function matchPath(pattern, path) {
  const p = pattern.split('/').filter(Boolean)
  const s = path.split('/').filter(Boolean)
  if (p.length !== s.length) return null
  const params = {}
  for (let i = 0; i < p.length; i++) {
    if (p[i].startsWith(':')) params[p[i].slice(1)] = decodeURIComponent(s[i])
    else if (p[i] !== s[i]) return null
  }
  return params
}

export function Link({ to, replace, children, onClick, ...rest }) {
  const navigate = useNavigate()
  return (
    <a
      href={to}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        navigate(to, { replace })
      }}
      {...rest}
    >
      {children}
    </a>
  )
}

/** routes: [{ path: '/guide/:id', element: (params) => <X id={params.id} /> }] */
export function Routes({ routes, fallback }) {
  const path = usePath()
  for (const r of routes) {
    const params = matchPath(r.path, path)
    if (params) return r.element(params)
  }
  return fallback
}
