import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../core/apifetch'
import { Research } from './types'

export const createResearch = createAsyncThunk<string, { name: string; description: string }, {}>(
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

export const deleteResearchById = createAsyncThunk<void, string, {}>(
  'researches/deleteById',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/researches/${id}`)
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const deleteAllResearchesByIds = createAsyncThunk<void, string[], {}>(
  'researches/deleteAllByIds',
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

export const editResearch = createAsyncThunk<void, { name: string; description: string; id: string }>(
  'researches/edit',
  async (data, { rejectWithValue }) => {
    try {
      await api.put(`/api/researches/${data.id}`, data)
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)
