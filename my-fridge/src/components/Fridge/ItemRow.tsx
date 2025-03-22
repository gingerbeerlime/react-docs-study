import { TableCell, TableRow } from '@/components/ui/table'
import type { Inventory } from '@/types/inventory'

interface ItemRowProps {
  name: string
  stock: number
  unit: Inventory['unit']
}

const ItemRow: React.FC<ItemRowProps> = ({ name, stock, unit }) => {
  return (
    <TableRow>
      <TableCell className='w-5/10'>{name}</TableCell>
      <TableCell className='w-3/10'>
        {stock}
        {unit === 'amount' ? '개' : unit}
      </TableCell>
      <TableCell className='w-2/10 text-center align-middle'>{stock < 3 && '‼'}</TableCell>
    </TableRow>
  )
}

export default ItemRow
