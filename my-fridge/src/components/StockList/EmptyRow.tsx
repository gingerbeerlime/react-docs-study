import { TableCell, TableRow } from '../ui/table'

const EmptyRow = () => {
  return (
    <TableRow>
      <TableCell colSpan={4} className='text-center'>
        해당하는 항목이 없습니다
      </TableCell>
    </TableRow>
  )
}

export default EmptyRow
