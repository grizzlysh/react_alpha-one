import React from 'react';
import { LoadingButton, LoadingButtonProps as MUILoadingButtonProps } from "@mui/lab";

interface LoadingButtonProps extends MUILoadingButtonProps {
  isLoading: boolean,
  children : React.ReactNode,
  // icon       ?: React.ReactNode,
  // handleClick?: () => void,
}

const LoadingButtonComponent: React.FC<LoadingButtonProps> = ({ children, isLoading, ...props }) => {
  
  return (
    <LoadingButton
      loading = {isLoading}
      variant = 'contained'
      color   = 'secondary'
      sx      = {{
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
    </LoadingButton>
  )
}

export default LoadingButtonComponent;