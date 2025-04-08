// export default로 선언된 컴포넌트 import 해오는 법
// import Gallery from './components/Gallery'
// name export로 선언된 컴포넌트 import 해오는 법
// import { Profile } from './components/Profile'
import ProfileList from './components/keeping-components-pure/ProfileList'

const App = () => {
  return <ProfileList />
}

export default App
