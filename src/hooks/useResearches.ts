import { getResearches } from '../store/Research/api'
import { fetchOnMount } from './fetchOnMount'
import { useAppDispatch, useAppSelector } from './reduxHooks'

type Props = {
  fetchOnMount?: boolean
}

export const useResearches = (props: Props) => {
  const fetchResearches = async () => {
    await dispatch(getResearches())
  }

  fetchOnMount({
    fetchOnMount: props.fetchOnMount,
    fetch: fetchResearches,
  })

  const dispatch = useAppDispatch()

  const { researches, isLoading } = useAppSelector(({ researches }) => {
    return researches
  })

  return {
    researches,
    researchesLoading: isLoading,
  }
}
