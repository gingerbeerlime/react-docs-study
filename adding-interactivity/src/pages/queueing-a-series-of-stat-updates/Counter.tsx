import { useState } from 'react'

export default function Counter() {
  const [number, setNumber] = useState(0)

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber((n) => n + 1)
          setNumber(number + 5)
          setNumber((n) => n + 1)
        }}
      >
        +6
      </button>
    </>
  )
}
