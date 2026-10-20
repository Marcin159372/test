import { Link, useNavigate, useParams } from 'react-router-dom'
import useZdjecia from '../hooks/useZdjecia.js'
import { przelaczUlubione, usunZdjecie } from '../services/zdjecia.js'

const NAZWA_KATEGORII = { gory: 'Góry', morze: 'Morze', miasto: 'Miasto' }

function ZdjeciePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { zdjecia, setZdjecia, isLoading, error } = useZdjecia()

  if (isLoading) return <main className="container mt-4"><p className="text-muted">Ładowanie...</p></main>
  if (error) return <main className="container mt-4"><div className="alert alert-danger">{error}</div></main>

  const zdjecie = zdjecia.find(element => element.id === Number(id))
  if (!zdjecie) {
    return (
      <main className="container mt-4">
        <div className="alert alert-warning">Nie ma zdjęcia o numerze {id}.</div>
        <Link to="/" className="btn btn-outline-secondary">Wróć do galerii</Link>
      </main>
    )
  }

  function obsluzUsuniecie() {
    setZdjecia(usunZdjecie(zdjecie.id))
    navigate('/')
  }

  return (
    <main className="container my-4">
      <article className="row g-4 align-items-start">
        <div className="col-12 col-lg-8">
          <img src={zdjecie.imageLarge || zdjecie.image} className="img-fluid rounded" alt={zdjecie.alt} />
        </div>
        <div className="col-12 col-lg-4">
          <span className="badge text-bg-secondary mb-2">
            {NAZWA_KATEGORII[zdjecie.category] ?? zdjecie.category}
          </span>
          <h1 className="h2">{zdjecie.title}</h1>
          <p className="text-body-secondary">{zdjecie.description}</p>
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-outline-warning"
              aria-pressed={zdjecie.favorite}
              onClick={() => setZdjecia(przelaczUlubione(zdjecie.id))}
            >
              {zdjecie.favorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
            </button>
            <button type="button" className="btn btn-outline-danger" onClick={obsluzUsuniecie}>Usuń</button>
            <Link to="/" className="btn btn-outline-secondary">Wróć do galerii</Link>
          </div>
        </div>
      </article>
    </main>
  )
}

export default ZdjeciePage
