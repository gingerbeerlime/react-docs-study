import { useRef } from 'react'
import { Button } from '@/components/common/Button'

const Counter = () => {
  const ref = useRef(0)

  function handleClick() {
    ref.current = ref.current + 1
    alert('You clicked ' + ref.current + ' times')
  }

  return <Button onClick={handleClick}>Click me!</Button>
}

export default Counter
