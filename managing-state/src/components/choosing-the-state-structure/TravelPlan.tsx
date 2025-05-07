import { useState } from 'react'
import { initialTravelPlan } from '@/data/places'
import { Button } from '@/components/ui'

interface Plan {
  id: number
  title: string
  childIds: number[]
}

interface PlaceTreeProps {
  id: number
  parentId: number
  placesById: Record<number, Plan>
  onComplete: (parentId: number, id: number) => void
}

export default function TravelPlan() {
  const [plan, setPlan] = useState<Record<number, Plan>>(initialTravelPlan)

  function handleComplete(parentId: number, childId: number) {
    const parent = plan[parentId]
    // Create a new version of the parent place
    // that doesn't include this child ID.
    const nextParent = {
      ...parent,
      childIds: parent.childIds.filter((id) => id !== childId),
    }
    // Update the root state object...
    setPlan({
      ...plan,
      // ...so that it has the updated parent.
      [parentId]: nextParent,
    })
  }

  const root = plan[0]
  const planetIds = root.childIds
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map((id) => (
          <PlaceTree key={id} id={id} parentId={0} placesById={plan} onComplete={handleComplete} />
        ))}
      </ol>
    </>
  )
}

function PlaceTree({ id, parentId, placesById, onComplete }: PlaceTreeProps) {
  const place = placesById[id]
  const childIds = place.childIds
  return (
    <li>
      {place.title}
      <Button
        onClick={() => {
          onComplete(parentId, id)
        }}
      >
        Complete
      </Button>
      {childIds.length > 0 && (
        <ol>
          {childIds.map((childId) => (
            <PlaceTree
              key={childId}
              id={childId}
              parentId={id}
              placesById={placesById}
              onComplete={onComplete}
            />
          ))}
        </ol>
      )}
    </li>
  )
}
