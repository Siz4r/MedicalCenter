import { EuiFlexGrid, EuiFlexItem, EuiForm } from '@elastic/eui'
import { Patient } from '../../store/Patient/types'
import PatientFieldInput from './PatientFieldInput'
import { useState } from 'react'

type Props = {
  patientToEdit: Patient | undefined
}

const isNotEmpty = (value: string) => value.trim().length > 2
const hasOnlyNumbers = (value: string) => /^\d+$/.test(value)
const hasOnlyLetters = (value: string) => !/[^a-zżźółćśęąń]/i.test(value)
const correctTextInput = (value: string) => isNotEmpty(value) && hasOnlyLetters(value)

export const PatientForm = (props: Props) => {
  if (!props.patientToEdit) {
    return <div></div>
  }

  const [isFirstNameValid, setIsFirstNameValid] = useState(false)
  const [isLastNameValid, setIsLastNameValid] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPeselValid, setIsPeselValid] = useState(false)
  const [isStreetValid, setIsStreetValid] = useState(false)
  const [isCityValid, setIsCityValid] = useState(false)
  const [isPrePostalCodeValid, setIsPrePostalCodeValid] = useState(false)
  const [isPostPostalCodeValid, setIsPostPostalCodeValid] = useState(false)
  const [isBuildingNumberValid, setIsBuildingNumberValid] = useState(false)
  const [isApartmentNumberValid, setIsApartmentNumberValid] = useState(false)

  const [prePostalCode, setPrePostalCode] = useState(props.patientToEdit.address.prePostalCode.toString())
  const [postPostalCode, setPostPostalCode] = useState(props.patientToEdit.address.postPostalCode.toString())
  const [buildingNumber, setBuildingNumber] = useState(props.patientToEdit.address.buildingNumber.toString())
  const [apartmentNumber, setApartmentNumber] = useState(
    props.patientToEdit.address.apartmentNumber ? props.patientToEdit.address.apartmentNumber.toString() : ''
  )
  const [firstName, setFirstName] = useState<string>(props.patientToEdit.firstName)
  const [lastName, setLastName] = useState<string>(props.patientToEdit.lastName)
  const [email, setEmail] = useState<string>(props.patientToEdit.email)
  const [pesel, setPesel] = useState<string>(props.patientToEdit.pesel)
  const [street, setStreet] = useState(props.patientToEdit.address.street)
  const [city, setCity] = useState(props.patientToEdit.address.city)

  return (
    <EuiForm
      component="form"
      onSubmit={(event: any) => {
        event.preventDefault()
        console.log(event.target)
      }}
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
            fieldValidation={hasOnlyNumbers}
            initialValue={prePostalCode.toString()}
            label="Postal code"
            setValue={setPrePostalCode}
            setValid={setIsPrePostalCodeValid}
          />
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: 100 }}>
          <PatientFieldInput
            fieldValidation={hasOnlyNumbers}
            initialValue={postPostalCode.toString()}
            label=""
            setValue={setPostPostalCode}
            setValid={setIsPostPostalCodeValid}
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
            initialValue={buildingNumber.toString()}
            label="Building number"
            setValue={setBuildingNumber}
            setValid={setIsApartmentNumberValid}
          />
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: 100 }}>
          <PatientFieldInput
            fieldValidation={hasOnlyNumbers}
            initialValue={apartmentNumber.toString()}
            label="Apartment number"
            setValue={setApartmentNumber}
            setValid={setIsApartmentNumberValid}
          />
        </EuiFlexItem>
      </EuiFlexGrid>
      <button type="submit">submit</button>
    </EuiForm>
  )
}
