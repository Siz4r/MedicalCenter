import { useAppDispatch, useAppSelector } from './reduxHooks'
import { getProjects } from '../store/Project/api'
import { fetchOnMount } from './fetchOnMount'

type Props = {
  fetchOnMount?: boolean
}

export const useProjects = (props: Props) => {
  fetchOnMount({
    fetchOnMount: props.fetchOnMount,
    fetch: async () => {
      await dispatch(getProjects())
    },
  })

  const dispatch = useAppDispatch()

  const { projects, isLoading } = useAppSelector(({ projects }) => {
    return projects
  })

  return {
    projects,
    isLoading,
  }
}
