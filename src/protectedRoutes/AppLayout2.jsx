import React from 'react'
import { Outlet } from 'react-router-dom'

import AppNavbar2 from './AppNavbar2'

const AppLayout2 = () => {
  return (
    <>
        <AppNavbar2 />
        <Outlet />  
    </>
  )
}

export default AppLayout2;