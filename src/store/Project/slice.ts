import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { Project } from './types'
import { getProjects, addProject, deleteProject, deleteAllProjects, updateProject } from './api'

interface ProjectState {
  projects: Project[]
  isLoading: boolean
}

const initialState: ProjectState = {
  projects: [],
  isLoading: false,
}

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload
    })

    builder.addCase(addProject.fulfilled, (state, action) => {
      state.projects = [...state.projects, { id: action.payload, patients: [], name: action.meta.arg.name }]
    })

    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.projects = state.projects.filter(p => p.id !== action.meta.arg)
    })

    builder.addCase(deleteAllProjects.fulfilled, (state, action) => {
      state.projects = state.projects.filter(p => !action.meta.arg.includes(p.id))
    })

    builder.addCase(updateProject.fulfilled, (state, action) => {
      const id = action.meta.arg.id
      const index = state.projects.findIndex(p => p.id === id)
      state.projects[index] = { ...state.projects[index], ...action.meta.arg.data }
    })

    builder.addMatcher(
      isAnyOf(
        deleteProject.pending,
        deleteAllProjects.pending,
        getProjects.pending,
        addProject.pending,
        updateProject.pending
      ),
      state => {
        state.isLoading = true
      }
    )

    builder.addMatcher(
      isAnyOf(
        getProjects.fulfilled,
        getProjects.rejected,
        updateProject.fulfilled,
        updateProject.rejected,
        deleteAllProjects.fulfilled,
        deleteAllProjects.rejected,
        deleteProject.fulfilled,
        deleteProject.rejected,
        addProject.fulfilled,
        addProject.rejected
      ),
      state => {
        state.isLoading = false
      }
    )
  },
})
