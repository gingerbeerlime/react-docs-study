interface Inventory {
  id: number
  category: 'Drinks' | 'Vegetables' | 'Protein'
  unit: 'amount' | 'kg' | 'g'
  stock: number
  name: string
}

interface UpdatedStockParams extends Pick<Inventory, 'id' | 'stock' | 'unit'> {}

interface UpdatedInventoryParams extends Pick<Inventory, 'category' | 'unit' | 'stock' | 'name'> {}

export type { Inventory, UpdatedStockParams, UpdatedInventoryParams }
