import { useEffect, useState } from 'react'
import { pobierzZdjecia } from '../services/zdjecia.js'

function useZdjecia() {
  const [zdjecia, setZdjecia] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let aktywny = true

    pobierzZdjecia()
      .then(dane => {
        if (aktywny) setZdjecia(dane)
      })
      .catch(err => {
        if (aktywny) setError(err.message)
      })
      .finally(() => {
        if (aktywny) setIsLoading(false)
      })

    return () => {
      aktywny = false
    }
  }, [])

  return { zdjecia, setZdjecia, isLoading, error }
}

export default useZdjecia
