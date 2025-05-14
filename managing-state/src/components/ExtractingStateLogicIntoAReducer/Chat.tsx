import { ContactType, MessengerAction } from '@/types'
import { Dispatch } from 'react'
import { Textarea, Button } from '@/components/ui'

interface ChatProps {
  contact: ContactType
  message: string
  dispatch: Dispatch<MessengerAction>
}

export default function Chat({ contact, message, dispatch }: ChatProps) {
  return (
    <section className='chat mt-5'>
      <Textarea
        value={message}
        placeholder={'Chat to ' + contact.name}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          })
        }}
      />
      <br />
      <Button
        onClick={() => {
          alert(contact.email + ' ' + message)
          dispatch({
            type: 'sent_message',
          })
        }}
      >
        Send to {contact.email}
      </Button>
    </section>
  )
}
