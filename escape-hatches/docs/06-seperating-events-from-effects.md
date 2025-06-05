## 이벤트 핸들러와 Effect 중에 선택하기

> 이 코드가 왜 실행되어야하는지 생각해보기🤔

- 채팅방 컴포넌트는 선택된 채팅방에 자동으로 연결해야 한다.
  ⇒ 사용자가 **아무런 상호작용을 하지 않아도** 채팅방 컴포넌트는 화면에 보여질 때 선택된 채팅 서버에 연결되어 있어야 한다.
  ⇒ 동기화가 필요할 때마다 실행된다.
  ⇒ `Effect`
- **“전송”버튼을 클릭하면** 채팅에 메시지를 전송해야 한다.
  ⇒ 특정 상호작용(버튼 클릭)에 대한 응답으로 실행된다.
  ⇒ `Event Handler`

<br/>

### 반응형 값과 반응형 로직

> **이벤트 핸들러 내부의 로직은 반응형이 아니다.**

- 사용자가 같은 상호작용(ex. 클릭)을 반복하지 않는 한 재실행되지 않는다.
- 이벤트 핸들러는 **변화에 “반응”하지 않으면서**, 반응형 값을 읽을 수 있다.

```jsx
function handleSendClick() {
  sendMessage(message)
}
```

- `message`를 바꾸는 것이 메세지를 전송하고 싶다는 의미가 아님
  ⇒ `message` 값이 변경되었다는 이유로 로직이 실행되서는 안됨

<br/>

> **Effect 내부의 로직은 반응형이다.**

- `Effect`에서 사용하는 반응형 값은 의존성으로 지정해야 한다.
- 리렌더링이 의존성으로 지정된 반응형 값을 바꾸는 경우 리액트가 새로운 값으로 `Effect` 로직을 다시 실행한다.

```jsx
useEffect(() => {
  const connection = createConnection(serverUrl, roomId)
  connection.connect()
  return () => {
    connection.disconnect()
  }
}, [roomId])
```

- `roomId`를 바꾸는 것은 다른 방에 연결하고 싶다는 의미
  ⇒ `roomId`라는 **반응형 값을 따라가고**, 그 값이 바뀌면 로직이 실행되어야 함

---

### Effect에서 비반응형 로직 추출하기 - `useEffectEvent`

> 🔺아직 안정된 버전의 React에 출시되지 않은 실험적인 API

- `useEffectEvent`는 리액트의 실험적인 Hook으로 매번 렌더링 시 최신 상태를 유지하면서도 `useEffect` 안에서 클로저가 고정되는 문제를 방지하기 위해 사용된다.
  - `state`나 `props`가 자주 바뀌지만
  - `useEffect` 내부에서 언제나 최신 값을 사용하고 싶을 때
  - 하지만 매번 의존성 배열에 넣어서 `useEffect`를 재실행하고 싶지는 않을 때
    - ⚠️ `eslint-disable-next-line react-hooks/exhaustive-deps` 의존성 배열 검사 린터를 억제하는 것은 권장하지 않는다.

<br/>

> `useEffect` 내부에 사용되는 모든 반응형 값은 의존성 배열에 포함되어야 한다.
> 그리고 의존성 배열의 값 중 하나라도 변경이 생기면 `effect`는 새로 실행된다.
> 의존성 배열의 값 중 **특정 값의 변화에는 반응하지 않도록** 하고 싶으면 어떻게 해야할까?

```jsx
function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('연결됨!', theme);
    });
    connection.connect();
    return () => {
      connection.disconnect()
    };
  }, [roomId, theme]); // ✅ 모든 의존성 선언됨
  // ...
```

- [✅]`roomId`가 변경되었을 때 채팅방에 새로 연결해야한다.
- [❌]그러나 테마(`theme`)가 변경되었을 때 채팅방에 다시 연결될 필요가 없다.
  ⇒ `theme`은 반응형 값이지만 `useEffect` 내부에서 이 값의 변화에 반응하지 않도록 처리하고 싶다.

<br/>

⇒ ✨`useEffectEvent` 훅을 사용해 `Effect`에서 **비반응형 로직을 분리**할 수 있다.

```jsx
import { useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId, theme }) {
	// Effect Event 선언
  const onConnected = useEffectEvent(() => {
    showNotification('연결됨!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected(); // Effect Event 호출
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ 모든 의존성이 선언됨
  // ...
```

- `onConnected`(=`Effect Event`) : **내부의 로직은 반응형이 아니며 항상 `props`와 `state`의 최신 값**을 바라본다.
- 더 이상 `useEffect` 내부에 `theme`이 사용되지 않으므로 의존성 배열에서 제거한다.
- 또한 `Effect Event`도 반응형이 아니므로 `onConnected`를 의존성에 포함시키지 않는다.
- 이벤트 핸들러는 사용자의 상호작용에 대한 응답으로 실행되고 `Effect Event`는 `Effect`에서 직접 트리거 됨!

<br/>

### Effect 이벤트로 최신 props와 state 읽기

```jsx
function Page({ url }) {
  useEffect(() => {
    logVisit(url)
  }, [url]) // ✅ 모든 의존성이 선언됨
  // ...
}
```

- [✅] 방문하는 페이지의 `url`이 변경될 때마다 방문 로그를 기록하는 것은 자연스러움

```jsx
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext)
  const numberOfItems = items.length

  useEffect(() => {
    logVisit(url, numberOfItems)
  }, [url]) // 🔴 React Hook useEffect has a missing dependency: 'numberOfItems'
  // ...
}
```

- [🔺] 로그에 페이지 `url`과 장바구니 아이템 개수를 같이 기록하고 싶을 때
  - ⇒ 장바구니 개수(`numberOfItems` )가 변경될 때마다 방문기록이 다시 기록되는건 원하지 않음

<br/>

**⇒ ✨`useEffectEvent` 훅으로 `Visit` 이벤트 분리**

```jsx
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext)
  const numberOfItems = items.length

  const onVisit = useEffectEvent((visitedUrl) => {
    logVisit(visitedUrl, numberOfItems)
  })

  useEffect(() => {
    onVisit(url)
  }, [url]) // ✅ 모든 의존성 선언됨
  // ...
}
```

- `numberOfItems` 값의 변화가 `useEffect`를 다시 실행시키지 않음. `url` 변경시에만 재실행
- `useEffect`가 재실행될 때마다 `Effect Event`인 `onVisit` 이 호출됨
- `onVisit`은 항상 **최신 `numberOfItems` 값을 읽음**

<br/>

> 📌 `EffectEvent`에 `useEffect`의 의존성 값을 파라미터로 전달해주기

```jsx
const onVisit = useEffectEvent((visitedUrl) => {
  logVisit(visitedUrl, numberOfItems)
})

useEffect(() => {
  onVisit(url)
}, [url])
```

**📦 파라미터를 명시적으로 넘겨줘야 하는 이유**

- 다른 `url`로 페이지를 방문하는 것이 사용자의 관점에서 **별도의 이벤트임을 명시**적으로 표현할 수 있다
- 실수로 **의존성 배열에서 `url`을 빼먹는 실수를 방지**할 수 있다.
- `useEffect` 내부 로직이 비동기인 경우에는 꼭 파라미터로 넘겨줘야 한다!<br/>
  [❌] `useEffect`에서 `url`을 넘겨주지 않고 `onVisit` 내부에서 `url`을 읽게 되면 `useEffect`가 실행되는 시점이 아닌 5초 후의 최신`url`값을 읽게 된다.

  ```jsx
  const onVisit = useEffectEvent(() => {
    logVisit(url, numberOfItems)
  })

  useEffect(() => {
    setTimeout(() => {
      onVisit() // 내부에서 url 사용
    }, 5000)
  }, [url])
  ```

  [✅] `visitedUrl`은 최초에 이 `Effect`를 실행하게 만든 `url`에 해당한다.

  - ~~setTImeout으로 5초 뒤에 실행하면 5초뒤에 url값이 인자로 넘어가는 것이 아닌가? useEffect가 실행될 시점의 값 복사 -> useEffectEvent만의 특징? ~~

  ```jsx
  const onVisit = useEffectEvent((visitedUrl) => {
    logVisit(visitedUrl, numberOfItems)
  })

  useEffect(() => {
    setTimeout(() => {
      onVisit(url)
    }, 5000)
  }, [url])
  ```

<br/>

### Effect 이벤트의 한계

- `Effect` 내부에서 호출하기 + `Effect` 이벤트를 해당 `useEffect` 근처에 선언하기
- 절대로 다른 컴포넌트나 Hook에 전달하지 않기

```jsx
// Timer 컴포넌트
function Timer() {
  const [count, setCount] = useState(0)

  const onTick = useEffectEvent(() => {
    setCount(count + 1)
  })

  useTimer(onTick, 1000) // 🔴 금지: Effect 이벤트 전달하기

  return <h1>{count}</h1>
}

// useTimer 훅
function useTimer(callback, delay) {
  useEffect(() => {
    const id = setInterval(() => {
      callback()
    }, delay)
    return () => {
      clearInterval(id)
    }
  }, [delay, callback]) // 의존성에 "callback"을 지정해야 함
}
```

---

### 🚩 챌린지 : 멈추는 카운터 고치기

[`문제`] 멈추는 카운터 고치기 : 더하기 버튼을 연속적으로 여러 번 클릭할 때 타이머가 잠깐 멈춘 것처럼 보이는 문제 해결하기

```jsx
import { useState, useEffect } from 'react'
import { experimental_useEffectEvent as useEffectEvent } from 'react'

export default function Timer() {
  const [count, setCount] = useState(0)
  const [increment, setIncrement] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + increment)
    }, 1000)
    return () => {
      clearInterval(id)
    }
  }, [increment])

  return (
    <>
      <h1>
        카운터: {count}
        <button onClick={() => setCount(0)}>재설정</button>
      </h1>
      <hr />
      <p>
        초당 증가량:
        <button
          disabled={increment === 0}
          onClick={() => {
            setIncrement((i) => i - 1)
          }}
        >
          –
        </button>
        <b>{increment}</b>
        <button
          onClick={() => {
            setIncrement((i) => i + 1)
          }}
        >
          +
        </button>
      </p>
    </>
  )
}
```

- 버튼을 여러번 클릭할 때 타이머가 잠깐 멈추는 이유
  - `increment` 값이 변경될 때마다 useEffect가 다시 실행되어 `setInterval`을 정지하고 새로 만드는데
  - 이 과정에서 `setInterval → clearInterval → setInterval …` 타이머가 중단되었다가 다시 시작되는 재생성 루프에 빠지며 밀림 현상 발생으로 타이머가 잠깐 멈춘 것 처럼 보임

[`문제풀이`] `Effect Event`를 사용해 `useEffect`가 `increment` 값에 반응하지 않도록 변경

```jsx
const onTick = useEffectEvent(() => {
  setCount((c) => c + increment)
})

useEffect(() => {
  const id = setInterval(() => {
    onTick()
  }, 1000)
  return () => {
    clearInterval(id)
  }
}, [])
```
