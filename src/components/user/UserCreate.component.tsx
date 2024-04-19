import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Autocomplete, Box, Stack, TextField } from "@mui/material";

import Role from '@/types/Role.type';
import UserOnline from '@/types/UserOnline.type';
import { useRoleRead } from '@/hooks/role/use-read';
import { useUserCreate } from '@/hooks/user/use-create';
import { UserCreateInput, UserCreateRequest } from '@/services/user/create';
import SelectComponent from '../_general/atoms/Select.component';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import ModalComponent from '../_general/molecules/Modal.component';
import { sexOptions } from '@/utils/ddlOptions';
import { useRoleDdl } from '@/hooks/role/use-ddl';

interface UserCreateProps {
  getUserData     : ()=>void,
  handleCloseModal: ()=>void,
  modalOpen       : boolean,
}

const UserCreateComponent: React.FC<UserCreateProps> = ({ getUserData, handleCloseModal, modalOpen }) => {

  const currentUser: UserOnline                 = useTypedSelector(
    (state) => state.reducer.user.user,
  );
    
  const [roleOptions, setRoleOptions]                          = React.useState<{value: string, label: string}[]>([])
  const { refetch: doGetRole, data, isLoading: isLoadingRole } = useRoleDdl();
  
  const { 
    watch,
    control,
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<UserCreateInput>({
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

  const resetForm = () => {
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
  
  const { mutate: submitCreateUser, isLoading } = useUserCreate({ getData: getUserData, closeModal: handleCloseModal, resetForm: resetForm })

  const onSubmit: SubmitHandler<UserCreateInput> = (data) => {
    const submitData: UserCreateRequest = {
      
      username        : data.username,
      name            : data.name,
      sex             : data.sex?.value || '',
      email           : data.email,
      password        : data.password,
      role_uid        : data.role_uid?.value || '',
      current_user_uid: data.current_user_uid,
    }
    
    submitCreateUser(submitData)
  }

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

  React.useEffect( () => {
    getRoleOptions()
  },[])

  return (
    <>
      <ModalComponent
        modalId      = 'user-create'
        modalTitle   = 'User Create'
        modalSize    = 'sm'
        modalOpen    = {modalOpen}
        modalOnClose = {()=> {handleCloseModal(); resetForm();}}
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
                  label        = {"Password"}
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
              disabled    = {!isValid}
              isLoading   = {isLoading}
              id          = 'permission_create_submit'
            >
              Submit
            </LoadingButtonComponent>
          </Stack>
        </form>
      </ModalComponent>
    </>
  )
};

export default UserCreateComponent;