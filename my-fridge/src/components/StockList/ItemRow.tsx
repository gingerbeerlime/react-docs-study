import { TableCell, TableRow } from '@/components/ui/table'
import type { Inventory, UpdatedStockParams } from '@/types/inventory'
import { useState, useEffect } from 'react'
import StockCountEditForm from './StockCountEditForm'
import StockCountReadForm from './StockCountReadForm'
import SaveButton from '@/components/common/SaveButton'
import EditButton from '@/components/common/EditButton'
import CancelButton from '@/components/common/CancelButton'

interface ItemRowProps {
  id: number
  name: string
  stock: number
  unit: Inventory['unit']
  editMode: boolean
  onEditClick: (id: number) => void
  onSaveClick: ({ id, stock, unit }: UpdatedStockParams) => void
  onCancelClick: () => void
}

const ItemRow: React.FC<ItemRowProps> = ({
  id,
  name,
  stock,
  unit,
  editMode,
  onEditClick,
  onSaveClick,
  onCancelClick,
}) => {
  const [stockCount, setStockCount] = useState(0)
  const [stockUnit, setStockUnit] = useState<Inventory['unit']>('amount')

  useEffect(() => {
    setStockCount(stock)
    setStockUnit(unit)
  }, [editMode, stock, unit])

  const handleClickSave = () => {
    onSaveClick({ id, stock: stockCount, unit: stockUnit })
    onCancelClick()
  }

  const handleClickEdit = () => {
    onEditClick(id)
  }

  return (
    <TableRow>
      <TableCell className='w-2/10'>{name}</TableCell>
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
      <TableCell className='w-2/10'>
        {editMode ? (
          <div className='flex justify-end pr-1'>
            <CancelButton size={18} color='#db0404' onCancelClick={onCancelClick} />
            <span className='px-1' />
            <SaveButton size={18} color='#3e9392' onSaveClick={handleClickSave} />
          </div>
        ) : (
          <div className='flex justify-end pr-1'>
            <EditButton size={14} color='#000000' onEditClick={handleClickEdit} />
          </div>
        )}
      </TableCell>
    </TableRow>
  )
}

export default ItemRow
