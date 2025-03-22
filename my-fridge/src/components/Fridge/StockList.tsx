import type { Inventory } from '@/types/inventory'
import { getIcon } from '@/utils/getIcon'
import { FRIDGE_ITEMS } from '@/data/fridgeItems'
import ItemTable from './ItemTable'

const StockList: React.FC = () => {
  const categories: Inventory['category'][] = [
    ...new Set(FRIDGE_ITEMS.map((item) => item.category)),
  ]

  return (
    <>
      {categories.map((category) => (
        <>
          <div className='text-center font-bold mt-3 py-2 bg-neutral-100'>
            {getIcon(category)}
            {category}
          </div>
          <ItemTable key={category} category={category} />
        </>
      ))}
    </>
  )
}

export default StockList
