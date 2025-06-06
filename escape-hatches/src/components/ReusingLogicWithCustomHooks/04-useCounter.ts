import { useState } from 'react'
import { useInterval } from './04-useInterval'

export function useCounter(delay: number) {
  const [count, setCount] = useState(0)
  useInterval({
    callback: () => {
      setCount((c) => c + 1)
    },
    delay,
  })
  return count
}
