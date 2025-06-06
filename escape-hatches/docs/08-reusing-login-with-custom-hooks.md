## 커스텀 Hook으로 로직 재사용하기

<br/>

### 커스텀 Hook: 컴포넌트간 로직 공유하기

- 여러 컴포넌트에서 네트워크 온라인/오프라인 상태에 따란 다른 UI나 로직을 실행하고 싶을 때 각각의 컴포넌트에서 네트워크 상태를 체크하는 코드를 중복해서 작성해야 한다.
- 이를 공통된 훅으로 분리해서 재사용하고 싶을 때 커스텀 Hook을 직접 작성할 수 있다. ⇒ 컴포넌트 내 로직이 단순해지고 읽기 쉬워진다.

```jsx
function StatusBar() {
  const isOnline = useOnlineStatus()
  return <h1>{isOnline ? '✅ 온라인' : '❌ 연결 안 됨'}</h1>
}

function SaveButton() {
  const isOnline = useOnlineStatus()

  function handleSaveClick() {
    console.log('✅ 진행사항 저장됨')
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? '진행사항 저장' : '재연결 중...'}
    </button>
  )
}
```

- `useOnlineStatus` 라는 커스텀 훅을 사용해 네트워크 상태를 공유하기

```jsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true)
    }
    function handleOffline() {
      setIsOnline(false)
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])
  return isOnline
}
```

<br/>

### 커스텀 Hook 작명 규칙

- Hook의 이름은 항상 `use`로 시작해야 한다.
- Hook의 이름은 `use` 뒤에 대문자로 시작해야 한다.
  - ex) `useState`, `useOnlineStatus`

> 🔺 함수가 어떠한 Hook도 호출하지 않는다면, 이름을 use로 시작하지 말고 일반 함수로 작성해야 한다.

```jsx
// 🔴 안 좋은 예시 : Hook을 사용하고 있지 않는 Hook.
function useSorted(items) {
  return items.slice().sort()
}

// ✅ 좋은 예시 : Hook을 사용하지 않는 일반 함수.
function getSorted(items) {
  return items.slice().sort()
}

// ✅ 좋은 예시 : Hook을 사용하는 Hook
function useAuth() {
  return useContext(Auth)
}
```

⇒ 일반 함수는 Hook 함수와 다르게 어디서든 사용할 수 있으므로 일반함수와 Hook을 확실히 구분시키는 것이 좋다

```jsx
function List({ items, shouldSort }) {
  let displayedItems = items
  if (shouldSort) {
    // ✅ getSorted()가 Hook이 아니기 때문에 조건에 따라 호출할 수 있습니다.
    displayedItems = getSorted(items)
  }
  // ...
}
```

---

> 🔺 내부에서 Hook을 사용하지 않는 커스텀 Hook을 작성하는 것은 권장되지 않고 혼란을 야기할 수 있으므로 조심해야 한다. 다만 미래에 Hook을 호출할 계획이 있다면 `use`를 앞에 붙여 이름을 지을 순 있다.

```jsx
// ✅ 좋은 예시 : 추후에 다른 Hook을 사용할 가능성이 있는 Hook
function useAuth() {
  // TODO: 인증이 수행될 때 해당 코드를 useContext(Auth)를 반환하는 코드로 바꾸기
  return TEST_USER
}
```

---

### 커스텀 Hook은 state 자체를 공유 X, state 저장 로직을 공유 O

<br/>

`useFormInput` 커스텀 Hook

```jsx
import { useState } from 'react'

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue)

  function handleChange(e) {
    setValue(e.target.value)
  }

  const inputProps = {
    value: value,
    onChange: handleChange,
  }

  return inputProps
}
```

```jsx
function Form() {
  const firstNameProps = useFormInput('Mary');
  const lastNameProps = useFormInput('Poppins');
  // ...
```

- 커스텀 훅은 각각 독립적인 `state`와 `useEffect`를 갖고 동작한다.

---

### Hook사이에 상호작용하는 값 전달하기

<br/>

`useChatRoom` 커스텀 훅

```jsx
export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId,
    }
    const connection = createConnection(options)
    connection.connect()
    connection.on('message', (msg) => {
      showNotification('New message: ' + msg)
    })
    return () => connection.disconnect()
  }, [roomId, serverUrl])
}
```

`ChatRoom` 컴포넌트

```jsx
export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234')

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl,
  })

  return (
    <>
      <label>
        Server URL:
        <input value={serverUrl} onChange={(e) => setServerUrl(e.target.value)} />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  )
}
```

- `roomId`가 바뀔 때마다 `ChatRoom` 컴포넌트가 재렌더링된다.
- 컴포넌트가 재렌더링되면 `useChatRoom({ roomId, serverUrl })`이 다시 호출된다. → 최신값이 훅으로 전달됨
- `useChatRoom` 안의 `useEffect`는 `roomId`, `serverUrl`을 의존성으로 갖고 있어, 값이 바뀌면 새로운 connection을 연결한다.

---

### 커스텀 Hook에 이벤트 핸들러 넘겨주기

```jsx
export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId,
    }
    const connection = createConnection(options)
    connection.connect()
    // 커스텀 Hook을 사용하는 컴포넌트마다 다른 이벤트를 실행하고 싶다면?
    connection.on('message', (msg) => {
      showNotification('New message: ' + msg)
    })
    return () => connection.disconnect()
  }, [roomId, serverUrl])
}
```

- 메세지가 도착했을 때 어느 컴포넌트에서든 `showNotification` 이벤트를 실행하게 됨

```jsx
export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl,
    onReceiveMessage(msg) {
      showNotification('New message: ' + msg);
    }
  });
  // ...
```

```jsx
export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId,
    }
    const connection = createConnection(options)
    connection.connect()
    connection.on('message', (msg) => {
      onReceiveMessage(msg)
    })
    return () => connection.disconnect()
  }, [roomId, serverUrl, onReceiveMessage])
}
```

- `onReceiveMessage` props에 컴포넌트마다 다른 이벤트 핸들러를 전달함으로써 각 컴포넌트마다 새 메세지가 도착했을 때 다른 이벤트를 실행할 수 있음
- 🔺 그러나 `onReceiveMessage`를 의존성 지정함으로써 의도치 않은 재동기화가 발생할 수 있음(함수이기 때문에 리렌더링 시 새 주소값으로 변경되는 문제)
  ⇒ `useEffectEvent`로 분리

  ```jsx
  import { useEffect, useEffectEvent } from 'react'
  // ...

  export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
    const onMessage = useEffectEvent(onReceiveMessage)

    useEffect(() => {
      const options = {
        serverUrl: serverUrl,
        roomId: roomId,
      }
      const connection = createConnection(options)
      connection.connect()
      connection.on('message', (msg) => {
        onMessage(msg)
      })
      return () => connection.disconnect()
    }, [roomId, serverUrl]) // ✅ 모든 의존성이 정의됨.
  }
  ```

---

### 언제 커스텀 Hook을 사용해야 할까?

```jsx
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  // 이 Effect는 나라별 도시를 불러옵니다.
  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [country]);

  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);
  // 이 Effect 선택된 도시의 구역을 불러옵니다.
  useEffect(() => {
    if (city) {
      let ignore = false;
      fetch(`/api/areas?city=${city}`)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setAreas(json);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [city]);

  // ...
```

- 하나는 나라별 도시 목록을 가져오는 api를 호출, 다른 하나는 도시별 구역 목록을 가져오는 api를 호출한다.
- 이 두 개의 effect는 각각 다른 프로세스를 갖기 때문에 별도의 `Effect`로 분리하는게 맞지만, api를 호출하고 받아온 데이터를 `state`를 저장하는 로직 흐름은 똑같다.
- ⇒ 이런 경우 `useData`라는 커스텀 Hook을 통해 공통된 로직을 추출하고 코드를 간소화할 수 있다.

```jsx
function useData(url) {
  const [data, setData] = useState(null)
  useEffect(() => {
    if (url) {
      let ignore = false
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            setData(json)
          }
        })
      return () => {
        ignore = true
      }
    }
  }, [url])
  return data
}
```

```jsx
function ShippingForm({ country }) {
  const cities = useData(`/api/cities?country=${country}`);
  const [city, setCity] = useState(null);
  const areas = useData(city ? `/api/areas?city=${city}` : null);
  // ...
```

- `ShippingForm` 컴포넌트 내에서 같은 커스텀 훅을 사용했지만 각각 독립적인 `Effect`로서 동작한다.

<br/>

### 커스텀 Hook 올바르게 사용하기

> ✅ useData(url), useImpressionLog(eventName, extraData), useChatRoo(options), useMediaQuery(query), useSocket(url) 등..

- 이름만 봐도 무엇을 하는지 알 수 있도록 작성
- 기능이 명확하고 한 가지 목적에 집중하도록 작성

> ❌ useMount(fn), useEffectOnce(fn), useUpdateEffect(fn) 등…

- “마운트 시에만 동작”과 같이 커스텀 생명 주기 Hook을 만드는 것은 피해야 한다.
- 이는 단순히 useEffect를 한번 감싸는 역할밖에 안하기 때문에 기능적인 목적이 없음

좋은 커스텀 Hook은 호출 코드가 하는 일을 제한하면서 좀 더 선언적으로 만들 수 있다.

---

### 커스텀 Hook은 더 나은 패턴으로 변경할 수 있도록 도와준다

`Effect`는 최후의 수단같은 것이다. “리액트에서 벗어나”는 것이 필요할 때 사용하는 것으로 `Effect`를 남용하는 것은 좋지 않다.

> 커스텀 Hook으로 Effect를 감싸는 것이 유용할 때

1. 매우 명확하게 Effect로 주고받는 데이터 흐름을 만들 때
2. 컴포넌트가 Effect의 정확한 실행보다 목적에 집중하도록 할 때
3. 리액트가 새 기능을 추가할 때, 다른 컴포넌트의 변경 없이 이 Effect를 삭제할 수 있을 때

---

### ✨ 요약

- 커스텀 Hook을 사용하면 컴포넌트 간 로직을 공유할 수 있다.
- 커스텀 Hook은 state 자체가 아닌 state 저장 로직만 공유한다.
- 하나의 Hook에서 다른 Hook으로 반응형 값을 전달할 수 있고, 값은 최신 상태로 유지된다.
- 모든 Hook은 컴포넌트가 재렌더링될 때마다 재실행된다.
- 커스텀 Hook의 코드는 컴포넌트 코드처럼 순수해야 한다.
- 커스텀 Hook을 통해 받는 이벤트 핸들러는 Effect로 감싸야 한다.
- useMount같은 커스텀 Hook은 생성하면 안된다. 기능적인 용도가 명확한 Hook을 작성해야 한다.
- Hook이 꼭 필요하지 않을 수 있다.
