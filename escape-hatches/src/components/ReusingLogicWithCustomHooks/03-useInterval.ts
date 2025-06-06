import { useEffect } from 'react'

type UseIntervalProps = {
  delay: number
  onTick: () => void
}

export function useInterval({ delay, onTick }: UseIntervalProps) {
  useEffect(() => {
    const intervalId = setInterval(onTick, delay)
    return () => clearInterval(intervalId)
  }, [delay, onTick])
}
