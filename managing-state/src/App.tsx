// import { Button } from '@/components/ui/button'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <div className='flex flex-col items-center justify-center min-h-svh'>
        <Button>Click me</Button>
      </div> */}
    </>
  )
}

export default App
