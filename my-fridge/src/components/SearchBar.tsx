import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

const SearchBar = () => {
  return (
    <div>
      <Input type='text' placeholder='재료를 검색하세요' />
      <div className='mt-2'>
        <Checkbox id='showOnlyAvailable' />
        <label htmlFor='showOnlyAvailable' className='text-sm font-medium ml-1'>
          재고가 있는 것만 보기
        </label>
      </div>
    </div>
  )
}

export default SearchBar
