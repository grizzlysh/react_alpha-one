import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { Autocomplete, Box, Stack, TextField } from "@mui/material";

import UserOnline from '@/types/UserOnline.type';
import { useUserCreate } from '@/hooks/user/use-create';
import { UserCreateInput, UserCreateRequest } from '@/services/user/create';
import SelectComponent from '../_general/atoms/Select.component';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import ModalComponent from '../_general/molecules/Modal.component';
import { DdlOptions, sexOptions } from '@/utils/ddlOption';
import { useRoleDdl } from '@/hooks/role/use-ddl';

interface UserCreateProps {
  resetPagination : ()=>void,
  handleCloseModal: ()=>void,
  modalOpen       : boolean,
}

const UserCreateComponent: React.FC<UserCreateProps> = ({ resetPagination, handleCloseModal, modalOpen }) => {

  const currentUser: UserOnline = useTypedSelector(
    (state) => state.reducer.user.user,
  );
    
  const [roleOptions, setRoleOptions]                          = React.useState<DdlOptions[]>([])
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
  
  const { mutate: submitCreateUser, isLoading, isSuccess } = useUserCreate()

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

  React.useEffect(() => {
    if(isSuccess == true) {
      resetForm();
      resetPagination();
      handleCloseModal();
    }
  }, [isSuccess]);

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
                  helperText   = {error ? error.message : " "}
                  size         = "medium"
                  error        = {!!error}
                  onChange     = {onChange}
                  type         = 'string'
                  value        = {value}
                  label        = {"Username"}
                  variant      = "outlined"
                  sx           = {{mb:1}}
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
                  helperText   = {error ? error.message : " "}
                  size         = "medium"
                  error        = {!!error}
                  onChange     = {onChange}
                  type         = 'string'
                  value        = {value}
                  label        = {"Name"}
                  variant      = "outlined"
                  sx           = {{mb:1}}
                  fullWidth
                />
                )
              }
            />

            <Box>
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
                      sx                   = {{mb:1}}
                      onChange             = {(event: any, value: any) => { onChange(value) }}
                      isOptionEqualToValue = { (option: any, value: any) => option.label || "" ||  option.value == value.value}
                      renderInput          = {(params: any) => 
                      <TextField
                        fullWidth
                        {...params}
                        size       = "medium"
                        label      = "Sex"
                        error      = {!!error}
                        helperText = {error ? error.message : " "}
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
                  helperText   = {error ? error.message : " "}
                  size         = "medium"
                  error        = {!!error}
                  onChange     = {onChange}
                  type         = 'email'
                  value        = {value}
                  label        = {"Email"}
                  variant      = "outlined"
                  sx           = {{mb:1}}
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
                  helperText   = {error ? error.message : " "}
                  size         = "medium"
                  error        = {!!error}
                  onChange     = {onChange}
                  type         = 'password'
                  value        = {value}
                  label        = {"Password"}
                  variant      = "outlined"
                  sx           = {{mb:1}}
                  fullWidth
                />
                )
              }
            />

            <Box>
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
                      sx                   = {{mb:1}}
                      onChange             = {(event: any, value: any) => { onChange(value) }}
                      isOptionEqualToValue = { (option: any, value: any) => option.label || "" ||  option.value == value.value}
                      renderInput          = {(params: any) => 
                      <TextField
                        fullWidth
                        {...params}
                        size       = "medium"
                        label      = "Role"
                        error      = {!!error}
                        helperText = {error ? error.message : " "}
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

export default UserCreateComponent;