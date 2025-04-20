import { ReactNode } from 'react'

interface ButtonProps {
  onClick: () => void
  children: ReactNode
}

type MovieNameProps = {
  movieName: string
}

const PassingEventHandlersAsProps = () => {
  const Button = ({ onClick, children }: ButtonProps) => {
    return <button onClick={onClick}>{children}</button>
  }

  const PlayButton = ({ movieName }: MovieNameProps) => {
    const handlePlayClick = () => {
      alert(`Playing ${movieName}`)
    }

    return <Button onClick={handlePlayClick}>Play "{movieName}"</Button>
  }

  const UploadButton = () => {
    return <Button onClick={() => alert('Uploading!')}>Upload Image</Button>
  }

  const Toolbar = () => {
    return (
      <div className='toolbar'>
        <PlayButton movieName="Kiki's Delivery Service" />
        <UploadButton />
      </div>
    )
  }

  return <Toolbar />
}

export default PassingEventHandlersAsProps
