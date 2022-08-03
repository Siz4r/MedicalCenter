export interface Patient {
  id: string
  firstName: string
  lastName: string
  email: string
  pesel: string
  address: Address
}

export interface PatientUpdateRequest {
  firstName: string
  lastName: string
  email: string
  pesel: string
  address: Address
}

export const newPatient: Patient = {
  id: '',
  firstName: '',
  lastName: '',
  pesel: '',
  email: '',
  address: {
    buildingNumber: 0,
    street: '',
    city: '',
    apartmentNumber: 0,
    postalCode: '',
  },
}

export interface Address {
  city: string
  street: string
  postalCode: string
  buildingNumber: number
  apartmentNumber: number | undefined
}
