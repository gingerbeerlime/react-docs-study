import { CircleCheckBig } from 'lucide-react'

interface SaveButtonProps {
  color: string
  size: number
  onSaveClick: (e: React.MouseEvent<SVGSVGElement>) => void
}

const SaveButton: React.FC<SaveButtonProps> = ({ color, size, onSaveClick }) => {
  return (
    <CircleCheckBig size={size} color={color} className='cursor-pointer' onClick={onSaveClick} />
  )
}

export default SaveButton
