import { useState, useRef } from 'react'
import { Button, Input } from '@/components/common'
import { flushSync } from 'react-dom'

interface Todo {
  id: number
  text: string
}

export default function TodoList() {
  const listRef = useRef<HTMLUListElement>(null)
  const [text, setText] = useState('')
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  function handleAdd() {
    const newTodo = { id: nextId++, text: text }
    flushSync(() => {
      setText('')
      setTodos([...todos, newTodo])
    })
    const lastElement = listRef.current?.lastChild as HTMLElement
    lastElement?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }

  return (
    <>
      <Button onClick={handleAdd}>Add</Button>
      <Input value={text} onChange={(e) => setText(e.target.value)} />
      <ul ref={listRef}>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  )
}

let nextId = 0
let initialTodos: Todo[] = []
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: 'Todo #' + (i + 1),
  })
}
