import AddTask from './AddTask'
import TaskList from './TaskList'
import { TasksProvider } from '../../context/TaskContext'

const TaskApp = () => {
  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  )
}

export default TaskApp
