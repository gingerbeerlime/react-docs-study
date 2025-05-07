import { useState } from 'react'
import { foods, filterItems } from '@/data/filterFoods'
import { FoodType } from '@/types'

interface SearchBarProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FilterableList() {
  const [query, setQuery] = useState('')

  const filteredItems: FoodType[] = filterItems(foods, query)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <>
      <SearchBar value={query} onChange={handleChange} />
      <hr />
      <List items={filteredItems} />
    </>
  )
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label>
      Search: <input value={value} onChange={onChange} />
    </label>
  )
}

function List({ items }: { items: FoodType[] }) {
  return (
    <table>
      {items.map((food) => (
        <tr key={food.id}>
          <td>{food.name}</td>
          <td>{food.description}</td>
        </tr>
      ))}
    </table>
  )
}
