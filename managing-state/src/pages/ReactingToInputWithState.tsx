import CityQuiz from '@/components/reacting-to-input-with-state/CityQuiz'
import Picture from '@/components/reacting-to-input-with-state/Picture'
import EditProfile from '@/components/reacting-to-input-with-state/EditProfile'

const ReactingToInputWithState = () => {
  return (
    <>
      <CityQuiz />
      <hr className='my-5' />
      <Picture />
      <hr className='my-5' />
      <EditProfile />
    </>
  )
}

export default ReactingToInputWithState
