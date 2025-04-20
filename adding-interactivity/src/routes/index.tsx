import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import NotFound from '../pages/NotFound'
import Home from '../pages/home/Home'
import RespondingToEvents from '../pages/responding-to-events'
import StateAComponentsMemory from '../pages/state-a-components-memory'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/responding-to-events',
        element: <RespondingToEvents />,
      },
      {
        path: '/state-a-components-memory',
        element: <StateAComponentsMemory />,
      },
    ],
  },
])
