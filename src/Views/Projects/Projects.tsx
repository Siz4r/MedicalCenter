import { EuiBasicTableColumn, EuiButton, EuiFlexGroup, EuiFlexItem, EuiForm } from '@elastic/eui'
import React, { useState } from 'react'
import { Project } from '../../store/Project/types'
import { TableView } from '../TableView'
import FieldInput from '../Patients/PatientFieldInput'
import { correctTextInput } from '../Patients/PatientForm'
import { Action } from '@elastic/eui/src/components/basic_table/action_types'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { addProject, deleteAllProjects, deleteProject, updateProject } from '../../store/Project/api'
import { Patient } from '../../store/Patient/types'
import { useProjects } from '../../hooks/useProjects'

export const Projects = () => {
  const [projectToEdit, setProjectToEdit] = useState<Project>()
  const [projectName, setProjectName] = useState<string>('')
  const [isProjectNameValid, setIsProjectNameValid] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const { projects } = useProjects({ fetchOnMount: true })

  const onAddHandler = () => {
    setIsEditing(false)
    if (isProjectNameValid) {
      dispatch(addProject({ name: projectName }))
      setProjectName('')
    }
  }

  const onEditHandler = () => {
    if (isProjectNameValid && projectToEdit) {
      dispatch(
        updateProject({
          id: projectToEdit.id,
          data: {
            name: projectName,
          },
        })
      )
    }
  }

  const schema = {
    strict: true,
    fields: {
      name: {
        type: 'string',
      },
    },
  }

  const actions: Action<Project>[] = [
    {
      name: 'Edit',
      description: 'Edit this person',
      icon: 'pencil',
      type: 'icon',
      onClick: (project: Project) => {
        setIsEditing(true)
        setProjectToEdit(project)
        setProjectName(project.name)
      },
    },
    {
      name: 'Delete',
      description: 'Delete this person',
      icon: 'trash',
      type: 'icon',
      color: 'danger',
      onClick: (project: Project) => dispatch(deleteProject(project.id)),
    },
  ]

  const columns: EuiBasicTableColumn<Project>[] = [
    {
      field: 'name',
      name: 'Project Name',
      sortable: true,
      'data-test-subj': 'firstNameCell',
    },
    {
      field: 'participants',
      name: 'Number of participants',
      render: (participants: Patient[]) => participants.length,
    },
    {
      name: 'Actions',
      actions,
    },
  ]

  return (
    <div>
      <TableView<Project>
        records={projects}
        compare={(a, b) => a.name.localeCompare(b.name)}
        columns={columns}
        schema={schema}
        deleteAll={deleteAllProjects}
        nameOfRecord="Project"
      />
      <EuiForm>
        <EuiFlexGroup alignItems="flexEnd">
          <EuiFlexItem>
            <FieldInput
              setValid={setIsProjectNameValid}
              setValue={setProjectName}
              initialValue={projectName}
              label="Project name"
              fieldValidation={correctTextInput}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButton onClick={onAddHandler}>Add project</EuiButton>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButton disabled={!isEditing} onClick={onEditHandler}>
              Edit name
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiForm>
    </div>
  )
}
