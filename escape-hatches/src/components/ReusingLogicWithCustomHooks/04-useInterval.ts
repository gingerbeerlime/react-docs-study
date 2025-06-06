import { useEffect } from 'react'
import { experimental_useEffectEvent as useEffectEvent } from 'react'

type UseIntervalProps = {
  callback: () => void
  delay: number
}

export function useInterval({ callback, delay }: UseIntervalProps) {
  const onTick = useEffectEvent(callback)

  useEffect(() => {
    const id = setInterval(onTick, delay)
    return () => {
      clearInterval(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay])
}
