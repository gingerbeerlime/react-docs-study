import FocusingATextInput from '@/components/ManipulatingTheDomWithRefs/FocusingATextInput'
import ScrollingToAnElement from '@/components/ManipulatingTheDomWithRefs/ScrollingToAnElement'
import RefCallback from '@/components/ManipulatingTheDomWithRefs/RefCallback'
import UseFlushSync from '@/components/ManipulatingTheDomWithRefs/UseFlushSync'
import UseForwardRef from '@/components/ManipulatingTheDomWithRefs/UseForwardRef'
import PlayAndPauseTheVideo from '@/components/ManipulatingTheDomWithRefs/PlayAndPauseTheVideo'
import FocusTheSearchField from '@/components/ManipulatingTheDomWithRefs/FocusTheSearchField'
import ScrollingAnImageCarousel from '@/components/ManipulatingTheDomWithRefs/ScrollingAnImageCarousel'
import FocusTheSearchFieldWithSeperateComponents from '@/components/ManipulatingTheDomWithRefs/FocusTheSearchFieldWithSeperateComponents'

const ManipulatingTheDomWithRefs = () => {
  return (
    <div>
      <FocusingATextInput />
      <hr className='my-4' />
      <ScrollingToAnElement />
      <hr className='my-4' />
      <RefCallback />
      <hr className='my-4' />
      <UseFlushSync />
      <hr className='my-4' />
      <UseForwardRef />
      <hr className='my-4' />
      <PlayAndPauseTheVideo />
      <hr className='my-4' />
      <FocusTheSearchField />
      <hr className='my-4' />
      <ScrollingAnImageCarousel />
      <hr className='my-4' />
      <FocusTheSearchFieldWithSeperateComponents />
    </div>
  )
}

export default ManipulatingTheDomWithRefs
