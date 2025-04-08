import { getImageUrl } from '../../util/getImageUrl'

interface Person {
  name: string
  imageId: string
}

interface ProfileProps {
  person: Person
}

const Profile = ({ person }: ProfileProps) => {
  return (
    <div>
      <Header person={person} />
      <Avatar person={person} />
    </div>
  )
}

const Header = ({ person }: ProfileProps) => {
  return <h1>{person.name}</h1>
}

const Avatar = ({ person }: ProfileProps) => {
  return (
    <img
      className='avatar'
      src={getImageUrl(person)}
      alt={person.name}
      width={50}
      height={50}
    />
  )
}

export default Profile
