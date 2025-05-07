import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const Home = () => {
  return (
    <div className='grid grid-cols-1 gap-y-2'>
      <h1>State 관리하기</h1>
      <Link to='/reacting-to-input-with-state'>
        <Button>State를 사용해 Input 다루기</Button>
      </Link>
      <Link to='/choosing-the-state-structure'>
        <Button>State 구조 선택하기</Button>
      </Link>
    </div>
  )
}

export default Home
