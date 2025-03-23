import { Pen } from 'lucide-react'

interface EditButtonProps {
  color: string
  size: number
  onEditClick: (e: React.MouseEvent<SVGSVGElement>) => void
}

const EditButton: React.FC<EditButtonProps> = ({ color, size, onEditClick }) => {
  return <Pen size={size} color={color} className='cursor-pointer' onClick={onEditClick} />
}

export default EditButton
