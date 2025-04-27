import styled from 'styled-components'
import MovingDot from './MovingDot'
import Form from './Form'
import UseImmer from './UseImmer'
import ScoreBoard from './ScoreBoard'
import Canvas from './Canvas'

const StyleBlock = styled.div`
  display: grid;
  row-gap: 10px;
`

const UpdatingObjectsInState = () => {
  return (
    <StyleBlock>
      <MovingDot />
      <Form />
      <UseImmer />
      <ScoreBoard />
      <Canvas />
    </StyleBlock>
  )
}

export default UpdatingObjectsInState
