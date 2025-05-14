import { useReducer } from 'react'
import Chat from './Chat.tsx'
import ContactList from './ContactList.tsx'
import { initialState, messengerReducer } from '@/reducers/messengerReducer.ts'
import { ContactType } from '@/types'

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState)
  const message = state.messages[state.selectedId]
  const contact: ContactType | undefined = contacts.find((c) => c.id === state.selectedId)

  return (
    <div>
      <ContactList contacts={contacts} selectedId={state.selectedId} dispatch={dispatch} />
      {contact && <Chat key={contact.id} message={message} contact={contact} dispatch={dispatch} />}
    </div>
  )
}

const contacts: ContactType[] = [
  { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' },
]
