import { useRef, useState } from 'react'
import Icon from '../components/Icon.jsx'
import { useNavigate } from '../router.jsx'
import { useStore } from '../store.jsx'
import { categoryList } from '../data/reports.js'
import { t, tl } from '../i18n.js'
import { BLOCKS, SPOTS } from '../data/site.js'
import { PageHeader, Photo } from '../components/ui.jsx'
import { compressImage } from '../components/samplePhotos.js'

const MIN_DESC = 10

export default function ReportForm() {
  const { myBlock, submitReport } = useStore()
  const navigate = useNavigate()
  const fileRef = useRef(null)

  const [category, setCategory] = useState('')
  const [block, setBlock] = useState(myBlock)
  const [spot, setSpot] = useState('')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photoBusy, setPhotoBusy] = useState(false)
  const [photoError, setPhotoError] = useState('')
  const [tried, setTried] = useState(false)

  const errors = {
    category: !category ? t('report.errCategory') : '',
    spot: !spot ? t('report.errSpot') : '',
    description: description.trim().length < MIN_DESC ? t('report.errDescription', { n: MIN_DESC }) : '',
  }
  const hasErrors = Object.values(errors).some(Boolean)

  async function onPick(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setPhotoError('')
    setPhotoBusy(true)
    try {
      setPhoto(await compressImage(file, { read: t('report.errRead'), image: t('report.errImage') }))
    } catch (err) {
      setPhotoError(err.message)
    } finally {
      setPhotoBusy(false)
    }
  }

  function onSubmit(e) {
    e.preventDefault()
    setTried(true)
    if (hasErrors) {
      const first = document.querySelector('[data-invalid="true"]')
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const id = submitReport({ category, block, spot, description, photo })
    navigate(`/report/sent/${id}`, { replace: true })
  }

  const show = (k) => tried && errors[k]

  return (
    <div className="page">
      <PageHeader title={t('report.title')} subtitle={t('report.subtitle')} />

      <form className="form" onSubmit={onSubmit} noValidate>
        <fieldset className="form__group" data-invalid={!!show('category')}>
          <legend>{t('report.what')}</legend>
          <div className="choice-grid">
            {categoryList().map((c) => (
              <label key={c.id} className={`choice ${category === c.id ? 'choice--on' : ''}`}>
                <input
                  type="radio"
                  name="category"
                  value={c.id}
                  checked={category === c.id}
                  onChange={() => setCategory(c.id)}
                />
                <strong>{c.name}</strong>
                <span>{c.hint}</span>
              </label>
            ))}
          </div>
          {show('category') && <p className="field-error">{errors.category}</p>}
        </fieldset>

        <fieldset className="form__group" data-invalid={!!show('spot')}>
          <legend>{t('report.where')}</legend>
          <div className="two-col">
            <label className="field">
              <span>{t('report.block')}</span>
              <select value={block} onChange={(e) => setBlock(e.target.value)}>
                {BLOCKS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </label>
            <label className="field">
              <span>{t('report.spot')}</span>
              <select value={spot} onChange={(e) => setSpot(e.target.value)} aria-invalid={!!show('spot')}>
                <option value="">{t('report.choose')}</option>
                {SPOTS.map((s) => <option key={s} value={s}>{tl(s)}</option>)}
              </select>
            </label>
          </div>
          {show('spot') && <p className="field-error">{errors.spot}</p>}
        </fieldset>

        <fieldset className="form__group" data-invalid={!!show('description')}>
          <legend>{t('report.describe')}</legend>
          <label className="field">
            <span className="visually-hidden">{t('report.descriptionLabel')}</span>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('report.descriptionPlaceholder')}
              aria-invalid={!!show('description')}
              maxLength={500}
            />
          </label>
          <div className="field-foot">
            {show('description') ? <p className="field-error">{errors.description}</p> : <span />}
            <span className="muted">{description.length}/500</span>
          </div>
        </fieldset>

        <fieldset className="form__group">
          <legend>{t('report.photo')} <span className="optional">{t('common.optional')}</span></legend>
          <input ref={fileRef} type="file" accept="image/*" onChange={onPick} hidden />
          {photo ? (
            <div className="photo-preview">
              <Photo src={photo} alt={t('report.photoAlt')} />
              <div className="photo-preview__actions">
                <span className="attached"><Icon name="checkCircle" size={18} /> {t('report.attached')}</span>
                <button type="button" className="btn btn--small btn--ghost" onClick={() => setPhoto(null)}>{t('report.remove')}</button>
              </div>
            </div>
          ) : (
            <div className="photo-pick">
              <button type="button" className="photo-pick__main" onClick={() => fileRef.current?.click()} disabled={photoBusy}>
                <Icon name="camera" size={28} />
                <span>{photoBusy ? t('report.adding') : t('report.takePhoto')}</span>
              </button>
              <button type="button" className="text-link" onClick={() => setPhoto(`sample:${category === 'dumping' || category === 'bulky' ? 'dumping' : category === 'drain' ? 'drain' : 'overflow'}`)}>
                {t('report.useSample')}
              </button>
            </div>
          )}
          {photoError && <p className="field-error">{photoError}</p>}
        </fieldset>

        {tried && hasErrors && (
          <p className="form-summary" role="alert">{t('report.summary')}</p>
        )}
        <button type="submit" className="btn btn--primary btn--block btn--large">{t('report.send')}</button>
        <p className="footnote">{t('report.footnote')}</p>
      </form>
    </div>
  )
}
