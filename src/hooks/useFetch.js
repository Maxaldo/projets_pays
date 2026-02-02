import { useState, useEffect } from 'react'

export function useFetch(endpoint) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_URL
    const url = `${API_BASE_URL}${endpoint}`

    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(url)
        
        if (!res.ok) {
          throw new Error(`Erreur HTTP: ${res.status}`)
        }
        
        const data = await res.json()
        setData(data)
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint])

  return { data, loading, error }
}
