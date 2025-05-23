import React, { useState, useRef } from 'react'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'

export default function Chat() {
  const [text, setText] = useState('')
  const textRef = useRef('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
    textRef.current = e.target.value
  }

  function handleSend() {
    setTimeout(() => {
      alert('Sending: ' + textRef.current)
    }, 3000)
  }

  return (
    <>
      <Input value={text} onChange={handleChange} />
      <Button onClick={handleSend}>Send</Button>
    </>
  )
}
