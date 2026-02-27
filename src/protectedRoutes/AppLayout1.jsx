import React from 'react'
import { Outlet } from 'react-router-dom'

import AppNavbar1 from './AppNavbar1'
import AppFooter1 from './AppFooter1'
import NavbarChatgptLayout from './NavbarChatgptLayout'
import ChatBodyLayout from './ChatBodyLayout'
import SideNavbarLayout from './SideNavbarLayout'
import ChatGPTLayout from './PageLayout'

const AppLayout1 = () => {
  return (
    <>
        {/* <AppNavbar1 /> */}
        <div className='flex'>
        <SideNavbarLayout />
        <Outlet /> 

        {/* <NavbarChatgptLayout /> */}
        {/* <Outlet />             use chatbodylayout page */}
        {/* <ChatBodyLayout /> */}
        {/* <AppFooter1 /> */}
        </div>
    </>
  )
}

export default AppLayout1;