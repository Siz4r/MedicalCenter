import { EuiPageTemplate } from '@elastic/eui'
import { Route, Routes } from 'react-router-dom'
import { NavBar } from './Components/NavBar/NavBar'
import { Patients } from './Views/Patients/Patients'
import { Projects } from './Views/Projects/Projects'
import { Summary } from './Views/Summary/Summary'

function App() {
  return (
    <EuiPageTemplate pageSideBar={<NavBar />} restrictWidth="80%">
      <Routes>
        <Route path="/summary" element={<Summary />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </EuiPageTemplate>
  )
}

export default App
