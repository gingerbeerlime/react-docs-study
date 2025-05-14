import { useState } from 'react'
import { ContactType } from '../../types'
import { Button, Label, Input } from '@/components/ui'
interface EditContactPropsType {
  initialData: ContactType
  onSave: (updatedData: ContactType) => void
}

export default function EditContact({ initialData, onSave }: EditContactPropsType) {
  const [name, setName] = useState(initialData.name)
  const [email, setEmail] = useState(initialData.email)
  return (
    <section className='w-[300px] flex flex-col gap-2'>
      <Label>
        Name: <Input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      </Label>
      <Label>
        Email: <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      </Label>
      <Button
        onClick={() => {
          const updatedData = {
            id: initialData.id,
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
          setName(initialData.name)
          setEmail(initialData.email)
        }}
      >
        Reset
      </Button>
    </section>
  )
}
