import SearchBar from '@/components/stock-list/SearchBar'
import StockList from '@/components/stock-list/filtered-view'
import { FRIDGE_ITEMS } from '@/data/fridgeItems'
import type { Inventory } from '@/types/inventory'
import { useState } from 'react'

function FilterableStockList() {
  const fridgeItems: Inventory[] = [...FRIDGE_ITEMS]
  const [filterText, setFilterText] = useState<string>('')
  const [inStockOnly, setInStockOnly] = useState<boolean>(false)

  return (
    <div className='max-w-md min-w-sm min-h-svh mx-auto pt-12'>
      <div className='w-full flex flex-col bg-white'>
        <SearchBar
          filterText={filterText}
          inStockOnly={inStockOnly}
          onFilterTextChange={setFilterText}
          onInStockOnlyChange={setInStockOnly}
        />
        <div>
          <StockList fridgeItems={fridgeItems} filterText={filterText} inStockOnly={inStockOnly} />
        </div>
      </div>
    </div>
  )
}

export default FilterableStockList
