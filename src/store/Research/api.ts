import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../core/apifetch'
import { Research } from './types'

export const addResearch = createAsyncThunk<string, { name: string; description: string }, {}>(
  'researches/add',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/researches', data)

      return response.data
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const getResearches = createAsyncThunk<Research[], void, {}>(
  'researches/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/researches')

      return response.data
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const deleteResearch = createAsyncThunk<void, string, {}>(
  'researches/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/researches/${id}`)
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const deleteAllResearches = createAsyncThunk<void, string[], {}>(
  'researches/deleteAll',
  async (ids, { rejectWithValue }) => {
    try {
      await api.delete('/api/researches', {
        data: ids,
      })
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const updateResearch = createAsyncThunk<void, { name: string; description: string; id: string }>(
  'researches/update',
  async (data, { rejectWithValue }) => {
    try {
      await api.put(`/api/researches/${data.id}`, data)
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const updateOrderResearchResult = createAsyncThunk<void, { id: string; result: string; researchId: string }, {}>(
  'researches/updateResult',
  async (data, { rejectWithValue }) => {
    try {
      await api.put(`/api/orderResearches/${data.id}`, { result: data.result })
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)
