import React from 'react'

import { Box, Toolbar, Container } from '@mui/material';

interface MainSectionProps {
  children: React.ReactNode,
}

const MainSectionComponent: React.FC<MainSectionProps> = ({ children }) => {  
  return (
    <Box
      // sx={{
      //   backgroundColor: (theme) =>
      //     theme.palette.mode === 'light'
      //       ? theme.palette.grey[100]
      //           :   theme.palette.grey[900],
      //   flexGrow: 1,
      //   // width: '100%',
      //   // height  : '100vh',
      //   overflow: 'auto',
      // }}
      sx={{
        // flexGrow     : 1,
        paddingY     : 8,
        // paddingX     : 2,
        // width        : '100%',
        // display      : 'flex',
        // flexDirection: 'column',
        // minHeight    : '100vh',
        // overflow     : 'auto',
      }}
    >
      {/* <Toolbar /> */}
      <Container disableGutters maxWidth={false} sx={{ display: "block", px: 3, my: 3 }}>
        {children}
      </Container> 
    </Box>
  )
}

export default MainSectionComponent;