import type { UpdatedInventoryParams } from '@/types/inventory'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import SelectBox from '@/components/common/SelectBox'
import { FRIDGE_ITEMS } from '@/data/fridgeItems'
import CommonDialog from '@/components/common/CommonDialog'
import { CirclePlus } from 'lucide-react'

const selectCategoryOptions = [...new Set(FRIDGE_ITEMS.map((item) => item.category))]
const selectUnitOptions = [...new Set(FRIDGE_ITEMS.map((item) => item.unit))]

interface DialogParams {
  onSave: ({ category, unit, quantity, name }: UpdatedInventoryParams) => void
}

const AddItemDialog: React.FC<DialogParams> = ({ onSave }) => {
  const [item, setItem] = useState<UpdatedInventoryParams>({
    category: 'Vegetables',
    unit: 'amount',
    quantity: 0,
    name: '',
  })

  const { category, unit, quantity, name } = item

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextItem = {
      ...item,
      [e.target.name]: e.target.value,
    }
    setItem(nextItem)
  }

  const onSelectChange = (name: keyof typeof item) => (value: string) => {
    const nextItem = {
      ...item,
      [name]: value,
    }
    setItem(nextItem)
  }

  const onSaveClick = (close: () => void) => {
    onSave(item)
    close()
  }

  return (
    <CommonDialog
      trigger={
        <div className='py-4 flex justify-center'>
          <Button>
            <CirclePlus size={25} />
            추가
          </Button>
        </div>
      }
      title='재료 등록'
      description='새로운 재료를 등록해주세요'
      footer={(close) => (
        <Button type='submit' onClick={() => onSaveClick(close)}>
          등록
        </Button>
      )}
    >
      <div className='grid grid-cols-4 items-center gap-4'>
        <Label htmlFor='name' className='text-right'>
          재료명
        </Label>
        <Input id='name' name='name' value={name} className='col-span-3' onChange={onInputChange} />
      </div>
      <div className='grid grid-cols-4 items-center gap-4'>
        <Label htmlFor='category' className='text-right'>
          카테고리
        </Label>
        <div className='col-span-3'>
          <SelectBox
            value={category}
            options={selectCategoryOptions}
            placeholder={`카테고리`}
            onChange={onSelectChange('category')}
          />
        </div>
      </div>
      <div className='grid grid-cols-4 items-center gap-4'>
        <Label htmlFor='quantity' className='text-right'>
          재고
        </Label>
        <Input
          id='quantity'
          name='quantity'
          value={quantity}
          className='col-span-2'
          onChange={onInputChange}
        />
        <div className='col-span-1'>
          <SelectBox
            value={unit}
            options={selectUnitOptions}
            placeholder={`단위`}
            onChange={onSelectChange('unit')}
          />
        </div>
      </div>
    </CommonDialog>
  )
}

export default AddItemDialog
