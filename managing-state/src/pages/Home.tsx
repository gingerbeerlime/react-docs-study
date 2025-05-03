import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Home = () => {
  return (
    <div>
      State 관리하기
      <Link to='/reacting-to-input-with-state'>
        <Button>State를 사용해 Input 다루기</Button>
      </Link>
    </div>
  )
}

export default Home
