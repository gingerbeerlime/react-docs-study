## Effect 린터

`eslint-plugin-react-hooks`는 리액트에서 `useEffect`, `useCallback`, `useMemo`와 같은 Hooks를 사용할 때 올바르게 사용하도록 도와주는 ESLint 플러그인이다. `useEffect`와 관련해서 2가지 주요 규칙을 제공한다.

1. **react-hooks/rules-of-hooks**
   - 모든 Hooks는 컴포넌트 최상단 또는 다른 Hook 안에서만 호출되어야 한다.
2. **react-hooks/exhaustive-deps**
   - `useEffect`, `useCallback`, `useMemo`의 의존성 배열이 올바른지 검사한다.
   - 의존성 배열에 사용된 값이 빠지지 않았는지 알려준다.

<br/>

### eslint-plugin-react-hooks 적용하기

1. `eslint-plugin-react-hooks` 설치

```bash
yarn add -D eslint-plugin-react-hooks
```

<br/>

2. `.eslintrc` 설정에 플러그인 추가

- `.eslintrc.js` 또는 `.eslintrc.json`

```bash
module.exports = {
  // ...
  plugins: [
    "react-hooks",
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error", // Hooks 규칙 강제
    "react-hooks/exhaustive-deps": "warn", // 의존성 배열 검사
  },
};
```

<br/>

3. ESLint가 React, JSX를 이해할 수 있게 하기

- `eslint-plugin-react` 및 관련 preset이 설정되어있는지 체크

```bash
yarn add -D eslint-plugin-react eslint-config-react-app
```

- `.eslintrc.js` 또는 `.eslintrc.json`

```bash
module.exports = {
  extends: [
    "react-app",
    "plugin:react-hooks/recommended"
  ],
};
```

> `plugin:react-hooks/recommended`는 위에서 설정한 두 개의 룰을 자동으로 켜준다.

<br/>

4. TypeScript를 쓰는 경우

```bash
yarn add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

- `.eslintrc.js` 또는 `.eslintrc.json`

```bash
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-hooks"],
  extends: [
    "plugin:react-hooks/recommended"
  ],
};
```

<br/>

5. 에디터에서 ESLint 플러그인 켜져있는지 체크(VS Code)

- `settings.json`

```bash
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## Effect 의존성 제거하기

Effect를 작성하면 린터는 Effect의 의존성 목록에 Effect가 읽는 모든 반응형 값을 포함했는지 확인하고 잘못된 의존성이 지정되었거나 의존성이 누락된 경우 경고한다.

<br/>

### 의존성이 아님을 증명하기

- Effect의 코드에서 사용되는 모든 반응형 값은 의존성 목록에 선언되어야 하므로 **의존성 목록은 주변 코드에 의해 결정된다.**

```bash
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []); // 🔴 React Hook useEffect has a missing dependency: 'roomId'
  // ...
}
```

- `props`인 `roomId`는 **반응형 값**으로 의존성 목록에서 제외시킬 수 없다.
- `roomId`가 의존성이 될 필요가 없다면 그것을 린터에 증명하면 된다.<br/>
  ⇒ `roomId`를 컴포넌트 밖으로 이동시켜 반응형 값이 아니고 재랜더링 시에도 변경되지 않는 값임을 보여준다.

  ```jsx
  const serverUrl = 'https://localhost:1234'
  const roomId = 'music' // Not a reactive value anymore

  function ChatRoom() {
    useEffect(() => {
      const connection = createConnection(serverUrl, roomId)
      connection.connect()
      return () => connection.disconnect()
    }, []) // ✅ All dependencies declared
    // ...
  }
  ```

<br/>

### 불필요한 의존성 제거하기

`Effect`는 의존성 배열의 값 중 하나라도 변경되면 `Effect`를 다시 실행시키는데 다음과 같은 상황들로 그러지 않기를 원할 수도 있다.

- 다른 조건에서 `Effect`의 다른 부분을 다시 실행하고 싶을 수도 있다.
- 일부 의존성의 변경에 반응하지 않고 단지 최신 값만 읽고 싶을 수도 있다.
- 의존성은 객체나 함수이기 때문에 의도치 않게 너무 자주 변경될 수 있다.

이런 상황에서 다음과 같은 것들을 고려해볼 수 있다.

- 이 코드가 꼭 `Effect`가 되어야 할까?
- `Effect`가 서로 관련 없는 여러 가지 작업을 수행하고 있진 않은가?
- 다음 `State`를 계산하기 위해 어떤 `State`를 읽고 있는가?

<br/>

> **하나의 `Effect` 내에서 관련 없는 여러 가지 작업을 수행하지 않도록 수정한다.**

```jsx
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    // 🔴 Avoid: A single Effect synchronizes two independent processes
    if (city) {
      fetch(`/api/areas?city=${city}`)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setAreas(json);
          }
        });
    }
    return () => {
      ignore = true;
    };
  }, [country, city]); // ✅ All dependencies declared

  // ...
```

- 이 코드는 서로 관련이 없는 두 가지 프로세스를 동기화하고 있다.
  - `country` props를 기반으로 `cities` 목록을 가져온다.
  - `city` state를 기반으로 `areas` 목록을 가져온다.
- 이렇게 하면 `city` 값이 바꼈을 때 `fetchCities(country)`를 불필요하게 호출하는 상황이 발생

⇒ 로직을 **2개의 `Effect`로 분할**해 각 `Effect`는 해당 로직에 관련이 있는 `props`에만 반응하도록 수정해야 한다.

✓ 각 `Effect`는 독립적인 동기화 프로세스를 나타낸다. 즉, 하나의 `Effect`를 삭제해도 다른 `Effect`의 로직이 깨지지 않아야 한다.

<br/>

> **`Effect` 내에서 `state`를 직접 읽지 말 것**

```jsx
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages([...messages, receivedMessage]);
    });
    return () => connection.disconnect();
  }, [roomId, messages]); // ✅ All dependencies declared
  // ...
```

- `setMessages` 함수에서 직접 `state` 값인 `messages`를 읽는다면 이는 의존성 배열에 포함이 되어야 한다.
- `setMessages`에 의해 `messages` 값이 변경되면 `Effect`의 의존성에 `messages`가 지정되어있으므로 `useEffect`는 다시 동기화된다. ⇒ 새 메세지가 올 때마다 채팅은 다시 연결되게 될 것

**⇒ ✨ 업데이터 함수를 `setMessages`에 전달**

```jsx
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages(msgs => [...msgs, receivedMessage]);
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```

- 이제 `Effect`내에서 `messages` 변수를 읽지 않기 때문에 의존성 배열에 `messages`를 넣지 않아도 된다. ⇒ 새 메세지가 와도 채팅방에 다시 연결하지 않음
- `setMessages(msgs => [...msgs, receivedMessage])`
  - 리액트는 업데이터 함수를 대기열에 넣고 다음 렌더링 중에 `msgs` 인수(최신 `messages` 값)를 제공한다.

<br/>

> **값의 변경에 반응하지 않고 값을 읽고 싶을 때 -** `useEffectEvent`

```jsx
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages(msgs => [...msgs, receivedMessage]);
      if (!isMuted) {
        playSound();
      }
    });
    return () => connection.disconnect();
  }, [roomId, isMuted]); // ✅ All dependencies declared
  // ...
```
- `isMuted`를 의존성에서 빼버리면 `isMuted`값이 변경되더라도 `useEffect`는 그것을 알지 못함.
- `EffectEvent`를 사용해서 `useEffect`가 `isMuted`값에 반응하지 않으면서도 항상 최신값을 읽을 수  있도록 해야함
  
```jsx
import { useState, useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  const onMessage = useEffectEvent(receivedMessage => {
    setMessages(msgs => [...msgs, receivedMessage]);
    if (!isMuted) {
      playSound();
    }
  });

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      onMessage(receivedMessage);
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```

<br/>

> **일부 반응형 값이 의도치 않게 변경될 때(객체, 함수)**

```jsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const options = {
    serverUrl: serverUrl,
    roomId: roomId
  };

 useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // ✅ All dependencies declared
  // ...
```

- `options`는 컴포넌트 본문에서 선언되므로 반응형 값 → 의존성으로 지정해야 한다.
- `message`가 변경되었을 때 컴포넌트가 리렌더링되면서 사이드 이펙트로 `options` 는 새로운 주소값을 가진 객체로 다시 만들어진다.
- 즉 `message`는 `effect`의 의존성이 아니지만 리렌더링을 트리거하기 때문에 매 렌더링마다 채팅방이 새 연결을 만들고 이전 연결을 끊는 흐름이 반복된다.

<br/>

#### (1) 정적 객체와 함수를 컴포넌트 외부로 이동

```jsx
function createOptions() {
  return {
    serverUrl: 'https://localhost:1234',
    roomId: 'music'
  };
}

function ChatRoom() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, []); // ✅ All dependencies declared
  // ...
```

<br/>

#### (2) Effect 내에서 동적 객체 및 함수 이동

- 객체가 반응형 값에 의존하는 경우에는 컴포넌트 외부로 끌어낼 수 없다.
  ⇒ **Effect 코드 내부로 이동시키기**

```jsx
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```

- `options`가 `Effect` 내부에서 선언되었으므로 의존성 배열에 포함시키지 않는다.

<br/>

#### (3) 객체/함수에서 원시 값 읽기

- `props`로 객체를 받는 경우 부모 컴포넌트가 재렌더링 될 때마다 `Effect`가 다시 연결될 수 있다.
  ⇒ `Effect` 외부에서 구조 분해 할당으로 객체 내부 원시값을 읽음으로 의존성 피하기

```jsx
function ChatRoom({ options }) {
  const [message, setMessage] = useState('');

 // options를 구조분해 할당
  const { roomId, serverUrl } = options;
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ All dependencies declared
  // ...
```

- `options.roomId`, `options.serverUrl` 값이 실제로 변경되었을 때만 채팅이 새로 연결
- 함수도 똑같이 `Effect` 외부에서 호출하여 의존성 피하기

  - 부모 컴포넌트가 함수 전달

  ```jsx
  <ChatRoom
    roomId={roomId}
    getOptions={() => {
      return {
        serverUrl: serverUrl,
        roomId: roomId,
      }
    }}
  />
  ```

  - `Effect` 외부에서 함수 호출해 `Effect`에는 원시값 사용

  ```jsx
  function ChatRoom({ getOptions }) {
    const { roomId, serverUrl } = getOptions();
    ...
  ```
