const AddingEventHandler = () => {
  const Button = () => {
    const handleClick = () => {
      alert('you clicked me!')
    }

    return <button onClick={handleClick}>Click me!</button>
  }

  const ButtonInlineEvent = () => {
    return (
      <button
        onClick={function handleClick() {
          alert('you clicked me!')
        }}
      >
        Inline Event Handler
      </button>
    )
  }

  const ButtonInlineArrowFunc = () => {
    return (
      <button onClick={() => alert('you clicked me!')}>
        Inline Arrow Function
      </button>
    )
  }

  return (
    <>
      <Button />
      <ButtonInlineEvent />
      <ButtonInlineArrowFunc />
    </>
  )
}

export default AddingEventHandler
