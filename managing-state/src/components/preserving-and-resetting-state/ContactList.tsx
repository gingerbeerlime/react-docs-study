import { ContactType } from '../../types'
import { Button } from '@/components/ui'

interface ContactListPropsType {
  contacts: ContactType[]
  selectedId: number
  onSelect: (id: number) => void
}

export default function ContactList({ contacts, selectedId, onSelect }: ContactListPropsType) {
  return (
    <section>
      <ul className='flex gap-2'>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Button
              onClick={() => {
                onSelect(contact.id)
              }}
            >
              {contact.id === selectedId ? <b>{contact.name}</b> : contact.name}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  )
}
