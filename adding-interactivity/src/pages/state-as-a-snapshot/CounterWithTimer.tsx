import { useState } from 'react'

const Counter = () => {
  const [number, setNumber] = useState(0)

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 5)
          setTimeout(() => {
            alert(number)
          }, 3000)
        }}
      >
        +5
      </button>
    </>
  )
}

export default Counter
