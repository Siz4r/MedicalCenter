import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../core/apifetch'
import { Patient, PatientUpdateRequest } from './types'

export const fetchPatients = createAsyncThunk<Patient[], void, {}>(
  'patients/get',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get('/api/patients', {
        withCredentials: true,
      })

      return response.data
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const updatePatient = createAsyncThunk<void, { id: string; data: PatientUpdateRequest }, {}>(
  'patients/update',
  async ({ data, id }, { rejectWithValue, dispatch }) => {
    try {
      await api.put(`/api/patients/${id}`, {
        withCredentials: true,
        data: JSON.stringify(data),
      })
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const addPatient = createAsyncThunk<string, PatientUpdateRequest, {}>(
  'patients/add',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('/api/patients', {
        withCredentials: true,
        data: JSON.stringify(data),
      })

      return response.data
    } catch (error: any) {
      rejectWithValue(error)
    }
  }
)

export const deletePatient = createAsyncThunk<void, string, {}>(
  'patients/delete',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      api.delete(`/api/patients/${id}`, {
        withCredentials: true,
      })
    } catch (error: any) {
      rejectWithValue(error)
    }
  }
)

export const deleteAllPatients = createAsyncThunk<void, string[], {}>(
  'patients/deleteAll',
  async (ids, { rejectWithValue, dispatch }) => {
    try {
      api.delete(`/api/patients`, {
        withCredentials: true,
        data: JSON.stringify(ids),
      })
    } catch (error: any) {
      rejectWithValue(error)
    }
  }
)
