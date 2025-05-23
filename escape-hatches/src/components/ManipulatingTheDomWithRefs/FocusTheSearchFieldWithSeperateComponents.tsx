import SearchButton from './SearchButton'
import SearchInput from './SearchInput'
import { useRef } from 'react'

export default function Page() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.focus()
  }

  return (
    <>
      <nav>
        <SearchButton onClickSearch={handleClick} />
      </nav>
      <SearchInput ref={inputRef} />
    </>
  )
}
