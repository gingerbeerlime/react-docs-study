import TravelPlan from '@/components/choosing-the-state-structure/TravelPlan'
// import TravelPlanUseImmer from '@/components/choosing-the-state-structure/TravelPlanUseImmer'
import MailClient from '@/components/choosing-the-state-structure/MailClient'

const ChoosingTheStateStructure = () => {
  return (
    <>
      <TravelPlan />
      <hr className='my-5' />
      <MailClient />
    </>
  )
}

export default ChoosingTheStateStructure
