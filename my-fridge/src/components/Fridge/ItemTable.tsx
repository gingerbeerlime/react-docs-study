import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import type { Inventory } from '@/types/inventory'
import ItemRow from './ItemRow'

interface StockTableProps {
  category: Inventory['category']
  filteredItems: Inventory[]
}

const EmptyRow = () => {
  return (
    <TableRow>
      <TableCell colSpan={4} className='text-center'>
        해당하는 항목이 없습니다
      </TableCell>
    </TableRow>
  )
}

const ItemTable: React.FC<StockTableProps> = ({ category, filteredItems }) => {
  const itemList: Inventory[] = filteredItems.filter((item) => item.category === category)

  return (
    <Table className='table-fixed w-full'>
      <TableHeader>
        <TableRow>
          <TableHead className='w-5/10'>이름</TableHead>
          <TableHead className='w-3/10'>재고</TableHead>
          <TableHead className='w-2/10 text-center'>재고부족</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {itemList.length > 0 ? (
          itemList.map((item) => <ItemRow key={item.id} {...item} />)
        ) : (
          <EmptyRow />
        )}
      </TableBody>
    </Table>
  )
}

export default ItemTable
