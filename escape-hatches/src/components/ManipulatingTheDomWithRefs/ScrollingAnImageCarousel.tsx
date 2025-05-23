import { useState, useRef } from 'react'
import { flushSync } from 'react-dom'
import { Button } from '@/components/common'

export default function CatFriends() {
  const [index, setIndex] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)

  const handleClick = () => {
    flushSync(() => {
      if (index < catList.length - 1) {
        setIndex(index + 1)
      } else {
        setIndex(0)
      }
    })
    const node = listRef.current?.children[index]
    node?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }
  return (
    <>
      <nav>
        <Button onClick={handleClick}>Next</Button>
      </nav>
      <div>
        <ul ref={listRef}>
          {catList.map((cat, i) => (
            <li key={cat.id}>
              <img
                className={index === i ? 'active' : ''}
                src={cat.imageUrl}
                alt={'Cat #' + cat.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

type Cat = {
  id: number
  imageUrl: string
}

const catList: Cat[] = []
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: 'https://loremflickr.com/250/200/cat?lock=' + i,
  })
}
