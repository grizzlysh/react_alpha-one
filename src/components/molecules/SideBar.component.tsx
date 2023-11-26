import React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { DRAWER_WIDTH } from '@/configs/constant';
import {  Box, Drawer, DrawerProps } from '@mui/material';
import AppMenuComponent from '@/components/compounds/AppMenu.component';

interface DesktopDrawerProps extends DrawerProps {
  open?: boolean;
}

const DesktopDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<DesktopDrawerProps>(
  ({ theme, open }) => ({
    width     : DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing : 'border-box',
    ...(open && {
      width     : DRAWER_WIDTH,
      overflowX : 'hidden',
      transition: theme.transitions.create('width', {
        easing  : theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      // '*::-webkit-scrollbar': {
      //   width: '0.5rem'
      // },
      // '*::-webkit-scrollbar-track': {
      //   '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      //   backgroundColor     : '#E5E7EB',
      //   borderRadius        : '.5rem'
      // },
      // '*::-webkit-scrollbar-thumb': {
      //   backgroundColor: '#6B7280',
      //   borderRadius   : '.5rem'
      //   // backgroundColor: 'rgba(0,0,0,.1)',
      //   // outline        : '1px solid slategrey',
      // },
      '& .MuiDrawer-paper': {
        // boxShadow      : '1px 0px 2px -1px rgba(0,0,0,0.2), 2px 0px 2px 0px rgba(0,0,0,0.14), 1px 0px 5px 0px rgba(0,0,0,0.12)',
        // boxShadow      : '1px 0px 3px rgba(0, 0, 0, 0.125)',
        backgroundColor: 'transparent',
        width          : DRAWER_WIDTH,
        easing         : theme.transitions.easing.sharp,
        transition     : theme.transitions.create('width', {
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
      },
    }),
    ...(!open && {
      overflowX : 'hidden',
      overflowY : 'hidden',
      width     : `calc(${theme.spacing(7)} + 1px)`,
      transition: theme.transitions.create('width', {
        easing  : theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
      },
      '& .MuiDrawer-paper': {
        // boxShadow      : '1px 0px 2px -1px rgba(0,0,0,0.2), 2px 0px 2px 0px rgba(0,0,0,0.14), 1px 0px 5px 0px rgba(0,0,0,0.12)',
        // boxShadow             : '1px 0px 3px rgba(0, 0, 0, 0.125)',
        backgroundColor       : 'transparent',
        "*::-webkit-scrollbar": {
          display: "none",
        },
        "-ms-overflow-style"  : "none",
        "scrollbar-width"     : "none",
        overflowY             : 'hidden',
        overflowX             : 'hidden',
        width                 : `calc(${theme.spacing(7)} + 1px)`,
        transition            : theme.transitions.create('width', {
          easing  : theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up('sm')]: {
          width: `calc(${theme.spacing(8)} + 1px)`,
        },
      },
    }),
  }),
);

interface SideBarProps {
  pathActive  : string,
  openDrawer  : boolean,
  handleDrawer: () => void,
  // handleLogout: () => void,
}

const SideBarComponent: React.FC<SideBarProps> = ({ pathActive, openDrawer, handleDrawer }) => {

  const theme        = useTheme();
  const matches      = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box display="absolute">
    {
      matches ? 
      <Drawer
        variant    = "temporary"
        open       = {openDrawer}
        anchor     = 'left'
        onClose    = {handleDrawer}
        ModalProps = {{ keepMounted: true, }}  // Better open performance on mobile. 
        sx         = {{
          // zIndex: 3,
          // flexShrink          : 0,
          // display             : { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          // width               : drawerWidth
        }}
      >
        <AppMenuComponent
          openDrawer   = {openDrawer}
          pathActive   = {pathActive}
          handleDrawer = {handleDrawer}
        />
      </Drawer>
      :
      <DesktopDrawer
        variant = "permanent"
        open    = {openDrawer}
      >
        <AppMenuComponent
          openDrawer   = {openDrawer}
          pathActive   = {pathActive}
          handleDrawer = {handleDrawer}
        />
      </DesktopDrawer>
    }
    </Box>
  )
}

export default SideBarComponent;
