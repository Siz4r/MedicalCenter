import {EuiCard, EuiFlexGroup, EuiFlexItem, EuiLoadingSpinner} from '@elastic/eui'
import {usePatients} from "../../hooks/usePatients";
import {useProjects} from "../../hooks/useProjects";

export const Summary = () => {
    const {patientsLoading, patients} = usePatients({
        fetchOnMount: true
    });
    const {projectsLoading, projects} = useProjects({
        fetchOnMount: true
    })

  return ((projectsLoading && patientsLoading) ? <EuiLoadingSpinner size={"l"}/> :
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiCard
              title="Ilość pacjentów"
              description={patients.length}
          />
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiCard
              title="Ilość projektów"
              description={projects.length}
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard
              title="Ilość badań"
              description="25"
          />
        </EuiFlexItem>

      </EuiFlexGroup>
  )
}
