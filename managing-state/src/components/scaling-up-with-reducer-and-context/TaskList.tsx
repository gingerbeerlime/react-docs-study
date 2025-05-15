import { useState } from 'react'
import { useTasks, useTasksDispatch } from '@/context/TaskContext'
import { TaskType } from '@/types'
import { Button, Input, Label } from '@/components/ui'

const TaskList = () => {
  const tasks = useTasks()
  if (!tasks) return null
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  )
}

const Task = ({ task }: { task: TaskType }) => {
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useTasksDispatch()
  if (!dispatch) return null
  let taskContent
  if (isEditing) {
    taskContent = (
      <div className='flex gap-2'>
        <Input
          value={task.text}
          onChange={(e) => {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value,
              },
            })
          }}
        />
        <Button onClick={() => setIsEditing(false)}>Save</Button>
      </div>
    )
  } else {
    taskContent = (
      <div className='flex gap-2'>
        {task.text}
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
      </div>
    )
  }
  return (
    <Label>
      <Input
        type='checkbox'
        checked={task.done}
        onChange={(e) => {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked,
            },
          })
        }}
      />
      {taskContent}
      <Button
        onClick={() => {
          dispatch({
            type: 'deleted',
            id: task.id,
          })
        }}
      >
        Delete
      </Button>
    </Label>
  )
}

export default TaskList
