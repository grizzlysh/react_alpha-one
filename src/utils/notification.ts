import { toast } from 'react-toastify';
import startCase from 'lodash/startCase';

import styled from '@emotion/styled'


const toastCustom = {
  // "--toastify-color-info"   : '#3C4477',
  // "--toastify-color-success": '#5C7450',
  // "--toastify-color-warning": '#E59500',
  // "--toastify-color-error"  : '#9E0031',
  error  : "#9E0031",
  warning: "#E59500",
  info   : "#3C4477",
  success: "#5C7450",
};


export const AlertError = (message: string) => {
  return toast.error(startCase(message), {
    style          : {background: '#9E0031'},
    position       : "top-center",
    autoClose      : 5000,
    hideProgressBar: false,
    closeOnClick   : true,
    pauseOnHover   : true,
    draggable      : false,
    progress       : undefined,
    theme          : "colored",
  });
}

export const AlertWarning = (message: string) => {
  return toast.warning(startCase(message), {
    style          : {background: '#E59500'},
    position       : "top-center",
    autoClose      : 5000,
    hideProgressBar: false,
    closeOnClick   : true,
    pauseOnHover   : true,
    draggable      : false,
    progress       : undefined,
    theme          : "colored",
  });
}

export const AlertInfo = (message: string) => {
  return toast.info(startCase(message), {
    style          : {background: '#3C4477'},
    position       : "top-center",
    autoClose      : 5000,
    hideProgressBar: false,
    closeOnClick   : true,
    pauseOnHover   : true,
    draggable      : false,
    progress       : undefined,
    theme          : "colored",
  });
}

export const AlertSuccess = (message: string) => {
  return toast.success(startCase(message), {
    style          : {background: '#5C7450'},
    position       : "top-center",
    autoClose      : 5000,
    hideProgressBar: false,
    closeOnClick   : true,
    pauseOnHover   : true,
    draggable      : false,
    progress       : undefined,
    theme          : "colored",
  });
}