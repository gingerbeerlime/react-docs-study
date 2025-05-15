import { createBrowserRouter } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Home from '../pages/Home'
import ReactingToInputWithState from '@/pages/ReactingToInputWithState'
import ChoosingTheStateStructure from '@/pages/ChoosingTheStateStructure'
import SharingStateBetweenComponents from '@/pages/SharingStateBetweenComponents'
import PreservingAndResettingState from '@/pages/PreservingAndResettingState'
import ExtractingStateLogicIntoAReducer from '@/pages/ExtractingStateLogicIntoAReducer'
import PassingDataDeeplyWithContext from '@/pages/PassingDataDeeplyWithContext'
import ScalingUpWithReducerAndContext from '@/pages/ScalingUpWithReducerAndContext'

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
  {
    path: '/preserving-and-resetting-state',
    element: <PreservingAndResettingState />,
  },
  {
    path: '/extracting-state-logic-into-a-reducer',
    element: <ExtractingStateLogicIntoAReducer />,
  },
  {
    path: '/passing-data-deeply-with-context',
    element: <PassingDataDeeplyWithContext />,
  },
  {
    path: '/scaling-up-with-reducer-and-context',
    element: <ScalingUpWithReducerAndContext />,
  },
])
