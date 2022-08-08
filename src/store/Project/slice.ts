import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { Project } from './types'
import {
  getProjects,
  addProject,
  deleteProject,
  deleteAllProjects,
  updateProject,
  addPatientToProject,
  deletePatientFromProject,
  updatePatientConsent,
} from './api'

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
      state.projects = [...state.projects, { id: action.payload, participants: [], name: action.meta.arg.name }]
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

    builder.addCase(addPatientToProject.fulfilled, (state, action) => {
      const patient = action.meta.arg.patient
      state.projects = state.projects.map((p: Project) => {
        if (p.id === action.meta.arg.projectId) {
          p.participants = [
            ...p.participants,
            {
              id: action.payload,
              firstName: patient.firstName,
              lastName: patient.lastName,
              email: patient.email,
              patientId: patient.id,
              consentToParticipate: false,
            },
          ]
          return p
        } else return p
      })
    })

    builder.addCase(deletePatientFromProject.fulfilled, (state, action) => {
      state.projects = state.projects.map((p: Project) => {
        if (p.id === action.meta.arg.projectId) {
          const index = p.participants.findIndex(
            participation => participation.id == action.meta.arg.projectParticipationId
          )

          return {
            ...p,
            participants: [...p.participants.slice(0, index), ...p.participants.slice(index + 1)],
          }
        } else return p
      })
    })

    builder.addCase(updatePatientConsent.fulfilled, (state, action) => {
      console.log('dupa')
      state.projects = state.projects.map((p: Project) => {
        if (p.id == action.meta.arg.projectId) {
          p.participants = p.participants.map(projectParticipant => {
            if (projectParticipant.id == action.meta.arg.projectParticipationId)
              return {
                ...projectParticipant,
                consentToParticipate: !projectParticipant.consentToParticipate,
              }
            else return projectParticipant
          })
          return p
        } else return p
      })
    })

    builder.addMatcher(
      isAnyOf(
        deleteProject.pending,
        deleteAllProjects.pending,
        addPatientToProject.pending,
        getProjects.pending,
        addProject.pending,
        updatePatientConsent.pending,
        updateProject.pending,
        deletePatientFromProject.pending
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
        addProject.rejected,
        updatePatientConsent.fulfilled,
        updatePatientConsent.rejected,
        deletePatientFromProject.fulfilled,
        deletePatientFromProject.rejected,
        addPatientToProject.fulfilled,
        addPatientToProject.rejected
      ),
      state => {
        state.isLoading = false
      }
    )
  },
})
