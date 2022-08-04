import { EuiBasicTableColumn } from '@elastic/eui'
import React, { useState } from 'react'
import { newProject, Project } from '../../store/Project/types'
import { TableView } from '../TableView'
import { deletePatient, deleteAllPatients } from '../../store/Patient/api'

type Props = {}

const projects: Project[] = [
  {
    id: '1',
    name: 'Dummy',
    patients: [],
  },
  {
    id: '2',
    name: 'Plummy',
    patients: [],
  },
  {
    id: '3',
    name: 'Fluffy',
    patients: [],
  },
  {
    id: '4',
    name: 'Cummy',
    patients: [],
  },
]

export const Projects = ({}: Props) => {
  const [projectToEdit, setProjectToEdit] = useState<Project>()

  const schema = {
    strict: true,
    fields: {
      name: {
        type: 'string',
      },
    },
  }

  const columns: EuiBasicTableColumn<Project>[] = [
    {
      field: 'name',
      name: 'Project Name',
      sortable: true,
      'data-test-subj': 'firstNameCell',
    },
  ]

  return (
    <TableView<Project>
      records={projects}
      compare={(a, b) => a.name.localeCompare(b.name)}
      columns={columns}
      schema={schema}
      delete={deletePatient}
      deleteAll={deleteAllPatients}
      initializingRecord={newProject}
      setRecordToEdit={setProjectToEdit}
      nameOfRecord="Project"
    />
  )
}
