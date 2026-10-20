let zdjecia = null
let pobieranie = null

export async function pobierzZdjecia() {
  if (zdjecia) return zdjecia

  if (!pobieranie) {
    pobieranie = fetch('/photos.json')
      .then(odpowiedz => {
        if (!odpowiedz.ok) throw new Error(`Błąd serwera: ${odpowiedz.status}`)
        return odpowiedz.json()
      })
      .then(dane => {
        zdjecia = dane
        return zdjecia
      })
      .catch(err => {
        pobieranie = null
        throw err
      })
  }

  return pobieranie
}

export function usunZdjecie(id) {
  zdjecia = (zdjecia ?? []).filter(zdjecie => zdjecie.id !== id)
  return zdjecia
}

export function przelaczUlubione(id) {
  zdjecia = (zdjecia ?? []).map(zdjecie =>
    zdjecie.id === id ? { ...zdjecie, favorite: !zdjecie.favorite } : zdjecie,
  )
  return zdjecia
}

export function dodajZdjecie(nowe) {
  const noweId = Math.max(0, ...(zdjecia ?? []).map(zdjecie => zdjecie.id)) + 1
  zdjecia = [...(zdjecia ?? []), { ...nowe, id: noweId, favorite: false }]
  return zdjecia
}
