interface Inventory {
  id: number
  category: 'Drinks' | 'Vegetables' | 'Protein'
  unit: 'amount' | 'kg' | 'g'
  stock: number
  name: string
}

export type { Inventory }
