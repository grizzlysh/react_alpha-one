import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Autocomplete, Box, FormControlLabel, Skeleton, Stack, Switch, TextField, Typography } from "@mui/material";

import User from '@/types/User.type';
import Role from '@/types/Role.type';
import UserOnline from '@/types/UserOnline.type';
import { useRoleRead } from '@/hooks/role/use-read';
import { useUserUpdate } from '@/hooks/user/use-update';
import { UserUpdateInput, UserUpdateRequest } from '@/services/user/update';
import SelectComponent from '../_general/atoms/Select.component';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import ModalComponent from '../_general/molecules/Modal.component';
import { useRoleDdl } from '@/hooks/role/use-ddl';
import { sexOptions } from '@/utils/ddlOptions';

interface UserUpdateProps {
  updateUser      : User,
  getUserData     : ()=>void,
  handleCloseModal: ()=>void,
  modalOpen       : boolean,
}

const UserUpdateComponent: React.FC<UserUpdateProps> = ({ updateUser, getUserData, handleCloseModal, modalOpen }) => {

  const currentUser: UserOnline                                      = useTypedSelector(
    (state) => state.reducer.user.user,
  );

  const [disablePassword, setDisablePassword]                  = React.useState(true)
  const [roleOptions, setRoleOptions]                          = React.useState<{value: string, label: string}[]>([])
  const { refetch: doGetRole, data, isLoading: isLoadingRole } = useRoleDdl();
  
  const { 
    watch,
    control,
    register,
    getValues,
    setValue,
    handleSubmit,
    reset,
    formState: { isValid, isDirty, dirtyFields, errors },
  } = useForm<UserUpdateInput>({
    defaultValues: {
      username        : '',
      name            : '',
      sex             : null,
      email           : '',
      password        : '',
      current_user_uid: currentUser.uid,
      role_uid        : null,
    }
  })

  const resteForm = () => {
    reset({
      username        : '',
      name            : '',
      sex             : null,
      email           : '',
      password        : '',
      current_user_uid: currentUser.uid,
      role_uid        : null,
    })
  }

  const loadData = (data: any) => {
    reset({
      username        : data.username,
      name            : data.name,
      email           : data.email,
      sex             : data.sex == 'm' ? {value: 'm', label: 'Laki-laki'} : {value: 'f', label: 'Perempuan'},
      password        : '',
      role_uid        : { value: data.role.uid, label: data.role.name },
      current_user_uid: currentUser.uid,
    })
  }
  
  const { mutate: submitUpdateUser, isLoading: isLoadingUpdateUser } = useUserUpdate({ user_uid: updateUser.uid, closeModal: handleCloseModal, getData: getUserData, resetForm: resteForm})
  
  const getRoleOptions = () => {
    doGetRole().then(
      (resp: any) => {
        if(resp.status == "error"){
          return;
        }
        
        setRoleOptions(resp.data.output_schema.data)
      } 
    )
  }
  
  const onSubmit: SubmitHandler<UserUpdateInput> = (data) => {
    
    const submitData: UserUpdateRequest = {
      
      username        : data.username,
      name            : data.name,
      sex             : data.sex?.value || '',
      email           : data.email,
      password        : data.password,
      role_uid        : data.role_uid?.value || '',
      current_user_uid: data.current_user_uid,
    }
    submitUpdateUser(submitData)
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
      <ModalComponent
        modalId      = 'user-edit'
        modalTitle   = 'User Edit'
        modalSize    = 'sm'
        modalOpen    = {modalOpen}
        modalOnClose = {()=>{handleCloseModal(); resteForm();}}
        isPermanent  = {false}
      >
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
                  // validate:(value, formValues) => (formValues.write_permit || formValues.read_permit || formValues.modify_permit || formValues.delete_permit != false ),
                  required: {
                    value  : true,
                    message: "Sex fields is required"
                  },
                }}
                render  = { ({ 
                    field     : { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      value                = {value}
                      id                   = "sex-autocomplete"
                      options              = {sexOptions}
                      sx                   = {{mb:2}}
                      onChange             = {(event: any, value: any) => { onChange(value) }}
                      isOptionEqualToValue = { (option: any, value: any) => option.label || "" ||  option.value == value.value}
                      renderInput          = {(params: any) => 
                      <TextField
                        fullWidth
                        {...params}
                        size       = "medium"
                        label      = "Sex"
                        error      = {!!error}
                        helperText = {error ? error.message : null}
                      />}
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
                  // validate:(value, formValues) => (formValues.write_permit || formValues.read_permit || formValues.modify_permit || formValues.delete_permit != false ),
                  required: {
                    value  : true,
                    message: "Role fields is required"
                  },
                }}
                render  = { ({ 
                    field     : { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      value                = {value}
                      id                   = "role-autocomplete"
                      options              = {roleOptions}
                      sx                   = {{mb:2}}
                      onChange             = {(event: any, value: any) => { onChange(value) }}
                      isOptionEqualToValue = { (option: any, value: any) => option.label || "" ||  option.value == value.value}
                      renderInput          = {(params: any) => 
                      <TextField
                        fullWidth
                        {...params}
                        size       = "medium"
                        label      = "Role"
                        error      = {!!error}
                        helperText = {error ? error.message : null}
                      />}
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
      </ModalComponent>
    </>
  )
};

export default UserUpdateComponent;