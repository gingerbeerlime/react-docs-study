import { inputClass } from '@/styles/common'
import { forwardRef } from 'react'

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => {
    return <input ref={ref} className={`${inputClass} ${className}`} {...props} />
  },
)
