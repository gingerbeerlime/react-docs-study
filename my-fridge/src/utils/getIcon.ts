import type { Inventory } from '@/types/inventory'

export const getIcon = (category: Inventory['category']) => {
  if (category === 'Drinks') return '🥛'
  else if (category === 'Vegetables') return '🥕'
  else if (category === 'Protein') return '🥚'
  else return ''
}
