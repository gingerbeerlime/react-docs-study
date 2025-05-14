import { useState } from 'react'

export default function SwapTwoFormFields() {
  const [reverse, setReverse] = useState(false)
  let checkbox = (
    <label>
      <input type='checkbox' checked={reverse} onChange={(e) => setReverse(e.target.checked)} />
      Reverse order
    </label>
  )
  if (reverse) {
    return (
      <div className='flex flex-col gap-2'>
        <Field label='Last name' key='last-name' />
        <Field label='First name' key='first-name' />
        {checkbox}
      </div>
    )
  } else {
    return (
      <div className='flex flex-col gap-2'>
        <Field label='First name' key='first-name' />
        <Field label='Last name' key='last-name' />
        {checkbox}
      </div>
    )
  }
}

function Field({ label }: { label: string }) {
  const [text, setText] = useState('')
  return (
    <label>
      {label}:{' '}
      <input
        type='text'
        value={text}
        placeholder={label}
        onChange={(e) => setText(e.target.value)}
      />
    </label>
  )
}
