import React, { useReducer } from 'react'

type ValidateValue = {
  (args: string): boolean
}

type S = {
  value: string
  isTouched: boolean
}

type A = { type: 'INPUT'; value: string } | { type: 'BLUR' } | { type: 'RESET' }

const createInitialInputState = (initialValue: string) => {
  return { value: initialValue, isTouched: false }
}

const inputStateReducer = (state: S, action: A): S => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched }
  }
  if (action.type === 'BLUR') {
    return { isTouched: true, value: state.value }
  }
  if (action.type === 'RESET') {
    return { isTouched: false, value: '' }
  }
  return { isTouched: false, value: state.value }
}

const useInput = (validateValue: ValidateValue, initialValue: string) => {
  const initialInputState = createInitialInputState(initialValue)

  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState)

  const valueIsValid = validateValue(inputState.value)
  const hasError = !valueIsValid && inputState.isTouched

  const valueChangeHandler = (event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => {
    dispatch({ type: 'INPUT', value: event.currentTarget.value })
  }

  const inputBlurHandler = (event: React.FormEvent) => {
    dispatch({ type: 'BLUR' })
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  const setValue = (newValue: string) => {
    dispatch({ type: 'INPUT', value: newValue })
  }

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    setValue,
  }
}

export default useInput
