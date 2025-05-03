import { createBrowserRouter } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Home from '../pages/Home'
import ReactingToInputWithState from '@/pages/ReactingToInputWithState'

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/reacting-to-input-with-state',
    element: <ReactingToInputWithState />,
  },
])
