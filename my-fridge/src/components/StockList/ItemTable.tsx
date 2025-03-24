import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Inventory } from '@/types/inventory'
import ItemRow from './ItemRow'
import EmptyRow from './EmptyRow'
import { useState } from 'react'

interface StockTableProps {
  category: Inventory['category']
  filteredItems: Inventory[]
}

const ItemTable: React.FC<StockTableProps> = ({ category, filteredItems }) => {
  const itemList: Inventory[] = filteredItems.filter((item) => item.category === category)

  const [editItem, setEditItem] = useState<number | null>(null)

  const onStockUpdate = (updatedItem: { id: number; stock: number; unit: Inventory['unit'] }) => {
    console.log('update!', updatedItem.id, updatedItem.stock, updatedItem.unit)
  }

  return (
    <Table className='table-fixed w-full'>
      <TableHeader>
        <TableRow>
          <TableHead className='w-3/10'>이름</TableHead>
          <TableHead className='w-4/10'>재고</TableHead>
          <TableHead className='w-2/10 text-center'>재고부족</TableHead>
          <TableHead className='w-1/10'></TableHead>
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
              onSaveClick={onStockUpdate}
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
