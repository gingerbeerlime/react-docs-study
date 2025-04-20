const EventPropagation = () => {
  return (
    <div
      className='Toolbar'
      onClick={() => {
        alert('You clicked on the toolbar !')
      }}
    >
      <span>Toolbar</span>
      <button onClick={() => alert('Playing!')}>Play movie</button>
      <button onClick={() => alert('Uploading!')}>Upload Image</button>
    </div>
  )
}

export default EventPropagation
