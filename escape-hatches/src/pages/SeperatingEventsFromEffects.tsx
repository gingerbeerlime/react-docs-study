import FixAVariableThatDoesntUpdate from '@/components/SeperatingEventsFromEffects/01-FixAVariableThatDoesntUpdate'
// import FixAFreezingCounter from '@/components/SeperatingEventsFromEffects/02-FixAFreezingCounter'
// import FixANonAdjustableDelay from '@/components/SeperatingEventsFromEffects/03-FixANonAdjustableDelay'
// import FixADelayedNotifications from '@/components/SeperatingEventsFromEffects/04-FixADelayedNotifications'

const SeperatingEventsFromEffects = () => {
  return (
    <div>
      <FixAVariableThatDoesntUpdate />
      <hr className='my-4' />
      {/* <FixAFreezingCounter /> */}
      <hr className='my-4' />
      {/* <FixANonAdjustableDelay /> */}
      <hr className='my-4' />
      {/* <FixADelayedNotifications /> */}
    </div>
  )
}

export default SeperatingEventsFromEffects
