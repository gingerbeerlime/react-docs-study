import styled from 'styled-components'
import ShoppingCart from './ShoppingCart'

const StyleBlock = styled.div`
  display: grid;
  row-gap: 10px;
`

const UpdatingArrayInState = () => {
  return (
    <StyleBlock>
      <ShoppingCart />
    </StyleBlock>
  )
}

export default UpdatingArrayInState
