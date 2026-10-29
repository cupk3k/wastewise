import { scheduleList, dayShort, nextRun } from '../data/places.js'
import { t } from '../i18n.js'
import { formatDate, PageHeader, SampleTag } from '../components/ui.jsx'

const WEEK = [1, 2, 3, 4, 5, 6, 0]

export default function Schedule() {
  const today = new Date().getDay()
  const schedule = scheduleList()
  return (
    <div className="page">
      <PageHeader title={t('schedule.title')} back="/" />
      <p className="sample-note">
        <SampleTag>{t('common.sampleSchedule')}</SampleTag> {t('schedule.note')}
      </p>

      <div className="week" role="table" aria-label={t('schedule.tableLabel')}>
        <div className="week__row week__row--head" role="row">
          <span role="columnheader" />
          {WEEK.map((d) => (
            <span key={d} role="columnheader" className={d === today ? 'week__today' : ''}>{dayShort(d)}</span>
          ))}
        </div>
        {schedule.map((s) => (
          <div key={s.id} className="week__row" role="row">
            <span role="rowheader" className="week__name">{s.name}</span>
            {WEEK.map((d) => (
              <span key={d} role="cell" className={d === today ? 'week__today' : ''}>
                {s.days.includes(d) ? (
                  <span className={`week__dot ${s.weeks ? 'week__dot--partial' : ''}`} style={{ '--c': s.color }} aria-label={t('schedule.collection')} />
                ) : null}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="stack">
        {schedule.map((s) => {
          const next = nextRun(s)
          return (
            <div key={s.id} className="sched-card" style={{ '--c': s.color }}>
              <div className="sched-card__top">
                <strong>{s.name}</strong>
                <span className="muted">{s.time}</span>
              </div>
              <p>{s.note}</p>
              {next && <p className="sched-card__next">{t('schedule.next', { date: formatDate(next) })}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
