import React, { createContext, useReducer, useContext } from 'react'
import { TaskType, TaskAction } from '../types'

export const TasksContext = createContext<TaskType[]>([])
export const TasksDispatchContext = createContext<React.Dispatch<TaskAction>>(() => {})

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks)

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>{children}</TasksDispatchContext.Provider>
    </TasksContext.Provider>
  )
}

export function useTasks(): TaskType[] {
  const context = useContext(TasksContext)
  if (context === null) {
    throw new Error('useTasks must be used within a TasksProvider')
  }
  return context
}

export function useTasksDispatch(): React.Dispatch<TaskAction> {
  const context = useContext(TasksDispatchContext)
  if (context === null) {
    throw new Error('useTasksDispatch must be used within a TasksProvider')
  }
  return context
}

function tasksReducer(tasks: TaskType[], action: TaskAction) {
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
      const _exhaustiveCheck: never = action
      throw Error('Unknown action: ' + (action as unknown as { type: string }).type)
    }
  }
}

const initialTasks: TaskType[] = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false },
]
