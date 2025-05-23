import { createBrowserRouter } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Home from '../pages/Home'
import ReferencingValuesWithRefs from '@/pages/ReferencingValuesWithRefs'
import ManipulatingTheDomWithRefs from '@/pages/ManipulatingTheDomWithRefs'
import SynchronizingWithEffects from '@/pages/SynchronizingWithEffects'
import YouMightNotNeedAnEffect from '@/pages/YouMightNotNeedAnEffect'
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
    path: '/referencing-values-with-refs',
    element: <ReferencingValuesWithRefs />,
  },
  {
    path: '/manipulating-the-dom-with-refs',
    element: <ManipulatingTheDomWithRefs />,
  },
  {
    path: '/synchronizing-with-effects',
    element: <SynchronizingWithEffects />,
  },
  {
    path: '/you-might-not-need-an-effect',
    element: <YouMightNotNeedAnEffect />,
  },
])
