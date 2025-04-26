import { useState } from 'react'

const SendMessage = () => {
  const [isSent, setIsSent] = useState(false)
  const [message, setMessage] = useState('Hi')
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setIsSent(true)
        setMessage(message)
      }}
    >
      <textarea
        placeholder='Message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type='submit'>Send</button>
    </form>
  )
}

export default SendMessage
