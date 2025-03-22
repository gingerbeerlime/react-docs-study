import type { Inventory } from '@/types/inventory'

export const getLabel = (category: Inventory['category']) => {
  if (category === 'Drinks') return '🥛음료'
  else if (category === 'Vegetables') return '🥕야채'
  else if (category === 'Protein') return '🥚단백질'
  else return ''
}
