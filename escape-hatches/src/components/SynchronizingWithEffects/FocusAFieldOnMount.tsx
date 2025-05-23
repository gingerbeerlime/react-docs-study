import { useEffect, useRef } from 'react'
import type { ChangeEvent } from 'react'

type MyInputProps = {
  value: string
  onChange: (value: string) => void
}

export default function MyInput({ value, onChange }: MyInputProps) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return <input ref={ref} value={value} onChange={handleChange} />
}
