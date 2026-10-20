import { useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryBar from '../components/CategoryBar.jsx'
import Gallery from '../components/Gallery.jsx'
import ZdjecieDnia from '../components/ZdjecieDnia.jsx'
import useZdjecia from '../hooks/useZdjecia.js'
import { przelaczUlubione, usunZdjecie } from '../services/zdjecia.js'

function GaleriaPage() {
  const { zdjecia, setZdjecia, isLoading, error } = useZdjecia()
  const [aktywnaKategoria, setAktywnaKategoria] = useState('wszystkie')

  const widoczne =
    aktywnaKategoria === 'wszystkie'
      ? zdjecia
      : zdjecia.filter(zdjecie => zdjecie.category === aktywnaKategoria)

  if (isLoading) {
    return (
      <main className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2 text-muted">Ładowanie galerii...</p>
      </main>
    )
  }

  if (error) {
    return <main className="container alert alert-danger mt-4">Nie udało się pobrać danych: {error}</main>
  }

  return (
    <>
      <header className="container py-4 py-lg-5">
        <div className="row align-items-center g-3">
          <div className="col-12 col-lg-8">
            <h1 className="mb-2">Galeria zdjęć</h1>
            <p className="lead text-body-secondary mb-0">
              Zdjęcia z wypraw w góry, nad morze i po mieście. Wybierz kategorię,
              żeby zawęzić widok — albo otwórz wybrane zdjęcie.
            </p>
          </div>
          <div className="col-12 col-lg-4 d-flex justify-content-lg-end">
            <Link to="/dodaj" className="btn btn-primary">Dodaj zdjęcie</Link>
          </div>
        </div>
      </header>

      <main className="container">
        {zdjecia.length === 0 ? (
          <div className="alert alert-secondary">Katalog jest na razie pusty.</div>
        ) : (
          <>
            <CategoryBar aktywna={aktywnaKategoria} onWybierz={setAktywnaKategoria} />
            <p className="text-body-secondary">
              Wyświetlono {widoczne.length} z {zdjecia.length} zdjęć
            </p>
            {widoczne.length === 0 && (
              <div className="alert alert-warning">Nie znaleziono zdjęć w tej kategorii.</div>
            )}
            <Gallery
              zdjecia={widoczne}
              onUsun={id => setZdjecia(usunZdjecie(id))}
              onPrzelacz={id => setZdjecia(przelaczUlubione(id))}
            />
          </>
        )}
        <ZdjecieDnia />
      </main>
    </>
  )
}

export default GaleriaPage
