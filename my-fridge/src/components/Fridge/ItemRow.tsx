import { TableCell, TableRow } from '@/components/ui/table'
import type { Inventory } from '@/types/inventory'
import { useState, useEffect } from 'react'
import StockCountEditForm from './StockCountEditForm'
import StockCountReadForm from './StockCountReadForm'
import SaveButton from '@/components/common/SaveButton'
import EditButton from '@/components/common/EditButton'

interface ItemRowProps {
  id: number
  name: string
  stock: number
  unit: Inventory['unit']
  editMode: boolean
  onEditClick: (id: number) => void
  onSaveClick: (updatedItem: { id: number; stock: number; unit: Inventory['unit'] }) => void
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

  const handleClickEdit = () => {
    onEditClick(id)
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
          <StockCountReadForm stock={stock} unit={unit} />
        )}
      </TableCell>
      <TableCell className='w-2/10 text-center align-middle'>{stock < 3 && '❗️'}</TableCell>
      <TableCell className='w-1/10'>
        {editMode ? (
          <SaveButton size={14} color='#3e9392' onSaveClick={handleClickSave} />
        ) : (
          <EditButton size={14} color='#000000' onEditClick={handleClickEdit} />
        )}
      </TableCell>
    </TableRow>
  )
}

export default ItemRow
