import { useState } from 'react'
import { Button } from '@/components/ui'

const TwoCountersAtDifferentPosition = () => {
  const counter = <Counter />
  return (
    <div className='w-[200px] flex gap-2 p-4'>
      {counter}
      {counter}
    </div>
  )
}

const Counter = () => {
  const [score, setScore] = useState(0)
  const [hover, setHover] = useState(false)

  const baseStyles =
    'border border-gray-300 rounded-md p-4 flex flex-col items-center transition-colors'
  const hoverStyles = 'bg-gray-100 border-gray-400'

  const className = `${baseStyles} ${hover ? hoverStyles : ''}`

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <Button onClick={() => setScore(score + 1)}>Add one</Button>
    </div>
  )
}

export default TwoCountersAtDifferentPosition
