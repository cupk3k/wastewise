import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import { Link } from '../router.jsx'
import { useStore } from '../store.jsx'
import { BLOCKS } from '../data/site.js'
import { PageHeader } from '../components/ui.jsx'

export default function Settings() {
  const { myBlock, setBlock, resetDemo } = useStore()
  const [done, setDone] = useState(false)

  return (
    <div className="page">
      <PageHeader title="Settings" back="/" />

      <section className="section">
        <h2>Your block</h2>
        <p className="muted">Used for the nearest drop-off point and as the default location when you report.</p>
        <label className="field">
          <span className="visually-hidden">Block</span>
          <select value={myBlock} onChange={(e) => setBlock(e.target.value)}>
            {BLOCKS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </label>
      </section>

      <section className="section">
        <h2>Management view</h2>
        <p className="muted">See all reports and update their status, as building management would.</p>
        <Link to="/admin" className="btn btn--ghost btn--block"><Icon name="shield" size={18} /> Open management view</Link>
      </section>

      <section className="section">
        <h2>Demo data</h2>
        <p className="muted">Clears reports made on this device and restores the sample reports. Do this before each usability test.</p>
        <button
          className="btn btn--danger btn--block"
          onClick={() => {
            if (window.confirm('Reset all demo data on this device?')) {
              resetDemo()
              setDone(true)
            }
          }}
        >
          <Icon name="refresh" size={18} /> Reset demo data
        </button>
        {done && <p className="ok-note" role="status">Demo data reset.</p>}
      </section>

      <section className="section about">
        <h2>About this prototype</h2>
        <p>
          WasteWise Desa Mentari is a student prototype for the Community Service for Planetary Health course at
          Sunway University. Schedules, drop-off points, announcements and reports are simulated. Nothing is sent to
          building management or the council.
        </p>
      </section>
    </div>
  )
}
