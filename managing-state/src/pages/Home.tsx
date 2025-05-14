import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const buttonClass = 'bg-violet-400 hover:bg-violet-500 cursor-pointer'

const Home = () => {
  return (
    <div className='flex items-center justify-center min-h-screen px-6 py-12'>
      <div className='w-full max-w-sm p-5 rounded-lg flex flex-col items-center justify-center gap-4 bg-violet-50 shadow-md'>
        <h1 className='text-2xl font-bold text-center mb-4'>State 관리하기</h1>
        <Link to='/reacting-to-input-with-state'>
          <Button className={buttonClass}>State를 사용해 Input 다루기</Button>
        </Link>
        <Link to='/choosing-the-state-structure'>
          <Button className={buttonClass}>State 구조 선택하기</Button>
        </Link>
        <Link to='/sharing-state-between-components'>
          <Button className={buttonClass}>컴포넌트 간 State 공유하기</Button>
        </Link>
        <Link to='/preserving-and-resetting-state'>
          <Button className={buttonClass}>State를 보존하고 초기화하기</Button>
        </Link>
        <Link to='/extracting-state-logic-into-a-reducer'>
          <Button className={buttonClass}>State 로직을 Reducer로 추출하기</Button>
        </Link>
      </div>
    </div>
  )
}

export default Home
