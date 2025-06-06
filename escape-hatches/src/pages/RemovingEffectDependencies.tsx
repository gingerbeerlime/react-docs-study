import FixAResettingInterval from '@/components/RemovingEffectDependencies/01-FixAResettingInterval'
import FixARetriggeringAnimation from '@/components/RemovingEffectDependencies/02-FixARetriggeringAnimation'
// import FixAReconnectingChat from '@/components/RemovingEffectDependencies/03-FixAReconnectingChat'
// import FixAReconnectingChatAgain from '@/components/RemovingEffectDependencies/04-FixAReconnectingChatAgain'

const RemovingEffectDependencies = () => {
  return (
    <div>
      <FixAResettingInterval />
      <FixARetriggeringAnimation />
      {/* <FixAReconnectingChat /> */}
      {/* <FixAReconnectingChatAgain /> */}
    </div>
  )
}

export default RemovingEffectDependencies
