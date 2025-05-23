import { useState, useMemo } from 'react'
import { initialTodos, createTodo, getVisibleTodos } from '@/utils/todos'
import { Button, Input } from '@/components/common'

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos)
  const [showActive, setShowActive] = useState(false)
  const [text, setText] = useState('')

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, showActive)
  }, [todos, showActive])

  function handleAddClick() {
    setText('')
    setTodos([...todos, createTodo(text)])
  }

  return (
    <>
      <label>
        <Input
          type='checkbox'
          checked={showActive}
          onChange={(e) => setShowActive(e.target.checked)}
        />
        Show only active todos
      </label>
      <Input value={text} onChange={(e) => setText(e.target.value)} />
      <Button onClick={handleAddClick}>Add</Button>
      <ul>
        {visibleTodos.map((todo) => (
          <li key={todo.id}>{todo.completed ? <s>{todo.text}</s> : todo.text}</li>
        ))}
      </ul>
    </>
  )
}
