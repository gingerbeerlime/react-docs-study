import type { Inventory, UpdatedStockParams, UpdatedInventoryParams } from '@/types/inventory'
import { getLabel_Emoji } from '@/utils/getLabel'
import ItemTable from './ItemTable'
import { useState } from 'react'
import AddItemDialog from './AddItemDialog'

interface StockListProps {
  fridgeItems: Inventory[]
  filterText: string
  inStockOnly: boolean
}

const StockList: React.FC<StockListProps> = ({ fridgeItems, filterText, inStockOnly }) => {
  const [stockList, setStockList] = useState([...fridgeItems])
  const [nextId, setNextId] = useState(Math.max(...fridgeItems.map((item) => Number(item.id))) + 1)

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

  const handleRegisterItem = ({ category, stock, unit, name }: UpdatedInventoryParams) => {
    setStockList((prevList) => {
      const nextItem = {
        id: nextId,
        category: category,
        stock: stock,
        unit: unit,
        name: name,
      }
      return [...prevList, nextItem]
    })
    setNextId(nextId + 1)
  }

  let filteredItems: Inventory[] = [...stockList]
  if (filterText !== '') {
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()),
    )
  }
  if (inStockOnly) {
    filteredItems = filteredItems.filter((item) => item.stock > 0)
  }

  const categories: Inventory['category'][] = [...new Set(fridgeItems.map((item) => item.category))]

  return (
    <>
      {categories.map((category) => (
        <div key={category}>
          <div className='text-center font-bold mt-3 py-2 bg-neutral-100'>
            {getLabel_Emoji(category)}
          </div>
          <ItemTable
            category={category}
            filteredItems={filteredItems}
            onUpdateStockCount={handleUpdateStockCount}
          />
        </div>
      ))}
      <AddItemDialog onSave={handleRegisterItem} />
    </>
  )
}

export default StockList
