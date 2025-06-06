import { useState } from 'react'
import { useInterval } from './03-useInterval'

export function useCounter(delay: number) {
  const [count, setCount] = useState(0)
  useInterval({
    delay,
    onTick: () => {
      setCount((c) => c + 1)
    },
  })
  return count
}
