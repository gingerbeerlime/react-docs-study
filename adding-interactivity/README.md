## 상호작용 더하기(Adding interactivity)

- 이벤트에 응답하기
- State: 컴포넌트의 기억 저장소
- 렌더링 그리고 커밋
- 스냅샷으로서의 State
- State 업데이트 큐
- 객체 State 업데이트하기
- 배열 State 업데이트하기

[리액트v19 공식문서-상호작용 더하기] <https://ko.react.dev/learn/adding-interactivity>

---

## 이벤트에 응답하기

### 이벤트 핸들러 추가하기

```jsx
const Button = () => {
  // 이벤트 핸들러 함수 선언
  const handleClick = () => {
    alert('you clicked me!')
  }
  // button에 prop형태로 함수 전달
  return <button onClick={handleClick}>Click me!</button>
}
```

```jsx
const ButtonInlineEvent = () => {
  return (
    // 짧은 함수들을 정의할 땐 JSX내 인라인으로 이벤트 핸들러 정의할 수 있음
    <button onClick={() => alert('you clicked me!')}>
      Inline Event Handler
    </button>
  )
}
```

<br/>

### **이벤트 핸들러 함수의 특징**

- 주로 컴포넌트 내부에서 정의
- 이벤트 핸들러 명명법 : `handle` **+ 이벤트명**

> 🔴 이벤트 핸들러로 전달한 함수들은 호출이 아닌 전달되어야 한다.

```jsx
<button onClick={handleClick}> // 올바른 사용
<button onClick={handleClick()}> // 잘못된 예시(함수 호출하기)

// 인라인으로 이벤트 핸들러 정의할 때
<button onClick={() => alert('...')}> // 올바른 사용
<button onClick={alert('...')}> // 잘못된 예시(함수 호출하기)
```

리액트에서 `<button onClick={handleClick()}>` 처럼 `()`를 붙여서 함수를 전달하면, 클릭이 없어도 컴포넌트가 렌더링되는 순간 즉시 함수가 실행된다.

이는 JSX가 결국 자바스크립트 코드로 변환되기 때문이고, `handleClick()`은 함수의 ‘리턴값’을 전달하게 되어 실행되어 버리기 때문이다. `handleClick()` 함수에 `state`를 변경하는 로직이 포함되어있으면 무한 렌더링 루프가 발생할 수 있다.

따라서 이벤트 핸들러로 전달할 땐 `onClick={handleClick}`처럼 **함수 참조만 전달**해야 사용자가 클릭 이벤트를 발생시킬 때만 실행된다.

<br/>

### **이벤트 핸들러 내에서 Prop 읽기**

이벤트 핸들러는 컴포넌트 내부에서 선언되기 때문에 해당 컴포넌트의 prop에 접근할 수 있다.

```jsx
const AlertButton = ({ message, children }) => {
  // 이벤트 핸들러 alert에서 prop으로 받은 message 사용
  return <button onClick={() => alert(message)}>{children}</button>
}

const Toolbar = () => {
  return (
    <div>
      <AlertButton message='Playing!'>Play Movie</AlertButton>
      <AlertButton message='Uploading!'>Upload Image</AlertButton>
    </div>
  )
}
```

<br/>

### **이벤트 핸들러를 Prop으로 전달**

```jsx
// PlayButton과 UploadButton에서 클릭 이벤트 핸들러를 전달
const Button = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>
}

const PlayButton = ({ movieName }) => {
  const handlePlayClick = () => {
    alert(`Playing ${movieName}`)
  }
  // 이벤트 핸들러 전달 handlePlayClick -> <Button>의 onClick prop으로
  return <Button onClick={handlePlayClick}>Play "{movieName}"</Button>
}

const UploadButton = () => {
  // 이벤트 핸들러 전달 () => alert('Uploading') -> <Button>의 onClick prop으로
  return <Button onClick={() => alert('Uploading!')}>Upload Image</Button>
}

const Toolbar = () => {
  return (
    <div className='toolbar'>
      <PlayButton movieName="Kiki's Delivery Service" />
      <UploadButton />
    </div>
  )
}
```

<br/>

### **이벤트 핸들러를 Prop 명명하기**

- `<button>`과 `<div>` 같은 빌트인 컴포넌트는 `onClick`과 같은 브라우저 이벤트 이름만을 지원
- 사용자 정의 컴포넌트에서는 이벤트 핸들러 prop의 이름을 원하는 대로 명명할 수 있음
  - 이벤트 핸들러 prop의 이름은 `on` **+ 영문 대문자** 시작

```jsx
const MyComponent = ({ onSmash }) => {
  return <button onClick={onSmash} />
}

const App = () => {
  return <MyComponent onSmash={() => alert('click!')} />
}
```

<br/>

### 이벤트 전파

#### 리액트 Synthetic Event 시스템

리액트는 모든 DOM 이벤트를 루트에서 한 번만 등록하고, 그걸 SyntheticEvent로 감싸서 버블링 처리한다.

SyntheticEvent 시스템은 이벤트 위임(event delegation)방식으로 동작하고, 대부분의 이벤트는 버블링(bubbling)을 통해 부모로 전파된다(onScroll 이벤트 예외).

```jsx
const Button = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>
}

const Toolbar = () => {
  return (
    <div
      className='Toolbar'
      onClick={() => alert('You clicked on the toolbar!')}
    >
      // 버튼 클릭시 alert('Playing!') -> alert('You clicked on the toolbar!')
      순으로 실행
      <Button onClick={() => alert('Playing!')}>Play Movie</Button>
    </div>
  )
}

export default Toolbar
```

⇒ `주의` 컴포넌트 내에서만이 아닌 **컴포넌트 간에도 이벤트 전파가 이루어짐**

- `e.stopPropagation()` : 이벤트가 더 이상 bubbling 되지 않도록 함
- `e.preventDefault()` : 이벤트의 기본 브라우저 동작 실행 방지

<br/>

#### 💡 단계별 이벤트 캡처 - 이벤트 전파는 3단계로 진행된다

1. **캡처 단계(Capture Phase)** : 이벤트가 최상위 요소부터 클릭된 요소까지 내려가면서 `onClickCapture` 와 같은 **Capture 이벤트 핸들러**를 호출한다.
2. **타겟 단계(Target Phase)** : 실제로 클릭한 요소의 `onClick` 핸들러가 실행된다.
3. **버블링 단계(Bubbling Phase)** : 이벤트가 클릭된 요소에서 다시 위로 올라가면서 `onClick` 같은 일반 핸들러들이 호출된다.

```jsx
<div
  onClickCapture={() => {
    console.log('캡처 - div')
  }}
>
  <button onClick={(e) => e.stopPropagation()}>버튼</button>
</div>
```

- `onClickCapture`는 이벤트가 내려올 때 실행됨
- `button`에서 `e.stopPropagation()`을 써서 이벤트 전파를 막아도, 캡처 단계에서 이미 실행된 핸들러는 막을 수 없음 ⇒ `onClickCapture` 와 같은 Capture 이벤트 핸들러는 전파가 막히든 말든 무조건 먼저 실행됨

<br/>

---

## State: 컴포넌트의 기억 저장소

컴포넌트 내 지역 변수는 렌더링 간에 유지되지 않고, 지역변수를 변경하더라도 리액트는 렌더링을 다시 하지 않기 때문에 리액트의 컴포넌트별 메모리인 state가 필요하다.

### `useState` 훅

useState 훅은 `state` 변수, `state setter` 함수를 제공한다.

1. `state` 변수는 렌더링 간에 데이터를 유지한다.
2. `state setter` 함수는 변수를 업데이트하고 리액트가 컴포넌트를 다시 렌더링하도록 유발한다.

#### (1) useState 사용하기

```jsx
import { useState } from 'react'
```

- useState는 `state` 변수와 `state setter` 함수 두 가지를 반환한다.

```jsx
const [index, setIndex] = useState(0)
```

- `const [something, setSomething]` 과 같이 지정하는 것이 규칙
- `useState`의 유일한 인수는 `state` 변수의 초깃값이다. 여기서 `index`의 초깃값은 `useState(0)`에 의해 `0`으로 설정된다.

<br/>

#### (2) useState의 작동방식

```jsx
const [index, setIndex] = useState(0)
```

1. 컴포넌트가 처음 렌더링 된다.
   1. `index`의 초깃값으로 `0`을 전달했으므로 `[0, setIndex]`를 반환한다.
2. state를 업데이트한다.
   1. 사용자가 버튼을 클릭하면 `setIndex(index + 1)`을 호출한다.
   2. index가 0이므로 `setIndex(1)`이다.
   3. 리액트는 최신 `index`값을 `1`로 기억하고 **또 다른 렌더링을 유발한다.**
3. 컴포넌트가 두 번째로 렌더링된다.
   1. 리액트는 `index`를 `1`로 설정한 것을 기억하고 있어 이번에는 `[1, setIndex]`를 반환한다.

<br/>

> 🔅 **컴포넌트 내 state가 여러 가지일 때 리액트는 어떻게 상태들을 추적하고 관리할 수 있을까?**<br/>
> ⇒ 리액트는 내부적으로 상태를 `순서` 기반 배열로 추적한다.<br/>
> ⇒ `useState()`는 호출 순서에 따라 각각의 상태를 기억한다.<br/>
> ⇒ 따라서 `useState`는 컴포넌트 최상단에서 항상 같은 순서로 호출되어야한다.

```jsx
function MyComponent() {
  const [count, setCount] = useState(0) // 1번째 상태 => count용 상태
  const [name, setName] = useState('') // 2번째 상태 => name용 상태
}
```

- `useState`의 작동원리 : 렌더가 시작되면, 상태값을 초기값으로 초기화하고 useState()가 호출될 때마다 다음 인덱스로 넘어가며 상태를 꺼내준다.

```jsx
let stateArray = [0, '']
let currentIndex = 0

function useState(initialValue) {
  const index = currentIndex
  if (stateArray[index] === undefined) {
    stateArray[index] = initialValue
  }
  const setState = (newValue) => {
    stateArray[index] = newValue
    render() // 다시 렌더링
  }
  currentIndex++
  return [stateArray[index], setState]
}
```

<br/>

#### (3) State is `isolated` and `private`

- `Isolated`: 컴포넌트의 `state`는 **다른 컴포넌트와 공유되지 않는다**. 즉, 컴포넌트의 state는 부모 컴포넌트나 형제 컴포넌트와 같이 다른 컴포넌트에서 직접 접근하거나 수정할 수 없다.
- `Private`: `state`는 **컴포넌트 내부에서만 관리되고 사용된다**. 외부에서 직접 볼 수도, 바꿀 수도 없다.

```jsx
export default function Page() {
  return (
    <div className="Page">
      <Gallery />
      <Gallery />
    </div>
  );
```

- 같은 `Gallery` 컴포넌트를 여러번 사용하더라도 **각 `Gallery` 컴포넌트는 자기만의 `state`를 갖고 서로 영향을 주지 않는다.**
  ⇒ 여러 개의 `Gallery` 컴포넌트가 같은 값을 공유하길 원한다면 부모 컴포넌트인 `Page` 컴포넌트의 `state`값을 prop으로 전달받아 사용해야 한다.

<br/>

### ⛳️ 챌린지 - 불필요한 state 제거하기

```jsx
import { useState } from 'react'

export default function FeedbackForm() {
  const [name, setName] = useState('')

  function handleClick() {
    setName(prompt('What is your name?'))
    alert(`Hello, ${name}!`)
  }

  return <button onClick={handleClick}>Greet</button>
}
```

- `name`은 이벤트 핸들러 내에서 일회성으로 사용하는 변수이기 때문에 **다시 렌더링될 때 상태값을 유지할 필요가 없다.**

```jsx
export default function FeedbackForm() {
  function handleClick() {
    const name = prompt('What is your name?')
    alert(`Hello, ${name}!`)
  }

  return <button onClick={handleClick}>Greet</button>
}
```

- `주의` 컴포넌트가 다시 렌더링 될 때 정보를 유지하기 위해 `state` 변수가 필요한 것임을 잊지않기<br/>
  ⇒ 일반 변수로도 잘 작동할 때 state 변수를 사용하지 않도록 한다.

---

## 렌더링 그리고 커밋

리액트의 렌더링 동작은 3가지 단계를 거친다.

1. 렌더링 `트리거` (손님의 주문을 주방으로 전달)
2. 컴포넌트 `렌더링` (주방에서 주문 준비하기
3. DOM에 `커밋` (테이블에 주문한 요리 내놓기)

### 1단계: 트리거

컴포넌트 렌더링이 일어나는 2가지 이유

1. 컴포넌트의 **초기 렌더링인 경우**
2. 컴포넌트의 **state가 업데이트된 경우**

#### (1) 초기 렌더링

- `createRoot`호출 후 `render` 메서드 호출

```jsx
import Image from './Image.js'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))
root.render(<Image />)
```

#### (2) state 업데이트 시 리렌더링

`setState`함수를 통해 상태를 업데이트하여 추가적인 렌더링 트리거

⇒ 컴포넌트 상태를 업데이트하면 자동으로 렌더링 대기열에 추가된다.

<br/>

### 2단계: React 컴포넌트 렌더링

**렌더링?** 리액트에서 컴포넌트를 호출하는 것

- **초기 렌더링**에서 리액트는 `루트 컴포넌트`를 호출한다.
- **이후 렌더링**에서는 리액트는 `state 업데이트가 일어나 렌더링을 트리거한 컴포넌트`를 호출한다.
- 업데이트된 컴포넌트가 다른 컴포넌트를 반환하면, 리액트는 다음으로 해당 컴포넌트를 렌더링하는 식으로 중첩된 컴포넌트가 더 이상 없을 때까지 재귀적으로 렌더링을 처리한다.

<br/>

### 3단계: React가 DOM에 변경사항을 커밋

컴포넌트를 호출한 후 리액트는 DOM을 수정한다.

- **초기 렌더링**에서 리액트는 `appendChild()` DOM API를 사용하여 생성한 모든 DOM 노드를 화면에 표시한다.
- **리렌더링**의 경우 필요한 최소한의 작업을 적용해 DOM이 최신 렌더링 출력과 일치하도록 한다.
  ⇒ **리액트는 렌더링 간에 차이가 있는 경우에만 DOM 노드를 변경한다.**

  ```jsx
  export default function Clock({ time }) {
    return (
      <>
        <h1>{time}</h1>
        <input />
      </>
    )
  }
  ```

  - `time`이 업데이트된 경우 `<h1>`의 내용만 새로 업데이트하고 `<input>`과 `<input>의 value`는 건드리지 않는다

<br/>

---

## 스냅샷으로서의 State

### State를 설정하면 새 렌더링을 요청한다

```jsx
import { useState } from 'react'

const Form = () => {
  const [isSent, setIsSent] = useState(false)
  const [message, setMessage] = useState('Hi')
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setIsSent(true)
        setMessage(message)
      }}
    >
      <textarea
        placeholder='Message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type='submit'>Send</button>
    </form>
  )
}

export default Form
```

`Send` 버튼을 클릭

⇒ `onSubmit` 이벤트 핸들러 실행

⇒ `setIsSent(true)`가 `isSent`를 `true`로 설정

⇒ 새로운 렌더링을 큐에 넣음

⇒ 리액트는 새로운 `isSent` 값에 따라 컴포넌트 다시 렌더링

<br/>

### 렌더링은 그 시점의 스냅샷을 찍는다

- 리액트 컴포넌트 함수에서 반환하는 JSX는 “**시간상 UI의 스냅샷**”과 같다.
- `useState`를 호출하면 리액트는 해당 렌더링에 대한 `state의 스냅샷`을 제공한다.
- `prop`, `이벤트 핸들러`, `로컬 변수`는 모두 **렌더링 당시의** `state`를 사용해 새로 계산된다.

> **🔁 리액트 재렌더링 순서**
>
> 1. 리액트가 함수를 다시 호출<br/>
> 2. 함수가 새로운 **JSX 스냅샷** 반환<br/>
> 3. 리액트가 반환된 **JSX 스냅샷**과 일치하도록 화면을 업데이트

<br/>

```jsx
import { useState } from 'react'

const Counter = () => {
  const [number, setNumber] = useState(0)

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1) // 현재 number : 0, 다음 렌더링에서 number 1로 변경할 준비
          setNumber(number + 1) // 현재 number : 0, 다음 렌더링에서 number 1로 변경할 준비
          setNumber(number + 1) // 현재 number : 0, 다음 렌더링에서 number 1로 변경할 준비
        }}
      >
        +3
      </button>
    </>
  )
}

export default Counter
```

⇒ state를 업데이트하면 다음 렌더링에 대해서만 변경된다.

- `onClick`에서 `setNumber(number + 1)`을 **3번** 호출해도 다음 렌더링에서 `number`는 `1`이 되는데, 이는 현재의 렌더링에서는 `setNumber(number+1)` 실행 후에도 `number`가 여전히 `0`이기 때문이다.
  ⇒ ‘`0 + 1`’ 을 **3번** 한 것과 같은 결과

<br/>

### 시간 경과에 따른 State

```jsx
import { useState } from 'react'

const Counter = () => {
  const [number, setNumber] = useState(0)

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 5)
          setTimeout(() => {
            alert(number)
          }, 3000)
        }}
      >
        +5
      </button>
    </>
  )
}

export default Counter
```

- `setNumber(number + 5)`를 실행하고 **3초 후** `alert(number)`를 실행해, 리렌더링 된 후 alert창이 뜨더라도 `alert`는 숫자 `0`을 표시함
- ⇒ 과거에 생성된 이벤트 핸들러는 **그것이 생성된 렌더링 시점의** `state`**값을 갖는다**

---

## State 업데이트 큐

### React state batches 업데이트

**batching?** 리액트는 이벤트 핸들러가 모두 끝날 때까지 기다린 다음에, 한 번에 `state` 업데이트를 처리한다.

- 핸들러 안에서 여러 번 `setState`를 해도, 그 중 마지막 값이 반영된다.
- 렌더링이 핸들러가 끝나고 한 번에 일어나기 때문에 더 빠르고 효율적이다.
- 중간에 반쯤 업데이트된 혼란스러운 상태를 보여주는 걸 방지한다.

### 다음 렌더링 전에 동일한 state 변수를 여러 번 업데이트 하기

#### 함수형 업데이트 사용하기

`setNumber(number + 1)` 대신 `setNumber(n ⇒ n + 1)` 과 같이 **이전 큐의 `state`를 기반으로** 다음 `state`를 계산하는 함수를 전달할 수 있다.

```jsx
import { useState } from 'react'

export default function Counter() {
  const [number, setNumber] = useState(0)

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber((n) => n + 1)
          setNumber((n) => n + 1)
          setNumber((n) => n + 1)
        }}
      >
        +3
      </button>
    </>
  )
}
```

- 코드 동작 방식 : `setNumber(n ⇒ n + 1)` : `n ⇒ n + 1` 함수를 큐에 추가한다.

| 큐에 추가된 업데이트 함수 | n   | 반환값    |
| ------------------------- | --- | --------- |
| n ⇒ n + 1                 | 0   | 0 + 1 = 1 |
| n ⇒ n + 1                 | 1   | 1 + 1 = 2 |
| n ⇒ n + 1                 | 2   | 2 + 1 = 3 |

⇒ 리액트는 최종 결과인 `3`을 `useState`에서 반환한다.

```jsx
<button
  onClick={() => {
    setNumber(number + 5) // 5
    setNumber((n) => n + 1) // 6
  }}
/>
```

⇒ number : 6

- `setNumber(number + 5)` 는 `setNumber(n ⇒ 5)`처럼 동작해서 `n`(이전 값)을 무시하고 사용하지 않는다.

```jsx
<button onClick={() => {
  setNumber(number + 5); // 5
  setNumber(n => n + 1); // 6
  setNumber(42); // 42
}}>
```

⇒ number : 42

#### 함수형 업데이트 처리 방식

- 이벤트 핸들러가 다 끝나고 나서 리액트가 다시 렌더링할 때 큐에 등록된 `state` 업데이트를 처리한다
- `setState(n ⇒ n + 1)`과 같은 업데이터 함수는 **렌더링 중에 실행**된다
- 업데이터 함수 안에서는 새 값만 리턴해야 하고, 다른 작업(side effect)은 하면 안된다
- `Strict Mode`에서는 디버깅을 돕기 위해 업데이터 **함수를 2번 실행**해서 결과 값이 같은지(**순수성**)를 체크한다.

#### 업데이터 함수 명명 규칙

```jsx
// 변수 첫 글자 약어 사용(가장 보편적)
setEnabled((e) => !e)
setLastName((ln) => ln.reverse())
setFriendCount((fc) => fc * 2)
// 변수 풀네임 사용
setEnabled((enabled) => !enabled)
// 접두사 사용
setEnabled((preEnabled) => !preEnabled)
```

---

## 객체 State 업데이트하기

### Mutation(변경)

- 자바스크립트에서 `string`, `number`, `boolean`과 같은 원시값들은 변경할 수 없다.
  - ex. `x` state가 `0`에서 `5`로 바뀌더라도 숫자 `0` 자체는 바뀌지않음을 의미한다.
- 다만 객체는 객체 자체의 내용을 바꿀 수 있고 이를 **변경(`mutation`)**이라고 한다.
  ```jsx
  const [position, setPosition] = useState({ x: 0, y: 0 })
  ```
  - ex. position.x = 5
- 리액트에서는 `state`의 객체들이 기술적으로 변경(`mutation`)이 가능할지라도 원시값인 `string`, `number`, `boolean`과 같이 불변성을 가진 것처럼 다루어야 한다
  ⇒ 객체를 변경하는 대신 **새로운 객체를 만들어 교체**

<br/>

### 새 객체를 생성하여 state 업데이트하기

```jsx
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })
  return (
    <div
      onPointerMove={(e) => {
        setPosition({
          x: e.clientX,
          y: e.clientY,
        })
      }}
    >
    ...
  )
 }
```

- `setPosition`은 `position`을 **새로운 객체로 교체** → 컴포넌트를 **다시 렌더링**

<br/>

#### (1) 전개 문법으로 객체 복사하기

❌ 잘못된 방식: `state` 내 객체 직접 수정

```jsx
const [person, setPerson] = useState({
  firstName: 'Barbara',
  lastName: 'Hepworth',
  email: 'bhepworth@sculpture.com',
})

function handleFirstNameChange(e) {
  person.firstName = e.target.value
}
```

✅ 올바른 방식: `스프레드 연산자`로 객체를 복사해 일부분만 업데이트하기

```jsx
function handleFirstNameChange(e) {
  setPerson({
    ...person,
    firstName: e.target.value,
  })
}
```

✅ 올바른 방식: 객체 내 여러 필드를 하나의 이벤트 핸들러로 업데이트하기

```jsx
import { useState } from 'react'

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      // []안에 동적인 프로퍼티를 명시할 수 있다
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <label>
        First name:
        <input
          name='firstName'
          value={person.firstName}
          onChange={handleChange}
        />
      </label>
      ...
    </>
  )
}

```

> 🔴 스프레드 연산자는 한 레벨 깊이의 내용만 복사한다.<br/>
>
> - 중첩된 객체의 프로퍼티를 업데이트하고 싶을 때는 스프레드 연산자를 여러번 사용하거나 Immer과 같은 라이브러리를 이용할 수 있다.

<br/>

#### (2) 중첩된 객체 갱신하기

```jsx
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  },
})
```

artwork 객체 내 city 속성을 변경하고 싶다면,

```jsx
const nextArtwork = { ...person.artwork, city: 'New Delhi' }
const nextPerson = { ...person, artwork: nextArtwork }
setPerson(nextPerson)
```

또는,

```jsx
setPerson({
  ...person,
  artwork: {
    ...person.artwork,
    city: 'New Delhi',
  },
})
```

이런식으로 한 레벨의 객체마다 스프레드 연산자를 사용해 복사해서 업데이트 할 수 있다.

<br/>

#### ✨ Immer 라이브러리를 사용하여 중첩된 객체 간결하게 업데이트하기

```jsx
updatePerson((draft) => {
  draft.artwork.city = 'Lagos'
})
```

- `draft`는 Immer이 제공하는 `Proxy`라고 하는 특별한 객체 타입
- 객체를 자유롭게 변경하더라도 Immer은 내부적으로 `draft`의 어느 부분이 변경되었는지 알아내어, 변경사항을 포함한 **완전히 새로운 객체를 생성한다**

<br/>

- 설치 & 사용

```bash
npm install immer
```

```jsx
import { useState } from 'react'
import { produce } from 'immer'

export default function Form() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    },
  })

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPerson(
      produce((draft) => {
        draft.name = e.target.value
      }),
    )
  }
  ...
}

```

- `produce`는 상태의 복사본(`draft`)를 만들고 그 복사본에서만 직접 변경을 해 불변성 유지

---

## 배열 State 업데이트하기

배열도 객체와 마찬가지로 `state` 내 배열을 직접 변경해서는 안되며 업데이트할 때마다 새 배열을 `setState` 함수에 전달해야 한다.

|      | ❌ 배열을 변경           | ✅ 새 배열을 반환   |
| ---- | ------------------------ | ------------------- |
| 추가 | `push`, `unshift`        | `concat`, `[…arr]`  |
| 제거 | `pop`, `shift`, `splice` | `filter`, `slice`   |
| 교체 | `splice`, `arr[i] = …`   | `map`               |
| 정렬 | `reverse`, `sort`        | 배열 복사한 후 처리 |

<br/>

### (1) 배열에 항목 추가하기 : `[…arr]` 전개 연산자

```jsx
setArtists([
  ...artists,
  { id: nextId++, name: name }, // 새 항목을 추가
])
```

<br/>

### (2) 배열에서 항목 제거하기: `filter`

```jsx
setArtists(
  artists.filter((a) => a.id !== artist.id), // 새로운 배열 반환
)
```

<br/>

### (3) 배열 변환하기: `map`

```jsx
const nextShapes = shapes.map((shape) => {
  // Square는 변경하지 않고 Circle 만 변경
  if (shape.type === 'square') {
    return shape
  } else {
    return {
      ...shape,
      y: shape.y + 50,
    }
  }
})
// 새로운 배열로 교체
setShapes(nextShapes)
```

<br/>

### (4) 배열 내 항목 교체하기: `map`

```jsx
const nextCounters = counters.map((c, i) => {
  if (i === index) {
    return c + 1
  } else {
    return c
  }
})
setCounters(nextCounters)
```

<br/>

### (5) 배열에 항목 삽입하기: `slice`

```jsx
const insertAt = 1
const nextArtists = [
  // 삽입 지점 이전 항목
  ...artists.slice(0, insertAt),
  // 새 항목
  { id: nextId++, name: name },
  // 삽입 지점 이후 항목
  ...artists.slice(insertAt),
]
setArtists(nextArtists)
```

<br/>

### (5) 배열 재 정렬하기: 배열 복사한 뒤 `reverse`, `sort`

- 비변경 함수가 따로 없다면 배열을 복사한 뒤 복사본에 변경 작업을 해서 `setState`에 전달

```jsx
const [list, setList] = useState(initialList)

function handleClick() {
  // 복사본 생성
  const nextList = [...list]
  nextList.reverse()
  setList(nextList)
}
```

<br/>

### (6) 배열 내부의 객체 업데이트하기: `map`

> 🔴 배열을 복사하더라도 배열 내부의 기존 항목을 변경해서는 안된다

```jsx
import { useState } from 'react';

const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, setMyList] = useState(initialList);
  const [yourList, setYourList] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    const myNextList = [...myList];
    // [얕은복사]MyNextList는 새로운 배열이지만 내부의 항목들은 myList 원본 배열과 동일
    const artwork = myNextList.find(
      a => a.id === artworkId
    );
    // 원본 배열의 항목도 같이 변경된다
    artwork.seen = nextSeen;
    setMyList(myNextList);
  }
  ...
 }
```

⇒ `map`과 `스프레드 연산자`를 사용해 원본 배열의 항목 변경 없이 업데이트된 버전으로 교체

```jsx
setMyList(
  myList.map((artwork) => {
    if (artwork.id === artworkId) {
      // 새 객체를 만들어 반환
      return { ...artwork, seen: nextSeen }
    } else {
      // 변경시키지 않고 그대로 반환
      return artwork
    }
  }),
)
```

- 또는 객체 업데이트와 마찬가지로 `Immer` 라이브러리를 사용해 간단히 업데이트할 수 있다
  ⇒ Immer 라이브러리를 사용하면 복사본을 만들어 알아서 처리해주기 때문에 `push`, `pop`과 같은 배열 변경 함수들도 사용 가능하다.
