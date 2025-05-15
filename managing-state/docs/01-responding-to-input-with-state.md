## State를 사용해 Input 다루기

- 선언형 UI 프로그래밍 하는 방법
- 컴포넌트에 들어갈 수 있는 다양한 시각적 state 열거하는 방법
- 코드에서 다른 시각적 state 간의 변경을 트리거하는 방법

### 리액트의 선언형 UI

- **선언형 UI ?** 무엇을 보여줄지 선언하는 방식
  - 상태(state)가 바뀌면 **자동으로 UI가 새로 렌더링**되도록 컴포넌트 설계 ⇒ 시각적 state로 UI 묘사
  - React, Vue
- **명령형 UI ?** 무엇을 어떻게 보여줄지 직접 명령하는 방식
  - 상태가 바뀔 때마다 **직접 DOM 조작**
  - Vanilla JS, jQuery

### UI를 선언적인 방식으로 생각하기

#### (1) 컴포넌트의 다양한 시각적 `state` 확인하기

UI 상태를 명확하게 나누어 설계하기

- **Empty** : 폼이 비어있을 때 - 제출 버튼 `비활성화`
- **Typing** : 타이핑 중 - 제출 버튼 `활성화`
- **Submitting** : 폼 `비활성화` & `로딩중` 표시
- **Success** : 폼 `숨김` → `제출 완료` 표시
- **Error**: `오류 메시지` 표시

```jsx
export default function Form({
  // status 상태값에 따른 UI 렌더링
  status = 'empty', // 'submitting', 'error', 'success'
}) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>In which city is there a billboard that turns air into drinkable water?</p>
      <form>
        <textarea disabled={status === 'submitting'} />
        <br />
        <button disabled={status === 'empty' || status === 'submitting'}>Submit</button>
        {status === 'error' && <p className='Error'>Good guess but a wrong answer. Try again!</p>}
      </form>
    </>
  )
}
```

<br/>

#### (2) 무엇이 State 변화를 트리거하는지 알아내기

- 휴먼 인풋
  - 제출 버튼 클릭 ⇒ `typing` → `submitting`
  - 텍스트 인풋 변경 ⇒ `empty` → `typing`
- 컴퓨터 인풋
  - 네트워크 응답 성공 ⇒ `submitting` → `success`
  - 네트워크 요청 실패 ⇒ `submitting` → `error`

<br/>

#### (3) 메모리의 state를 `useState`로 표현하기

```jsx
const [answer, setAnswer] = useState('')
const [error, setError] = useState(null)

const [isEmpty, setIsEmpty] = useState(true)
const [isTyping, setIsTyping] = useState(false)
const [isSubmitting, setIsSubmitting] = useState(false)
const [isSuccess, setIsSuccess] = useState(false)
const [isError, setIsError] = useState(false)
```

- 어떤 것을 `state`로 설정해야할지 어렵다면, 필요한 `state` 목록을 모두 작성한 후 `4번`을 통해 불필요한 `state` 변수를 삭제해 나가는 방향으로 작성

<br/>

#### ✨(4) 불필요한 `state` 변수 제거하기

- **`state`가 역설을 일으키지는 않는지?**
  - `isEmpty`, `isTyping`, `isSubmitting`, `isSuccess` 는 동시에 `true`일 수가 없음 ⇒ **하나의 state로 관리**하는 것이 효율적
- **다른 `state` 변수에 이미 같은 정보가 포함되어있지 않은지?**
  - `isEmpty` 같은 경우는 `input`의 `length`로 체크할 수 있음
- **다른 변수를 뒤집었을 때 같은 정보를 얻을 수 있지 않은지?**
  - `isError`는 `error ≠ null` 로 체크할 수 있음

**🔽 불필요한 `state` 변수 제거**

```jsx
const [answer, setAnswer] = useState('')
const [error, setError] = useState(null)
const [status, setStatus] = useState('typing') // 'typing', 'submitting', or 'success'
```
