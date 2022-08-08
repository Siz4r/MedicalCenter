export interface Project {
  id: string
  name: string
  participants: ProjectParticipant[]
}

export interface ProjectResponse {
  id: string
  name: string
  participants: ProjectParticipantResponse[]
}

export interface ProjectParticipantResponse {
  id: string
  consentToParticipate: boolean
  patientFirstName: string
  patientLastName: string
  patientEmail: string
  patientId: string
}

export interface ProjectParticipant {
  id: string
  consentToParticipate: boolean
  firstName: string
  lastName: string
  email: string
  patientId: string
}

export const newProject: Project = {
  id: '',
  name: '',
  participants: [],
}

export interface ProjectWebInput {
  name: string
}
