import { useState, useEffect } from 'react'

function losowaId() {
  return Math.floor(Math.random() * 300)
}

function ZdjecieDnia() {
  const [id, setId] = useState(losowaId)
  const [zdjecie, setZdjecie] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function pobierz() {
      setIsLoading(true)
      try {
        const odpowiedz = await fetch(`https://picsum.photos/id/${id}/info`)
        if (!odpowiedz.ok) throw new Error('Błąd serwera: ' + odpowiedz.status)
        const dane = await odpowiedz.json()
        setZdjecie(dane)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    pobierz()
  }, [id])

  return <p>Zdjęcie dnia — tu dopiero będzie widok</p>
}

export default ZdjecieDnia
