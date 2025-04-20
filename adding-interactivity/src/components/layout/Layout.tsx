import styled from 'styled-components'
import { Outlet } from 'react-router-dom'

const LayoutBlock = styled.div`
  padding: 20px 0 0 40px;
`

const Layout = () => {
  return (
    <LayoutBlock>
      <div>
        <h2>상호작용 더하기</h2>
        <Outlet />
      </div>
    </LayoutBlock>
  )
}

export default Layout
