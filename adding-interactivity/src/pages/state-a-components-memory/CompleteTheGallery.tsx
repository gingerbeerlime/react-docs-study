import { useState } from 'react'
import { sculptureList } from '../../data/data.ts'

export default function CompleteTheGallery() {
  const [index, setIndex] = useState(0)
  const [showMore, setShowMore] = useState(false)

  function handleNextClick() {
    setIndex(index + 1)
  }

  function handlePreviousClick() {
    setIndex(index - 1)
  }

  function handleMoreClick() {
    setShowMore(!showMore)
  }

  let sculpture = sculptureList[index]

  let moveButton

  if (index === sculptureList.length - 1) {
    moveButton = <button onClick={handlePreviousClick}>Previous</button>
  } else if (index === 0) {
    moveButton = <button onClick={handleNextClick}>Next</button>
  } else {
    moveButton = (
      <div>
        <button onClick={handlePreviousClick}>Previous</button>
        <button onClick={handleNextClick}>Next</button>
      </div>
    )
  }
  return (
    <div className='gallery-challenge'>
      {moveButton}
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </div>
  )
}
