import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Box, FormControlLabel, Skeleton, Stack, Switch, TextField, Typography } from "@mui/material";

import User from '@/types/User.type';
import Role from '@/types/Role.type';
import UserOnline from '@/types/UserOnline.type';
import { useRoleRead } from '@/hooks/role/use-read';
import { useUserUpdate } from '@/hooks/user/use-update';
import { UserUpdateRequest } from '@/services/user/update';
import SelectComponent from '../_general/atoms/Select.component';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';

interface UserUpdateProps {
  updateUser      : User,
  getUserData     : ()=>void,
  handleCloseModal: ()=>void,
}

const UserUpdateComponent: React.FC<UserUpdateProps> = ({ updateUser, getUserData, handleCloseModal }) => {

  const { mutate: submitUpdateUser, isLoading: isLoadingUpdateUser } = useUserUpdate({ user_uid: updateUser.uid, closeModal: handleCloseModal, getData: getUserData})
  const currentUser: UserOnline                                      = useTypedSelector(
    (state) => state.reducer.user.user,
  );

  const [disablePassword, setDisablePassword] = React.useState(true)
  const [roleOptions, setRoleOptions]         = React.useState<{value: string, label: string}[]>([])
  const sexOptions                            = [
    {value: 'm', label: 'Laki-laki'},
    {value: 'f', label: 'Perempuan'},
  ]

  const { refetch: doGetRole, data, isLoading: isLoadingRole } = useRoleRead({
    page : '',
    size : '999',
    cond : '',
    sort : '',
    field: '',
  });
  
  const { 
    watch,
    control,
    register,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { isValid, isDirty, dirtyFields, errors },
  } = useForm<UserUpdateRequest>({
    defaultValues: {
      username        : '',
      name            : '',
      sex             : '',
      email           : '',
      password        : '',
      current_user_uid: currentUser.uid,
      role_uid        : '',
    }
  })

  const loadData = (data: any) => {
    console.log(data);
    reset({
      username        : data.username,
      name            : data.name,
      sex             : data.sex,
      email           : data.email,
      password        : '',
      role_uid        : data.role.uid,
      current_user_uid: currentUser.uid,
    })
  }

  const getRoleOptions = () => {
    doGetRole().then(
      (resp: any) => {
        if(resp.status == "error"){
          return;
        }

        const roles = resp.data.output_schema.data?.map( (val: Role) => (
          {value: val.uid, label: val.display_name}
        ));
        
        setRoleOptions(roles)
      } 
    )
  }
  
  const onSubmit: SubmitHandler<UserUpdateRequest> = (data) => {
    submitUpdateUser(data)
  }

  const handleSwitchPassword = () => {
    // if(disablePassword == false){
    //   setDisablePassword(!disablePassword)
    //   setValue('password','')
    // }
    // else {
      setDisablePassword(!disablePassword)
    // }
  }

  React.useEffect( () => {
    getRoleOptions()
    loadData(updateUser)
  },[updateUser])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction={'column'}>
          <Controller
            name    = "username"
            control = {control}
            rules   = {{ 
              required: {
                value  : true,
                message: "Username fields is required"
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
                type         = 'string'
                value        = {value}
                label        = {"Username"}
                variant      = "outlined"
                sx           = {{mb:2}}
                fullWidth
              />
              )
            }
          />

          <Controller
            name    = "name"
            control = {control}
            rules   = {{ 
              required: {
                value  : true,
                message: "Name fields is required"
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
                type         = 'string'
                value        = {value}
                label        = {"Name"}
                variant      = "outlined"
                sx           = {{mb:2}}
                fullWidth
              />
              )
            }
          />

          <Box sx = {{ mb: 2, }}>
            <Controller
              name    = "sex"
              control = {control}
              rules   = {{
                required: {
                  value  : true,
                  message: "Sex fields is required"
                },
              }}
              render  = { ({ 
                  field     : { onChange, value },
                  fieldState: { error },
                }) => (
                <SelectComponent
                  error        = {!!error}
                  selectState  = {value}
                  handleChange = {onChange}
                  selectId     = 'sex-select'
                  selectLabel  = 'Sex'
                  options      = {sexOptions}
                  helperText   = {error ? error.message : null}
                />
                )
              }
            />
          </Box>

          <Controller
            name    = "email"
            control = {control}
            rules   = {{ 
              required: {
                value  : true,
                message: "Email fields is required"
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
                type         = 'email'
                value        = {value}
                label        = {"Email"}
                variant      = "outlined"
                sx           = {{mb:2}}
                fullWidth
              />
              )
            }
          />

          <Box sx = {{ mb: 2, }}>
            <Controller
              name    = "role_uid"
              control = {control}
              rules   = {{
                required: {
                  value  : true,
                  message: "Role fields is required"
                },
              }}
              render  = { ({ 
                  field     : { onChange, value },
                  fieldState: { error },
                }) => (
                <SelectComponent
                  error        = {!!error}
                  selectState  = {value}
                  handleChange = {onChange}
                  selectId     = 'role-select'
                  selectLabel  = 'Role'
                  options      = {roleOptions}
                  helperText   = {error ? error.message : null}
                />
                )
              }
            />
          </Box>

          <LoadingButtonComponent
            buttonColor = 'primary'
            type        = 'submit'
            disabled    = {!isValid || !isDirty}
            isLoading   = {isLoadingUpdateUser}
            id          = 'user_update_submit'
          >
            Submit
          </LoadingButtonComponent>
        </Stack>
      </form>
    </>
  )
};

export default UserUpdateComponent;