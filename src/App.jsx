import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import CategoryBar from './components/CategoryBar.jsx'
import Gallery from './components/Gallery.jsx'
import AddPhotoModal from './components/AddPhotoModal.jsx'
import FiltersOffcanvas from './components/FiltersOffcanvas.jsx'
import Footer from './components/Footer.jsx'
import ZdjecieDnia from './components/ZdjecieDnia.jsx'
import './App.css'

function App() {
  const [zdjecia, setZdjecia] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [aktywnaKategoria, setAktywnaKategoria] = useState('wszystkie')

  useEffect(() => {
    async function pobierzZdjecia() {
      try {
        const odpowiedz = await fetch('/photos.json')
        if (!odpowiedz.ok) throw new Error('Błąd serwera: ' + odpowiedz.status)
        const dane = await odpowiedz.json()
        setZdjecia(dane)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    pobierzZdjecia()
  }, [])

  const widoczne =
    aktywnaKategoria === 'wszystkie'
      ? zdjecia
      : zdjecia.filter(z => z.category === aktywnaKategoria)

  function usunZdjecie(id) {
    setZdjecia(zdjecia.filter(z => z.id !== id))
  }

  function dodajZdjecie(nowe) {
    const noweId = Math.max(...zdjecia.map(z => z.id)) + 1
    setZdjecia([...zdjecia, { ...nowe, id: noweId, favorite: false }])
  }

  function przelaczUlubione(id) {
    setZdjecia(
      zdjecia.map(z => (z.id === id ? { ...z, favorite: !z.favorite } : z))
    )
  }

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2 text-muted">Ładowanie galerii...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4">
        Nie udało się pobrać danych: {error}
      </div>
    )
  }

  if (zdjecia.length === 0) {
    return <div className="alert alert-secondary m-4">Katalog jest na razie pusty.</div>
  }

  return (
    <>
      <Navbar />

      <header className="container py-4 py-lg-5">
        <div className="row align-items-center g-3">
          <div className="col-12 col-lg-8">
            <h1 className="mb-2">Galeria zdjęć</h1>
            <p className="lead text-body-secondary mb-0">
              Zdjęcia z wypraw w góry, nad morze i po mieście. Wybierz kategorię,
              żeby zawęzić widok — albo powiększ zdjęcie, które Ci się spodoba.
            </p>
          </div>

          <div className="col-12 col-lg-4">
            <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-toggle="offcanvas"
                data-bs-target="#panelFiltrow"
              >
                Filtry
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#dodajZdjecie"
              >
                Dodaj zdjęcie
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        <CategoryBar aktywna={aktywnaKategoria} onWybierz={setAktywnaKategoria} />

        <p className="text-body-secondary">
          Wyświetlono {widoczne.length} z {zdjecia.length} zdjęć
        </p>

        {widoczne.length === 0 && (
          <div className="alert alert-warning">
            Nie znaleziono zdjęć w tej kategorii.
          </div>
        )}

        <Gallery
          zdjecia={widoczne}
          onUsun={usunZdjecie}
          onPrzelacz={przelaczUlubione}
        />
      </main>

      <Footer />

      <AddPhotoModal onDodaj={dodajZdjecie} />
      <FiltersOffcanvas aktywna={aktywnaKategoria} onWybierz={setAktywnaKategoria} />

      <ZdjecieDnia />
    </>
  )
}

export default App
