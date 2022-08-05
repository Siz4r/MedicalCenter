import { EuiBasicTableColumn, EuiText } from '@elastic/eui'
import { Action } from '@elastic/eui/src/components/basic_table/action_types'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Address, newPatient, Patient } from '../../store/Patient/types'
import { PatientForm } from './PatientForm'
import { AppDispatch, RootState } from '../../store/index'
import { deleteAllPatients, deletePatient, fetchPatients } from '../../store/Patient/api'
import { TableView } from '../TableView'

export const Patients = () => {
  const [error, setError] = useState<string | undefined>(undefined)
  const [patientToEdit, setPatientToEdit] = useState<Patient>()
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const patients = useSelector<RootState>(({ patients }) => {
    return patients.patients
  }) as Patient[]

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchPatients())
  }, [])

  const actions: Action<Patient>[] = [
    {
      name: 'Edit',
      description: 'Edit this person',
      icon: 'pencil',
      type: 'icon',
      onClick: (patient: Patient) => {
        setPatientToEdit(patient)
        setIsEditing(true)
      },
    },
    {
      name: 'Delete',
      description: 'Delete this person',
      icon: 'trash',
      type: 'icon',
      color: 'danger',
      onClick: (patient: Patient) => dispatch(deletePatient(patient.id)),
    },
  ]

  const columns: EuiBasicTableColumn<Patient>[] = [
    {
      field: 'firstName',
      name: 'First Name',
      sortable: true,
      'data-test-subj': 'firstNameCell',
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
      field: 'pesel',
      name: 'Pesel',
    },
    {
      field: 'address',
      name: 'Address',
      render: (address: Address) => (
        <EuiText>
          {`${address.city} ${address.postalCode}\n${address.street} ${address.buildingNumber} ${
            address.apartmentNumber ? address.apartmentNumber : ''
          }`}
        </EuiText>
      ),
    },
    {
      name: 'Actions',
      actions,
    },
  ]

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
      pesel: {
        type: 'string',
      },
      city: {
        type: 'string',
      },
    },
  }

  return (
    <div>
      <TableView<Patient>
        records={patients}
        schema={schema}
        columns={columns}
        compare={(a, b) => a.firstName.localeCompare(b.firstName)}
        deleteAll={deleteAllPatients}
        delete={deletePatient}
        initializingRecord={newPatient}
        setRecordToEdit={setPatientToEdit}
        nameOfRecord="Patient"
        setIsEditing={setIsEditing}
      />
      <PatientForm patientToEdit={patientToEdit} isEditing={isEditing} />
    </div>
  )
}
