import React from 'react';
import Link from 'next/link';

import { Box, Toolbar, IconButton, Typography, Divider, List, ListItemButton, ListItemIcon, ListItemText, Stack, Link as MUILink } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import menu from '@/utils/menu';
import theme from '@/utils/theme';


interface AppMenuProps {
  openDrawer  : boolean,
  pathActive  : string,
  handleDrawer: () => void,
}

const AppMenuComponent: React.FC<AppMenuProps> = ({ openDrawer, pathActive, handleDrawer }) => {

  return (
    <>
      <Toolbar
        sx = {{
          display        : 'fixed',
          alignItems     : 'center',
          top            : 0,
          left           : 0,
          right          : 0,
          zIndex         : '-10',
          px             : [1],
          boxShadow      : openDrawer ? '0px 1px 3px rgba(0, 0, 0, 0.125)' : '',
          // boxShadow      : openDrawer ? '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)': '',
          // backgroundColor: 'transparent',
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
          position : 'relative',
          overflowY: "auto",
          overflowX: "hidden",
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
                <MUILink
                  passHref
                  key       = {menu.title}
                  component = {Link}
                  // height    = {24}
                  underline = "hover"
                  href      = {menu.path}
                  variant   = 'h1'
                  sx        = {{
                    textDecoration: 'none',
                    display       : 'flex',
                    alignItems    : 'center',
                    lineHeight    : 1.5,
                    fontSize      : '0.875rem',
                    fontWeight    : 700,
                    "&:hover"     : {
                      color         : theme.palette.primary.main,
                      textDecoration: "none"
                    }
                  }}
                >
                {/* <Link 
                  key  = {menu.title}
                  href = {menu.path}
                  passHref
                > */}
                  <ListItemButton
                    sx= {{
                      pl: 2.5,
                    }}
                    selected    = {active}
                  >
                    <ListItemIcon>
                      {menu.icon}
                    </ListItemIcon>
                    <ListItemText
                      // primary={menu.title}
                    >
                      <Typography sx = {{
                        lineHeight    : 1.5,
                        // fontSize      : '0.875rem',
                        fontWeight    : 500,
                      }}  > 
                        {menu.title}
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                {/* </Link> */}
              </MUILink>
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