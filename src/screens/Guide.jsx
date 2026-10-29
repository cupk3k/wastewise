import { useMemo, useState } from 'react'
import Icon from '../components/Icon.jsx'
import { Link } from '../router.jsx'
import { GUIDE, guideById } from '../data/guide.js'
import { placeById } from '../data/places.js'
import { PageHeader, RowLink, SampleTag } from '../components/ui.jsx'
import NotFound from './NotFound.jsx'

export function GuideList() {
  const [q, setQ] = useState('')
  const query = q.trim().toLowerCase()

  const matches = useMemo(() => {
    if (!query) return []
    const out = []
    for (const g of GUIDE) {
      for (const item of g.yes) {
        if (item.toLowerCase().includes(query)) out.push({ g, item, ok: true })
      }
      for (const item of g.no) {
        if (item.toLowerCase().includes(query)) out.push({ g, item, ok: false })
      }
    }
    return out.slice(0, 12)
  }, [query])

  return (
    <div className="page">
      <PageHeader title="Where does it go?" subtitle="Pick a type of waste, or search an item" />

      <label className="search">
        <span className="visually-hidden">Search an item</span>
        <input
          type="search"
          placeholder="Try “bottle”, “battery”, “mattress”"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </label>

      {query ? (
        <div className="search-results">
          {matches.length === 0 && (
            <p className="empty-inline">No match for “{q}”. Browse the types below, or put it in general waste if unsure.</p>
          )}
          {matches.map((m, i) => (
            <Link key={i} to={`/guide/${m.g.id}`} className="result">
              <span className="result__swatch" style={{ background: m.g.color }} />
              <span className="result__text">
                <strong>{m.item}</strong>
                <span>{m.ok ? `Goes to: ${m.g.bin}` : `Not in ${m.g.name.toLowerCase()} — see why`}</span>
              </span>
              <Icon name="chevron" size={18} />
            </Link>
          ))}
        </div>
      ) : null}

      <div className="bin-grid">
        {GUIDE.map((g) => (
          <Link
            key={g.id}
            to={`/guide/${g.id}`}
            className="bin-card"
            style={{ '--bin': g.color, '--bin-tint': g.tint }}
          >
            <span className="bin-card__lid" />
            <span className="bin-card__name">{g.name}</span>
            <span className="bin-card__summary">{g.summary}</span>
            <span className="bin-card__bin">{g.bin}</span>
          </Link>
        ))}
      </div>
      <p className="footnote">
        Based on general Malaysian recycling practice. Follow your building management's rules where they differ.
      </p>
    </div>
  )
}

export function GuideDetail({ id }) {
  const g = guideById(id)
  if (!g) return <NotFound />
  const places = g.where.map(placeById).filter(Boolean)

  return (
    <div className="page">
      <PageHeader title={g.name} back="/guide" />
      <div className="bin-hero" style={{ '--bin': g.color, '--bin-tint': g.tint }}>
        <span className="bin-hero__label">Put it in</span>
        <span className="bin-hero__bin">{g.bin}</span>
      </div>

      <section className="section">
        <h2 className="h-yes"><Icon name="check" size={20} /> Yes, these go here</h2>
        <ul className="item-list item-list--yes">
          {g.yes.map((x) => <li key={x}>{x}</li>)}
        </ul>
      </section>

      <section className="section">
        <h2 className="h-no"><Icon name="x" size={20} /> Not these</h2>
        <ul className="item-list item-list--no">
          {g.no.map((x) => <li key={x}>{x}</li>)}
        </ul>
      </section>

      <section className="section">
        <h2>Good to know</h2>
        <ul className="tips">
          {g.tips.map((x) => <li key={x}>{x}</li>)}
        </ul>
      </section>

      {places.length > 0 && (
        <section className="section">
          <h2>Where to drop it off</h2>
          <div className="stack">
            {places.map((p) => (
              <RowLink key={p.id} to={`/recycle/${p.id}`}>
                <strong>{p.name}</strong>
                <span className="muted">{p.where}</span>
                {p.sample && <SampleTag />}
              </RowLink>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
