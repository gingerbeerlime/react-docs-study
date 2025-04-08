interface ItemProps {
  name: string
  isPacked: boolean
}

const Item = ({ name, isPacked }: ItemProps) => {
  let itemContent: React.ReactNode = name
  if (isPacked) itemContent = <del>{name + '✅'}</del>
  return <li className='item'>{itemContent}</li>
}

const PackingList = () => {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item isPacked={true} name='Space suit' />
        <Item isPacked={true} name='Helmet with a gloden leaf' />
        <Item isPacked={false} name='Photo of Tam' />
      </ul>
    </section>
  )
}

export default PackingList
