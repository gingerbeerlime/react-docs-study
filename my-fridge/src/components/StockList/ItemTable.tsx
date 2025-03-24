import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Inventory, UpdatedStockParams } from '@/types/inventory'
import ItemRow from './ItemRow'
import EmptyRow from './EmptyRow'
import { useState } from 'react'

interface StockTableProps {
  category: Inventory['category']
  filteredItems: Inventory[]
  onUpdateStockCount: ({ id, stock, unit }: UpdatedStockParams) => void
}

const ItemTable: React.FC<StockTableProps> = ({ category, filteredItems, onUpdateStockCount }) => {
  const itemList: Inventory[] = filteredItems.filter((item) => item.category === category)

  const [editItem, setEditItem] = useState<number | null>(null)

  return (
    <Table className='table-fixed w-full'>
      <TableHeader>
        <TableRow>
          <TableHead className='w-2/10'>이름</TableHead>
          <TableHead className='w-4/10'>재고</TableHead>
          <TableHead className='w-2/10 text-center'>재고부족</TableHead>
          <TableHead className='w-2/10'></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {itemList.length > 0 ? (
          itemList.map((item) => (
            <ItemRow
              key={item.id}
              {...item}
              editMode={editItem === item.id}
              onEditClick={setEditItem}
              onSaveClick={onUpdateStockCount}
              onCancelClick={() => setEditItem(null)}
            />
          ))
        ) : (
          <EmptyRow />
        )}
      </TableBody>
    </Table>
  )
}

export default ItemTable
