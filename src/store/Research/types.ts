export interface Research {
  id: string
  name: string
  description: string
  orderResearches: OrderResearch[]
}

export interface OrderResearch {
  id: string
  orderName: string
  orderId: string
  result: string
}
