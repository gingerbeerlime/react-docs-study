import { useState } from 'react'
import { Button, Input } from '@/components/common'

type Contact = {
  id: number
  name: string
  email: string
}

interface EditContactProps {
  savedContact: Contact
  onSave: (contact: Contact) => void
}

function EditForm({ savedContact, onSave }: EditContactProps) {
  const [name, setName] = useState(savedContact.name)
  const [email, setEmail] = useState(savedContact.email)

  return (
    <section>
      <label>
        Name: <Input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Email: <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <Button
        onClick={() => {
          const updatedData = {
            id: savedContact.id,
            name: name,
            email: email,
          }
          onSave(updatedData)
        }}
      >
        Save
      </Button>
      <Button
        onClick={() => {
          setName(savedContact.name)
          setEmail(savedContact.email)
        }}
      >
        Reset
      </Button>
    </section>
  )
}

export default function EditContact(props: EditContactProps) {
  return <EditForm key={props.savedContact.id} {...props} />
}
