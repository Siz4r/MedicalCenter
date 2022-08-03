import { EuiFieldText, EuiFormRow } from '@elastic/eui'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import useInput from '../../hooks/useInput'

type Props = {
  fieldValidation: (value: string) => boolean
  initialValue: string
  label: string
  setValue: Dispatch<SetStateAction<string>>
  setValid: Dispatch<SetStateAction<boolean>>
}

function PatientFieldInput(props: Props) {
  const {
    value: fieldValue,
    isValid: fieldIsValid,
    hasError: fieldHasError,
    valueChangeHandler: fieldChangeHandler,
    inputBlurHandler: fieldBlurHandler,
    setValue,
  } = useInput(props.fieldValidation, props.initialValue)

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (fieldIsValid) {
      props.setValue(e.currentTarget.value)
      props.setValid(true)
    }

    fieldChangeHandler(e)
  }

  useEffect(() => {
    setValue(props.initialValue)
  }, [props.initialValue])

  return (
    <EuiFormRow label={props.label} isInvalid={fieldHasError}>
      <EuiFieldText name={props.label} value={fieldValue} onChange={onChangeHandler} onBlur={fieldBlurHandler} />
    </EuiFormRow>
  )
}

export default PatientFieldInput
