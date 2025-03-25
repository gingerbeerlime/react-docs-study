interface Inventory {
  id: number
  name: string
  quantity: number
  unit: 'amount' | 'kg' | 'g'
  category: 'Drinks' | 'Vegetables' | 'Protein'
}

interface UpdatedStockParams extends Pick<Inventory, 'id' | 'quantity' | 'unit'> {}

interface UpdatedInventoryParams
  extends Pick<Inventory, 'name' | 'quantity' | 'unit' | 'category'> {}

export type { Inventory, UpdatedStockParams, UpdatedInventoryParams }
