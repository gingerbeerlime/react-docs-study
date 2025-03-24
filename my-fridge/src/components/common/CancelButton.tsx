import { CircleX } from 'lucide-react'

interface CancelButtonProps {
  color: string
  size: number
  onCancelClick: (e: React.MouseEvent<SVGSVGElement>) => void
}

const CancelButton: React.FC<CancelButtonProps> = ({ color, size, onCancelClick }) => {
  return <CircleX size={size} color={color} className='cursor-pointer' onClick={onCancelClick} />
}

export default CancelButton
