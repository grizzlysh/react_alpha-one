import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Skeleton, Stack, TextField, Typography } from "@mui/material";

import { useTypedSelector } from '@/hooks/other/use-type-selector';
import UserOnline from '@/types/UserOnline.type';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import { usePermissionUpdate } from '@/hooks/permission/use-update';
import { PermissionUpdateRequest } from '@/services/permission/update';
import { usePermissionReadByID } from '@/hooks/permission/use-read-by-id';
import Permission from '@/types/Permission.type';
import ModalComponent from '../_general/molecules/Modal.component';

interface PermissionUpdateProps {
  updatePermission : Permission,
  getPermissionData: ()=>void,
  handleCloseModal : ()=>void,
  modalOpen        : boolean,
}

const PermissionUpdateComponent: React.FC<PermissionUpdateProps> = ({ updatePermission, getPermissionData, handleCloseModal, modalOpen }) => {

  const currentUser: UserOnline                                                  = useTypedSelector(
    (state) => state.reducer.user.user,
  );
  
  const { 
    watch,
    control,
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { isValid, isDirty, errors },
  } = useForm<PermissionUpdateRequest>({
    defaultValues: {
      display_name    : '',
      description     : '',
      current_user_uid: currentUser.uid,
    }
  })

  const resetForm = () => {
    reset({
      display_name    : '',
      description     : '',
      current_user_uid: currentUser.uid,
    })
  }

  const loadData = (data: any) => {
    reset({
      display_name    : data.display_name,
      description     : data.description,
      current_user_uid: currentUser.uid,
    })
  }
  
  const { mutate: submitUpdatePermission, isLoading: isLoadingUpdatePermission } = usePermissionUpdate({ permission_uid: updatePermission.uid, closeModal: handleCloseModal, getData: getPermissionData, resetForm: resetForm })
  
  React.useEffect( () => {
    loadData(updatePermission)
  },[updatePermission])

  const onSubmit: SubmitHandler<PermissionUpdateRequest> = (data) => {
    submitUpdatePermission(data)
  }

  return (
    <>
      <ModalComponent
        modalId      = 'permission-edit'
        modalTitle   = 'Permission Edit'
        modalSize    = 'sm'
        modalOpen    = {modalOpen}
        modalOnClose = {() => {handleCloseModal(); resetForm();}}
        isPermanent  = {false}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={'column'}>
            <>
            <Controller
              name    = "display_name"
              control = {control}
              rules   = {{ 
                required: {
                  value  : true,
                  message: "Display Name fields is required"
                },
              }}
              render  = { ({ 
                  field     : { onChange, value },
                  fieldState: { error },
                  formState,
                }) => (
                <TextField            
                  autoComplete = 'off'
                  disabled     = {isLoadingUpdatePermission}
                  helperText   = {error ? error.message : null}
                  size         = "medium"
                  error        = {!!error}
                  onChange     = {onChange}
                  type         = 'string'
                  value        = {value}
                  label        = {"Display Name"}
                  variant      = "outlined"
                  sx           = {{mb:2}}
                  fullWidth
                />
                )
              }
            />

            <Controller
              name    = "description"
              control = {control}
              render  = { ({ 
                  field     : { onChange, value },
                  fieldState: { error },
                  formState,
                }) => (
                <TextField
                  autoComplete = 'off'
                  disabled     = {isLoadingUpdatePermission}
                  size         = "medium"
                  onChange     = {onChange}
                  value        = {value}
                  label        = {"Description"}
                  sx           = {{mb:2}}
                  minRows      = {4}
                  multiline
                  fullWidth
                />
                )
              }
            />
            </>

            <LoadingButtonComponent
              buttonColor = 'primary'
              type        = 'submit'
              disabled    = {!isValid || !isDirty}
              isLoading   = {isLoadingUpdatePermission}
              id          = 'permission_update_submit'
            >
              Submit
            </LoadingButtonComponent>
          </Stack>
        </form>
      </ModalComponent>
    </>
  )
};

export default PermissionUpdateComponent;