import Counter from '../components/ReusingLogicWithCustomHooks/01-ExtractAUseCounterHook'
import Counter2 from '../components/ReusingLogicWithCustomHooks/02-MakeTheCounterDelayConfigurable'
import Counter3 from '../components/ReusingLogicWithCustomHooks/03-ExtractingUseIntervalOutOfUseCounter'
// import Counter4 from '../components/ReusingLogicWithCustomHooks/04-FixAResettingInterval'
import Counter5 from '../components/ReusingLogicWithCustomHooks/05-ImplementAStaggeringMovement'

const ReusingLogicWithCustomHooks = () => {
  return (
    <>
      <Counter />
      <hr className='my-4' />
      <Counter2 />
      <hr className='my-4' />
      <Counter3 />
      <hr className='my-4' />
      {/* <Counter4 /> */}
      <hr className='my-4' />
      <Counter5 />
    </>
  )
}

export default ReusingLogicWithCustomHooks
