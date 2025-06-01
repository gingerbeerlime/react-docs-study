import FixReconnectingOnEveryKeystroke from '@/components/LifecycleOfReactiveEffect/FixReconnectingOnEveryKeystroke'
import SwitchStnchronizationOnAndOff from '@/components/LifecycleOfReactiveEffect/SwitchStnchronizationOnAndOff'
import InvestigateAStaleValueBug from '@/components/LifecycleOfReactiveEffect/InvestigateAStaleValueBug'
import FixAConnectionSwitch from '@/components/LifecycleOfReactiveEffect/FixAConnectionSwitch'

const LifecycleOfReactiveEffect = () => {
  return (
    <>
      <FixReconnectingOnEveryKeystroke />
      <hr className='my-4' />
      <SwitchStnchronizationOnAndOff />
      <hr className='my-4' />
      <InvestigateAStaleValueBug />
      <hr className='my-4' />
      <FixAConnectionSwitch />
    </>
  )
}

export default LifecycleOfReactiveEffect
