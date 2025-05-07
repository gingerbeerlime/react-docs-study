import { useState } from 'react'
import { initialLetters } from '@/data/letter.js'
import Letter from './Letter.js'
import { LetterType } from '@/types'

export default function MailClient() {
  const [letters, setLetters] = useState<LetterType[]>(initialLetters)
  const [highlightedLetter, setHighlightedLetter] = useState<number | null>(null)

  function handleHover(id: number) {
    setHighlightedLetter(id)
  }

  function handleStar(id: number) {
    setLetters(
      letters.map((letter) => {
        if (letter.id === id) {
          return {
            ...letter,
            isStarred: !letter.isStarred,
          }
        } else {
          return letter
        }
      }),
    )
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map((letter) => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={letter.id === highlightedLetter}
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </>
  )
}
