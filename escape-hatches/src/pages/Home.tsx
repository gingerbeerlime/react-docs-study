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
        <Link to='/lifecycle-of-reactive-effect'>
          <Button>Reactive Effect의 생명주기</Button>
        </Link>
        <Link to='/seperating-events-from-effects'>
          <Button>Effect에서 이벤트 분리하기</Button>
        </Link>
        <Link to='/removing-effect-dependencies'>
          <Button>Effect에서 의존성 제거하기</Button>
        </Link>
        <Link to='/reusing-logic-with-custom-hooks'>
          <Button>로직 재사용하기</Button>
        </Link>
      </div>
    </div>
  )
}

export default Home
