## Ref로 값 참조하기

> 💡 컴포넌트가 어떤 정보를 기억해야 하지만, 그 정보가 새로운 렌더링을 발생시키지 않도록 하고 싶을 때

<br/>

### `useRef` 훅 사용하기

```jsx
import { useRef } from 'react'

export default function Counter() {
  const ref = useRef(0)

  function handleClick() {
    ref.current = ref.current + 1
  }

  return <Button onClick={handleClick}>Click me!</Button>
}
```

- `useRef`는 `{ current: 0 }` 과 같은 객체를 반환한다 → `ref.current = 0`
- `ref`값은 읽고 편집할 수 있으며, **리액트가 추적하지 않는 컴포넌트의 비밀포켓**과 같은 역할을 한다 ⇒ 값이 변경되더라도 **컴포넌트를 다시 렌더링하지 않음**
- `ref`는 모든 종류의 값을 가리킬 수 있다.

<br/>

### Ref와 State를 함께 사용하기 : 스톱워치 예시

```jsx
import { useState, useRef } from 'react'
import { Button } from '@/components/common/Button'

const Stopwatch = () => {
  // startTime은 secondsPassed를 계산하기 위한 기준값
  const [startTime, setStartTime] = (useState < number) | (null > null)
  const [now, setNow] = (useState < number) | (null > null)
  const intervalRef = (useRef < NodeJS.Timeout) | (undefined > undefined)

  const handleStart = () => {
    // 스톱워치 시작
    setStartTime(Date.now())
    setNow(Date.now())

    // 기존 Interval ID가 있다면 취소
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setNow(Date.now())
    }, 10)
  }

  const handleStop = () => {
    // 스톱워치 종료: Interval 제거
    clearInterval(intervalRef.current)
  }

  let secondsPassed = 0

  // 흐른 시간 계산
  if (startTime !== null && now !== null) {
    secondsPassed = (now - startTime) / 1000
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <Button onClick={handleStart}>Start!</Button>
      <Button onClick={handleStop}>Stop!</Button>
    </>
  )
}

export default Stopwatch
```

```jsx
const [startTime, setStartTime] = useState<number | null>(null)
const [now, setNow] = useState<number | null>(null)

const intervalRef = useRef<NodeJS.Timeout | undefined>()
```

- **렌더링에 사용되는 정보**들은 변경될 때 UI에 반영이 되어야하므로 `State`로 관리
- 스톱워치를 새로 시작하거나 정지할 때 `setInterval` 호출로 반환된 `Interval ID` 필요 ⇒ `Interval ID`는 **렌더링에 사용되는 값이 아니기 때문에** `Ref`로 저장할 수 있다.
  - ⇒ 이벤트 핸들러에게만 필요한 정보이고 변경이 일어날 때 리렌더링이 필요하지 않다면, `Ref`를 사용하는 것이 더 효율적

<aside>

### 🤔 스톱워치에서 `startTime`은 `handleStart` 이벤트가 실행될 때 한 번만 세팅되고 그 이후로는 변하지 않는 값인데 `State`말고 `Ref`로 관리하는 것이 더 효율적이지 않을까?

- `now`가 변경될 때마다 UI 리렌더링이 트리거됨
- `startTime`은 `secondsPassed = now - startTime` 계산을 위한 기준값이므로, 자체적으로는 리렌더링을 발생시킬 필요가 없어 보임
- 실제로 `ref`로 바꿔도 동작에는 문제 없음

### ⇒ 그러나 아래 이유들로 `startTime`도 `state`로 관리하는 것 적절함

1. `handleStart` 실행시 화면이 반드시 리렌더링되어야 함
   1. 버튼을 클릭해 `startTime`과 `now` 모두 새로 설정되면, 이 변경 사항을 기반으로 화면에 새로운 시간 정보가 즉시 반영되어야 함
2. `secondsPassed`가 `now - startTime`으로 계산되는 값이기 때문에 **UI결과에 영향을 주는 값**
3. `now`와 `state`는 둘 다 시간값을 다루며, 함께 `secondsPassed` 계산에 사용되기 때문에 동일하게 `state`로 관리하는 것이 이벤트 흐름과 상태 변화를 명확히 표현할 수 있다.
4. `ref` 사용은 마지막 수단이 되어야 함. 기본적으로는 리액트의 기본 흐름(state, props, effects)을 따라야 한다.
</aside>

<br/>

### Ref와 State의 차이

| Ref                                                                                 | State                                                                                    |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| useRef(initialValue)는 `{ current: initialValue }` 반환                             | useState(initialValue)는 State 변수의 현재 값과 Setter 함수 `[value, setValue]`를 반환   |
| 값 변경 시 **리렌더링 트리거 X**                                                    | 값 변경 시 **리렌더링 트리거 O**                                                         |
| **Mutable**: 렌더링 프로세스 외부에서 `current`값 업데이트 가능                     | **Immutable**: State를 수정하기 위해서는 `setState`를 사용해 리렌더링 대기열에 넣어햐 함 |
| 렌더링 중에는 `current` 값을 읽거나 쓰면 안됨(이벤트 핸들러나 useEffect안에서 변경) | 언제든지 `State`를 읽을 수 있음. 각 렌더링마다 변경되지 않는 **State의 스냅샷**이 있음   |

<br/>

### useRef의 작동방식

```jsx
// Inside of React
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue })
  return ref
}
```

`useRef`는 항상 `{ current : initialValue }`를 반환하므로 **state setter 함수가 없는** `state` 변수라고 생각할 수 있다.

<br/>

### Ref 잘 사용하기

#### (1) Ref는 마지막 수단처럼 사용

- Ref는 외부 시스템이나 브라우저 API로 작업할 때 유용한 도구이다.
- 앱의 주요 로직이나 데이터 흐름에 ref를 남용해서는 안된다.

> ✅ 대표적인 ref 사용 예시
>
> - DOM에 직접 접근해야 할 때 ex) input에 포커스 주기
> - 외부 라이브러리와 연결할 때 ex) chart.js, map API 등
> - 특정 값을 렌더링과 상관없이 기억하고싶을 때 ex) 이전 값을 기억하거나 타이머 ID 저장 등

<br/>

#### (2) 렌더링 중엔 `ref.current`를 읽거나 쓰지 말 것

- `ref.current`을 렌더 중에 사용하거나 바꾸면, React 입장에서 예측이 어려워짐 → 렌더링 중에 필요한 값은 `useState`로 관리
- `if (!ref.current) ref.current = new Thing()`과 같은 코드는 첫 번째 렌더링 중에 Ref를 한 번만 설정하는 경우라 예외

<br/>

#### (3) `ref`는 즉시 값이 바뀜

- `useState`는 값이 바로 안 바뀌고, 다음 렌더에 반영되지만 `ref`는 일반 객체처럼 동작해 즉시 값이 바뀜

```jsx
ref.current = 5
console.log(ref.current) // 5
```

<br/>

#### (4) `ref` 내부 값을 마음대로 바꿔도 괜찮음

- 리액트는 변형하는 객체를 렌더링에 사용하지 않는 한, `ref`를 어떻게 처리하든 신경쓰지 않음
