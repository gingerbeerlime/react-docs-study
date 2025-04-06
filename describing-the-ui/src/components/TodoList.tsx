const today = new Date()

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
}

export default function TodoList() {
  const person = {
    name: 'ginger',
    theme: {
      backgroundColor: 'black',
      color: 'pink',
    },
    imgUrl: 'https://picsum.photos/300/200',
  }
  return (
    <div>
      <h1>
        {person.name}'s Todos for {formatDate(today)}
      </h1>
      <img src={person.imgUrl} alt='random phto' />
      <ul style={person.theme}>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  )
}
