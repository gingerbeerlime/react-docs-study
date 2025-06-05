import { createBrowserRouter } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Home from '../pages/Home'
import ReferencingValuesWithRefs from '@/pages/ReferencingValuesWithRefs'
import ManipulatingTheDomWithRefs from '@/pages/ManipulatingTheDomWithRefs'
import SynchronizingWithEffects from '@/pages/SynchronizingWithEffects'
import YouMightNotNeedAnEffect from '@/pages/YouMightNotNeedAnEffect'
import LifecycleOfReactiveEffect from '@/pages/LifecycleOfReactiveEffect'
import SeperatingEventsFromEffects from '@/pages/SeperatingEventsFromEffects'
import RemovingEffectDependencies from '@/pages/RemovingEffectDependencies'
import ReusingLogicWithCustomHooks from '@/pages/ReusingLogicWithCustomHooks'

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
  {
    path: '/lifecycle-of-reactive-effect',
    element: <LifecycleOfReactiveEffect />,
  },
  {
    path: '/seperating-events-from-effects',
    element: <SeperatingEventsFromEffects />,
  },
  {
    path: '/removing-effect-dependencies',
    element: <RemovingEffectDependencies />,
  },
  {
    path: '/reusing-logic-with-custom-hooks',
    element: <ReusingLogicWithCustomHooks />,
  },
])
