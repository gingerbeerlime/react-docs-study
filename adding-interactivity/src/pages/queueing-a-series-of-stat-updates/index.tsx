import styled from 'styled-components'
import Counter from './Counter'
import RequestTracker from './RequestTracker'

const StyleBlock = styled.div`
  display: grid;
  row-gap: 10px;
`

const StateUpdateQueue = () => {
  return (
    <StyleBlock>
      <Counter />
      <RequestTracker />
    </StyleBlock>
  )
}

export default StateUpdateQueue
