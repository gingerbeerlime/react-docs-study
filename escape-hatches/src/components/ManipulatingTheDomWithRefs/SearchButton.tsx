import { Button } from '@/components/common'

export default function SearchButton({ onClickSearch }: { onClickSearch: () => void }) {
  return <Button onClick={onClickSearch}>Search</Button>
}
