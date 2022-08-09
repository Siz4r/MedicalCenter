import { useEffect } from 'react'

type fetchOnMountConfig = {
  fetchOnMount?: boolean
  fetch: () => Promise<void>
}

export const fetchOnMount = (config: fetchOnMountConfig) => {
  const fetchOnMount = !(config && config.fetchOnMount === false)

  useEffect(() => {
    if (fetchOnMount) {
      try {
        config.fetch()
      } catch (error) {
        console.log(error)
      }
    }
  }, [])
}
