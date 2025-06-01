import { useState, useEffect } from 'react'
import { fetchData } from './api.js'

export function useSelectOptions<T extends { id: string; name: string }>(
  url: string,
): [T[] | null, string, (id: string) => void] {
  const [list, setList] = useState<T[] | null>(null)
  const [selectedId, setSelectedId] = useState('')
  useEffect(() => {
    if (url === '') return
    let ignore = false
    fetchData(url).then((result: T[]) => {
      if (!ignore) {
        setList(result)
        if (result.length > 0) {
          setSelectedId(result[0].id)
        }
      }
    })
    return () => {
      ignore = true
    }
  }, [url])
  return [list, selectedId, setSelectedId]
}
