import { EuiSideNav, htmlIdGenerator } from '@elastic/eui'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const NavBar = () => {
  const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false)
  const navigate = useNavigate()

  const toggleOpenOnMobile = () => {
    setisSideNavOpenOnMobile(!isSideNavOpenOnMobile)
  }

  const sideNav = [
    {
      name: 'Medical Center',
      id: htmlIdGenerator('basicExample')(),
      items: [
        {
          name: 'Summary',
          id: htmlIdGenerator('basicExample')(),
          onClick: () => navigate('/summary/'),
        },
        {
          name: 'Patients',
          id: htmlIdGenerator('basicExample')(),
          onClick: () => navigate('/patients/'),
        },
        {
          name: 'Projects',
          id: htmlIdGenerator('projects')(),
          onClick: () => navigate('/projects/'),
        },
        {
          name: 'Project Participations',
          id: htmlIdGenerator('participation')(),
          onClick: () => navigate('/projectParticipations/'),
        },
        {
          name: 'Researches',
          id: htmlIdGenerator('research')(),
          onClick: () => navigate('/researches/'),
        },
      ],
    },
  ]

  return (
    <div>
      <EuiSideNav
        aria-label="Basic example"
        mobileTitle="Basic example"
        toggleOpenOnMobile={() => toggleOpenOnMobile()}
        isOpenOnMobile={isSideNavOpenOnMobile}
        items={sideNav}
      />
    </div>
  )
}
