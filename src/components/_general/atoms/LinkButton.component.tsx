import React from 'react';
import Button, { ButtonProps as MUIButtonProps } from '@mui/material/Button';
import theme from '@/utils/theme';
import Link from 'next/link';

interface LinkButtonProps extends MUIButtonProps {
  url        : string,
  buttonColor: 'primary' | 'secondary' | 'error' | 'warning'
  children   : React.ReactNode,
  // handleClick?: () => void,
}

const LinkButtonComponent: React.FC<LinkButtonProps> = ({ url, buttonColor, children, ...props }) => {

  return (
    <Link href={url} passHref>
      <Button
      // startIcon = { icon && icon }
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
    </Link>
  )
}

export default LinkButtonComponent;