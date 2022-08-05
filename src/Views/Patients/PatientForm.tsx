import { EuiButton, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiForm, EuiSpacer } from '@elastic/eui'
import { Patient, newPatient } from '../../store/Patient/types'
import FieldInput from './PatientFieldInput'
import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { addPatient, updatePatient } from '../../store/Patient/api'
import { useEffect } from 'react'

type Props = {
  patientToEdit: Patient | undefined
  isEditing: boolean
}

const isNotEmpty = (value: string) => value.trim().length > 2
const hasOnlyNumbers = (value: string) => /^\d+$/.test(value)
const hasOnlyLetters = (value: string) => !/[^a-zżźółćśęąń ]/i.test(value)
export const correctTextInput = (value: string) => isNotEmpty(value) && hasOnlyLetters(value)

export const PatientForm = (props: Props) => {
  let patient = props.patientToEdit ? props.patientToEdit : newPatient

  const [isFirstNameValid, setIsFirstNameValid] = useState(props.isEditing)
  const [isLastNameValid, setIsLastNameValid] = useState(props.isEditing)
  const [isEmailValid, setIsEmailValid] = useState(props.isEditing)
  const [isPeselValid, setIsPeselValid] = useState(props.isEditing)
  const [isStreetValid, setIsStreetValid] = useState(props.isEditing)
  const [isCityValid, setIsCityValid] = useState(props.isEditing)
  const [isPostalCodeValid, setIsPostalCodeValid] = useState(props.isEditing)
  const [isBuildingNumberValid, setIsBuildingNumberValid] = useState(props.isEditing)
  const [isApartmentNumberValid, setIsApartmentNumberValid] = useState(props.isEditing)

  const [postalCode, setPostalCode] = useState(patient.address.postalCode)
  const [buildingNumber, setBuildingNumber] = useState(patient.address.buildingNumber.toString())
  const [apartmentNumber, setApartmentNumber] = useState(
    patient.address.apartmentNumber ? patient.address.apartmentNumber.toString() : ''
  )
  const [firstName, setFirstName] = useState<string>(patient?.firstName)
  const [lastName, setLastName] = useState<string>(patient.lastName)
  const [email, setEmail] = useState<string>(patient.email)
  const [pesel, setPesel] = useState<string>(patient.pesel)
  const [street, setStreet] = useState(patient.address.street)
  const [city, setCity] = useState(patient.address.city)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {}, [props.isEditing])

  function validateInputs() {
    console.log(street)
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validateInputs()) {
      try {
        if (props.isEditing && props.patientToEdit)
          dispatch(
            updatePatient({
              id: props.patientToEdit.id,
              data: data,
            })
          )
        else dispatch(addPatient(data))
      } catch (error: any) {}
    }
  }

  const onAddHandler = () => {
    if (validateInputs()) {
      dispatch(addPatient(data))
    }
  }

  const onEditHandler = () => {
    if (validateInputs() && props.patientToEdit) {
      dispatch(updatePatient({ id: props.patientToEdit.id, data: data }))
    }
  }

  return (
    <EuiForm component="form" onSubmit={onSubmit}>
      <EuiFlexGrid style={{ maxWidth: 1200 }} component="span" columns={2}>
        <EuiFlexItem grow={2}>
          <FieldInput
            fieldValidation={correctTextInput}
            initialValue={patient.firstName}
            label="First name"
            setValue={setFirstName}
            setValid={setIsFirstNameValid}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={2}>
          <FieldInput
            fieldValidation={correctTextInput}
            initialValue={patient.lastName}
            label="Last name"
            setValue={setLastName}
            setValid={setIsLastNameValid}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <FieldInput
            fieldValidation={isNotEmpty}
            initialValue={patient.email}
            label="Email"
            setValue={setEmail}
            setValid={setIsEmailValid}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <FieldInput
            fieldValidation={hasOnlyNumbers}
            initialValue={patient.pesel}
            label="Pesel"
            setValue={setPesel}
            setValid={setIsPeselValid}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <FieldInput
            fieldValidation={correctTextInput}
            initialValue={patient.address.city}
            label="City"
            setValue={setCity}
            setValid={setIsCityValid}
          />
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: 100 }}>
          <FieldInput
            fieldValidation={isNotEmpty}
            initialValue={patient.address.postalCode}
            label="Postal code"
            setValue={setPostalCode}
            setValid={setIsPostalCodeValid}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <FieldInput
            fieldValidation={correctTextInput}
            initialValue={patient.address.street}
            label="Street"
            setValue={setStreet}
            setValid={setIsStreetValid}
          />
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: 100 }}>
          <FieldInput
            fieldValidation={hasOnlyNumbers}
            initialValue={patient.address.buildingNumber === 0 ? '' : patient.address.buildingNumber.toString()}
            label="Building"
            setValue={setBuildingNumber}
            setValid={setIsBuildingNumberValid}
          />
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: 200 }}>
          <FieldInput
            fieldValidation={hasOnlyNumbers}
            initialValue={patient.address.apartmentNumber ? patient.address.apartmentNumber.toString() : ''}
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
  )
}
