import { useState } from 'react'

type InputProps = {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SyncedInputs() {
  const [text, setText] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  return (
    <>
      <Input label='First input' value={text} onChange={handleChange} />
      <Input label='Second input' value={text} onChange={handleChange} />
    </>
  )
}

function Input({ label, value, onChange }: InputProps) {
  return (
    <label>
      {label} <input value={value} onChange={onChange} />
    </label>
  )
}
