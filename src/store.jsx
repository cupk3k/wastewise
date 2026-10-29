// App state kept in localStorage (simulated backend).
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { createSeedState } from './data/reports.js'
import en from './data/lang/en.js'

const KEY = 'wastewise.demo.v1'
const StoreContext = createContext(null)

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed?.version === 1 && Array.isArray(parsed.reports)) return parsed
    }
  } catch {
    /* fall through to seed */
  }
  return createSeedState()
}

function reducer(state, action) {
  switch (action.type) {
    case 'addReport':
      return { ...state, nextSeq: state.nextSeq + 1, reports: [action.report, ...state.reports] }
    case 'updateReport':
      return {
        ...state,
        reports: state.reports.map((r) => (r.id === action.id ? action.update(r) : r)),
      }
    case 'setBlock':
      return { ...state, myBlock: action.block }
    case 'reset':
      return createSeedState()
    case 'replace':
      return action.state
    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)
  const [saveError, setSaveError] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
      setSaveError(false)
    } catch {
      setSaveError(true) // the shell shows the message in the current language
    }
  }, [state])

  // Keep several open tabs (resident view + management view) in sync.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === KEY) dispatch({ type: 'replace', state: load() })
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const submitReport = useCallback(
    ({ category, block, spot, description, photo }) => {
      const id = `WW-${String(state.nextSeq).padStart(4, '0')}`
      dispatch({
        type: 'addReport',
        report: {
          id,
          mine: true,
          category,
          block,
          spot,
          description: description.trim(),
          photo: photo ?? null,
          assignee: en.assignees.none,
          history: [{ status: 'Submitted', at: Date.now(), note: en.notes.received }],
        },
      })
      return id
    },
    [state.nextSeq]
  )

  const setStatus = useCallback((id, status, note) => {
    dispatch({
      type: 'updateReport',
      id,
      update: (r) => ({
        ...r,
        history: [...r.history, { status, at: Date.now(), note: note?.trim() || defaultNote(status) }],
      }),
    })
  }, [])

  const setAssignee = useCallback((id, assignee) => {
    dispatch({ type: 'updateReport', id, update: (r) => ({ ...r, assignee }) })
  }, [])

  const value = useMemo(
    () => ({
      ...state,
      saveError,
      submitReport,
      setStatus,
      setAssignee,
      setBlock: (block) => dispatch({ type: 'setBlock', block }),
      resetDemo: () => dispatch({ type: 'reset' }),
    }),
    [state, saveError, submitReport, setStatus, setAssignee]
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

// Stored in English like everything else; shown translated through tl().
function defaultNote(status) {
  return en.notes[status] ?? en.notes.other
}

export function useStore() {
  return useContext(StoreContext)
}
