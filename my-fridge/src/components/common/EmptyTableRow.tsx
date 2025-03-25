import { TableCell, TableRow } from '../ui/table'

const EmptyRow = ({ colSpan }: { colSpan: number }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className='text-center'>
        해당하는 항목이 없습니다
      </TableCell>
    </TableRow>
  )
}

export default EmptyRow
