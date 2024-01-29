import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Box, Stack, TextField } from "@mui/material";

import Role from '@/types/Role.type';
import UserOnline from '@/types/UserOnline.type';
import { useRoleRead } from '@/hooks/role/use-read';
import { useUserCreate } from '@/hooks/user/use-create';
import { UserCreateRequest } from '@/services/user/create';
import SelectComponent from '../_general/atoms/Select.component';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import { useUserResetPassword } from '@/hooks/user/use-reset-password';
import { UserResetPasswordRequest } from '@/services/user/reset_password';

interface UserChangePasswordProps {
  user_uid        : string,
  handleCloseModal: ()=>void,
}

const UserChangePasswordComponent: React.FC<UserChangePasswordProps> = ({ user_uid, handleCloseModal }) => {

  const currentUser: UserOnline                     = useTypedSelector(
    (state) => state.reducer.user.user,
  );
  
  const { 
    watch,
    control,
    register,
    getValues,
    reset,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<UserResetPasswordRequest>({
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
  
  const { mutate: submitChangePassword, isLoading } = useUserResetPassword({ user_uid: user_uid, closeModal: handleCloseModal, resetForm: resetForm })

  const onSubmit: SubmitHandler<UserResetPasswordRequest> = (data) => {
    submitChangePassword(data)
  }

  return (
    <>
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
                autoComplete = 'off'
                helperText   = {error ? error.message : null}
                size         = "medium"
                error        = {!!error}
                onChange     = {onChange}
                type         = 'password'
                value        = {value}
                label        = {"New Password"}
                variant      = "outlined"
                sx           = {{mb:2}}
                fullWidth
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
                autoComplete = 'off'
                helperText   = {error ? error.message : null}
                size         = "medium"
                error        = {!!error}
                onChange     = {onChange}
                type         = 'password'
                value        = {value}
                label        = {"Confirm New Password"}
                variant      = "outlined" 
                sx           = {{mb:2}}
                fullWidth
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
          >
            Submit
          </LoadingButtonComponent>
        </Stack>
      </form>
    </>
  )
};

export default UserChangePasswordComponent;