import { useState, useContext } from 'react'
import { places } from '@/data/placesInfo'
import { getImageUrl } from '@/util/getImageUrl'
import { ImageSizeContext } from '@/context/ImageSizeContext'
import { PlaceType } from '@/types'
import { Input, Label } from '@/components/ui'

export default function App() {
  console.log('image size context', ImageSizeContext)
  const [isLarge, setIsLarge] = useState(false)
  const imageSize = isLarge ? 150 : 100

  return (
    <>
      <Label>
        <Input
          type='checkbox'
          checked={isLarge}
          onChange={(e) => {
            setIsLarge(e.target.checked)
          }}
        />
        Use large images
      </Label>
      <hr />
      <ImageSizeContext value={imageSize}>
        <List />
      </ImageSizeContext>
    </>
  )
}

function List() {
  const listItems = places.map((place) => (
    <li key={place.id}>
      <Place place={place} />
    </li>
  ))
  return <ul>{listItems}</ul>
}

function Place({ place }: { place: PlaceType }) {
  return (
    <>
      <PlaceImage place={place} />
      <p>
        <b>{place.name}</b>
        {': ' + place.description}
      </p>
    </>
  )
}

function PlaceImage({ place }: { place: PlaceType }) {
  const imageSize = useContext(ImageSizeContext)
  return <img src={getImageUrl(place)} alt={place.name} width={imageSize} height={imageSize} />
}
