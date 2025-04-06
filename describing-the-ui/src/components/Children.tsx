import { ReactNode } from 'react'

const MyProfile = () => {
  return (
    <div>
      <h1>Photo</h1>
      <img
        className='avatar'
        src='https://picsum.photos/300/200'
        alt='random photo'
        width={70}
        height={70}
      />
    </div>
  )
}

interface CardProps {
  children: ReactNode
}

const Card = ({ children }: CardProps) => {
  return (
    <div className='card'>
      <div className='card-content'>{children}</div>
    </div>
  )
}

export default function Profile() {
  return (
    <div>
      <Card>
        <MyProfile />
      </Card>
      <Card>
        <h1>자식을 JSX로 전달하기</h1>
        <p>중첩된 JSX</p>
      </Card>
    </div>
  )
}
