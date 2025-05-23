import { useRef } from 'react'
import { Button, Input } from '@/components/common'

function MyInput({ ref }: { ref: React.RefObject<HTMLInputElement | null> }) {
  return <Input ref={ref} />
}

export default function MyForm() {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleClick() {
    inputRef.current?.focus()
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <Button onClick={handleClick}>Focus the input</Button>
    </>
  )
}
