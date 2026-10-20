import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useZdjecia from '../hooks/useZdjecia.js'
import { dodajZdjecie } from '../services/zdjecia.js'

const PUSTY_FORMULARZ = { title: '', category: '', image: '', alt: '', description: '' }

function DodajPage() {
  const navigate = useNavigate()
  const { isLoading, error } = useZdjecia()
  const [formularz, setFormularz] = useState(PUSTY_FORMULARZ)

  function zmienPole(pole) {
    return event => setFormularz({ ...formularz, [pole]: event.target.value })
  }

  function obsluzSubmit(event) {
    event.preventDefault()
    dodajZdjecie({
      ...formularz,
      imageLarge: formularz.image,
    })
    navigate('/')
  }

  if (isLoading) return <main className="container mt-4"><p className="text-muted">Ładowanie danych...</p></main>
  if (error) return <main className="container mt-4"><div className="alert alert-danger">{error}</div></main>

  return (
    <main className="container my-4">
      <h1>Dodaj zdjęcie</h1>
      <form onSubmit={obsluzSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="tytul" className="form-label">Tytuł</label>
          <input id="tytul" className="form-control" value={formularz.title} onChange={zmienPole('title')} required />
        </div>
        <div className="col-md-6">
          <label htmlFor="kategoria" className="form-label">Kategoria</label>
          <select id="kategoria" className="form-select" value={formularz.category} onChange={zmienPole('category')} required>
            <option value="" disabled>Wybierz kategorię…</option>
            <option value="gory">Góry</option>
            <option value="morze">Morze</option>
            <option value="miasto">Miasto</option>
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="obrazek" className="form-label">Adres URL zdjęcia</label>
          <input id="obrazek" type="url" className="form-control" placeholder="https://…" value={formularz.image} onChange={zmienPole('image')} required />
        </div>
        <div className="col-12">
          <label htmlFor="alt" className="form-label">Tekst alternatywny</label>
          <input id="alt" className="form-control" value={formularz.alt} onChange={zmienPole('alt')} required />
        </div>
        <div className="col-12">
          <label htmlFor="opis" className="form-label">Opis</label>
          <textarea id="opis" className="form-control" rows="3" value={formularz.description} onChange={zmienPole('description')} required />
        </div>
        <div className="col-12 d-flex gap-2">
          <button type="submit" className="btn btn-primary">Zapisz zdjęcie</button>
          <Link to="/" className="btn btn-outline-secondary">Anuluj</Link>
        </div>
      </form>
    </main>
  )
}

export default DodajPage
