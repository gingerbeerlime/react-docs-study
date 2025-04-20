import { ReactNode } from 'react'

interface AlertButtonProps {
  message: string
  children: ReactNode
}

const ReadingPropsInEventHandlers = () => {
  const AlertButton = ({ message, children }: AlertButtonProps) => {
    return <button onClick={() => alert(message)}>{children}</button>
  }

  const Toolbar = () => {
    return (
      <div className='toolbar'>
        <AlertButton message='Playing!'>Play Movie</AlertButton>
        <AlertButton message='Uploading!'>Upload Image</AlertButton>
      </div>
    )
  }

  return <Toolbar />
}

export default ReadingPropsInEventHandlers
