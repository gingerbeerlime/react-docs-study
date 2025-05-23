import { forwardRef } from 'react'
import { Input } from '@/components/common'

const SearchInput = forwardRef<HTMLInputElement>((props, ref) => {
  return <Input ref={ref} placeholder='Looking for something?' {...props} />
})

export default SearchInput
