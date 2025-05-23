## Effect가 필요하지 않은 경우

> 1. 렌더링 로직이나 사용자 이벤트 처리에는 Effect가 필요 없다.<br/>
> 2. 외부와의 동기화가 필요한 경우에만 Effect를 사용해야 한다. - ex) 네트워크 요청, 타이머, DOM 조작, 로컬 스토리지, 분리된 이벤트 소스 등

<br/>

### 비용이 많이 드는 계산 캐싱하기 - `useMemo`

❌ `visibleTodos`를 따로 `state`로 선언하고 `useEffect`안에서 계산하는건 비효율적

```jsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('')

  // 필터링된 todos
  const [visibleTodos, setVisibleTodos] = useState([])
  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todos, filter))
  }, [todos, filter])

  // ...
}
```

✅ State와 Effect 없이 **렌더링 중에 바로 계산**하기

```jsx
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('')
  const visibleTodos = getFilteredTodos(todos, filter)
  // ...
}
```

✅ `getFilteredTodos` 계산이 오래 걸린다면 → `useMemo` 사용해 값비싼 계산 캐시하기

```jsx
import { useMemo, useState } from 'react'

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('')
  const visibleTodos = useMemo(() => {
    return getFilteredTodos(todos, filter)
  }, [todos, filter])
  // ...
}
```

⇒ `todos`나 `filter`가 변경되지 않는 한 `getFilteredTodos`를 다시 실행하지 않고 `useMemo`는 마지막으로 저장한 결과를 반환한다

<br/>

### prop 변경 시 모든 state 초기화 - `key`

❌ prop으로 전달된 `userId`가 변경될 때 `useEffect`에서 `state` 초기화 → 복잡성 증가

```jsx
export default function ProfilePage({ userId }) {
  const [comment, setComment] = useState('')

  // 🔴 피하세요: Effect에서 prop 변경 시 state 초기화
  useEffect(() => {
    setComment('')
  }, [userId])
  // ...
}
```

✅ `key`를 사용해 컴포넌트의 고유한 식별성을 부여하기 → 같은 위치의 같은 컴포넌트라도 `key`가 달라지면 리액트는 다른 컴포넌트로 인식해 컴포넌트를 새로 마운트하고 `state`도 초기화된다.

```jsx
export default function ProfilePage({ userId }) {
  return <Profile userId={userId} key={userId} />
}

function Profile({ userId }) {
  const [comment, setComment] = useState('')
  // ...
}
```

<br/>

### 이벤트 핸들러 간 로직 공유

❌ 두 개의 버튼을 클릭했을 때 모두 같은 알림이 표시되어야하는걸 `useEffect`에서 처리

✅ **사용자의 상호작용(이벤트)**으로 알림이 표시되어야하는 경우에는 **이벤트핸들러에서 처리**하기

⇒ 컴포넌트가 이벤트가 아닌 **“사용자에게 표시되었기 때문”**에 실행되어야 하는 코드에만 `Effect`를 사용

<br/>

### 연쇄 계산

- `state` 간 연쇄 관계가 내부적으로 계산 가능한 경우 → `이벤트 핸들러`에서 처리
- `state` 변화에 따른 외부 비동기 동작 또는 사이드 이펙트가 필요한 경우 → `useEffect`에서 처리
  - ex) 셀렉트 박스에서 나라를 선택했을 때 다음 셀렉트 박스에 도시 목록 옵션을 서버에서 받아오는 경우

<br/>

### 애플리케이션 초기화

```jsx
let didInit = false

function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true
      // ✅ 앱 로드당 한 번만 실행
      loadDataFromLocalStorage()
      checkAuthToken()
    }
  }, [])
  // ...
}
```

- 앱이 로드될 때 딱 한 번만 실행되어야 하는 로직은 useEffect내에서 이미 실행되었는지 체크하는 로직 필요

<br/>

### 외부 저장소 구독하기 - `useSyncExternalStore`

`useSyncExternalStore()`는 리액트 외부에 있는 값이나 이벤트를 안정적으로 리액트와 동기화할 때 쓰는 공식 Hook
