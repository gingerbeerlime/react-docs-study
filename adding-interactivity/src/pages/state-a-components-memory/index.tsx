import styled from 'styled-components'
import MultipleStateVariables from './MultipleStateVariables'
import CompleteTheGallery from './CompleteTheGallery'
import FixStuckFromInputs from './FixStuckFromInputs'
import FixACrash from './FixACrash'

const StyleBlock = styled.div`
  display: flex;
  flex-direction: column;
  .multiple-container {
    display: flex;
    flex-direction: row;
  }
  .gallery-carousel {
    background-color: #e0eef3;
    max-width: 400px;
    max-height: 400px;
    padding: 20px;
    overflow: scroll;
  }
`

const StateAComponentsMemory = () => {
  return (
    <StyleBlock>
      <div className='multiple-container'>
        <MultipleStateVariables />
        <MultipleStateVariables />
      </div>
      <CompleteTheGallery />
      <FixStuckFromInputs />
      <FixACrash />
    </StyleBlock>
  )
}

export default StateAComponentsMemory
