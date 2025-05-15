import { useState } from 'react'
import { useTasksDispatch } from '../../context/TaskContext'
import { Button, Input } from '@/components/ui'

const AddTask = () => {
  const [text, setText] = useState('')
  const dispatch = useTasksDispatch()
  if (!dispatch) return null
  return (
    <div className='flex gap-2'>
      <Input placeholder='Add task' value={text} onChange={(e) => setText(e.target.value)} />
      <Button
        onClick={() => {
          setText('')
          dispatch({
            type: 'added',
            id: nextId++,
            text,
          })
        }}
      >
        Add
      </Button>
    </div>
  )
}

let nextId = 3

export default AddTask
