export interface Patient {
  id: string
  firstName: string
  lastName: string
  email: string
  pesel: string
  address: Address
}

export interface Address {
  city: string
  street: string
  prePostalCode: number
  postPostalCode: number
  buildingNumber: number
  apartmentNumber: number | undefined
}
