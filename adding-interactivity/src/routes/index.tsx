import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import NotFound from '../pages/NotFound'
import Home from '../pages/home/Home'
import RespondingToEvents from '../pages/responding-to-events'
import StateAComponentsMemory from '../pages/state-a-components-memory'
import StateAsSnapShot from '../pages/state-as-a-snapshot'
import StateUpdateQueue from '../pages/queueing-a-series-of-stat-updates'
import UpdatingObjectsInState from '../pages/updating-objects-in-state'
import UpdatingArrayInState from '../pages/updating-array-in-state'

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
      {
        path: '/state-as-a-snapshot',
        element: <StateAsSnapShot />,
      },
      {
        path: '/queueing-a-series-of-state-updates',
        element: <StateUpdateQueue />,
      },
      {
        path: '/updating-objects-in-state',
        element: <UpdatingObjectsInState />,
      },
      {
        path: '/updating-array-in-state',
        element: <UpdatingArrayInState />,
      },
    ],
  },
])
