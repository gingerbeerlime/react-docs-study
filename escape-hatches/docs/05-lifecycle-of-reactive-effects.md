## 리액트 Effect의 생명주기

### 리액트 컴포넌트 생명주기와의 차이

- `Mount` : 컴포넌트가 화면에 추가됨
- `Update` : 새로운 props나 state를 수신
- `Unmount` : 컴포넌트가 화면에서 제거

`effects`는 리액트 컴포넌트의 생명주기처럼 항상 마운트 될 때 동기화를 시작하고 마운트 해제될 때 동기화가 중지되는 것은 아니다.<br/>
`effects`는 `props`나 `state` 와 같은 **반응형 값의 변화에 반응해서 동작**한다.

<br/>

### 동기화가 두 번 이상 수행되어야 하는 이유

1️⃣ ”`general`” 채팅방에 연결

```jsx
function ChatRoom({ roomId /* "general" */ }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // "general" 방에 연결
    connection.connect();
    return () => {
      connection.disconnect(); // "general" 방에서 연결 해제
    };
  }, [roomId]);
  // ...
```

2️⃣ 사용자가 `roomId`를 “`travel`”로 변경

```jsx
function ChatRoom({ roomId /* "travel" */ }) {
  // ...
  return <h1>Welcome to the {roomId} room!</h1>
}
```

**⚙️ 이 때 일어나는 일**

1. 이전 `roomId`와의 동기화 중지(”`general`” 방에서 연결 끊기) : `roomId`가 `general`일 때 실행되었던 `useEffect`에서 반환한 cleanup 함수를 실행

   1. → 해당 effects의 `roomId` = “`general`” 이기 때문에 cleanup 함수는 “`general`”방에서 연결을 끊음

   ```jsx
   function ChatRoom({ roomId /* "general" */ }) {
     useEffect(() => {
       ...
       return () => {
   	    connection.disconnect();
       }
      }
   ```

2. 새 `roomId`와 동기화 시작(”`travel`”방에 연결)

   ```jsx
   function ChatRoom({ roomId /* "travel" */ }) {
     useEffect(() => {
       const connection = createConnection(serverUrl, roomId); // "travel" 방에 연결
       connection.connect();
       // ...
   ```

**✨ 리액트는 컴포넌트가 바뀌거나 사라질 때,**

- useEffect가 안에서 정해준 **시작 코드**(`connect`),
- useEffect에서 return으로 정해준 **정리 코드**(`disconnect`)

⇒ 즉, 어떻게 연결하고 끊는지만 알려주면 리액트가 알아서 처리한다.

<br/>

### 리액트가 effect를 다시 동기화해야 한다는 것을 인식하는 방법

```jsx
function ChatRoom({ roomId }) { // roomId prop은 시간이 지남에 따라 변경될 수 있습니다.
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // 이 effect는 roomId를 읽습니다.
    connection.connect();
    return () => {
      connection.disconnect();
    };

  }, [roomId]); // 따라서 React에 이 effect가 roomId에 "의존"한다고 알려줍니다.
  // ...
```

- `Effect`는 의존성 배열의 값 중 하나라도 이전 렌더링에서의 값과 다르면 다시 동기화한다.
- `roomId`가 `general → travel` 로 바뀌면 `effect`는 다시 동기화 함
- 반면에 컴포넌트가 다시 렌더링 되더라도 `roomId`가 변경되지 않았다면, `useEffect`는 실행되지 않는다(현재 연결 상태 그대로 유지)

<br/>

### 각 effect는 독립적인 동기화 프로세스를 나타낸다

❌ 채팅방에 연결하는 `useEffect`에 방문 기록 이벤트 추가하기

```jsx
function ChatRoom({ roomId }) {
  useEffect(() => {
    logVisit(roomId)
    const connection = createConnection(serverUrl, roomId)
    connection.connect()
    return () => {
      connection.disconnect()
    }
  }, [roomId])
  // ...
}
```

- 만약 의존성 배열에 `roomId` 외의 다른 값이 추가된다면, 의도하지 않게 동일한 채팅방에서 `logVisit(roomId)`를 여러 번 실행하게 될 것이다
  ⇒ “채팅방에 연결(`connect`)”과 “방문을 기록하는 것(`logVisit`)”은 별개의 프로세스이다. 2개의 개별 `effect`로 작성하는 것이 좋다

  ```jsx
  function ChatRoom({ roomId }) {
    useEffect(() => {
      logVisit(roomId)
    }, [roomId])

    useEffect(() => {
      const connection = createConnection(serverUrl, roomId)
      // ...
    }, [roomId])
    // ...
  }
  ```

<br/>

### 반응형 값에 “반응”하는 effect

```jsx
const serverUrl = 'https://localhost:1234'

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId)
    connection.connect()
    return () => {
      connection.disconnect()
    }
  }, [roomId])
  // ...
}
```

- `useEffect`에서 사용하는 `state`, `props`와 같은 반응형 값은 반드시 의존성 배열에 포함시켜야 한다.
- 하지만 `serverUrl`과 같이 변하지 않는 값은 의존성에 포함시키지 않아도 된다.

<br/>

### 빈 종속성이 있는 effect의 의미

- 의존성 배열이 빈 배열인 경우에는, `useEffect`는 컴포넌트가 처음 화면에 나타날 때 한 번만 실행되고, 컴포넌트가 사라질 때 클린업 함수가 실행된다.
  ⇒ 값의 변화가 없기 때문에 동기화를 다시 할 필요가 없음

<br/>

### 컴포넌트 본문에서 선언된 모든 변수는 반응형이다

- **컴포넌트 내부의 모든 값은 반응형** : `props`, `state` 외에 `props와 state로 부터 계산되는 값`도 반응형이다.
- 따라서 `effect`에서 사용하는 컴포넌트 본문의 모든 변수들을 `effect` 의존성 배열에 있어야 한다.
- `eslint-plugin-react-hook`가 의존성 배열 관련 문제를 자동으로 검사해준다.

> 🔴 리액트 외부에서 변할 수 있는 값(`mutable`), 특히 전역 변수나 `ref.current`같은 값은 `useEffect`훅의 의존성 배열에 넣지 않아야 한다.
>
> ⇒ 리액트는 그런 값이 변해도 알아채지 못해서 다시 렌더링을 안 하기 때문에

<br/>

### 다시 동기화하지 않으려는 경우는 어떻게 해야 할까?

- 반응형 값이 아니라면 **상수로 선언**하기
  - 컴포넌트 외부 선언, `useEffect` 내부 선언 모두 가능
- 의존성 값을 <strong>"선택"</strong>할 수 없기 때문에 `effect`가 **너무 자주 다시 동기화되거나 무한루프가 발생**한다면 아래 항목들을 체크해보기
  - 그 `effect`가 정말 필요한지 확인
  - `effect` 분리하기
    - 하나의 `effect`는 한 가지 프로세스만 담당하도록
  - 값이 바뀌어도 다시 실행되면 안 되는 경우라면 `Effect Event` 사용
  - 의존성 배열에 함수나 객체 넣지 말 것 : 리렌더링마다 다른 값으로 생성되어 `useEffect`가 계속 실행됨
- ⚠️ **Lint 경고를 무시하지 말 것** : 구조를 바꾸거나 값을 옮겨서 리액트가 헷갈리지 않도록 하기

```jsx
useEffect(() => {
  // ...
  // 🔴 이런 식으로 린트를 억누르지 마세요.
  // eslint-ignore-next-line react-hooks/exhaustive-deps
}, [])
```

---

### 🚩 챌린지: 오래된 값 버그 조사하기

```jsx
import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  function handleMove(e) {
    if (canMove) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  }

  useEffect(() => {
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

	...
}

```

**🐞 `문제원인`**

- `useEffect`는 컴포넌트가 처음 렌더링될 때 딱 한 번 실행됨
- 그 때 `handleMove`가 이벤트 리스너로 등록됨
- `handleMove`는 정의될 당시의 `canMove`값을 기억한 상태로 등록됨

⇒ [`🔺(잘못된)해결1`]

```jsx
function handleMove(e) {
  setPosition({ x: e.clientX, y: e.clientY }) // ✅ canMove 체크 없음
}

useEffect(() => {
  if (!canMove) return // ✅ 여기서만 판단

  window.addEventListener('pointermove', handleMove)
  return () => window.removeEventListener('pointermove', handleMove)
}, [canMove]) // ✅ 의존성 배열에 canMove 포함
```

- `handleMove`에서 `canMove`를 체크하지 않기 때문에 반드시 이벤트 등록 자체를 상태로 컨트롤해야 하는데 의존성 배열에 `canMove`가 누락되면 위험해짐

⇒ [`💡해결2`] **더 안전하고 리액트의 동작 방식에 맞음!**

- `handleMove`를 `useEffect` 안에서 선언하고 바로 이벤트에 등록
- `canMove`값을 직접 내부에서 사용

```jsx
useEffect(() => {
  function handleMove(e) {
    if (canMove) {
      setPosition({ x: e.clientX, y: e.clientY })
    }
  }

  window.addEventListener('pointermove', handleMove)
  return () => window.removeEventListener('pointermove', handleMove)
}, [canMove])
```

- 최신 `canMove`값에 안전하게 접근 가능 : `canMove`를 클로저로 안전하게 가져와 항상 최신 값을 사용
- 의존성 관리가 명확 : `canMove`가 바뀌면 `handleMove`도 같이 새로 만들어지고 등록됨 → 정상적이고 안전한 흐름
