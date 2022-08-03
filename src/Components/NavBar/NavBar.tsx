import { EuiSideNav, htmlIdGenerator } from '@elastic/eui'
import { useState } from 'react'

export const NavBar = () => {
  const [isSideNavOpenOnMobile, setisSideNavOpenOnMobile] = useState(false)

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
          href: '/summary/',
        },
        {
          name: 'Patients',
          id: htmlIdGenerator('basicExample')(),
          href: '/patients/',
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
