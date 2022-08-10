import { useAppDispatch, useAppSelector } from './reduxHooks'
import { getPatients } from '../store/Patient/api'
import { fetchOnMount } from './fetchOnMount'

type Props = {
  fetchOnMount?: boolean
}

export const usePatients = (props: Props) => {
  const dispatch = useAppDispatch()

  const { patients, isLoading } = useAppSelector(({ patients }) => {
    return patients
  })

  fetchOnMount({
    fetchOnMount: props.fetchOnMount,
    fetch: async () => {
      await dispatch(getPatients())
    },
  })

  return {
    isLoading,
    patients,
  }
}
