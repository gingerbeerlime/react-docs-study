import { useState } from 'react'
import { ContactType } from '@/types/index.ts'
import { Button } from '@/components/ui'

export default function Contact({ contact }: { contact: ContactType }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <p>
        <b>{contact.name}</b>
      </p>
      {expanded && (
        <p>
          <i>{contact.email}</i>
        </p>
      )}
      <Button
        onClick={() => {
          setExpanded(!expanded)
        }}
      >
        {expanded ? 'Hide' : 'Show'} email
      </Button>
    </>
  )
}
