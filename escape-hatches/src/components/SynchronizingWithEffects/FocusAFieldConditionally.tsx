import { useEffect, useRef } from 'react'

type MyInputProps = {
  shouldFocus: boolean
  value: string
  onChange: (value: string) => void
}

export default function MyInput({ shouldFocus, value, onChange }: MyInputProps) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    shouldFocus && ref.current?.focus()
  }, [shouldFocus])

  return <input ref={ref} value={value} onChange={onChange} />
}
