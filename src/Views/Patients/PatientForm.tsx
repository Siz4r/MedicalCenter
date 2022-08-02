import { EuiFieldNumber, EuiFieldText, EuiFlexGrid, EuiFlexItem, EuiForm, EuiFormRow } from '@elastic/eui'
import { Patient } from '../../store/Patient/types'

type Props = {
  patientToEdit: Patient | undefined
}

export const PatientForm = (props: Props) => {
  return (
    <EuiForm component="form">
      <EuiFlexGrid style={{ maxWidth: 1200 }} component="span" columns={2}>
        <EuiFlexItem grow={2}>
          <EuiFormRow label="First name">
            <EuiFieldText name="firstName" value={props.patientToEdit?.firstName} />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem grow={2}>
          <EuiFormRow label="Last name">
            <EuiFieldText name="lastName" value={props.patientToEdit?.lastName} />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Email">
            <EuiFieldText name="email" value={props.patientToEdit?.email} />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Pesel">
            <EuiFieldText name="pesel" value={props.patientToEdit?.pesel} />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="City">
            <EuiFieldText name="city" value={props.patientToEdit?.address.city} />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: 100 }}>
          <EuiFormRow label="Postal-Code" style={{ maxWidth: 100 }}>
            <EuiFieldNumber name="postalCode1" value={props.patientToEdit?.address.prePostalCode} />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: 100 }}>
          <EuiFormRow hasEmptyLabelSpace style={{ maxWidth: 100 }}>
            <EuiFieldNumber name="postalCode2" value={props.patientToEdit?.address.postPostalCode} />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Street">
            <EuiFieldText name="street" value={props.patientToEdit?.address.street} />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: 100 }}>
          <EuiFormRow label="Building">
            <EuiFieldNumber name="buildingNumber" value={props.patientToEdit?.address.buildingNumber} />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: 100 }}>
          <EuiFormRow label="Apartment">
            <EuiFieldNumber name="apartmentNumber" value={props.patientToEdit?.address.apartmentNumber} />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGrid>
    </EuiForm>
  )
}
