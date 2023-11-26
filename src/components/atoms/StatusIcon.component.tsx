import React from 'react';

import { Box, CircularProgress, IconButton, Stack } from '@mui/material'

interface StatusIconProps {
  color: string,
  icon : React.ReactNode,
}

const StatusIconComponent: React.FC<StatusIconProps> = ({ color, icon }) => {

  return (
    <Stack position="relative" display="flex" direction={"row"}>
      <CircularProgress  
        size    = {'60px'}
        variant = "determinate"
        value   = {100}
        thickness={2.7}
        sx={{
          display   : 'inline-block',
          position  : 'absolute',
          transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          color     : "rgb(145 158 171 / 40%)",
          opacity   : 0.48,
          top       : '0px',
          left      : '0px',
        }}
      />
      <CircularProgress  
        size    = {'60px'}
        variant = "determinate"
        value   = {30}
        thickness={2.7}
        sx={{
          display        : 'inline-block',
          transition     : "transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          color          : color,
          opacity        : 0.48,
        }}
      />
      <Box
          top            = {0}
          left           = {0}
          bottom         = {0}
          right          = {0}
          position       = "absolute"
          display        = "flex"
          alignItems     = "center"
          justifyContent = "center"
      >
        <IconButton
          size = 'large'
          sx   = {{
            color: color,
          }}
        >
          {icon}
        </IconButton>
          {/* <Typography variant="caption" component="div" color="textSecondary">

              <PeopleIcon fontSize='large' sx={{ color: 'rgb(0, 184, 217)' }}/>
          </Typography> */}
      </Box>
    </Stack>
  )
}

export default StatusIconComponent;