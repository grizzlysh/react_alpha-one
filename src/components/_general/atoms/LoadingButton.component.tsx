import React from 'react';
import Button, { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import theme from '@/utils/theme';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingButtonProps extends MUIButtonProps {
  isLoading  : boolean,
  buttonColor: 'primary' | 'secondary' | 'error' | 'warning'
  children   : React.ReactNode,
}

const LoadingButtonComponent: React.FC<LoadingButtonProps> = ({ isLoading, buttonColor, children, ...props }) => {

  return (
    <>
    { (isLoading) ?
      <Button
        variant   = 'contained'
        color     = {buttonColor}
        sx        = {{
          textTransform  : 'none',
          px             : '12px',
          borderRadius   : 2,
          fontSize       : '0.875rem',
          fontWeight     : 700,
          lineHeight     : 1.5,
        }}
        {...props}
      >
        <CircularProgress size={'1.5rem'} sx={{ color: '#fff' }}/>
      </Button>
    :
      <Button
        variant   = 'contained'
        color     = {buttonColor}
        sx        = {{
          textTransform  : 'none',
          px             : '12px',
          borderRadius   : 2,
          fontSize       : '0.875rem',
          fontWeight     : 700,
          lineHeight     : 1.5,
        }}
        {...props}
      >
        { children }
      </Button>
    }
    </>
  )
}

export default LoadingButtonComponent;