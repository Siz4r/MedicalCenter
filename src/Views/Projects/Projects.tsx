import { EuiBasicTableColumn, EuiForm, EuiFlexGroup, EuiFormRow, EuiFlexItem, EuiButton, EuiSpacer } from '@elastic/eui'
import React, { FormEvent, useEffect, useState } from 'react'
import { newProject, Project } from '../../store/Project/types'
import { TableView } from '../TableView'
import { deletePatient, deleteAllPatients } from '../../store/Patient/api'
import FieldInput from '../Patients/PatientFieldInput'
import { correctTextInput } from '../Patients/PatientForm'
import { Action } from '@elastic/eui/src/components/basic_table/action_types'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store'
import { RootState } from '../../store/index'
import { deleteProject, deleteAllProjects, getProjects, addProject, updateProject } from '../../store/Project/api'

export const Projects = () => {
  const [projectToEdit, setProjectToEdit] = useState<Project>()
  const [projectName, setProjectName] = useState<string>('')
  const [isProjectNameValid, setIsProjectNameValid] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const projects = useSelector<RootState>(({ projects }) => {
    {
      return projects.projects
    }
  }) as Project[]

  useEffect(() => {
    dispatch(getProjects())
  }, [])

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
        delete={deleteProject}
        deleteAll={deleteAllProjects}
        initializingRecord={newProject}
        setRecordToEdit={setProjectToEdit}
        nameOfRecord="Project"
        setIsEditing={(data: boolean) => {}}
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
