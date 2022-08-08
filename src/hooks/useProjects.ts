import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { Project } from '../store/Project/types'
import { getProjects } from '../store/Project/api'

type UseProjectsConfig = {
  fetchOnMount?: boolean
}

export const useProjects = (config: UseProjectsConfig | undefined = undefined) => {
  const fetchOnMount = !(config && config.fetchOnMount === false)
  const [projectsLoading, setProjectsLoading] = useState(fetchOnMount)

  const dispatch = useAppDispatch()

  const projects = useAppSelector(({ projects }) => {
    return projects.projects
  })

  const fetchClients = async () => {
    setProjectsLoading(true)
    await dispatch(getProjects())
    setProjectsLoading(false)
  }

  useEffect(() => {
    if (fetchOnMount) {
      try {
        fetchClients()
      } catch (error) {
        console.log(error)
      }
    }
  }, [])

  return {
    projects,
    projectsLoading,
  }
}
