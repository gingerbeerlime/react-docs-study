import { useState } from 'react'
import { Button } from '@/components/ui'

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true)
  return (
    <div className='w-[200px] p-4 flex flex-col gap-2'>
      {isPlayerA ? (
        <Counter key='Taylor' person='Taylor' />
      ) : (
        <Counter key='Sarah' person='Sarah' />
      )}
      <Button
        onClick={() => {
          setIsPlayerA(!isPlayerA)
        }}
      >
        Next player!
      </Button>
    </div>
  )
}

function Counter({ person }: { person: string }) {
  const [score, setScore] = useState(0)
  const [hover, setHover] = useState(false)

  let className =
    'border border-gray-300 rounded-md p-4 flex flex-col items-center transition-colors'
  if (hover) {
    className += 'bg-gray-100 border-gray-400'
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>
        {person}'s score: {score}
      </h1>
      <Button onClick={() => setScore(score + 1)}>Add one</Button>
    </div>
  )
}
