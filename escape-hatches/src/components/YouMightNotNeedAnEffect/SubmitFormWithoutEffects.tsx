import { useState } from 'react'
import { Button } from '@/components/common'

export default function Form() {
  const [showForm, setShowForm] = useState(false)
  const [message, setMessage] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setShowForm(false)
    sendMessage
  }

  if (!showForm) {
    return (
      <>
        <h1>Thanks for using our services!</h1>
        <Button
          onClick={() => {
            setMessage('')
            setShowForm(true)
          }}
        >
          Open chat
        </Button>
      </>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder='Message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type='submit' disabled={message === ''}>
        Send
      </Button>
    </form>
  )
}

function sendMessage(message: string) {
  console.log('Sending message: ' + message)
}
