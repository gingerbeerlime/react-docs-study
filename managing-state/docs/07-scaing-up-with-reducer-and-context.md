## Reducer와 Context로 앱 확장하기

### Reducer와 Context를 함께 사용하면 좋은 경우

1. **상태와 상태 변경 로직을 여러 컴포넌트에서 공유해야 할 때**
   1. 여러 레벨을 거쳐서 여러 컴포넌트가 상태를 읽거나 변경시켜야할 때 → `props drilling`을 피하기 위해 `context` 활용
2. **전역처럼 동작하는 상태가 필요할 때**
   1. 로그인 정보, 테마 설정, 장바구니 등 앱 전역에서 접근이 필요할 때
3. **상태 변경 로직과 데이터를 함께 추상화해서 재사용하고 싶을 때**
   1. 상태를 어떻게 바꾸는지(`dispatch`)와 현재 상태(`state`)를 함께 `context`로 추출하면, 다른 UI 계층에서도 같은 방식으로 쉽게 접근 가능

### Context와 Reducer 결합하기

1. Context 생성하기
2. State와 Dispatch 함수를 context에 넣기
3. 트리 안에서 context 사용하기

#### (1) Context 생성

```jsx
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)
```

- useReducer 훅은 **현재 상태인 `tasks`**와 **업데이트 함수 `dispatch` 함수**를 2가지를 반환
  ⇒ tasks, dispatch **각각의 context를 생성**해야 함

  ```jsx
  import { createContext } from 'react'

  // 기본값은 null로 설정
  export const TasksContext = createContext(null)
  export const TasksDispatchContext = createContext(null)
  ```

#### (2) State와 Dispatch 함수를 context에 넣기

```jsx
import { TasksContext, TasksDispatchContext } from './TasksContext.js'

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)
  // ...
  return (
    // state값 context 제공
    <TasksContext.Provider value={tasks}>
      // dispatch 함수 context 제공
      <TasksDispatchContext.Provider value={dispatch}>...</TasksDispatchContext.Provider>
    </TasksContext.Provider>
  )
}
```

#### (3) 트리 안에서 context 사용하기

```jsx
return (
  <TasksContext.Provider value={tasks}>
    <TasksDispatchContext.Provider value={dispatch}>
      <h1>Day off in Kyoto</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask} />
    </TasksDispatchContext.Provider>
  </TasksContext.Provider>
)
```

🔽 더 이상 props로 전달하지 않음

```jsx
return (
  <TasksContext.Provider value={tasks}>
    <TasksDispatchContext.Provider value={dispatch}>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksDispatchContext.Provider>
  </TasksContext.Provider>
)
```

- tasks `state` 읽어오기

```jsx
export default function TaskList() {
  const tasks = useContext(TasksContext)
}
```

- `dispatch` 함수 사용하기

```jsx
export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksDispatchContext);
  // ...
  return (
    // ...
    <button onClick={() => {
      setText('');
      dispatch({
        type: 'added',
        id: nextId++,
        text: text,
      });
    }}>Add</button>
    // ...
```

### Context와 Reducer를 하나의 파일로 관리하기

1. reducer로 state를 관리하고
2. 두 context를 하위 컴포넌트에 제공
3. children prop으로 하위 트리를 전달

```jsx
import { createContext, useContext, useReducer } from 'react'

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

// 필요에 따라 context를 사용하기 위한 use함수(사용자 정의 Hook) 추가
export function useTasks() {
 return useContext(TasksContext);
}
export function useTasksDispatch() {
 return useContext(TasksDispatchContext);
}

export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

function tasksReducer(tasks, action) {
 ...
}

const initialTasks = [...];
```

- 컴포넌트에서 `TasksProvider` 사용

```jsx
import AddTask from './AddTask.js'
import TaskList from './TaskList.js'
import { TasksProvider } from './TasksContext.js'

export default function TaskApp() {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  )
}
```

- 컴포넌트에서 `state`, `dispatch` 사용

```jsx
import { useTasks, useTasksDispatch } from './TasksContext.js'

const tasks = useTasks()
const dispatch = useTasksDispatch()
```
