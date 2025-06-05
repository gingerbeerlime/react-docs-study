import { useState, useRef } from 'react'
import { Input } from '@/components/common/Input'
import { Button } from '@/components/common/Button'

export default function Chat() {
  const [text, setText] = useState('')
  const [isSending, setIsSending] = useState(false)
  const timeoutID = useRef<NodeJS.Timeout | null>(null)

  function handleSend() {
    setIsSending(true)
    timeoutID.current = setTimeout(() => {
      alert('Sent!')
      setIsSending(false)
    }, 3000)
  }

  function handleUndo() {
    setIsSending(false)
    if (timeoutID.current) {
      clearTimeout(timeoutID.current)
    }
  }

  return (
    <>
      <Input disabled={isSending} value={text} onChange={(e) => setText(e.target.value)} />
      <Button disabled={isSending} onClick={handleSend}>
        {isSending ? 'Sending...' : 'Send'}
      </Button>
      {isSending && <Button onClick={handleUndo}>Undo</Button>}
    </>
  )
}
