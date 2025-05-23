import { useState } from 'react'
import { initialTodos, createTodo } from '@/utils/todos'
import type { TodoType } from '@/types'
interface TodoProps {
  onAdd: (todo: TodoType) => void
}
import { Button, Input } from '@/components/common'

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos)
  const [showActive, setShowActive] = useState(false)

  const activeTodos = todos.filter((todo) => !todo.completed)
  const visibleTodos = showActive ? activeTodos : todos

  return (
    <div>
      <label>
        <Input
          type='checkbox'
          checked={showActive}
          onChange={(e) => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <NewTodo onAdd={(newTodo: TodoType) => setTodos([...todos, newTodo])} />
      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id}>{todo.completed ? <s>{todo.text}</s> : todo.text}</li>
        ))}
      </ul>
      <p>{activeTodos.length} todos left</p>
    </div>
  )
}

function NewTodo({ onAdd }: TodoProps) {
  const [text, setText] = useState('')

  function handleAddClick() {
    setText('')
    onAdd(createTodo(text))
  }

  return (
    <>
      <Input value={text} onChange={(e) => setText(e.target.value)} />
      <Button onClick={handleAddClick}>Add</Button>
    </>
  )
}
