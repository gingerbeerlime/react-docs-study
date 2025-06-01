## Effect가 필요하지 않은 경우

> 렌더링 로직이나 사용자 이벤트 처리에는 Effect가 필요 없다.
> 외부와의 동기화가 필요한 경우에만 Effect를 사용해야 한다.
> ex) 네트워크 요청, 타이머, DOM 조작, 로컬 스토리지, 분리된 이벤트 소스 등

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

### prop이 변경될 때 일부 state 조정하기

❌ `useEffect`에서 `state` 값인 `selection`을 변경하게 되면 변경될 때 마다 `List` 컴포넌트와 자식 컴포넌트들은 오래된 `selection`값으로 처음 렌더링된다. 그 후 리액트가 DOM을 업데이트한 후 Effect가 실행되면서 값이 바뀌게 되고 그러면 렌더링이 다시 일어나서 비효율적이다.

```jsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false)
  const [selection, setSelection] = useState(null)

  // 🔴 피하세요: Effect에서 prop 변경 시 state 조정하기
  useEffect(() => {
    setSelection(null)
  }, [items])
  // ...
}
```

✅ 렌더링 중 state 조정하기

- 렌더링 중 `setSelection`을 호출하면 아직 리액트가 DOM을 업데이트하기 전이기 때문에 오래된 `selection` 값의 렌더링을 건너뛸 수 있음
- ⚠️ 렌더링 중이 state 값을 변경하게 되면 오래된 selection 값의 렌더링을 건너뛸 수 있다는 성능상 장점은 있지만 리액트는 렌더링 중 state 값을 변경하는 것을 권장하지 않음

```jsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false)
  const [selection, setSelection] = useState(null)

  // 더 좋습니다: 렌더링 중 state 조정
  const [prevItems, setPrevItems] = useState(items)
  if (items !== prevItems) {
    setPrevItems(items)
    setSelection(null)
  }
  // ...
}
```

✅ ✅ 렌더링 중 `state` 조정할 필요 없이! `key`를 사용하거나 렌더링 중 모든 `state` 계산

- `items` 값이 변경되더라도 선택된 항목 `state`를 업데이트 할 필요가 없음. `selectedId`를 사용해 렌더링 중 계산

```jsx
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  // ✅ 최고예요: 렌더링 중에 모든 것을 계산
  const selection = items.find((item) => item.id === selectedId) ?? null
  // ...
}
```

<br/>

### 이벤트 핸들러 간 로직 공유

❌ 두 개의 버튼을 클릭했을 때 모두 같은 알림이 표시되어야하는걸 `useEffect`에서 처리

✅ **사용자의 상호작용(이벤트)**으로 알림이 표시되어야하는 경우에는 **이벤트핸들러에서 처리**하기

⇒ 컴포넌트가 이벤트가 아닌 **“사용자에게 표시되었기 때문”**에 실행되어야 하는 코드에만 `Effect`를 사용

<br/>

### 연쇄 계산(Effects Chain)

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

- 앱이 로드될 때 딱 한 번만 실행되어야 하는 로직은 `useEffect`내에서 이미 실행되었는지 체크하는 로직 필요

```jsx
if (typeof window !== 'undefined') {
  // 브라우저에서 실행 중인지 확인합니다.
  // ✅ 앱 로드당 한 번만 실행
  checkAuthToken()
  loadDataFromLocalStorage()
}

function App() {
  // ...
}
```

- 앱이 렌더링 되기 전에 한 번 실행할 수도 있으나, 이 방법은 컴포넌트를 `import`할 때 렌더링되지 않더라도 한 번 실행되기 때문에 주의해야 한다
- app 전체 초기화 로직은 `App.js`와 같은 루트 컴포넌트 모듈이나 애플리케이션의 엔트리 포인트에 둬야한다

<br/>

### 부모에게 데이터 전달하기

❌ 자식 컴포넌트의 `useEffect`에서 부모 컴포넌트에게 데이터를 전달하거나 `state`를 변경하게 되면 데이터 흐름을 추적하기 어려워짐

✅ 데이터는 항상 부모 컴포넌트에서 자식 컴포넌트로 흐르도록 하기

<br/>

### 외부 저장소 구독하기 - `useSyncExternalStore`

`useSyncExternalStore()`는 리액트 외부에 있는 값이나 이벤트를 안정적으로 리액트와 동기화할 때 쓰는 공식 Hook

```jsx
function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe, // 변화가 생기면 React한테 알려주는 함수
    () => navigator.onLine, // 현재 상태를 확인하는 함수 (브라우저용)
    () => true, // 서버에서는 그냥 true라고 알려줘 (서버는 이걸 모르니까!)
  )
}
```

```jsx
function ChatIndicator() {
  const isOnline = useOnlineStatus()
}
```

- 컴퓨터가 인터넷에 연결되어있는지 여부를 리액트랑 동기화시키고 싶을 때
  - `useEffect`문에서 수동으로 브라우저의 [`navigator.onLine`](http://navigator.onLine) API를 구독하는 것보다 `useSyncExternalStore` 훅을 사용한 커스텀 훅을 작성해서 사용하는 것이 안정적으로 사용할 수 있다.

---

### 🚩 챌린지 : Effect 없이 계산하기

[`문제풀이`] `useEffect`를 없애고 렌더링 중 계산 + `useMemo`로 `todos` 나 `showActive`가 변경되지 않았을 땐 캐시된 값 사용하기

```jsx
export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const [text, setText] = useState('');

  const visibleTodos = useMemo(() => {
	  return getVisibleTodos(todos, showActive)
  }, [todos, showActive]);

  ...
}
```

✨더 좋은 방식 : `NewForm` 분리하기(state 분리)

- `NewTodo` 폼을 분리하게 되면 `text` 상태값 변경에 영향을 받지 않으므로 `useMemo`를 사용하지 않아도 불필요한 계산을 하지 않는다

```jsx
import { useState } from 'react'
import { initialTodos, createTodo } from '@/utils/todos'
import type { TodoType } from '@/types'
interface TodoProps {
  onAdd: (todo: TodoType) => void
}

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos)
  const [showActive, setShowActive] = useState(false)

  const activeTodos = todos.filter((todo) => !todo.completed)
  const visibleTodos = showActive ? activeTodos : todos

  return (
    <div>
      <label>
        <input
          type='checkbox'
          checked={showActive}
          onChange={(e) => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <NewTodo onAdd={(newTodo: TodoType) => setTodos([...todos, newTodo])} />
      ...
    </div>
  )
}

function NewTodo({ onAdd }: TodoProps) {
  const [text, setText] = useState('')

  function handleAddClick() {
    setText('')
    onAdd(createTodo(text))
  }

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleAddClick}>Add</Button>
    </>
  )
}

```
