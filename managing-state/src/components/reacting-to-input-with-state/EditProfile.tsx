import { useState } from 'react'
import { Button, Input } from '@/components/ui'

export default function EditProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState('Jane')
  const [lastName, setLastName] = useState('Jacobs')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setIsEditing(!isEditing)
      }}
    >
      <label>First name:</label>
      {isEditing ? (
        <Input
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value)
          }}
        />
      ) : (
        <b>{firstName}</b>
      )}
      <br />
      <label>Last name:</label>
      {isEditing ? (
        <Input
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value)
          }}
        />
      ) : (
        <b>{lastName}</b>
      )}
      <br />
      <Button type='submit'>{isEditing ? 'Save' : 'Edit'} Profile</Button>
      <p>
        <i>
          Hello, {firstName} {lastName}!
        </i>
      </p>
    </form>
  )
}
