export default function Avatar() {
  const avatar = 'https://picsum.photos/300/200'
  const description = 'random photos'
  return <img className='avatar' src={avatar} alt={description} />
}
