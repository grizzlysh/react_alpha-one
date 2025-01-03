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
import { DdlOptions, sexOptions } from '@/utils/ddlOption';
import ModalConfirmComponent from '../_general/molecules/ModalConfirm.component';
import ButtonComponent from '../_general/atoms/Button.component';

interface UserUpdateProps {
  updateUser      : User,
  resetPagination : ()=>void,
  handleCloseModal: ()=>void,
  modalOpen       : boolean,
}

const UserUpdateComponent: React.FC<UserUpdateProps> = ({ updateUser, resetPagination, handleCloseModal, modalOpen }) => {

  const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
  const handleCloseConfirmModal                 = () => setOpenConfirmModal(false);
  const handleOpenConfirmModal                  = () => {
    setOpenConfirmModal(true);
  }
  const currentUser: UserOnline                                      = useTypedSelector(
    (state) => state.reducer.user.user,
  );

  const [disablePassword, setDisablePassword]                  = React.useState(true)
  const [roleOptions, setRoleOptions]                          = React.useState<DdlOptions[]>([])
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
  
  const { mutate: submitUpdateUser, isLoading: isLoadingUpdateUser, isSuccess } = useUserUpdate({ user_uid: updateUser.uid })
  
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
        modalId      = 'user-edit'
        modalTitle   = 'User Edit'
        modalSize    = 'sm'
        modalOpen    = {modalOpen}
        modalOnClose = {()=>{handleCloseModal(); resetForm();}}
        isPermanent  = {false}
      >
        <Stack direction={'column'}>
          <Controller
            name    = "username"
            control = {control}
            rules   = {{ 
              required: {
                value  : true,
                message: "Username field is required"
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
                message: "Name field is required"
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
                  message: "Sex field is required"
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
                message: "Email field is required"
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

          <Box>

            <Controller
              name    = "role_uid"
              control = {control}
              rules   = {{
                // validate:(value, formValues) => (formValues.write_permit || formValues.read_permit || formValues.modify_permit || formValues.delete_permit != false ),
                required: {
                  value  : true,
                  message: "Role field is required"
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

          <ButtonComponent
            buttonColor = 'shadow'
            onClick     = {handleOpenConfirmModal}
            disabled    = {!isValid || !isDirty}
            id          = 'user_update_submit'
            // sx          = {{mt:1}}
          >
            SUBMIT
          </ButtonComponent>
        </Stack>
      </ModalComponent>

      <ModalConfirmComponent
        modalId       = {'user-update-confirm'}
        modalOpen     = {openConfirmModal}
        modalOnClose  = {handleCloseConfirmModal}
        onConfirm     = {handleSubmit(onSubmit)}
        modalText     = {'Are you sure want to do this action?'}
        modalButton   = {'APPLY'}
        buttonLoading = {isLoadingUpdateUser}
      />
    </>
  )
};

export default UserUpdateComponent;