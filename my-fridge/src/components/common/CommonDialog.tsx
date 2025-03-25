import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'

interface CommonDialogProps {
  trigger: React.ReactNode
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: (close: () => void) => React.ReactNode
}

const CommonDialog: React.FC<CommonDialogProps> = ({
  trigger,
  title,
  description,
  children,
  footer,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
        )}
        <div className='grid gap-4 py-4'>{children}</div>
        {footer && <DialogFooter>{footer(() => setOpen(false))}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}

export default CommonDialog
