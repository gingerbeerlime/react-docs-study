import { LetterType } from '@/types'
import { Button } from '@/components/ui'

interface LetterProps {
  letter: LetterType
  isHighlighted: boolean
  onHover: (id: number) => void
  onToggleStar: (id: number) => void
}

export default function Letter({ letter, isHighlighted, onHover, onToggleStar }: LetterProps) {
  return (
    <li
      className={isHighlighted ? 'bg-yellow-200' : ''}
      onFocus={() => {
        onHover(letter.id)
      }}
      onPointerMove={() => {
        onHover(letter.id)
      }}
    >
      <Button
        onClick={() => {
          onToggleStar(letter.id)
        }}
      >
        {letter.isStarred ? 'Unstar' : 'Star'}
      </Button>
      {letter.subject}
    </li>
  )
}
