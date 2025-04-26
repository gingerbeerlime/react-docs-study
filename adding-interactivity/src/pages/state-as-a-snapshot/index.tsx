import styled from 'styled-components'
import SendMessage from './SendMessage'
import Counter from './Counter'
import CounterWithTimer from './CounterWithTimer'
import TrafficLight from './TrafficLight'

const StyleBlock = styled.div`
  display: grid;
  row-gap: 10px;
`

const StateAsSnapShot = () => {
  return (
    <StyleBlock>
      <SendMessage />
      <Counter />
      <CounterWithTimer />
      <TrafficLight />
    </StyleBlock>
  )
}

export default StateAsSnapShot
