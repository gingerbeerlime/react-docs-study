import { getImageUrl } from '../util/getImageUrl.ts'

interface Person {
  name: string
  imgId: string
}

interface AvatarProps {
  person: Person
  size: number
}

function Avatar({ person, size = 60 }: AvatarProps) {
  return (
    <img
      className='avatar'
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  )
}

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{
          name: 'ginger',
          imgId: 'sample1',
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'ginger2',
          imgId: 'sample2',
        }}
      />
    </div>
  )
}
