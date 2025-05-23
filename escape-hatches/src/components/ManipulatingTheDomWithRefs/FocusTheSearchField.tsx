import { useRef } from 'react'
import { Button, Input } from '@/components/common'

export default function Page() {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div className='flex gap-2'>
      <nav>
        <Button
          onClick={() => {
            inputRef.current?.focus()
          }}
        >
          Search
        </Button>
      </nav>
      <Input ref={inputRef} placeholder='Looking for something?' />
    </div>
  )
}
