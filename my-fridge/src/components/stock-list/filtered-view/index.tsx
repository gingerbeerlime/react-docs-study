import type { Inventory, UpdatedStockParams, UpdatedInventoryParams } from '@/types/inventory'
import { getLabel_Emoji } from '@/utils/getLabel'
import ItemTable from './ItemTable'
import { useState, useRef } from 'react'
import AddItemDialog from '@/components/stock-list/AddItemDialog'

interface StockListProps {
  fridgeItems: Inventory[]
  filterText: string
  inStockOnly: boolean
}

const FilteredView: React.FC<StockListProps> = ({ fridgeItems, filterText, inStockOnly }) => {
  const [stockList, setStockList] = useState([...fridgeItems])
  const nextId = useRef(Math.max(...fridgeItems.map((item) => Number(item.id))) + 1)

  const handleUpdateStock = ({ id, quantity, unit }: UpdatedStockParams) => {
    setStockList((prevList) => {
      const nextList = prevList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: quantity,
            unit: unit,
          }
        } else {
          return item
        }
      })
      return nextList
    })
  }

  const handleRegisterItem = ({ category, quantity, unit, name }: UpdatedInventoryParams) => {
    setStockList((prevList) => {
      const nextItem = {
        id: nextId.current,
        category: category,
        quantity: quantity,
        unit: unit,
        name: name,
      }
      return [...prevList, nextItem]
    })
    nextId.current++
  }

  let filteredItems: Inventory[] = [...stockList]
  if (filterText !== '') {
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()),
    )
  }
  if (inStockOnly) {
    filteredItems = filteredItems.filter((item) => item.quantity > 0)
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
            onUpdateStock={handleUpdateStock}
          />
        </div>
      ))}
      <AddItemDialog onSave={handleRegisterItem} />
    </>
  )
}

export default FilteredView
