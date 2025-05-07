import Accordion from '@/components/sharing-state-between-components/Accordion'
import SyncedInputs from '@/components/sharing-state-between-components/SyncedInputs'
import FilterableList from '@/components/sharing-state-between-components/FilterableList'

const SharingStateBetweenComponents = () => {
  return (
    <>
      <Accordion />
      <hr className='my-5' />
      <SyncedInputs />
      <hr className='my-5' />
      <FilterableList />
    </>
  )
}

export default SharingStateBetweenComponents
