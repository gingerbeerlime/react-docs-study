import { createBrowserRouter } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Home from '../pages/Home'

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
])
