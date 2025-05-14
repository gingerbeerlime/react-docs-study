import TwoCountersAtDifferentPosition from '@/components/preserving-and-resetting-state/TwoCountersAtDifferentPosition'
import DiffComponentsAtSamePosition from '@/components/preserving-and-resetting-state/DiffCoponentsAtSamePosition'
import Scoreboard from '@/components/preserving-and-resetting-state/Scoreboard'
import FixDisappearingInputText from '@/components/preserving-and-resetting-state/FixDisappearingInputText'
import SwapTwoFormFields from '@/components/preserving-and-resetting-state/SwapTwoFormFields'
import ResetADetailForm from '@/components/preserving-and-resetting-state/ResetADetailForm'
import ClearImageWhileLoading from '@/components/preserving-and-resetting-state/ClearImageWhileLoading'
import FixMisplacedStateInTheList from '@/components/preserving-and-resetting-state/FixMisplacedStateInTheList'
const PreservingAndResettingState = () => {
  return (
    <>
      <TwoCountersAtDifferentPosition />
      <hr className='my-5' />
      <DiffComponentsAtSamePosition />
      <hr className='my-5' />
      <Scoreboard />
      <hr className='my-5' />
      <FixDisappearingInputText />
      <hr className='my-5' />
      <SwapTwoFormFields />
      <hr className='my-5' />
      <ResetADetailForm />
      <hr className='my-5' />
      <ClearImageWhileLoading />
      <hr className='my-5' />
      <FixMisplacedStateInTheList />
    </>
  )
}

export default PreservingAndResettingState
