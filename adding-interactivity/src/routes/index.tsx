import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import NotFound from '../pages/NotFound'
import Home from '../pages/home/Home'
import RespondingToEvents from '../pages/responding-to-events'

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
    ],
  },
])
