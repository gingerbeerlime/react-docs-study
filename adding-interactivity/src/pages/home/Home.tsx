import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to='/responding-to-events'>
        <button>이벤트에 응답하기</button>
      </Link>
      <Link to='/state-a-components-memory'>
        <button>State: 컴포넌트의 기억 저장소</button>
      </Link>
      <Link to='/state-as-a-snapshot'>
        <button>스냅샷으로서의 State</button>
      </Link>
      <Link to='/queueing-a-series-of-state-updates'>
        <button>State 업데이트 큐</button>
      </Link>
    </div>
  )
}

export default Home
