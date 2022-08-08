import {
  EuiFlexGroup,
  EuiListGroup,
  EuiListGroupItem,
  EuiFlexItem,
  EuiSpacer,
  EuiTitle,
  EuiLoadingSpinner,
} from '@elastic/eui'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { Patient } from '../../store/Patient/types'
import { ProjectParticipant } from '../../store/Project/types'
import { TableView } from '../TableView'
import {
  deleteProject,
  addPatientToProject,
  deletePatientFromProject,
  updatePatientConsent,
} from '../../store/Project/api'
import { deleteAllPatients, getPatients } from '../../store/Patient/api'
import { useEffect } from 'react'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useProjects } from '../../hooks/useProjects'

export const ProjectParticipation = () => {
  const { projects, projectsLoading } = useProjects({ fetchOnMount: true })

  const patients = useAppSelector(({ patients }) => {
    {
      return patients.patients
    }
  })

  const [listIndex, setListIndex] = useState<number>(0)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getPatients())
  }, [])

  const schema = {
    strict: true,
    fields: {
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
    },
  }

  return projectsLoading ? (
    <EuiLoadingSpinner size="xxl" />
  ) : (
    <EuiFlexGroup>
      <EuiFlexItem grow={1}>
        <EuiListGroup bordered={true}>
          {projects.map((p, index) => (
            <EuiListGroupItem
              label={p.name}
              key={p.id}
              onClick={() => {
                setListIndex(index)
              }}
            />
          ))}
        </EuiListGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={8}>
        <EuiFlexGroup direction="column">
          <EuiFlexGroup>
            <EuiFlexItem>
              <div>
                <EuiFlexItem>
                  <EuiTitle>
                    <h2>Participants in {projects[listIndex].name}</h2>
                  </EuiTitle>
                  <EuiSpacer />
                </EuiFlexItem>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <TableView<ProjectParticipant>
                      records={projects[listIndex].participants}
                      compare={(a, b) => a.firstName.localeCompare(b.firstName)}
                      columns={[
                        {
                          field: 'firstName',
                          name: 'First Name',
                          sortable: true,
                          'data-test-subj': 'firstNameCell',
                          color: 'danger',
                        },
                        {
                          field: 'lastName',
                          name: 'Last Name',
                          truncateText: true,
                          mobileOptions: {
                            show: false,
                          },
                        },
                        {
                          field: 'email',
                          name: 'Email',
                        },
                        {
                          name: 'Actions',
                          actions: [
                            {
                              name: 'Confirm',
                              description: 'Confirm participation',
                              icon: 'check',
                              type: 'icon',
                              onClick: (participant: ProjectParticipant) => {
                                dispatch(
                                  updatePatientConsent({
                                    projectParticipationId: participant.id,
                                    projectId: projects[listIndex].id,
                                  })
                                )
                              },
                            },
                            {
                              name: 'Delete',
                              description: 'Delete this patient from project',
                              icon: 'trash',
                              type: 'icon',
                              color: 'danger',
                              onClick: (participant: ProjectParticipant) => {
                                dispatch(
                                  deletePatientFromProject({
                                    projectParticipationId: participant.id,
                                    projectId: projects[listIndex].id,
                                  })
                                )
                              },
                            },
                          ],
                        },
                      ]}
                      schema={schema}
                      delete={deleteProject}
                      deleteAll={deleteAllPatients}
                      nameOfRecord="Participants in project"
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />
          <EuiTitle>
            <h2>All system patients</h2>
          </EuiTitle>
          <EuiSpacer />
          <EuiFlexGroup>
            <EuiFlexItem grow={8}>
              <TableView<Patient>
                records={
                  projects[listIndex]
                    ? patients.filter(
                        patient => !projects[listIndex].participants.map(p => p.patientId).includes(patient.id)
                      )
                    : patients
                }
                compare={(a, b) => a.firstName.localeCompare(b.firstName)}
                columns={[
                  {
                    field: 'firstName',
                    name: 'First Name',
                    sortable: true,
                    'data-test-subj': 'firstNameCell',
                    color: 'danger',
                  },
                  {
                    field: 'lastName',
                    name: 'Last Name',
                    truncateText: true,
                    mobileOptions: {
                      show: false,
                    },
                  },
                  {
                    field: 'email',
                    name: 'Email',
                  },
                  {
                    name: 'Actions',
                    actions: [
                      {
                        name: 'Add',
                        description: 'Add patient to project',
                        icon: 'check',
                        type: 'icon',
                        onClick: (patient: Patient) => {
                          dispatch(addPatientToProject({ projectId: projects[listIndex].id, patient }))
                        },
                      },
                    ],
                  },
                ]}
                schema={schema}
                delete={deleteProject}
                deleteAll={deleteAllPatients}
                nameOfRecord="System Patient"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}
