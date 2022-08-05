import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { patientSlice } from './Patient/slice'
import { projectSlice } from './Project/slice'

const appReducer = combineReducers({
  patients: patientSlice.reducer,
  projects: projectSlice.reducer,
})

export const store = configureStore({
  reducer: appReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
