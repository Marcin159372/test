import { useRef, useState } from 'react'
import { zdjeciaStartowe } from './zdjecia.js'

const NAZWY_KATEGORII = {
  1: 'Kwiaty',
  2: 'Zwierzęta',
  3: 'Samochody',
}
const KATEGORIE = [1, 2, 3]

function App() {
  const [zdjecia, setZdjecia] = useState(zdjeciaStartowe)
  const [aktywneKategorie, setAktywneKategorie] = useState(KATEGORIE)
  const altRef = useRef(null)
  const filenameRef = useRef(null)
  const categoryRef = useRef(null)

  function przelaczKategorie(kategoria) {
    setAktywneKategorie((aktywne) =>
      aktywne.includes(kategoria)
        ? aktywne.filter((element) => element !== kategoria)
        : [...aktywne, kategoria],
    )
  }

  function pobierz(id) {
    setZdjecia((poprzednie) =>
      poprzednie.map((zdjecie) =>
        zdjecie.id === id
          ? { ...zdjecie, downloads: zdjecie.downloads + 1 }
          : zdjecie,
      ),
    )
  }

  function dodajZdjecie(event) {
    event.preventDefault()
    const noweId = Math.max(...zdjecia.map((zdjecie) => zdjecie.id)) + 1

    setZdjecia((poprzednie) => [
      ...poprzednie,
      {
        id: noweId,
        alt: altRef.current.value,
        filename: filenameRef.current.value,
        category: Number(categoryRef.current.value),
        downloads: 0,
      },
    ])
    event.target.reset()
  }

  const widoczne = zdjecia.filter((zdjecie) =>
    aktywneKategorie.includes(zdjecie.category),
  )

  return (
    <div className="container mt-4">
      <h1>Kategorie zdjęć</h1>
      <div className="d-flex flex-wrap gap-3 mb-3">
        {KATEGORIE.map((kategoria) => (
          <div className="form-check form-switch" key={kategoria}>
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id={`kategoria-${kategoria}`}
              checked={aktywneKategorie.includes(kategoria)}
              onChange={() => przelaczKategorie(kategoria)}
            />
            <label className="form-check-label" htmlFor={`kategoria-${kategoria}`}>
              {NAZWY_KATEGORII[kategoria]}
            </label>
          </div>
        ))}
      </div>

      <div className="row g-3">
        {widoczne.map((zdjecie) => (
          <div key={zdjecie.id} className="col-12 col-sm-6 col-md-4">
            <img
              src={zdjecie.filename}
              alt={zdjecie.alt}
              className="img-fluid rounded"
            />
            <h2 className="h6 mt-2">Pobrań: {zdjecie.downloads}</h2>
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={() => pobierz(zdjecie.id)}
            >
              Pobierz
            </button>
          </div>
        ))}
      </div>

      <hr className="my-4" />
      <h2 className="h4">Dodaj zdjęcie</h2>
      <form onSubmit={dodajZdjecie} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="alt" className="form-label">Opis zdjęcia (alt)</label>
          <input id="alt" ref={altRef} className="form-control" required />
        </div>
        <div className="col-md-6">
          <label htmlFor="kategoria" className="form-label">Kategoria</label>
          <select
            id="kategoria"
            ref={categoryRef}
            className="form-select"
            defaultValue="1"
          >
            <option value="1">Kwiaty</option>
            <option value="2">Zwierzęta</option>
            <option value="3">Samochody</option>
          </select>
        </div>
        <div className="col-12">
          <label htmlFor="filename" className="form-label">Adres URL zdjęcia</label>
          <input
            id="filename"
            ref={filenameRef}
            className="form-control"
            placeholder="https://..."
            required
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Zapisz</button>
        </div>
      </form>
    </div>
  )
}

export default App
