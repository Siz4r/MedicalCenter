import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiLoadingSpinner } from '@elastic/eui'
import { usePatients } from '../../hooks/usePatients'
import { useProjects } from '../../hooks/useProjects'
import { useResearches } from '../../hooks/useResearches'

export const Summary = () => {
  const { isLoading: patientsLoading, patients } = usePatients({
    fetchOnMount: true,
  })
  const { isLoading: projectsLoading, projects } = useProjects({
    fetchOnMount: true,
  })
  const { isLoading: researchesLoading, researches } = useResearches({
    fetchOnMount: true,
  })

  return projectsLoading && patientsLoading && researchesLoading ? (
    <EuiLoadingSpinner size={'l'} />
  ) : (
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiCard title="Ilość pacjentów" description={patients.length} />
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiCard title="Ilość projektów" description={projects.length} />
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiCard title="Ilość badań" description={researches.length} />
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}
