import type { Inventory } from '@/types/inventory'

interface StockCountProps {
  quantity: number
  unit: Inventory['unit']
}

const StockCount: React.FC<StockCountProps> = ({ quantity, unit }) => {
  return (
    <>
      {quantity}
      {unit === 'amount' ? '개' : unit}
    </>
  )
}

export default StockCount
