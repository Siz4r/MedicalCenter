import { Patient } from '../Patient/types'

export interface Project {
  id: string
  name: string
  patients: Patient[]
}

export const newProject: Project = {
  id: '',
  name: '',
  patients: [],
}

export interface ProjectWebInput {
  name: string
}
