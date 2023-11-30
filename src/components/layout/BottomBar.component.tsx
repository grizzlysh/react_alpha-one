import React from 'react'

import { Box, Typography } from '@mui/material';
import MuiLink from '@mui/material/Link';


const BottomBarComponent: React.FC = () => {  
  return (
    <Box sx={{
      alignContent  : 'center',
      justifyContent: 'center',
    }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <MuiLink color="inherit" href="https://mui.com/">
          Your Website
        </MuiLink>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  )
}

export default BottomBarComponent;