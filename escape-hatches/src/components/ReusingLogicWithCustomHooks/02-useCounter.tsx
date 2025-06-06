import { useState, useEffect } from 'react'

export function useCounter(duration: number) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1)
    }, duration)
    return () => clearInterval(id)
  }, [duration])
  return count
}
