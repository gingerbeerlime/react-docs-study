import { Button } from '@/components/ui'

interface PanelProps {
  title: string
  children: React.ReactNode
  isActive: boolean
  onShow: () => void
}

const Panel = ({ title, children, isActive, onShow }: PanelProps) => {
  return (
    <section className='panel'>
      <h3>{title}</h3>
      {isActive ? <p>{children}</p> : <Button onClick={onShow}>Show</Button>}
    </section>
  )
}

export default Panel
