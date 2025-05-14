import { useState, useEffect, use } from 'react'
import { Button } from '@/components/ui'

export default function Gallery() {
  const [index, setIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const hasNext = index < images.length - 1

  useEffect(() => {
    images.forEach((image) => {
      const img = new Image()
      img.src = image.src
    })
  }, [])

  function handleClick() {
    setIsFading(true)

    setTimeout(() => {
      if (hasNext) {
        setIndex(index + 1)
      } else {
        setIndex(0)
      }
      setIsFading(false)
    }, 300)
  }

  let image = images[index]

  return (
    <>
      <Button onClick={handleClick} className='px-4 py-2 transition'>
        Next
      </Button>
      <h3 className='text-lg font-semibold'>
        Image {index + 1} of {images.length}
      </h3>
      <div className='w-[200px]'>
        <img
          key={image.src}
          src={image.src}
          alt={image.place}
          className={`w-full h-auto transition-opacity duration-300 ease-in-out ${
            isFading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
      <p className='text-gray-700'>{image.place}</p>
    </>
  )
}

let images = [
  {
    place: 'Penang, Malaysia',
    src: 'https://i.imgur.com/FJeJR8M.jpg',
  },
  {
    place: 'Lisbon, Portugal',
    src: 'https://i.imgur.com/dB2LRbj.jpg',
  },
  {
    place: 'Bilbao, Spain',
    src: 'https://i.imgur.com/z08o2TS.jpg',
  },
  {
    place: 'Valparaíso, Chile',
    src: 'https://i.imgur.com/Y3utgTi.jpg',
  },
  {
    place: 'Schwyz, Switzerland',
    src: 'https://i.imgur.com/JBbMpWY.jpg',
  },
  {
    place: 'Prague, Czechia',
    src: 'https://i.imgur.com/QwUKKmF.jpg',
  },
  {
    place: 'Ljubljana, Slovenia',
    src: 'https://i.imgur.com/3aIiwfm.jpg',
  },
]
