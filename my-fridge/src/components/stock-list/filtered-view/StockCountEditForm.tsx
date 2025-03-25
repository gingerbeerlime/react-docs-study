import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import type { Inventory } from '@/types/inventory'

interface StockCountEditFormProps {
  quantity: number
  unit: Inventory['unit']
  onStockCountChanged: (value: number) => void
  onStockUnitChanged: (value: Inventory['unit']) => void
}

const StockCountEditForm: React.FC<StockCountEditFormProps> = ({
  quantity,
  unit,
  onStockCountChanged,
  onStockUnitChanged,
}) => {
  return (
    <div className='flex'>
      <Input
        type='text'
        placeholder='재고를 입력하세요'
        value={quantity}
        className='mr-1'
        onChange={(e) => onStockCountChanged(Number(e.target.value))}
      />
      <Select value={unit} onValueChange={onStockUnitChanged}>
        <SelectTrigger className='w-[80px]'>
          <SelectValue placeholder='단위' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='amount'>개</SelectItem>
            <SelectItem value='kg'>kg</SelectItem>
            <SelectItem value='g'>g</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default StockCountEditForm
