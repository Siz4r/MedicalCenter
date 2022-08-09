import { EuiBasicTableColumn, EuiText, EuiForm, EuiFlexGroup, EuiFlexGrid, EuiFlexItem, EuiButton } from '@elastic/eui'
import { Action } from '@elastic/eui/src/components/basic_table/action_types'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Address, newPatient, Patient } from '../../store/Patient/types'
import { AppDispatch } from '../../store'
import { addPatient, deleteAllPatients, deletePatient, getPatients, updatePatient } from '../../store/Patient/api'
import { TableView } from '../TableView'
import FieldInput from './PatientFieldInput'
import { useAppSelector } from '../../hooks/reduxHooks'

const isNotEmpty = (value: string) => value.trim().length > 2
const hasOnlyNumbers = (value: string) => /^\d+$/.test(value)
const hasOnlyLetters = (value: string) => !/[^a-zżźółćśęąń ]/i.test(value)
export const correctTextInput = (value: string) => isNotEmpty(value) && hasOnlyLetters(value)

export const Patients = () => {
  const [patientToEdit, setPatientToEdit] = useState<Patient>(newPatient)

  const [isFirstNameValid, setIsFirstNameValid] = useState(false)
  const [isLastNameValid, setIsLastNameValid] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPeselValid, setIsPeselValid] = useState(false)
  const [isStreetValid, setIsStreetValid] = useState(false)
  const [isCityValid, setIsCityValid] = useState(false)
  const [isPostalCodeValid, setIsPostalCodeValid] = useState(false)
  const [isBuildingNumberValid, setIsBuildingNumberValid] = useState(false)
  const [isApartmentNumberValid, setIsApartmentNumberValid] = useState(false)

  const [postalCode, setPostalCode] = useState('')
  const [buildingNumber, setBuildingNumber] = useState('')
  const [apartmentNumber, setApartmentNumber] = useState('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [pesel, setPesel] = useState<string>('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const dispatch = useDispatch<AppDispatch>()

  const patients = useAppSelector(({ patients }) => {
    return patients.patients
  })

  function validateInputs() {
    return (
      isStreetValid &&
      isApartmentNumberValid &&
      isBuildingNumberValid &&
      isCityValid &&
      isEmailValid &&
      isFirstNameValid &&
      isLastNameValid &&
      isPeselValid &&
      isPostalCodeValid
    )
  }

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    pesel: pesel,
    addressWebInput: {
      apartmentNumber: parseInt(apartmentNumber),
      postalCode: postalCode,
      buildingNumber: parseInt(buildingNumber),
      street: street,
      city: city,
    },
  }

  const onAddHandler = () => {
    if (validateInputs()) {
      dispatch(addPatient(data))
    }
  }

  const onEditHandler = () => {
    if (validateInputs() && patientToEdit) {
      dispatch(updatePatient({ id: patientToEdit.id, data: data }))
    }
  }

  useEffect(() => {
    dispatch(getPatients())
  }, [])

  const actions: Action<Patient>[] = [
    {
      name: 'Edit',
      description: 'Edit this person',
      icon: 'pencil',
      type: 'icon',
      onClick: (patient: Patient) => {
        setPatientToEdit(patient)
        setFirstName(patient.firstName)
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
        nameOfRecord="Patient"
      />
      <EuiForm component="form">
        <EuiFlexGrid style={{ maxWidth: 1200 }} component="span" columns={2}>
          <EuiFlexItem grow={2}>
            <FieldInput
              fieldValidation={correctTextInput}
              initialValue={firstName}
              label="First name"
              setValue={setFirstName}
              setValid={setIsFirstNameValid}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={2}>
            <FieldInput
              fieldValidation={correctTextInput}
              initialValue={patientToEdit.lastName}
              label="Last name"
              setValue={setLastName}
              setValid={setIsLastNameValid}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <FieldInput
              fieldValidation={isNotEmpty}
              initialValue={patientToEdit.email}
              label="Email"
              setValue={setEmail}
              setValid={setIsEmailValid}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <FieldInput
              fieldValidation={hasOnlyNumbers}
              initialValue={patientToEdit.pesel}
              label="Pesel"
              setValue={setPesel}
              setValid={setIsPeselValid}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <FieldInput
              fieldValidation={correctTextInput}
              initialValue={patientToEdit.address.city}
              label="City"
              setValue={setCity}
              setValid={setIsCityValid}
            />
          </EuiFlexItem>
          <EuiFlexItem style={{ maxWidth: 100 }}>
            <FieldInput
              fieldValidation={isNotEmpty}
              initialValue={patientToEdit.address.postalCode}
              label="Postal code"
              setValue={setPostalCode}
              setValid={setIsPostalCodeValid}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <FieldInput
              fieldValidation={correctTextInput}
              initialValue={patientToEdit.address.street}
              label="Street"
              setValue={setStreet}
              setValid={setIsStreetValid}
            />
          </EuiFlexItem>
          <EuiFlexItem style={{ maxWidth: 100 }}>
            <FieldInput
              fieldValidation={hasOnlyNumbers}
              initialValue={
                patientToEdit.address.buildingNumber === 0 ? '' : patientToEdit.address.buildingNumber.toString()
              }
              label="Building"
              setValue={setBuildingNumber}
              setValid={setIsBuildingNumberValid}
            />
          </EuiFlexItem>
          <EuiFlexItem style={{ maxWidth: 200 }}>
            <FieldInput
              fieldValidation={hasOnlyNumbers}
              initialValue={
                patientToEdit.address.apartmentNumber ? patientToEdit.address.apartmentNumber.toString() : ''
              }
              label="Apartment Number"
              setValue={setApartmentNumber}
              setValid={setIsApartmentNumberValid}
            />
          </EuiFlexItem>
          <EuiFlexGroup alignItems="center">
            <EuiFlexItem>
              <EuiButton onClick={onAddHandler} color="success">
                Add patient
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiButton onClick={onEditHandler} color="warning">
                Edit patient
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexGrid>
      </EuiForm>
    </div>
  )
}
