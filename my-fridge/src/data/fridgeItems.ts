import type { Inventory } from '@/types/inventory'

export const FRIDGE_ITEMS: Inventory[] = [
  { id: 1, category: 'Drinks', unit: 'amount', stock: 0, name: '우유' },
  { id: 2, category: 'Drinks', unit: 'amount', stock: 1, name: '콜라' },
  { id: 3, category: 'Drinks', unit: 'amount', stock: 6, name: '생수' },
  { id: 4, category: 'Vegetables', unit: 'amount', stock: 2, name: '가지' },
  { id: 5, category: 'Vegetables', unit: 'amount', stock: 2, name: '호박' },
  { id: 6, category: 'Protein', unit: 'amount', stock: 12, name: '계란' },
  { id: 7, category: 'Protein', unit: 'kg', stock: 0, name: '돼지고기' },
  { id: 8, category: 'Protein', unit: 'amount', stock: 0, name: '두부' },
]
