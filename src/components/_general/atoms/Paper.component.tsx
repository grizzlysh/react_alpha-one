import React from 'react';

import Paper, { PaperProps as MUIPaperProps } from '@mui/material/Paper';
import { useTheme } from '@mui/material';

interface PaperProps extends MUIPaperProps {
  children  : React.ReactNode
}

const PaperComponent: React.FC<PaperProps> = ({ children }) => {
  
  const theme = useTheme();
  
  return (
    <Paper
      sx = {{
        borderRadius               : 4,
        p                          : 2,
        backgroundColor            : theme.palette.radiance.light,
        flexDirection              : 'column',
        '@media (min-width: 900px)': {
          marginBottom: 5,
        },
        '@media (min-width: 0px)'  : {
          marginBottom: 3,
        }
      }}
    >
      {children}
    </Paper>
  )
}

export default PaperComponent;