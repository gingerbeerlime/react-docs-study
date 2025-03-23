import type { Inventory } from '@/types/inventory'

interface StockCountProps {
  stock: number
  unit: Inventory['unit']
}

const StockCount: React.FC<StockCountProps> = ({ stock, unit }) => {
  return (
    <>
      {stock}
      {unit === 'amount' ? '개' : unit}
    </>
  )
}

export default StockCount
