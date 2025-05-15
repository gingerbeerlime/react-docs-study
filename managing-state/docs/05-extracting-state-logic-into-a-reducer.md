## State 로직을 리듀서로 작성하기

```jsx
function handleAddTask(text) {
  setTasks([
    ...tasks,
    {
      id: nextId++,
      text: text,
      done: false,
    },
  ])
}

function handleChangeTask(task) {
  setTasks(
    tasks.map((t) => {
      if (t.id === task.id) {
        return task
      } else {
        return t
      }
    }),
  )
}

function handleDeleteTask(taskId) {
  setTasks(tasks.filter((t) => t.id !== taskId))
}
```

`handleAddTask`, `handleChangeTask`, `handleDeleteTask` 각 이벤트 핸들러에서 `setTasks`를 호출하고 있음

⇒ `state` 업데이트가 여러 이벤트 핸들러로 분산되는 경우, `state` 업데이트 로직을 `reducer`를 사용해 컴포넌트 외부의 **단일 함수로 통합해 관리**할 수 있다.

---

## reducer를 사용해 state 로직 통합하기

1. state를 설정하는 것에서 action을 dispatch 함수로 전달하는 것으로 변경
2. reducer 함수 작성하기
3. 컴포넌트에서 reducer 사용하기

### (1) Setting State → Dispatching Actions

```jsx
function handleAddTask(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  })
}

function handleChangeTask(task) {
  dispatch({
    type: 'changed',
    task: task,
  })
}

function handleDeleteTask(taskId) {
  dispatch({
    type: 'deleted',
    id: taskId,
  })
}
```

- `Action`은 `dispatch` 함수에 넣어준 객체를 의미한다.
- `dispatch` 함수는 **사용자의 `action`을 `reducer` 함수에 전달하는 역할**을 한다.
- `Action` 객체의 포맷 : 정해진 포맷은 없으나 `type`에 액션의 종류를 담고, 이외의 정보는 다른 필드에 담아서 전달하는게 일반적이다

```jsx
dispatch({
  type: '발생한 액션의 type', // ex) 'added', 'added_task' 등과 같이 설명
  // 이외의 정보들은 자유로운 포맷으로 전달
})
```

<br/>

### (2) reducer 함수 작성하기

**`reducer` 함수?** `state`에 대한 로직을 작성하는 곳

```jsx
// state값, action객체 두 개의 인자를 받는다
function yourReducer(state, action) {
  // React가 설정하게될 다음 state 값을 반환한다
}
```

`reducer` 함수 예시

```jsx
function tasksReducer(tasks, action) {
  switch (action.type) {
    // action 종류가 'added'일 때
    case 'added': {
      // 다음 state 값
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ]
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task
        } else {
          return t
        }
      })
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id)
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}
```

- `reducer` 함수는 `state`(`tasks`)를 인자로 받고 있기 때문에, 이를 **컴포넌트 외부에서 선언할 수 있다.**
- `reducer` 함수 안에서는 **switch 문을 사용하는 것이 규칙**이다.

> 📖 `reducer` 함수는 `reduce()` 연산의 이름을 따 명명되었음. `reduce` 함수는 지금까지의 결과와 현재 아이템을 인자로 받고 다음 결과를 반환하는 함수인데 **React의** `reducer` 역시 현재 상태(**state**)와 새로운 입력(**action**)을 인자로 받아 다음 상태(**state**)를 반환하는 방식으로 작동하므로, 로직의 구조가 유사하다.

<br/>

### (3) 컴포넌트에서 reducer 사용하기

- `useReducer` 훅 사용하기

```jsx
import { useReducer } from 'react'
```

- `useState` 대신 **`useReducer` 사용하기**

```jsx
// const [tasks, setTasks] = useState(initialTasks);
// useReducer(reducer 함수, 초기 state 값)
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)
```

- `useReducer` 훅은 **reducer 함수**, **초기 state 값** 두 개의 인자를 받고
- **state를 담을 수 있는 값(tasks), dispatch 함수를 반환**한다.

```jsx
import { useReducer } from 'react';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }
...
}
```

- `reducer` 함수를 컴포넌트 외부로 분리

```jsx
export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ]
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task
        } else {
          return t
        }
      })
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id)
    }
    default: {
      throw Error('Unknown action: ' + action.type)
    }
  }
}
```

⇒ **`state`를 업데이트하는 로직이 다양하고 복잡할 때 `reducer`를 사용**하면 컴포넌트의 로직을 더 읽기 쉽게 작성할 수 있다.

---

## reducer 함수 잘 사용하기

> 🔴 무조건 useReducer를 쓴다고 좋은 것이 아님! 컴포넌트의 로직구조에 맞게 useState, useReducer 적절한 방식을 선택해서 사용해야 한다.
>
> - **간단한 state 업데이트**의 경우? → `useState`를 쓰는 것이 낫다
>   - 미리 작성해야 하는 코드가 적고 간단한 로직에서는 오히려 useReducer보다 가독성이 좋다
> - **state 업데이트가 복잡한 구조인** 경우 ? → `useReducer`를 쓰는 것이 좋다
>   - 업데이트 로직이 어떻게 동작하는지, 이벤트 핸들러를 통해 무엇이 발생했는지 명확히 구분할 수 있다.
>   - `reducer`에 콘솔 로그를 추가해 단계별로 디버깅하기 좋다
>   - `reducer`는 컴포넌트에 의존하지 않는 순수 함수로, `reducer`를 독립적으로 테스트할 수 있다.
> - useState, useReducer 혼합해서 사용하는 것도 괜찮다.
> - useImmerReducer를 사용해 reducer를 더 간결하게 사용할 수도 있다.

<br/>

> 🔴 Reducer 함수 작성할 때 주의할 점
>
> - **Reducer는 반드시 순수해야 한다.**
>   - 네트워크 요청, 스케쥴링, 사이드 이펙트를 수행해서는 안된다
>   - 객체와 배열을 변경하지 않고 업데이트해야 한다
> - 각 `action`은 데이터 안에서 여러 변경들이 있더라도 **하나의 사용자 상호작용을 설명해야 한다** - ex) 5개의 필드가 있는 폼에서 재설정을 클릭할 때, 5개의 개별 action(`set_field`)이 아닌 **하나의 action(`reset_form` )**을 전송하는 것이 좋다

---

### 🚩 챌린지 - message 전송 시, input 입력 값 지우기

[`문제`] 전송 버튼을 클릭했을 때 ‘이메일 + 메시지’를 담은 alert를 띄우고 input창 초기화하기

[`문제풀이`] `onClick` 이벤트 핸들러 안에서 `alert()` 호출 후 `dispatch`로 메시지 초기화. `reducer` 함수는 순수해야하기 때문에 `reducer` 함수 안에서 사이드 이펙트를 일으키는 alert를 작성하지 않도록 주의해야 한다

```jsx
<Button
  onClick={() => {
    // alert는 이벤트 핸들러에서 처리
    alert(contact.email + ' ' + message)
    dispatch({
      type: 'edited_message',
      message: '',
    })
  }}
>
  Send to {contact.email}
</Button>
```

[✨`더 좋은 코드`] 리듀서에 `sent_message` 액션 타입 추가

사용자 관점에서 봤을 때 ‘**message를 전송하는** 것’과 ‘**Input 필드에 텍스트를 입력하는 것**’은 다른 행위이기 때문에 이를 구분해서 `sent_message`라는 액션 타입을 별도로 만들어주는 것이 **‘사용자가 무엇을 했는지’** 명확하게 설명할 수 있다.

```jsx
export function messengerReducer(state: MessengerState, action: MessengerAction) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
        message: '',
      }
    }
    case 'edited_message': {
      return {
        ...state,
        message: action.message,
      }
    }
    // 'sent_message' action 타입 추가
    case 'sent_message': {
      return {
        ...state,
        message: '',
      }
    }
    default: {
      const _exhaustiveCheck: never = action
      throw Error('Unknown action')
    }
  }
}
```

```jsx
<Button
  onClick={() => {
    alert(contact.email + ' ' + message)
    dispatch({
      type: 'sent_message',
    })
  }}
/>
```
