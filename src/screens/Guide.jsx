import { useMemo, useState } from 'react'
import Icon from '../components/Icon.jsx'
import { Link } from '../router.jsx'
import { guideList, guideById } from '../data/guide.js'
import { t } from '../i18n.js'
import { placeById } from '../data/places.js'
import { PageHeader, RowLink, SampleTag } from '../components/ui.jsx'
import NotFound from './NotFound.jsx'

export function GuideList() {
  const [q, setQ] = useState('')
  const query = q.trim().toLowerCase()
  const guide = useMemo(guideList, [])

  const matches = useMemo(() => {
    if (!query) return []
    const out = []
    for (const g of guide) {
      for (const item of g.yes) {
        if (item.toLowerCase().includes(query)) out.push({ g, item, ok: true })
      }
      for (const item of g.no) {
        if (item.toLowerCase().includes(query)) out.push({ g, item, ok: false })
      }
    }
    return out.slice(0, 12)
  }, [query, guide])

  return (
    <div className="page">
      <PageHeader title={t('guide.title')} subtitle={t('guide.subtitle')} />

      <label className="search">
        <span className="visually-hidden">{t('guide.searchLabel')}</span>
        <input
          type="search"
          placeholder={t('guide.searchPlaceholder')}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </label>

      {query ? (
        <div className="search-results">
          {matches.length === 0 && (
            <p className="empty-inline">{t('guide.noMatch', { q })}</p>
          )}
          {matches.map((m, i) => (
            <Link key={i} to={`/guide/${m.g.id}`} className="result">
              <span className="result__swatch" style={{ background: m.g.color }} />
              <span className="result__text">
                <strong>{m.item}</strong>
                <span>{m.ok ? t('guide.goesTo', { bin: m.g.bin }) : t('guide.notIn', { name: m.g.name.toLowerCase() })}</span>
              </span>
              <Icon name="chevron" size={18} />
            </Link>
          ))}
        </div>
      ) : null}

      <div className="bin-grid">
        {guide.map((g) => (
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
      <p className="footnote">{t('guide.footnote')}</p>
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
        <span className="bin-hero__label">{t('guide.putIn')}</span>
        <span className="bin-hero__bin">{g.bin}</span>
      </div>

      <section className="section">
        <h2 className="h-yes"><Icon name="check" size={20} /> {t('guide.yes')}</h2>
        <ul className="item-list item-list--yes">
          {g.yes.map((x) => <li key={x}>{x}</li>)}
        </ul>
      </section>

      <section className="section">
        <h2 className="h-no"><Icon name="x" size={20} /> {t('guide.no')}</h2>
        <ul className="item-list item-list--no">
          {g.no.map((x) => <li key={x}>{x}</li>)}
        </ul>
      </section>

      <section className="section">
        <h2>{t('guide.tips')}</h2>
        <ul className="tips">
          {g.tips.map((x) => <li key={x}>{x}</li>)}
        </ul>
      </section>

      {places.length > 0 && (
        <section className="section">
          <h2>{t('guide.where')}</h2>
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
