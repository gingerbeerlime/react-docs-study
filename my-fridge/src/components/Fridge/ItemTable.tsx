import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// 목업 데이터 부모에서 state로 관리
import { FRIDGE_ITEMS } from '@/data/fridgeItems'
import type { Inventory } from '@/types/inventory'
import ItemRow from './ItemRow'

interface StockTableProps {
  category: Inventory['category']
}

const ItemTable: React.FC<StockTableProps> = ({ category }) => {
  const itemList: Inventory[] = FRIDGE_ITEMS.filter((item) => item.category === category)

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
        {itemList.map((item) => (
          <ItemRow key={item.id} {...item} />
        ))}
      </TableBody>
    </Table>
  )
}

export default ItemTable
