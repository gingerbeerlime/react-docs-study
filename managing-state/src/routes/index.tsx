import { createBrowserRouter } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Home from '../pages/Home'
import ReactingToInputWithState from '@/pages/ReactingToInputWithState'
import ChoosingTheStateStructure from '@/pages/ChoosingTheStateStructure'
import SharingStateBetweenComponents from '@/pages/SharingStateBetweenComponents'

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
  {
    path: '/choosing-the-state-structure',
    element: <ChoosingTheStateStructure />,
  },
  {
    path: '/sharing-state-between-components',
    element: <SharingStateBetweenComponents />,
  },
])
