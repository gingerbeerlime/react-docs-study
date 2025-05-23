import { Link } from 'react-router-dom'
import { Button } from '@/components/common/Button'

const Home = () => {
  return (
    <div className='flex items-center justify-center min-h-screen px-6 py-12'>
      <div className='w-full max-w-sm p-5 rounded-lg flex flex-col items-center justify-center gap-4 bg-violet-50 shadow-md'>
        <h1 className='text-2xl font-bold text-center mb-4'>탈출구</h1>
        <Link to='/referencing-values-with-refs'>
          <Button>Ref로 값 참조하기</Button>
        </Link>
        <Link to='/manipulating-the-dom-with-refs'>
          <Button>Ref로 DOM 조작하기</Button>
        </Link>
        <Link to='/synchronizing-with-effects'>
          <Button>Effect로 동기화하기</Button>
        </Link>
        <Link to='/you-might-not-need-an-effect'>
          <Button>Effect가 필요하지 않은 경우</Button>
        </Link>
      </div>
    </div>
  )
}

export default Home
