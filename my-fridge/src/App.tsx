import SearchBar from '@/components/SearchBar'
import StockList from '@/components/Fridge/StockList'
import { FRIDGE_ITEMS } from '@/data/fridgeItems'
import type { Inventory } from '@/types/inventory'
import { useState } from 'react'

function App() {
  const fridgeItems: Inventory[] = [...FRIDGE_ITEMS]
  const [filterText, setFilterText] = useState<string>('')
  const [inStockOnly, setInStockOnly] = useState<boolean>(false)

  return (
    <div className='flex flex-col items-center justify-center min-h-svh'>
      <div className='w-100'>
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

export default App
