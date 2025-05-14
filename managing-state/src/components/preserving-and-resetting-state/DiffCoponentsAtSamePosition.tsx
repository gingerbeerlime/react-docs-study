import { useState } from 'react'
import { Button } from '@/components/ui'

export default function DiffComponentsAtSamePosition() {
  const [isFancy, setIsFancy] = useState(false)
  return (
    <div className='w-[200px] p-4'>
      {isFancy ? (
        <div>
          <Counter isFancy={true} />
        </div>
      ) : (
        <section>
          <Counter isFancy={false} />
        </section>
      )}
      <label>
        <input
          type='checkbox'
          checked={isFancy}
          onChange={(e) => {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label>
    </div>
  )
}

function Counter({ isFancy }: { isFancy: boolean }) {
  const [score, setScore] = useState(0)
  const [hover, setHover] = useState(false)

  let className =
    'border border-gray-300 rounded-md p-4 flex flex-col items-center transition-colors'
  if (hover) {
    className += 'bg-gray-100 border-gray-400'
  }
  if (isFancy) {
    className += ' border-red-400 bg-green-100'
  }

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
