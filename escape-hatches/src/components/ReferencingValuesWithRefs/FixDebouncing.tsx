import React, { useRef } from 'react'
import { Button } from '@/components/common/Button'

interface DebouncedButtonProps {
  onClick: () => void
  children: React.ReactNode
}

function DebouncedButton({ onClick, children }: DebouncedButtonProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  return (
    <Button
      onClick={() => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          onClick()
        }, 1000)
      }}
    >
      {children}
    </Button>
  )
}

export default function Dashboard() {
  return (
    <div className='flex flex-cols gap-2'>
      <DebouncedButton onClick={() => alert('Spaceship launched!')}>
        Launch the spaceship
      </DebouncedButton>
      <DebouncedButton onClick={() => alert('Soup boiled!')}>Boil the soup</DebouncedButton>
      <DebouncedButton onClick={() => alert('Lullaby sung!')}>Sing a lullaby</DebouncedButton>
    </div>
  )
}
