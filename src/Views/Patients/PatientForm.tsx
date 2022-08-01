import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  useEuiBackgroundColor,
} from '@elastic/eui'

export const PatientForm = () => {
  return (
    <EuiForm component="form">
      <EuiFlexGroup style={{ maxWidth: 1200 }} component="span">
        <EuiFlexItem grow={2}>
          <EuiFormRow label="First name">
            <EuiFieldText name="firstName" />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem grow={2}>
          <EuiFormRow label="Last name">
            <EuiFieldText name="lastName" />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup style={{ maxWidth: 1200 }}>
        <EuiFlexItem>
          <EuiFormRow label="Email">
            <EuiFieldText name="firstName" />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow label="Pesel">
            <EuiFieldText name="lastName" />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiFormRow label="City">
            <div>
              <EuiFieldText name="firstName" />
            </div>
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: 100 }}>
          <div>
            <EuiFormRow label="Postal-Code" style={{ maxWidth: 100 }}>
              <EuiFieldText name="lastName" />
            </EuiFormRow>
          </div>
        </EuiFlexItem>
        <EuiFlexItem style={{ maxWidth: 100 }}>
          <div>
            <EuiFormRow hasEmptyLabelSpace style={{ maxWidth: 100 }}>
              <EuiFieldText name="lastName" />
            </EuiFormRow>
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiForm>
  )
}
