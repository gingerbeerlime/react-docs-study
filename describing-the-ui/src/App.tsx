// export default로 선언된 컴포넌트 import 해오는 법
import Gallery from './components/Gallery'
// name export로 선언된 컴포넌트 import 해오는 법
import { Profile } from './components/Profile'
// import Avatar from './components/Avatar'
// import TodoList from './components/TodoList'
// import Profile from './components/Children'
// import Clock from './components/Clock'

const App = () => {
  return <Gallery />
  return <Profile />
  // return <Clock time={new Date().toLocaleTimeString()} color='blue' />
}

export default App
