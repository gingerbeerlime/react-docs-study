import { buttonClass } from '@/styles/common'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button className={`${buttonClass} ${className}`} {...props}>
      {children}
    </button>
  )
}
