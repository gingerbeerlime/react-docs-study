import { useState } from 'react'
import { Button } from '../common/Button'

export default function Toggle() {
  const [isOnRef, setIsOnRef] = useState(false)

  return (
    <Button
      onClick={() => {
        setIsOnRef(!isOnRef)
      }}
    >
      {isOnRef ? 'On' : 'Off'}
    </Button>
  )
}
