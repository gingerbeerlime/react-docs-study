import { useState, useEffect, useRef } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    function onTick() {
      setCount((c) => c + 1)
    }

    intervalIdRef.current = setInterval(onTick, 1000)

    return () => {
      intervalIdRef.current && clearInterval(intervalIdRef.current)
    }
  }, [])

  return <h1>{count}</h1>
}
