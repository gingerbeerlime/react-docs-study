import Counter from '@/components/ReferencingValuesWithRefs/Counter'
import Stopwatch from '@/components/ReferencingValuesWithRefs/Stopwatch'
import FixABrokenChatInput from '@/components/ReferencingValuesWithRefs/FixABrokenChatInput'
import FixAComponentFailingToRenderer from '@/components/ReferencingValuesWithRefs/FixAComponentFailingToRerender'
import FixDebouncing from '@/components/ReferencingValuesWithRefs/FixDebouncing'
import ReadTheLatestState from '@/components/ReferencingValuesWithRefs/ReadTheLatestState'

const ReferencingValuesWithRefs = () => {
  return (
    <div>
      <Counter />
      <hr className='my-4' />
      <Stopwatch />
      <hr className='my-4' />
      <FixABrokenChatInput />
      <hr className='my-4' />
      <FixAComponentFailingToRenderer />
      <hr className='my-4' />
      <FixDebouncing />
      <hr className='my-4' />
      <ReadTheLatestState />
    </div>
  )
}

export default ReferencingValuesWithRefs
