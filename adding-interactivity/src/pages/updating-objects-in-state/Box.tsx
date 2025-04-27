import { useState } from 'react'

interface Position {
  x: number
  y: number
}

interface BoxProps {
  color: string
  position: Position
  onMove: (dx: number, dy: number) => void
  children: React.ReactNode
}

export default function Box({ children, color, position, onMove }: BoxProps) {
  const [lastCoordinates, setLastCoordinates] = useState<{
    x: number
    y: number
  } | null>(null)

  function handlePointerDown(e: React.PointerEvent) {
    const target = e.target as HTMLElement
    target.setPointerCapture(e.pointerId)
    setLastCoordinates({
      x: e.clientX,
      y: e.clientY,
    })
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (lastCoordinates) {
      setLastCoordinates({
        x: e.clientX,
        y: e.clientY,
      })
      const dx = e.clientX - lastCoordinates.x
      const dy = e.clientY - lastCoordinates.y
      onMove(dx, dy)
    }
  }

  function handlePointerUp(e: React.PointerEvent) {
    setLastCoordinates(null)
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        width: 100,
        height: 100,
        cursor: 'grab',
        backgroundColor: color,
        position: 'absolute',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `translate(
          ${position.x}px,
          ${position.y}px
        )`,
      }}
    >
      {children}
    </div>
  )
}
