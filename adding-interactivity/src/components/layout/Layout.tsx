import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <h2>상호작용 더하기</h2>
      <Outlet />
    </div>
  )
}

export default Layout
