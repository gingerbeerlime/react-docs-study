import type { Inventory, UpdatedStockParams } from '@/types/inventory'
import { getLabel } from '@/utils/getIcon'
import ItemTable from './ItemTable'
import { useState } from 'react'

interface StockListProps {
  fridgeItems: Inventory[]
  filterText: string
  inStockOnly: boolean
}

const StockList: React.FC<StockListProps> = ({ fridgeItems, filterText, inStockOnly }) => {
  const [stockList, setStockList] = useState([...fridgeItems])

  let filteredItems: Inventory[] = [...stockList]
  if (filterText !== '') {
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()),
    )
  }
  if (inStockOnly) {
    filteredItems = filteredItems.filter((item) => item.stock > 0)
  }

  const handleUpdateStockCount = ({ id, stock, unit }: UpdatedStockParams) => {
    setStockList((prevList) => {
      const nextList = prevList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            stock: stock,
            unit: unit,
          }
        } else {
          return item
        }
      })
      return nextList
    })
  }

  const categories: Inventory['category'][] = [...new Set(fridgeItems.map((item) => item.category))]

  return (
    <>
      {categories.map((category) => (
        <div key={category}>
          <div className='text-center font-bold mt-3 py-2 bg-neutral-100'>{getLabel(category)}</div>
          <ItemTable
            category={category}
            filteredItems={filteredItems}
            onUpdateStockCount={handleUpdateStockCount}
          />
        </div>
      ))}
    </>
  )
}

export default StockList
