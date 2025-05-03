import { useState } from 'react'
import { Textarea, Button } from '@/components/ui'

const CityQuiz = () => {
  const [answer, setAnswer] = useState<string>('')
  const [error, setError] = useState<Error | null>(null)
  const [status, setStatus] = useState<'typing' | 'submitting' | 'success'>('typing')

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    try {
      await submitForm(answer)
      setStatus('success')
    } catch (err) {
      setStatus('typing')
      setError(err as Error)
    }
  }

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(e.target.value)
  }

  return (
    <>
      <h2>City Quiz</h2>
      <p>In which city is there a billboard that turns air into drinkable water?</p>
      <form onSubmit={handleSubmit}>
        <Textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <Button disabled={answer.length === 0 || status === 'submitting'}>Submit</Button>
        {error !== null && <p className='Error'>{error.message}</p>}
      </form>
    </>
  )
}

function submitForm(answer: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again'))
      } else {
        resolve()
      }
    }, 1500)
  })
}

export default CityQuiz
