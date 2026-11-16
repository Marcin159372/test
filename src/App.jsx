import { useState } from 'react'
import { przepisyStartowe } from './przepisy.js'

function App() {
  const [przepisy, setPrzepisy] = useState(przepisyStartowe)
  const [rosnaco, setRosnaco] = useState(true)
  const [nazwa, setNazwa] = useState('')
  const [czas, setCzas] = useState('')
  const [bladCzasu, setBladCzasu] = useState('')

  const posortowane = [...przepisy].sort((a, b) =>
    rosnaco ? a.czas - b.czas : b.czas - a.czas,
  )

  function zapisz(event) {
    event.preventDefault()

    if (!(Number(czas) > 0)) {
      setBladCzasu('Czas musi być liczbą dodatnią.')
      return
    }

    setBladCzasu('')
    const noweId = Math.max(...przepisy.map((przepis) => przepis.id)) + 1
    setPrzepisy([
      ...przepisy,
      { id: noweId, nazwa, kategoria: 'inne', czas: Number(czas) },
    ])
    setNazwa('')
    setCzas('')
  }

  return (
    <div className="container mt-4">
      <h1>Książka przepisów</h1>

      <button
        type="button"
        className="btn btn-outline-primary mb-3"
        onClick={() => setRosnaco(!rosnaco)}
      >
        Czas: {rosnaco ? 'rosnąco ▲' : 'malejąco ▼'}
      </button>

      <div className="row g-3 mb-4">
        {posortowane.map((przepis) => (
          <div key={przepis.id} className="col-12 col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="card-title h5">{przepis.nazwa}</h2>
                <span className="badge text-bg-secondary mb-2">
                  {przepis.kategoria}
                </span>
                <p className="text-body-secondary mb-0">
                  Czas przygotowania: {przepis.czas} min
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="h4">Dodaj przepis</h2>
      <form onSubmit={zapisz} className="mb-5">
        <div className="mb-3">
          <label htmlFor="nazwa" className="form-label">Nazwa</label>
          <input
            id="nazwa"
            type="text"
            className="form-control"
            value={nazwa}
            onChange={(event) => setNazwa(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="czas" className="form-label">
            Czas przygotowania (min)
          </label>
          <input
            id="czas"
            type="number"
            className={`form-control${bladCzasu ? ' is-invalid' : ''}`}
            value={czas}
            onChange={(event) => setCzas(event.target.value)}
          />
          {bladCzasu && (
            <div className="invalid-feedback d-block">{bladCzasu}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">Zapisz</button>
      </form>
    </div>
  )
}

export default App
