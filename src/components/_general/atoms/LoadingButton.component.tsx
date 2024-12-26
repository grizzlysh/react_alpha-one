import React from 'react';
import Button, { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material';

interface LoadingButtonProps extends MUIButtonProps {
  isLoading  : boolean,
  buttonColor: 'primary' | 'secondary' | 'shadow' | 'radiance' | 'error' | 'warning',
  children   : React.ReactNode,
}

const LoadingButtonComponent: React.FC<LoadingButtonProps> = ({ isLoading, buttonColor, children, ...props }) => {

  const theme = useTheme();

  return (
    <>
    { (isLoading) ?
      <Button
        variant   = 'contained'
        // color     = {buttonColor}
        sx        = {{
          backgroundColor: theme.palette[buttonColor != undefined ? buttonColor : 'shadow'].main,
          borderColor    : theme.palette[buttonColor != undefined ? buttonColor : 'shadow'].main,
          color          : theme.palette.radiance.light,
          textTransform  : 'none !important',
          px             : '12px',
          borderRadius   : 2,
          fontSize       : '0.875rem',
          fontWeight     : 700,
          lineHeight     : 1.5,
          transition     : 'all 0.3s ease',
          '&:hover'      : {
            variant        : 'outlined',
            backgroundColor: theme.palette.radiance.light,
            borderColor    : theme.palette.radiance.light,
            color          : theme.palette[buttonColor != undefined ? buttonColor : 'shadow'].main,
          },
        }}
        {...props}
      >
        <CircularProgress size={'1.5rem'} sx={{ color: '#fff' }}/>
      </Button>
    :
      <Button
        variant   = 'contained'
        // color     = {buttonColor}
        sx        = {{
          backgroundColor: theme.palette[buttonColor != undefined ? buttonColor : 'shadow'].main,
          borderColor    : theme.palette[buttonColor != undefined ? buttonColor : 'shadow'].main,
          color          : theme.palette.radiance.light,
          textTransform  : 'none !important',
          px             : '12px',
          borderRadius   : 2,
          fontSize       : '0.875rem',
          fontWeight     : 700,
          lineHeight     : 1.5,
          transition     : 'all 0.3s ease',
          '&:hover'      : {
            variant        : 'outlined',
            backgroundColor: theme.palette.radiance.light,
            borderColor    : theme.palette.radiance.light,
            color          : theme.palette[buttonColor != undefined ? buttonColor : 'shadow'].main,
          },
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