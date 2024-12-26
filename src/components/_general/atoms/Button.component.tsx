import React from 'react';
import Button, { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import { useTheme } from '@mui/material';
interface ButtonProps extends MUIButtonProps {
  // title     : string,
  // isLoading?: boolean,
  buttonColor?: 'primary' | 'secondary' | 'shadow' | 'radiance' | 'error' | 'warning',
  children    : React.ReactNode,
  // handleClick?: () => void,
}

const ButtonComponent: React.FC<ButtonProps> = ({ buttonColor, children, ...props }) => {

  const theme = useTheme()

  return (
      <Button
      // startIcon = { icon && icon }
        variant   = 'contained'
        // color     = {buttonColor}
        sx        = {{
          textTransform  : 'none',
          backgroundColor: theme.palette[buttonColor != undefined ? buttonColor : 'shadow'].main,
          borderColor    : theme.palette[buttonColor != undefined ? buttonColor : 'shadow'].main,
          color          : theme.palette.radiance.light,
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
  )
}

export default ButtonComponent;