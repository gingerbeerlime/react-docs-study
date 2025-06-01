## Effect로 동기화하기

### ✅ 리액트 컴포넌트의 2가지 로직 유형

1. **렌더링 코드**
   1. JSX를 props와 state로 계산하여 화면에 보여줌
   2. 컴포넌트 최상단에 위치
   3. 순수 함수처럼 동작해야 함
2. **이벤트 핸들러**
   1. 버튼 클릭, 입력 등의 사용자 행동으로 실행됨
   2. 사이드 이펙트를 가짐(ex. state 업데이트, API 요청 등)

⇒ 렌더링 로직은 순수해야하기 때문에 사이드 이펙트를 처리할 수 없는데, 특정 이벤트로 인해서가 아닌 렌더링 자체로 사이드 이펙트를 발생시켜야 하는 경우, 리액트의 Effect를 사용할 수 있다.

<br/>

### 리액트 Effect란?

- 특정 이벤트가 아닌 **렌더링 자체로 발생하는 사이드 이펙트 처리 방식**
  - ex) (어떤 버튼을 눌러서 나타났든 상관없이) 채팅방이 나타날 때 서버에 자동 연결되도록
- Effect는 **렌더링 후(화면이 바뀐 직후) 실행**된다

<br/>

### Effect를 작성하는 법

1. Effect 선언
2. Effect 의존성 지정
3. 필요한 경우, 클린업 함수 추가

<br/>

#### (1) Effect 선언하기 : `useEffect` 훅

```jsx
import { useEffect } from 'react'
```

```jsx
function MyComponent() {
  useEffect(() => {
    // 렌더링이 모두 완료된 후 실행
  })
}
```

- `useEffect`는 컴포넌트 최상위 레벨에서 호출
- `useEffect`는 **화면에 렌더링이 반영될 때까지** 코드 실행을 지연시킨다

> Effect문 내에서 state를 변경하면 ❌
>
> Effect는 렌더링이 완료된 직후 실행되며, State를 변경하면 렌더링이 트리거 된다. Effect문 안에서 State를 설정하면 무한으로 렌더링을 트리거해 무한 루프를 일으킨다.

<br/>

#### (2) Effect 의존성 지정

- `useEffect`는 기본적으로 모든 렌더링 후마다 실행된다.
- 의존성 배열에 값을 추가함으로써, 특정 값이 바뀔 때만 실행되도록 제한할 수 있다.
  ⇒ `useEffect` 호출의 2번째 인자로 의존성 배열 지정

```jsx
// ❌ 의존성 배열이 없으면, 모든 렌더링 후 실행됨
useEffect(() => {
  connectToChatServer()
})

// ✅ 빈 배열로 지정하면, 처음 마운트될 때만 실행됨
useEffect(() => {
  connectToChatServer()
}, [])

// ✅ data 값이 바뀔 때만 실행됨
useEffect(() => {
  updateExternalSystem(data)
}, [data])

// ✅ data1 또는 data2의 값이 바뀔 때만 실행됨
useEffect(() => {
  updateExternalSystem(data1)
  updateExternalSystem(data2)
}, [data1, data2])
```

```jsx
// ⚠️ useEffect안에 props나 state 값을 사용했다면, 반드시 의존성 배열에 포함해야 한다!

useEffect(() => {
  if (isPlaying) {
    console.log('video.play() 호출')
    ref.current.play()
  } else {
    console.log('video.pause() 호출')
    ref.current.pause()
  }
}, []) // 에러 발생
```

> 🔴 **React Hook useEffect has a missing dependency: 'isPlaying'. Either include it or remove the dependency array.**

- `useEffect`에 `isPlaying` **prop**값을 사용했는데 의존성 배열에 지정하지 않으면 `isPlaying` 값 변화에 반응하지 않게 되어 버그가 생긴다
- **“의존성을 선택할 수 없다는 점에 유의해라”**
  ⇒ `useEffect` **내부에서 쓰는 모든 변수는 의존성 배열에 추가**해야 한다
  - `ref`의 경우 부모에서 전달받는 `ref`는 의존성 배열에 명시하되(항상 동일한 ref를 전달하는지 알 수 없기 때문에),
  - 해당 컴포넌트 내부에서 선언된 `ref`는 값이 바뀌지 않는 안정된 식별성을 갖기 때문에 의존성 배열에 넣지 않아도 된다.

<br/>

#### (3) Clean-up 함수

```jsx
useEffect(() => {
  const connection = createConnection()
  connection.connect()
  return () => {
    connection.disconnect()
  }
}, [])
```

- `connection.connect()` 만 있다면 컴포넌트가 마운트될 때마다 이전 연결이 해제되지 않고 계속 쌓일 것임
  ⇒ **컴포넌트가 언마운트될 때 연결을 끊어주는 클린업 함수를 반환**해주어야 한다
- 리액트는 **Effect가 다시 실행되기 전마다** 클린업 함수를 호출하고(이전 렌더의 Effect를 먼저 정리), **컴포넌트가 언마운트될 때**에도 마지막으로 호출한다

---

### 개발 중에 Effect가 두 번 실행되는 경우를 다루는 방법

= 어떻게 `Effect`가 다시 마운트된 후에도 작동하도록 고칠 것인가?

= 클린업 함수의 중요성!

- 리액트의 `Strict Mode`에서는 개발 중 `useEffect`를 의도적으로 두 번 실행시켜서 **클린업이 제대로 되는지 검증**한다
  - 버그를 찾기 위한 리액트의 기능 : 컴포넌트 마운트 → 언마운트(클린업) → 컴포넌트 마운트 순서 간에 차이가 없어야 함
  - 실제 프로덕션 환경에서는 `useEffect`는 한 번만 실행됨
- `Effect`는 항상 정상적으로 정리(`cleanup`)되도록 구현해야 하며, `ref`등을 이용해 개발 모드의 이중 실행을 억지로 막으려 하면 안된다

<br/>

### 🧹 클린업 함수 적용하기 예제

#### (1) 리액트로 작성되지 않은 위젯 제어하기

🌏 [`예시1`] 지도 컴포넌트

```jsx
useEffect(() => {
  const map = mapRef.current
  map.setZoomLevel(zoomLevel)
}, [zoomLevel])
```

- ⚠️ 이 경우는 같은 `zoomLevel` 값을 갖고 연속 호출되어도 문제가 되지 않으니 클린업 함수가 필요하지 않다

🫒 [`예시2`] 모달 컴포넌트

```jsx
useEffect(() => {
  const dialog = dialogRef.current
  dialog.showModal()
  return () => dialog.close()
}, [])
```

- `showModal()` 연속 호출 시 에러 발생 → 클린업에서 `close()`호출

**(2) 이벤트 구독하기**

- 이벤트를 구독(`addEventListener`)했다면, 클린업에서 반드시 구독 해지(`removeEventListener`)

**(3) 애니메이션 트리거**

- 어떤 요소를 애니메이션으로 표시하는 경우, 클린업에서 애니메이션을 초기값으로 재설정

**(4) 데이터 페칭(`ignore`)**

- 예를 들어, `useEffect` 안에서 데이터를 페칭해올 때 `userId`가 바뀌면 이전 요청의 응답이 나중에 도착할 수 있음 → 이 경우, 오래된 응답이 최신 상태를 덮어쓰면 안됨
  ⇒ `ignore` 플래그 사용

  ```jsx
  useEffect(() => {
    let ignore = false

    async function startFetching() {
      const json = await fetchTodos(userId)
      if (!ignore) {
        setTodos(json) // ⛔ 오래된 요청이면 무시
      }
    }

    startFetching()

    return () => {
      ignore = true // cleanup 시 오래된 요청 무시
    }
  }, [userId])
  ```

  - API 요청을 취소할 순 없지만, 결과를 무시할 수 있음
  - `userId`가 **‘Alice’ → ‘Bob’**으로 바뀌었을 때 `useEffect`가 새로 실행되고 **이전 `useEffect`**(**Alice 때의 useEffect**)는 클린업 함수가 실행되어 `ignore = true`로 바뀌고, Bob으로 바뀌고 나서 Alice의 `useEffect`에서 호출된 api 응답이 도착하더라도 setTodos를 실행하지 않음.
  - 여기서 중요한 점은 `useEffect`가 새로 실행될 때 새로 실행되는 useEffect의 클린업 함수가 아닌 **이전 Effect의 클린업 함수가 실행된다**는 점!

    - `ignore`은 항상 `false`로 시작하며, 해당 Effect 내에서만 유효한 변수이다.

      | 순서 | userId            | Effect 동작                                       |
      | ---- | ----------------- | ------------------------------------------------- |
      | 1    | Alice             | 요청 시작 (`ignore = false`)                      |
      | 2    | Bob               | cleanup 실행 (`ignore = true` for Alice's effect) |
      | 3    | Bob               | 새 요청 시작 (`ignore = false` for Bob's effect)  |
      | 4    | Alice의 응답 도착 | 무시됨 (Alice’s Effect의 `ignore = true`)         |
      | 5    | Bob의 응답 도착   | 처리됨 (`ignore = false`)                         |

> ⚠️ `useEffect` 안에서 직접 `fetch()` 호출 방식의 단점

1. 서버에서 실행되지 않음
2. 네트워크 폭포 발생(부모 → 자식 순으로 순차 요청)으로 느림
3. 캐싱 안됨(컴포넌트 다시 마운트 시 재요청)
4. 보일러 플레이트 많음(경쟁 상태 방지, 로딩 상태 등 처리 필요)

⇒ ✨프로젝트 규모가 클 때 좋은 대안들

- Next.js같은 리액트 프레임워크를 사용하여 데이터를 미리 받아와서 화면에 같이 보내주는 방식
- TanStack Query, SWR, React Router 6.4+ 등은 데이터를 가져와서 저장을 해주기 때문에 같은 데이터를 다시 받지 않아도 됨

> `TanStack Query`
>
> - 서버에서 데이터를 가져오고 자동으로 캐시하고, 자동으로 재시도, 자동으로 갱신까지 해줌
> - `useEffect + useState + fetch`를 직접 안 써도 됨
> - 경쟁 상태 자동 처리
>
> `SWR`
>
> - 데이터는 캐시에서 먼저 보여주고(이전에 본 데이터는 바로 보여줌), 백그라운드에서 갱신하는 방식(서버에서 최신 데이터 받아옴)
> - 경쟁 상태 자동 처리
> - `TanStack Query`보다 단순, 아주 **기본적인 캐시 + 재요청**만 필요할 때 사용하기 좋음

---

### 각 렌더링 시점마다 다른 Effect가 실행될 수 있다

| 상황                          | `useEffect` 실행         | 클린업 실행(`return () ⇒ {}`) |
| ----------------------------- | ------------------------ | ----------------------------- |
| 처음 렌더링될 때              | ✅ 실행                  | ❌ 없음                       |
| 같은 의존성으로 재렌더링될 때 | ❌ 건너뜀                | ❌ 없음                       |
| 의존성이 변경되면             | ✅ 실행                  | ✅ 이전 렌더 클린업 실행      |
| 컴포넌트가 사라질 때          | ❌ 실행 안 함            | ✅ 마지막 클린업 실행         |
| 개발 모드(Strict Mode)        | ✅ 의도적으로 2번 실행됨 | ✅ 실행                       |
