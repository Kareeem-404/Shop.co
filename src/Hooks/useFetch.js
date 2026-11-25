import { useEffect, useState } from 'react'
import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 20000,
})
const responseCache = new Map()

export default function useFetch(endpoint) {
  const [data, setData] = useState(() => responseCache.get(endpoint) ?? null)
  const [loading, setLoading] = useState(() => !responseCache.has(endpoint))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!endpoint) return undefined
    const cached = responseCache.get(endpoint)
    if (cached) {
      setData(cached)
      setLoading(false)
      setError(null)
      return undefined
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)
    client.get(endpoint, { signal: controller.signal })
      .then((response) => {
        responseCache.set(endpoint, response.data)
        setData(response.data)
      })
      .catch((requestError) => {
        if (!controller.signal.aborted) setError(requestError)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [endpoint])

  return { data, loading, error }
}
