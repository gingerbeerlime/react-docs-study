import SearchBar from '@/components/SearchBar'
import StockList from '@/components/Fridge/StockList'

function App() {
  return (
    <div className='flex flex-col items-center justify-center min-h-svh'>
      <div className='w-100'>
        <SearchBar />
        <div>
          <StockList />
        </div>
      </div>
    </div>
  )
}

export default App
