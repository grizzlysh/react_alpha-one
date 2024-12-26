import React from 'react';
import Button, { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import Link from 'next/link';
import { useTheme } from '@mui/material';

interface LinkButtonProps extends MUIButtonProps {
  url        : string,
  buttonColor: 'primary' | 'secondary' | 'shadow' | 'radiance' | 'error' | 'warning',
  children   : React.ReactNode,
  // handleClick?: () => void,
}

const LinkButtonComponent: React.FC<LinkButtonProps> = ({ url, buttonColor, children, ...props }) => {

  const theme = useTheme();

  return (
    <Link href={url} passHref>
      <Button
      // startIcon = { icon && icon }
        variant   = 'contained'
        sx        = {{
          backgroundColor: theme.palette[buttonColor != undefined ? buttonColor : 'shadow'].main,
          borderColor    : theme.palette[buttonColor != undefined ? buttonColor : 'shadow'].main,
          color          : theme.palette.radiance.main,
          textTransform  : 'none !important',
          px             : '12px',
          borderRadius   : 2,
          fontSize       : '0.875rem',
          fontWeight     : 700,
          lineHeight     : 1.5,
          transition     : 'all 0.3s ease',
          '&:hover'      : {
            variant        : 'outlined',
            backgroundColor: theme.palette.radiance.main,
            borderColor    : theme.palette.radiance.main,
            color          : theme.palette[buttonColor != undefined ? buttonColor : 'radiance'].main,
          },
        }}
        {...props}
      >
        { children }
      </Button>
    </Link>
  )
}

export default LinkButtonComponent;