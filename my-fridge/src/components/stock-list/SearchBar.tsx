import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

interface SearchBarProps {
  filterText: string
  inStockOnly: boolean
  onFilterTextChange: (text: string) => void
  onInStockOnlyChange: (checked: boolean) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) => {
  return (
    <div>
      <Input
        type='text'
        placeholder='재료를 검색하세요'
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <div className='mt-2'>
        <Checkbox
          id='showOnlyAvailable'
          checked={inStockOnly}
          onCheckedChange={(checked) => onInStockOnlyChange(!!checked)}
        />
        <label htmlFor='showOnlyAvailable' className='text-sm font-medium ml-1'>
          재고가 있는 것만 보기
        </label>
      </div>
    </div>
  )
}

export default SearchBar
