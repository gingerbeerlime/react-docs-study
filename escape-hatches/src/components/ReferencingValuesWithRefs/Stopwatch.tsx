import { useState, useRef } from 'react'
import { Button } from '@/components/common/Button'

const Stopwatch = () => {
  const [now, setNow] = useState<number | null>(null)
  const startTime = useRef<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const handleStart = () => {
    startTime.current = Date.now()
    setNow(Date.now())

    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setNow(Date.now())
    }, 10)
  }

  const handleStop = () => {
    clearInterval(intervalRef.current)
  }

  let secondsPassed = 0

  if (startTime.current !== null && now !== null) {
    secondsPassed = (now - startTime.current) / 1000
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <Button onClick={handleStart}>Start!</Button>
      <Button onClick={handleStop}>Stop!</Button>
    </>
  )
}

export default Stopwatch
