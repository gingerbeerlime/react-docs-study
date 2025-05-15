## 컴포넌트 간 State 공유하기

- State 끌어올리기를 통한 컴포넌트 간 state를 공유하는 방법
- 제어 컴포넌트와 비제어 컴포넌트

### 부모 컴포넌트로 State 끌어올리기

#### `Step 1` 자식 컴포넌트에서 state 제거하기

```jsx
function Panel({ isActive }) {
  // state 제거 후 props로 받아오기
  // const [isActive, setIsActive] = useState(false);
}
```

#### `Step 2` 하드 코딩된 데이터를 부모 컴포넌트로 전달하기

`state`는 데이터를 공유할 자식 컴포넌트들의 **가장 가까운 공통 부모 컴포넌트**에 둬야한다

```jsx
function Accordion() {
  return (
    <>
      <Panel isActive={true} />
      <Panel isActive={false} />
    </>
  )
}
```

#### `Step 3` 공통 부모에 state 추가하기

여러개의 자식 패널을 갖고있을 때 각각의 패널에 대한 `boolean`값을 관리하는 것보다, 활성화된 패널의 `index` 숫자를 활용하는게 더 효율적이다

```jsx
function Accordion() {
  // 한 번에 하나의 패널만 활성화되어 있어야 함
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <>
      <Panel isActive={activeIndex === 0} onShow={() => setActiveIndex(0)} />
      <Panel isActive={activeIndex === 1} onShow={() => setActiveIndex(1)} />
    </>
  )
}
```

> #### 🔅 각 state의 단일 진리의 원천
>
> **하나의 상태는 하나의 컴포넌트만이 진짜 정보를 갖고 있어야 한다.** 따라서 여러 컴포넌트가 같은 state를 공유해야한다면 부모 컴포넌트에서 하나의 고유한 state로 관리해야 한다.

> #### �� 제어 컴포넌트와 비제어 컴포넌트
>
> 컴포넌트의 정보들은 **자체 지역 state로 관리되거나 props를 통해 부모 컴포넌트로부터 제어**될 수 있는데, 컴포넌트를 작성할 때 어떤 정보가 props를 통해 제어되어야하고 어떤 정보가 제어되지 않아야하는지 고려해서 작성해야한다.
