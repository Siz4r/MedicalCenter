import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { Patient } from './types'
import { addPatient, deleteAllPatients, deletePatient, getPatients, updatePatient } from './api'

interface PatientState {
  patients: Patient[]
  isLoading: boolean
}

const initialState: PatientState = {
  patients: [],
  isLoading: false,
}

export const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPatients.fulfilled, (state, action) => {
      state.patients = action.payload
      state.isLoading = false
    })

    builder.addCase(updatePatient.fulfilled, (state, action) => {
      const id = action.meta.arg.id
      const index = state.patients.findIndex(p => p.id === id)
      state.patients[index] = { id, ...action.meta.arg.data, address: action.meta.arg.data.addressWebInput }
      state.isLoading = false
    })

    builder.addCase(addPatient.fulfilled, (state, action) => {
      state.patients.push({ id: action.payload, ...action.meta.arg, address: action.meta.arg.addressWebInput })
      state.isLoading = false
    })

    builder.addCase(deletePatient.fulfilled, (state, action) => {
      state.patients = state.patients.filter(p => p.id !== action.meta.arg)
      state.isLoading = false
    })

    builder.addCase(deleteAllPatients.fulfilled, (state, action) => {
      state.patients = state.patients.filter(p => !action.meta.arg.includes(p.id))
      state.isLoading = false
    })

    builder.addMatcher(
      isAnyOf(
        deletePatient.pending,
        deleteAllPatients.pending,
        getPatients.pending,
        addPatient.pending,
        updatePatient.pending
      ),
      state => {
        state.isLoading = true
      }
    )

    builder.addMatcher(
      isAnyOf(
        deletePatient.fulfilled,
        deletePatient.rejected,
        deleteAllPatients.fulfilled,
        deleteAllPatients.rejected,
        getPatients.fulfilled,
        getPatients.rejected,
        addPatient.fulfilled,
        addPatient.rejected,
        updatePatient.fulfilled,
        updatePatient.fulfilled
      ),
      state => {
        state.isLoading = false
      }
    )
  },
})
