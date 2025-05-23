import { useRef } from 'react'
import { Input, Button } from '@/components/common'

export default function Form() {
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleClick() {
    inputRef.current?.focus()
  }

  return (
    <>
      <Input ref={inputRef} />
      <Button onClick={handleClick}>Focus the input</Button>
    </>
  )
}
