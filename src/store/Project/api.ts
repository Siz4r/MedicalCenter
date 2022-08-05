import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../core/apifetch'
import { Project, ProjectWebInput } from './types'
export const addProject = createAsyncThunk<string, ProjectWebInput, {}>(
  'projects/add',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/projects', data, {
        withCredentials: true,
      })

      return response.data
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const getProjects = createAsyncThunk<Project[], void, {}>('projects/get', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/projects', {
      withCredentials: true,
    })

    return response.data
  } catch (error: any) {
    return rejectWithValue(error)
  }
})

export const updateProject = createAsyncThunk<void, { id: string; data: ProjectWebInput }, {}>(
  'projects/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      api.put(`/api/projects/${id}`, data, {
        withCredentials: true,
      })
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const deleteProject = createAsyncThunk<void, string, {}>('projects/delete', async (id, { rejectWithValue }) => {
  try {
    api.delete(`/api/projects/${id}`, {
      withCredentials: true,
    })
  } catch (error: any) {
    return rejectWithValue(error)
  }
})

export const deleteAllProjects = createAsyncThunk<void, string[], {}>(
  'projects/deleteAll',
  async (ids, { rejectWithValue }) => {
    try {
      api.delete('/api/projects', {
        withCredentials: true,
        data: ids,
      })
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)
