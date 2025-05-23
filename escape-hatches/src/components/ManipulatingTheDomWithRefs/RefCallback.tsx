import { useRef, useState } from 'react'
import { Button } from '@/components/common'

type Cat = string

export default function CatFriends() {
  const itemsRef = useRef<Map<Cat, HTMLElement>>(null)
  const [catList, setCatList] = useState<Cat[]>(setupCatList)

  function scrollToCat(cat: Cat) {
    const map = getMap()
    const node = map.get(cat)
    node?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map()
    }
    return itemsRef.current
  }

  return (
    <>
      <nav>
        <Button onClick={() => scrollToCat(catList[0])}>Neo</Button>
        <Button onClick={() => scrollToCat(catList[5])}>Millie</Button>
        <Button onClick={() => scrollToCat(catList[9])}>Bella</Button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat}
              ref={(node) => {
                const map = getMap()
                if (node) {
                  map.set(cat, node)
                }

                return () => {
                  map.delete(cat)
                }
              }}
            >
              <img src={cat} />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function setupCatList() {
  const catList = []
  for (let i = 0; i < 10; i++) {
    catList.push('https://loremflickr.com/320/240/cat?lock=' + i)
  }

  return catList
}
