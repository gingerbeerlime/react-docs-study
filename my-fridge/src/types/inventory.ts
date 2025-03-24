interface Inventory {
  id: number
  category: 'Drinks' | 'Vegetables' | 'Protein'
  unit: 'amount' | 'kg' | 'g'
  stock: number
  name: string
}

interface UpdatedStockParams extends Pick<Inventory, 'id' | 'stock' | 'unit'> {}

export type { Inventory, UpdatedStockParams }
