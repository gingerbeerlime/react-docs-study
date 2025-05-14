import { ContactType, MessengerAction } from '@/types'
import { Button } from '@/components/ui'
import { Dispatch } from 'react'

interface ContactListProps {
  contacts: ContactType[]
  selectedId: number
  dispatch: Dispatch<MessengerAction>
}

export default function ContactList({ contacts, selectedId, dispatch }: ContactListProps) {
  return (
    <section className='contact-list'>
      <ul className='flex gap-2'>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                })
              }}
            >
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  )
}
