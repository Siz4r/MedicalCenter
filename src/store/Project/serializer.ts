import { Project, ProjectResponse, ProjectParticipant } from './types'
export const serializeProjects = (data: ProjectResponse[]): Project[] => {
  return data.map(
    p =>
      ({
        ...p,
        participants: p.participants.map(
          projectP =>
            ({
              id: projectP.id,
              firstName: projectP.patientFirstName,
              lastName: projectP.patientLastName,
              email: projectP.patientEmail,
              patientId: projectP.patientId,
              consentToParticipate: projectP.consentToParticipate,
            } as ProjectParticipant)
        ),
      } as Project)
  )
}
