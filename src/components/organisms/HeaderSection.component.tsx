import React from 'react'
import Box from '@mui/material/Box'
import TopBarComponent from '@/components/molecules/TopBar.component'
import SideBarComponent from '@/components/molecules/SideBar.component'

interface HeaderSectionProps {
  pathActive  : string,
  openDrawer  : boolean,
  handleDrawer: () => void,
  handleLogout: () => void,
}

const HeaderSectionComponent: React.FC<HeaderSectionProps> = ({ pathActive, openDrawer, handleDrawer, handleLogout }) => {
  
  return (
    <>
      <TopBarComponent openDrawer={openDrawer} handleDrawer={handleDrawer} handleLogout={handleLogout} />
      <SideBarComponent pathActive={pathActive} openDrawer={openDrawer} handleDrawer={handleDrawer}/>
    </>
  )
}

export default HeaderSectionComponent;