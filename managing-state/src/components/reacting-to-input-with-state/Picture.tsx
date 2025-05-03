import { useState } from 'react'

export default function Picture() {
  const [isActive, setIsActive] = useState(false)

  const bgClasses = isActive ? 'background' : 'background background--active'
  const pictureClasses = isActive ? 'picture picture--active' : 'picture'

  return (
    <div
      onClick={() => {
        setIsActive(false)
      }}
      className={bgClasses}
    >
      <img
        onClick={(e) => {
          e.stopPropagation()
          setIsActive(true)
        }}
        className={pictureClasses}
        alt='Rainbow houses in Kampung Pelangi, Indonesia'
        src='https://i.imgur.com/5qwVYb1.jpeg'
      />
    </div>
  )
}
