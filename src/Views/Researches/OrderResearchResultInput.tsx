import useInput from '../../hooks/useInput'
import { correctTextInput } from '../Patients/PatientForm'
import { EuiButton, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiFormRow, EuiText, EuiTextArea } from '@elastic/eui'
import { CombinedState, ThunkDispatch } from '@reduxjs/toolkit'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { updateOrderResearchResult } from '../../store/Research/api'
import { useState } from 'react'

type Props = {
  initialValue: string
  name: string
  researchId: string
  orderResearchId: string
}

export const OrderResearchResultInput = (props: Props) => {
  const {
    value: resultValue,
    isValid: resultIsValid,
    hasError: resultHasError,
    valueChangeHandler: resultChangeHandler,
    inputBlurHandler: resultBlurHandler,
  } = useInput(correctTextInput, props.initialValue)

  const [newValueSetted, setNewValueSetted] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const onSetResult = () => {
    if (resultIsValid) {
      dispatch(
        updateOrderResearchResult({ id: props.orderResearchId, result: resultValue, researchId: props.researchId })
      )
      setNewValueSetted(true)
    }
  }

  return (
    <EuiFlexGroup>
      <EuiFlexItem>
        {newValueSetted && <EuiText color="green">New result set</EuiText>}
        <EuiFormRow hasEmptyLabelSpace isInvalid={resultHasError}>
          <EuiFlexGroup>
            <EuiFlexItem>
              <EuiTextArea
                value={resultValue}
                defaultValue={resultValue}
                name={props.name}
                onChange={resultChangeHandler}
                onBlur={resultBlurHandler}
              />
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiButton onClick={onSetResult}>Set result</EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFormRow>
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}
