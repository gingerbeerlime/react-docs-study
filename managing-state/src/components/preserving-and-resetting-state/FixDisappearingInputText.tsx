import { useState } from 'react'
import { Button, Textarea } from '@/components/ui'

export default function FixDisappearingInputText() {
  const [showHint, setShowHint] = useState(false)
  return (
    <div>
      {showHint && (
        <p>
          <i>Hint: Your favorite city?</i>
        </p>
      )}
      <Form />
      {showHint ? (
        <Button
          onClick={() => {
            setShowHint(false)
          }}
        >
          Hide hint
        </Button>
      ) : (
        <Button
          onClick={() => {
            setShowHint(true)
          }}
        >
          Show hint
        </Button>
      )}
    </div>
  )
}

function Form() {
  const [text, setText] = useState('')
  return <Textarea value={text} onChange={(e) => setText(e.target.value)} />
}
