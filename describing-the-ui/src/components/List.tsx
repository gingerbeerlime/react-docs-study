import { getImageUrl } from '../util/getImageUrl'
import { people } from '../data/scientists'

interface Person {
  id: number
  name: string
  profession: string
  accomplishment: string
  imageId: string
}

interface ListSectionProps {
  title: string
  people: Person[]
}

const ListSection = ({ title, people }: ListSectionProps) => {
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            <img src={getImageUrl(person)} alt={person.name} />
            <p>
              <b>{person.name}:</b>
              {' ' + person.profession + ' '} known for {person.accomplishment}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}

const List = () => {
  const chemists = people.filter(
    (person: Person) => person.profession === 'chemist',
  )
  const everyoneElse = people.filter(
    (person: Person) => person.profession !== 'chemist',
  )

  return (
    <article>
      <h1>Scientists</h1>
      <ListSection title='Chemists' people={chemists}></ListSection>
      <ListSection title='Everyone Else' people={everyoneElse}></ListSection>
    </article>
  )
}

export default List
