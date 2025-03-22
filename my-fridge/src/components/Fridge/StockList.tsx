import type { Inventory } from '@/types/inventory'
import { getLabel } from '@/utils/getIcon'
import ItemTable from './ItemTable'

interface StockListProps {
  fridgeItems: Inventory[]
  filterText: string
  inStockOnly: boolean
}

const StockList: React.FC<StockListProps> = ({ fridgeItems, filterText, inStockOnly }) => {
  let filteredItems: Inventory[] = [...fridgeItems]
  if (filterText !== '') {
    filteredItems = fridgeItems.filter((item) => item.name.includes(filterText))
  }
  if (!!inStockOnly) {
    filteredItems = filteredItems.filter((item) => item.stock > 0)
  }

  const categories: Inventory['category'][] = [...new Set(fridgeItems.map((item) => item.category))]

  return (
    <>
      {categories.map((category) => (
        <>
          <div className='text-center font-bold mt-3 py-2 bg-neutral-100'>{getLabel(category)}</div>
          <ItemTable key={category} category={category} filteredItems={filteredItems} />
        </>
      ))}
    </>
  )
}

export default StockList
