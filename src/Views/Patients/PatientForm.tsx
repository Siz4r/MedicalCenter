import { EuiButton, EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiForm, EuiSpacer } from '@elastic/eui'
import { Patient } from '../../store/Patient/types'
import PatientFieldInput from './PatientFieldInput'
import React, {FormEvent, useState} from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { addPatient } from '../../store/Patient/api'

type Props = {
  patientToEdit: Patient | undefined
  isEditing: boolean
}

const isNotEmpty = (value: string) => value.trim().length > 2
const hasOnlyNumbers = (value: string) => /^\d+$/.test(value)
const hasOnlyLetters = (value: string) => !/[^a-zżźółćśęąń]/i.test(value)
const correctTextInput = (value: string) => isNotEmpty(value) && hasOnlyLetters(value)

export const PatientForm = (props: Props) => {
  const patient = props.patientToEdit

  if (!patient || !props.patientToEdit) {
    return <div></div>
  }

  const [isFirstNameValid, setIsFirstNameValid] = useState(false)
  const [isLastNameValid, setIsLastNameValid] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPeselValid, setIsPeselValid] = useState(false)
  const [isStreetValid, setIsStreetValid] = useState(false)
  const [isCityValid, setIsCityValid] = useState(false)
  const [isPostalCodeValid, setIsPostalCodeValid] = useState(false)
  const [isBuildingNumberValid, setIsBuildingNumberValid] = useState(false)
  const [isApartmentNumberValid, setIsApartmentNumberValid] = useState(false)

  const [postalCode, setPostalCode] = useState(props.patientToEdit.address.postalCode)
  const [buildingNumber, setBuildingNumber] = useState(props.patientToEdit.address.buildingNumber.toString())
  const [apartmentNumber, setApartmentNumber] = useState(
    props.patientToEdit.address.apartmentNumber ? props.patientToEdit.address.apartmentNumber.toString() : ''
  )
  const [firstName, setFirstName] = useState<string>(patient?.firstName)
  const [lastName, setLastName] = useState<string>(props.patientToEdit.lastName)
  const [email, setEmail] = useState<string>(props.patientToEdit.email)
  const [pesel, setPesel] = useState<string>(props.patientToEdit.pesel)
  const [street, setStreet] = useState(props.patientToEdit.address.street)
  const [city, setCity] = useState(props.patientToEdit.address.city)
  const dispatch = useDispatch<AppDispatch>()

  const renderSubmitButton = () => {
    return props.isEditing ? (
      <EuiButton type="submit" color="warning">
        Edit patient
      </EuiButton>
    ) : (
      <EuiButton type="submit" color="success">
        Add patient
      </EuiButton>
    )
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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

    if (validateInputs()) {
      try {
        console.log(isCityValid)
        dispatch(
          addPatient({
            firstName: firstName,
            lastName: lastName,
            email: email,
            pesel: pesel,
            address: {
              apartmentNumber: parseInt(apartmentNumber),
              postalCode: postalCode,
              buildingNumber: parseInt(buildingNumber),
              street: street,
              city: city,
            },
          })
        )
      } catch (error: any) {}
    }
  }

  return (
    <EuiForm
      component="form"
      onSubmit={onSubmit}
    >
      <EuiFlexGrid style={{ maxWidth: 1200 }} component="span" columns={2}>
        <EuiFlexItem grow={2}>
          <PatientFieldInput
            fieldValidation={correctTextInput}
            initialValue={props.patientToEdit.firstName}
            label="First name"
            setValue={setFirstName}
            setValid={setIsFirstNameValid}
          />
        </EuiFlexItem>
        <EuiFlexItem grow={2}>
          <PatientFieldInput
            fieldValidation={correctTextInput}
            initialValue={props.patientToEdit.lastName}
            label="Last name"
            setValue={setLastName}
            setValid={setIsLastNameValid}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <PatientFieldInput
            fieldValidation={isNotEmpty}
            initialValue={props.patientToEdit.email}
            label="Email"
            setValue={setEmail}
            setValid={setIsEmailValid}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <PatientFieldInput
            fieldValidation={hasOnlyNumbers}
            initialValue={props.patientToEdit.pesel}
            label="Pesel"
            setValue={setPesel}
            setValid={setIsPeselValid}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <PatientFieldInput
            fieldValidation={correctTextInput}
            initialValue={props.patientToEdit.address.city}
            label="City"
            setValue={setCity}
            setValid={setIsCityValid}
          />
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: 100 }}>
          <PatientFieldInput
            fieldValidation={isNotEmpty}
            initialValue={props.patientToEdit.address.postalCode}
            label="Postal code"
            setValue={setPostalCode}
            setValid={setIsPostalCodeValid}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <PatientFieldInput
            fieldValidation={correctTextInput}
            initialValue={props.patientToEdit.address.street}
            label="Street"
            setValue={setStreet}
            setValid={setIsStreetValid}
          />
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: 100 }}>
          <PatientFieldInput
            fieldValidation={hasOnlyNumbers}
            initialValue={
              props.patientToEdit.address.buildingNumber === 0
                ? ''
                : props.patientToEdit.address.buildingNumber.toString()
            }
            label="Building"
            setValue={setBuildingNumber}
            setValid={setIsBuildingNumberValid}
          />
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: 200 }}>
          <PatientFieldInput
            fieldValidation={hasOnlyNumbers}
            initialValue={
              props.patientToEdit.address.apartmentNumber ? props.patientToEdit.address.apartmentNumber.toString() : ''
            }
            label="Apartment Number"
            setValue={setApartmentNumber}
            setValid={setIsApartmentNumberValid}
          />
        </EuiFlexItem>
        <EuiFlexGroup alignItems="center">
          <EuiFlexItem>
            <EuiSpacer size="m" />
            <div>{renderSubmitButton()}</div>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexGrid>
    </EuiForm>
  )
}
