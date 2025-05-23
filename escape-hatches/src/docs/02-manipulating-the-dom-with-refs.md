## Ref로 DOM 조작하기

### Input에 포커스 이동하기

```jsx
import { useRef } from 'react'

export default function Form() {
  const inputRef = useRef(null)

  function handleClick() {
    inputRef.current.focus()
  }

  return (
    <>
      // input의 DOM노드를 inputRef.current에 넣어줌
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  )
}
```

<br/>

### 한 컴포넌트는 여러 개의 ref를 가질 수 있다

- 그러나 `useRef`는 React Hook이므로 **컴포넌트의 최상단에서만 호출**해야 하며, 반복문, 조건문, `map()` 함수 안에서는 호출할 수 없다
- **ref 콜백**을 사용하여 ref 리스트 관리하기

  ```jsx
  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map()
    }
    return itemsRef.current
  }
  ```

  ```jsx
    <ul>
      {catList.map((cat) => (
  	    {/* ref로 함수 전달 */}
        <li
          key={cat}
          ref={(node) => {
            const map = getMap();
            map.set(cat, node);

            return () => {
              map.delete(cat);
            };
          }}
        >
          <img src={cat} />
        </li>
      ))}
    </ul>
  ```

  - `key - cat` / `value - DOM 노드(<li>)` 형태로 **Map**에 저장 → itemsRef는 여러개의 DOM 노드 정보를 가짐
    - DOM 요소가 **마운트**될 때 → `map.set(cat, node)`
    - DOM 요소가 **언마운트**될 때 → `map.delete(cat)`(클린업 함수) → node는 null이 됨
  - `const node = map.get(cat)`으로 해당 고양이 이미지 노드를 찾아 스크롤할 수 있다.

<br/>

### 다른 컴포넌트의 DOM 노드 접근하기

- 컴포넌트는 기본적으로 자신의 DOM 노드를 외부에 노출하지 않는다.
- ⇒ `ref` **prop**을 사용하여 DOM노드를 노출하도록 선택할 수 있다

> ⚠️ React 18까지는 `forwardRef`를 반드시 사용해야했지만, React 19부**터는** 필요하지 않음(향후 deprecated 예정)

<br/>

```jsx
import { useRef } from 'react'

function MyInput({ ref }) {
  // 3. 실제 DOM 요소에 props로 받은 ref 전달
  return <input ref={ref} />
}

export default function MyForm() {
  // 1. 부모 컴포넌트에 ref 선언
  const inputRef = useRef(null)

  // 4. 이벤트 핸들러에서 다른 컴포넌트의 DOM 조작 가능
  function handleClick() {
    inputRef.current.focus()
  }

  return (
    <>
      {/* 2. props로 ref 전달 */}
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  )
}
```

<br/>

🔴 **다른 컴포넌트의 DOM 노드의 일부만 조작 가능하도록 제한하기** - `useImperativeHandle` 훅

```jsx
import { useRef, useImperativeHandle } from 'react'

function MyInput({ ref }) {
  const realInputRef = useRef(null)
  // props로 전달된 ref에 조작 제한
  useImperativeHandle(ref, () => ({
    focus() {
      realInputRef.current.focus()
    },
  }))
  return <input ref={realInputRef} />
}

export default function Form() {
  const inputRef = useRef(null)

  function handleClick() {
    inputRef.current.focus() // OK
    // inputRef.current.style.color = 'red' -> CANNOT
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>Focus the input</button>
    </>
  )
}
```

- `ref.current`는 `focus()`만 가진 객체가 된다
- 부모 컴포넌트는 `inputRef.current.focus()`는 가능하지만 `inputRef.current.style.color = ‘red’`와 같은 조작은 할 수 없다

<br/>

### **🔁 리액트가 업데이트를 처리하는 2단계**

1. **렌더 단계**(render phase)
   1. 컴포넌트를 실행해서 어떻게 보여야 할지 계산(설계도 그림)
   2. 이 때 DOM은 건드리지 않음
   3. **ref.current = null** 인 상태
2. **커밋 단계**(commit phase)
   1. 계산된 결과를 바탕으로 실제 DOM에 적용
   2. 이 때 **ref.current에 실제 DOM이 들어감**

```jsx
function MyComponent() {
  const inputRef = useRef(null)
  // ❌ 렌더링 중에는 inputDOM이 아직 들어지지 않았기 때문에 null
  console.log(inputRef.current)

  return <input ref={inputRef} />
}
```

- **⇒ Ref는 이벤트 핸들러나 `useEffect` 안에서 사용**

> 🔴 **리액트가 관리하는 DOM노드를 직접 변경하는 것을 주의!**
>
> - 꼭 리액트가 관리하는 DOM을 직접 수정해야 한다면, 리액트가 업데이트할 이유가 없는 부분만 수정해야 한다

<br/>

### `flushSync`로 `state` 변경을 동적으로 플러시하기

```jsx
function handleAdd() {
  const newTodo = { id: nextId++, text: text }
  setText('')
  setTodos([...todos, newTodo])
  listRef.current.lastChild.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
  })
}
```

⇒ 상태 변경 함수(`setTodos`)는 비동기적이며, 리렌더링은 `handleAdd()`의 실행이 끝났을 때 일어나기 때문에 스크롤 이동은 `state`가 실제로 변경되기 전에 발생한다.

⇒ 마지막 항목이 아닌 마지막 직전 항목으로 스크롤 이동

🔫 `flushSync`를 사용하면 감싼 코드가 실행된 직후 리액트가 **즉시 리렌더링 및 DOM 업데이트** 수행

```jsx
function handleAdd() {
  const newTodo = { id: nextId++, text: text }
  flushSync(() => {
    setText('')
    setTodos([...todos, newTodo]) // => 리렌더링 + DOM 업데이트 후 다음 코드 실행
  })
  listRef.current.lastChild.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
  })
}
```
