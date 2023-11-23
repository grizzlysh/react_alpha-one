import React from 'react';
import Link from 'next/link';

import { Box, Toolbar, IconButton, Typography, Divider, List, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import menu from '@/utils/menu';


interface AppMenuProps {
  pathActive  : string,
  handleDrawer: () => void,
}

const AppMenuComponent: React.FC<AppMenuProps> = ({ pathActive, handleDrawer }) => {

  return (
    <>
      <Toolbar
        sx = {{
          display   : 'fixed',
          alignItems: 'center',
          top       : 0,
          left      : 0,
          right     : 0,
          zIndex    : '-10',
          px        : [1],
          boxShadow : '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
          // justifyContent: 'flex-end',
        }}
      >
        <Typography 
          variant  = "h4"
          flexGrow = {1}
          align    = {"center"}
          color    = "primary"
        >
          MENU
        </Typography>
        <IconButton onClick={handleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      
      <Box 
        sx = {{
          position:'relative',
          overflow: "auto",
        }}
      >
        <List 
          component = "nav"
          sx        = {{
            alignItems    : "center",
            alignContent  : "center",
            justifyContent: "center"
          }}
        >
        {/* <Stack component="nav"> */}
          {
            menu.map(menu => {
              const active = menu.path ? (pathActive === menu.path) : false;

              return (
                <Link 
                  key  = {menu.title}
                  href = {menu.path}
                  passHref
                >
                  <ListItemButton
                    sx= {{
                      pl: 2.5,
                    }}
                    selected    = {active}
                  >
                    <ListItemIcon>
                      {menu.icon}
                    </ListItemIcon>
                    <ListItemText primary={menu.title} />
                  </ListItemButton>
                </Link>
              );
            })
          }
        </List>
        {/* </Stack> */}
      </Box>
    </>

  )
}

export default AppMenuComponent;