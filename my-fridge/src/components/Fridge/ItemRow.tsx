import { TableCell, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Pen, CircleCheckBig } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Inventory } from '@/types/inventory'
import { useState, useEffect } from 'react'

interface ItemRowProps {
  id: number
  name: string
  stock: number
  unit: Inventory['unit']
  editMode: boolean
  onEditClick: (id: number) => void
  onSaveClick: (updatedItem: { id: number; stock: number; unit: Inventory['unit'] }) => void
}

interface StockCountProps {
  stock: number
  unit: Inventory['unit']
}

interface StockCountEditFormProps {
  stock: number
  unit: Inventory['unit']
  onStockCountChanged: (value: number) => void
  onStockUnitChanged: (value: Inventory['unit']) => void
}

// 파일 분리하기
const StockCount: React.FC<StockCountProps> = ({ stock, unit }) => {
  return (
    <>
      {stock}
      {unit === 'amount' ? '개' : unit}
    </>
  )
}

const StockCountEditForm: React.FC<StockCountEditFormProps> = ({
  stock,
  unit,
  onStockCountChanged,
  onStockUnitChanged,
}) => {
  return (
    <div className='flex'>
      <Input
        type='text'
        placeholder='재고를 입력하세요'
        value={stock}
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

const ItemRow: React.FC<ItemRowProps> = ({
  id,
  name,
  stock,
  unit,
  editMode,
  onEditClick,
  onSaveClick,
}) => {
  const [stockCount, setStockCount] = useState(0)
  const [stockUnit, setStockUnit] = useState<Inventory['unit']>('amount')

  useEffect(() => {
    setStockCount(stock)
    setStockUnit(unit)
    // + 취소될 때 원래 값으로 돌리기
    // 의존성 배열에 editMode 넣어야하나,,
  }, [editMode, stock, unit])

  const handleClickSave = () => {
    onSaveClick({ id, stock: stockCount, unit: stockUnit })
  }

  return (
    <TableRow>
      <TableCell className='w-3/10'>{name}</TableCell>
      <TableCell className='w-4/10'>
        {editMode ? (
          <StockCountEditForm
            stock={stockCount}
            unit={stockUnit}
            onStockCountChanged={setStockCount}
            onStockUnitChanged={setStockUnit}
          />
        ) : (
          <StockCount stock={stock} unit={unit} />
        )}
      </TableCell>
      <TableCell className='w-2/10 text-center align-middle'>{stock < 3 && '❗️'}</TableCell>
      <TableCell className='w-1/10'>
        {editMode ? (
          <CircleCheckBig
            size={14}
            color='#3e9392'
            className='cursor-pointer'
            onClick={handleClickSave}
          />
        ) : (
          <Pen size={14} className='cursor-pointer' onClick={() => onEditClick(id)} />
        )}
      </TableCell>
    </TableRow>
  )
}

export default ItemRow
