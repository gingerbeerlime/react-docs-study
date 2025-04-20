import styled from 'styled-components'
import AddingEventHandlers from './AddingEventHandlers'
import ReadingPropsInEventHandlers from './ReadingPropsInEventHandlers'
import PassingEventHandlersAsProps from './PassingEventHandlersAsProps'
import EventPropagation from './EventPropagation'
import StoppingPropagation from './StoppingPropagation'
import LightSwitch from './LightSwitch'

const StyleBlock = styled.div`
  display: flex;
  flex-direction: column;

  button {
    margin-bottom: 10px;
  }

  .toolbar {
    display: grid;
    grid-auto-flow: column;
    column-gap: 10px;
  }
  .Toolbar {
    display: grid;
    grid-auto-flow: column;
    column-gap: 10px;
    background-color: gray;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    span {
      color: white;
    }
    button {
      margin-bottom: 0;
    }
  }
`

const RespondingToEvents = () => {
  return (
    <StyleBlock>
      <AddingEventHandlers />
      <ReadingPropsInEventHandlers />
      <PassingEventHandlersAsProps />
      <EventPropagation />
      <StoppingPropagation />
      <LightSwitch />
    </StyleBlock>
  )
}

export default RespondingToEvents
