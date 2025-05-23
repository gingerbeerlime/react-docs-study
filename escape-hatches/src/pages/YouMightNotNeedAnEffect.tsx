import CacheACalculationWithoutEffects from '@/components/YouMightNotNeedAnEffect/CacheACalculationWithoutEffects'
// import ResetStateWithoutEffects from '@/components/YouMightNotNeedAnEffect/ResetStateWithoutEffects'
import SubmitFormWithoutEffects from '@/components/YouMightNotNeedAnEffect/SubmitFormWithoutEffects'
import TransformDataWithoutEffects from '@/components/YouMightNotNeedAnEffect/TransformDataWithoutEffects'

const YouMightNotNeedAnEffect = () => {
  return (
    <div>
      <TransformDataWithoutEffects />
      <hr className='my-4' />
      <CacheACalculationWithoutEffects />
      {/* <ResetStateWithoutEffects /> */}
      <hr className='my-4' />
      <SubmitFormWithoutEffects />
    </div>
  )
}

export default YouMightNotNeedAnEffect
