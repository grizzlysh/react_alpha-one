import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, IconButton, InputAdornment, Stack, TextField } from "@mui/material";

import UserOnline from '@/types/UserOnline.type';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import { useUserUpdatePassword } from '@/hooks/user/use-update-password';
import { UserUpdatePasswordRequest } from '@/services/user/update_password';
import ModalComponent from '../_general/molecules/Modal.component';

interface UserUpdatePasswordProps {
  user_uid        : string,
  handleCloseModal: ()=>void,
  modalOpen       : boolean,
}

const ProfileUpdatePasswordComponent: React.FC<UserUpdatePasswordProps> = ({ user_uid, handleCloseModal, modalOpen }) => {

  const [showPassword, setShowPassword]     = React.useState(false);
  const [showRepassword, setShowRepassword] = React.useState(false);
  const currentUser: UserOnline             = useTypedSelector(
    (state) => state.reducer.user.user,
  );

  
  const handleShowPassword   = () => setShowPassword((show) => !show);
  const handleShowRepassword = () => setShowRepassword((show) => !show);
  
  const handleMouseShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseShowRepassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  
  const { 
    watch,
    control,
    register,
    getValues,
    reset,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<UserUpdatePasswordRequest>({
    defaultValues: {
      password        : '',
      repassword      : '',
      current_user_uid: currentUser.uid,
    }
  })

  const resetForm = () => {
    reset({
      password        : '',
      repassword      : '',
      current_user_uid: currentUser.uid,
    })
  }
  
  const { mutate: submitChangePassword, isLoading, isSuccess } = useUserUpdatePassword({ user_uid: user_uid })

  const onSubmit: SubmitHandler<UserUpdatePasswordRequest> = (data) => {
    submitChangePassword(data)
  }

  React.useEffect(() => {
    if(isSuccess == true) {
      resetForm();
      handleCloseModal();
    }
  }, [isSuccess]);

  return (
    <>
      <ModalComponent
        modalId      = 'profile-update-password'
        modalTitle   = 'Change Password'
        modalSize    = 'sm'
        modalOpen    = {modalOpen}
        modalOnClose = {() => {handleCloseModal(); resetForm();}}
        isPermanent  = {false}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={'column'}>
            <Controller
              name    = "password"
              control = {control}
              rules   = {{ 
                required: {
                  value  : true,
                  message: "Password fields is required"
                },
              }}
              render  = { ({ 
                  field     : { onChange, value },
                  fieldState: { error },
                  formState,
                }) => (
                <TextField            
                  fullWidth
                  autoComplete = 'off'
                  helperText   = {error ? error.message : " "}
                  size         = "medium"
                  error        = {!!error}
                  onChange     = {onChange}
                  type         = {showPassword ? 'text' : 'password'}
                  value        = {value}
                  label        = {"New Password"}
                  variant      = "outlined"
                  sx           = {{mb:1}}
                  InputProps   = {{
                    endAdornment : (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label  = "toggle password visibility"
                          onClick     = {handleShowPassword}
                          onMouseDown = {handleMouseShowPassword}
                          edge        = "end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>),
                  }}
                />
                )
              }
            />

            <Controller
              name    = "repassword"
              control = {control}
              rules   = {{ 
                required: {
                  value  : true,
                  message: "Confirm New Password fields is required"
                },
                validate: (value, formValues) => value == formValues.password
              }}
              render  = { ({ 
                  field     : { onChange, value },
                  fieldState: { error },
                  formState,
                }) => (
                <TextField            
                  fullWidth
                  autoComplete = 'off'
                  helperText   = {error ? error.message : " "}
                  size         = "medium"
                  error        = {!!error}
                  onChange     = {onChange}
                  type         = {showRepassword ? 'text' : 'password'}
                  value        = {value}
                  label        = {"Confirm New Password"}
                  variant      = "outlined"
                  sx           = {{mb:1}}
                  InputProps   = {{
                    endAdornment : (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label  = "toggle password visibility"
                          onClick     = {handleShowRepassword}
                          onMouseDown = {handleMouseShowRepassword}
                          edge        = "end"
                        >
                          {showRepassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>),
                  }}
                />
                )
              }
            />

            <LoadingButtonComponent
              buttonColor = 'primary'
              type        = 'submit'
              disabled    = {!isValid}
              isLoading   = {isLoading}
              id          = 'profile_change_password'
              sx          = {{mt:1}}
            >
              SUBMIT
            </LoadingButtonComponent>
          </Stack>
        </form>
      </ModalComponent>
    </>
  )
};

export default ProfileUpdatePasswordComponent;