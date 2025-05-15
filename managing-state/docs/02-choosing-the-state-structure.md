## State 구조 선택하기

- 단일 vs 다중 state 변수를 사용하는 경우
- State를 구성할 때 피해야할 사항
- 상태 구조의 일반적인 문제를 해결하는 방법

### State 구조화 원칙

1. 연관된 state 그룹화하기 : 2개 이상의 state 변수를 동시에 업데이트한다면, 단일 state 변수로 통합 고려
2. State의 모순 피하기
3. 불필요한 state 피하기
4. State 중복 피하기 : 동일 데이터가 중복될 경우 동기화 유지가 어려우니 최대한 중복 피하기
5. 깊게 중첩된 state 피하기 : 가능한 한 state를 평탄한 방식으로 구성

<br/>

#### (1) 연관된 state 그룹화하기

- 두 개의 `state` 변수가 항상 함께 변경된다면, 단일 `state` 변수로 통합하는 것이 좋다

```jsx
const [position, setPosition] = useState({ x: 0, y: 0 })
```

⇒ 마우스 커서를 움직이면 `x, y` 두 좌표가 모두 업데이트 됨 → 하나의 `state` 객체로 관리하는 것이 좋음

<br/>

#### (2) State의 모순 피하기

❌ `isSending` 과 `isSent` 는 동시에 `true`일 수 없기 때문에 버그가 생길 위험이 있다.

```jsx
const [isSending, setIsSending] = useState(false)
const [isSent, setIsSent] = useState(false)
```

✅ 3가지 유효한 상태 중 하나를 가질 수 있는 `status` 상태 하나로 대체하는 것이 좋다

```jsx
const [status, setStatus] = useState('typing') // or 'sending' or 'sent'

// 필요할 경우 state 변수를 활용한 상수 선언
const isSending = status === 'sending'
const isSent = status === 'sent'
```

<br/>

#### (3) 불필요한 state 피하기

컴포넌트의 `props`나 기존 `state` 변수에서 계산할 수 있는 정보라면, 해당 정보는 `state`로 선언하지 않아야 한다

```jsx
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
// const [fullName, setFullName] = useState('');
```

⇒ `fullName`은 `firstName`과 `lastName`의 조합으로 얻어낼 수 있는 정보이기 때문에 불필요한 `state` 변수이다.

<br/>

> 🔴 **Props를 state에 미러링하지 말 것!**
>
> `state`의 초기값은 첫 번째 렌더링 중에만 사용되기 때문에 `props` 값이 변경되더라도 `state` 변수가 업데이트되지 않는다. 따라서 `props` 데이터를 `state`의 초기값으로 사용하려는 의도적인 목적이 아니라면 `props`를 `state`에 미러링해서는 안된다.

```jsx
function Message({ messageColor }) {
 // [X]props의 messageColor 값이 업데이트 되더라도 state의 color값은 변경되지 않음
  const [color, setColor] = useState(messageColor);
  // [O]대신 코드에 prop을 직접 사용 => prop과 동기화 유지
  const color = messageColor
```

```jsx
function Message({ initialColor }) {
  // prop을 state 변수의 초기값으로 사용하고 싶다면
  // 'initial' 또는 'default'로 시작해 새로운 값이 무시됨을 명확히 해야한다
  const [color, setColor] = useState(initialColor);
```

<br/>

#### (4) State의 중복 피하기

```jsx
import { useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  ...
}
```

- `selectedItem`과 `items` 리스트의 항목이 중복됨
  - items = [{ id: 0, title: 'pretzels'}, ...]
  - selectedItem = {id: 0, title: 'pretzels'}
  - ⇒ `state` 변경 시 **동기화를 유지하기 어려움**
- 중복된 항목을 제거하고 필수적인 `state`만 유지
  - items = [{ id: 0, title: 'pretzels'}, ...]
  - **selectedId = 0**
  - ⇒ `selectedItem`은 `items.find(item ⇒ [item.id](http://item.id) === selectedId)` 와 같은 방식으로 찾아 사용하면 **선택한 항목 객체 자체를 `state`로 유지할 필요 없음.**
- **선택된 항목과 같은 UI 패턴**은 객체 자체가 아닌 `ID` 또는 `Index`를 `state`로 관리하는 것이 좋음

<br/>

#### (5) 깊게 중첩된 state 피하기

❌ 깊게 중첩된 데이터

```jsx
export const initialTravelPlan = {
  id: 0,
  title: '(Root)',
  childPlaces: [{
    id: 1,
    title: 'Earth',
    childPlaces: [{
      id: 2,
      title: 'Africa',
      childPlaces: [{
        id: 3,
        title: 'Botswana',
        childPlaces: []
      },
      ...
```

✅ state 구조는 최대한 평탄하게

```jsx
export const initialTravelPlan = {
  0: {
    id: 0,
    title: '(Root)',
    childIds: [1, 42, 46],
  },
  1: {
    id: 1,
    title: 'Earth',
    childIds: [2, 10, 19, 26, 34]
  },
  2: {
    id: 2,
    title: 'Africa',
    childIds: [3, 4, 5, 6 , 7, 8, 9]
  },
  ...
```

- 깊게 중첩된 객체를 업데이트하는 것은 변경된 부분부터 모든 객체의 복사본을 만들어야하기 때문에 복잡해질 수 있음
- ⇒ `state`는 최대한 평탄하게 만드는 것이 바람직하다.

```jsx
  const [plan, setPlan] = useState<Record<number, Plan>>(initialTravelPlan)

  function handleComplete(parentId: number, childId: number) {
    const parent = plan[parentId]
    // 변경된 정보를 담은 새로운 객체 생성
    const nextParent = {
      ...parent,
      childIds: parent.childIds.filter((id) => id !== childId),
    }
    // 새로운 객체로 교체
    setPlan({
      ...plan,
      [parentId]: nextParent,
    })
  }
```

> ✨Immer을 사용해 중첩된 객체 정보 업데이트하기

```jsx
  const [plan, updatePlan] = useImmer<Record<number, Plan>>(initialTravelPlan)

  function handleComplete(parentId: number, childId: number) {
    updatePlan((draft) => {
      const parent = draft[parentId]
      // 원본 객체를 바로 수정해도 OK
      parent.childIds = parent.childIds.filter((id) => id !== childId)
    })
  }
```

<br/>

### 🚩 챌린지 - 선택 사라짐 수정하기

[`문제풀이`] state에 중복 데이터를 제거하여 동기화 문제 해결

```jsx
import { useState } from 'react'
import { initialLetters } from './data.js'
import Letter from './Letter.js'

export default function MailClient() {
  const [letters, setLetters] = useState(initialLetters)
  // letters 중 하나의 항목이 highlightedLetter로 데이터가 중복됨
  // const [highlightedLetter, setHighlightedLetter] = useState(null);
  // 객체 자체 대신 ID를 state로 관리
  const [highlightedLetterId, setHighlightedLetterId] = useState(null)

  function handleHover(letter) {
    setHighlightedLetterId(letter.id)
  }

  function handleStar(starred) {
    setLetters(
      letters.map((letter) => {
        if (letter.id === starred.id) {
          return {
            ...letter,
            isStarred: !letter.isStarred,
          }
        } else {
          return letter
        }
      }),
    )
  }

  return (
    <>
      <h2>Inbox</h2>
      <ul>
        {letters.map((letter) => (
          <Letter
            key={letter.id}
            letter={letter}
            isHighlighted={letter.id === highlightedLetterId}
            onHover={handleHover}
            onToggleStar={handleStar}
          />
        ))}
      </ul>
    </>
  )
}
```

<br/>

### 🚩 챌린지 - 깨진 포장 목록 수정하기

[`문제풀이`] 필요한 최소한의 state만 유지하기, 계산할 수 있는 값은 상수로 선언하기

```jsx
import { useState } from 'react'
import AddItem from './AddItem.js'
import PackingList from './PackingList.js'

let nextId = 3
const initialItems = [
  { id: 0, title: 'Warm socks', packed: true },
  { id: 1, title: 'Travel journal', packed: false },
  { id: 2, title: 'Watercolors', packed: false },
]

export default function TravelPlan() {
  const [items, setItems] = useState(initialItems)

  // total은 items.length로 계산가능
  // const [total, setTotal] = useState(3);

  // packed는 items.filter(item => item.packed).length 로 계산 가능
  // const [packed, setPacked] = useState(1);~~

  // => state 대신 상수로 선언
  const total = items.length
  const packed = items.filter((item) => item.packed).length

  function handleAddItem(title) {
    setItems([
      ...items,
      {
        id: nextId++,
        title: title,
        packed: false,
      },
    ])
  }

  function handleChangeItem(nextItem) {
    setItems(
      items.map((item) => {
        if (item.id === nextItem.id) {
          return {
            ...nextItem,
            packed: !nextItem.packed,
          }
        } else {
          return item
        }
      }),
    )
  }

  function handleDeleteItem(itemId) {
    setItems(items.filter((item) => item.id !== itemId))
  }

  return (
    <>
      <AddItem onAddItem={handleAddItem} />
      <PackingList items={items} onChangeItem={handleChangeItem} onDeleteItem={handleDeleteItem} />
      <hr />
      <b>
        {packed} out of {total} packed!
      </b>
    </>
  )
}
```
