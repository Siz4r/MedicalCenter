import { getResearches } from '../store/Research/api'
import { fetchOnMount } from './fetchOnMount'
import { useAppDispatch, useAppSelector } from './reduxHooks'

type Props = {
  fetchOnMount?: boolean
}

export const useResearches = (props: Props) => {
  fetchOnMount({
    fetchOnMount: props.fetchOnMount,
    fetch: async () => {
      await dispatch(getResearches())
    },
  })

  const dispatch = useAppDispatch()

  const { researches, isLoading } = useAppSelector(({ researches }) => {
    return researches
  })

  return {
    researches,
    isLoading,
  }
}
