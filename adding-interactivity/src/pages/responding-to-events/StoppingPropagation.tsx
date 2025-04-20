import { ReactNode } from 'react'

interface ButtonProps {
  onClick: () => void
  children: ReactNode
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      {children}
    </button>
  )
}

const StoppingPropagation = () => {
  return (
    <div
      className='Toolbar'
      onClick={() => alert('You clicked on the toolbar!')}
    >
      <Button onClick={() => alert('Playing!')}>Play Movie</Button>
      <Button onClick={() => alert('Uploading!')}>Upload Image</Button>
    </div>
  )
}

export default StoppingPropagation
