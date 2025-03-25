import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getLabel } from '@/utils/getLabel'

interface selectBoxParams {
  value: string
  options: string[]
  placeholder: string
  onChange: (value: string) => void
}

const SelectBox = ({ value, options, placeholder, onChange }: selectBoxParams) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((item) => {
            return (
              <SelectItem key={item} value={item}>
                {getLabel(item)}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SelectBox
