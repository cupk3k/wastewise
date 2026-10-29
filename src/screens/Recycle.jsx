import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import { Link } from '../router.jsx'
import { useStore } from '../store.jsx'
import { PLACES, placeById } from '../data/places.js'
import { GUIDE, guideById } from '../data/guide.js'
import { BLOCKS, blockById, distanceMetres, walkMinutes } from '../data/site.js'
import { PageHeader, SampleTag } from '../components/ui.jsx'
import NotFound from './NotFound.jsx'

function SiteMap({ highlight, from, places }) {
  return (
    <svg className="site-map" viewBox="0 0 100 100" role="img" aria-label="Map of Desa Mentari blocks and drop-off points">
      <rect x="0" y="0" width="100" height="100" rx="3" className="site-map__ground" />
      <path d="M0 32 H100 M0 64 H100 M30 0 V100 M66 0 V100" className="site-map__road" />
      <rect x="34" y="56" width="16" height="10" rx="1.5" className="site-map__hall" />
      <text x="42" y="69.5" className="site-map__hall-label">Hall</text>
      {BLOCKS.map((b) => (
        <g key={b.id}>
          <rect
            x={b.x - 6}
            y={b.y - 4.5}
            width="12"
            height="9"
            rx="1.2"
            className={`site-map__block ${from?.id === b.id ? 'site-map__block--me' : ''}`}
          />
          <text x={b.x} y={b.y + 1.6} className="site-map__block-label">{b.name.replace('Blok ', '')}</text>
        </g>
      ))}
      {places.map((p) => (
        <g key={p.id} className={`site-map__pin ${highlight === p.id ? 'site-map__pin--on' : ''}`}>
          <circle cx={p.x} cy={p.y} r={highlight === p.id ? 3.4 : 2.6} />
        </g>
      ))}
    </svg>
  )
}

export function RecycleList() {
  const { myBlock, setBlock } = useStore()
  const [filter, setFilter] = useState('all')
  const from = blockById(myBlock)

  const list = PLACES.filter((p) => filter === 'all' || p.accepts.includes(filter))
    .map((p) => ({ ...p, dist: distanceMetres(from, p) }))
    .sort((a, b) => a.dist - b.dist)

  const filters = [{ id: 'all', name: 'All' }, ...GUIDE.filter((g) => PLACES.some((p) => p.accepts.includes(g.id)))]

  return (
    <div className="page">
      <PageHeader title="Drop-off points" subtitle="Nearest first" />

      <label className="field field--inline">
        <span>I live in</span>
        <select value={myBlock} onChange={(e) => setBlock(e.target.value)}>
          {BLOCKS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
      </label>

      <SiteMap from={from} places={list} highlight={list[0]?.id} />
      <p className="map-legend">
        <span className="legend-dot legend-dot--me" /> Your block
        <span className="legend-dot legend-dot--pin" /> Drop-off point
        <span className="legend-dot legend-dot--near" /> Nearest
      </p>

      <div className="chips" role="group" aria-label="Filter by waste type">
        {filters.map((f) => (
          <button
            key={f.id}
            className={`chip ${filter === f.id ? 'chip--on' : ''}`}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div className="stack">
        {list.map((p, i) => (
          <Link key={p.id} to={`/recycle/${p.id}`} className={`place ${i === 0 ? 'place--nearest' : ''}`}>
            <div className="place__top">
              <strong>{p.name}</strong>
              {i === 0 && <span className="nearest-tag">Nearest</span>}
            </div>
            <span className="muted">{p.where}</span>
            <div className="place__meta">
              <span><Icon name="walk" size={16} /> {p.dist} m, about {walkMinutes(p.dist)} min</span>
              {p.sample && <SampleTag />}
            </div>
            <div className="accepts">
              {p.accepts.map((a) => {
                const g = guideById(a)
                return <span key={a} className="accept" style={{ '--bin': g.color }}>{g.name}</span>
              })}
            </div>
          </Link>
        ))}
      </div>
      <p className="footnote">Drop-off points are sample locations until verified with the JMB.</p>
    </div>
  )
}

export function RecycleDetail({ id }) {
  const { myBlock } = useStore()
  const p = placeById(id)
  if (!p) return <NotFound />
  const from = blockById(myBlock)
  const dist = distanceMetres(from, p)

  return (
    <div className="page">
      <PageHeader title={p.name} back="/recycle" />
      <SiteMap from={from} places={[p]} highlight={p.id} />
      {p.sample && (
        <p className="sample-note">
          <Icon name="info" size={18} /> Sample location. Details still need to be confirmed with building management.
        </p>
      )}
      <dl className="facts">
        <div><dt><Icon name="pin" size={18} /> Location</dt><dd>{p.where}</dd></div>
        <div><dt><Icon name="walk" size={18} /> From {from.name}</dt><dd>{dist} m, about {walkMinutes(dist)} min walk</dd></div>
        <div><dt><Icon name="clock" size={18} /> Opening hours</dt><dd>{p.hours}</dd></div>
      </dl>

      <section className="section">
        <h2>Accepts</h2>
        <div className="stack">
          {p.accepts.map((a) => {
            const g = guideById(a)
            return (
              <Link key={a} to={`/guide/${a}`} className="accept-row" style={{ '--bin': g.color, '--bin-tint': g.tint }}>
                <span className="accept-row__swatch" />
                <span><strong>{g.name}</strong><span className="muted">{g.summary}</span></span>
                <Icon name="chevron" size={18} />
              </Link>
            )
          })}
        </div>
      </section>

      <section className="section">
        <h2>Before you go</h2>
        <p>{p.notes}</p>
      </section>

      <Link to="/report" className="btn btn--ghost btn--block">Bins here full or damaged? Report it</Link>
    </div>
  )
}
