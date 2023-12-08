import React from 'react';
import Button, { ButtonProps as MUIButtonProps } from '@mui/material/Button';

interface ButtonProps extends MUIButtonProps {
  // title     : string,
  // isLoading?: boolean,
  children  : React.ReactNode,
  // handleClick?: () => void,
}

const ButtonComponent: React.FC<ButtonProps> = ({ children, ...props }) => {

  return (
      <Button
      // startIcon = { icon && icon }
        variant   = 'contained'
        color     = 'secondary'
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
  )
}

export default ButtonComponent;