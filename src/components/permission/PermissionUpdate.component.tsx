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
import ModalConfirmComponent from '../_general/molecules/ModalConfirm.component';
import ButtonComponent from '../_general/atoms/Button.component';

interface PermissionUpdateProps {
  updatePermission: Permission,
  resetPagination : ()=>void,
  handleCloseModal: ()=>void,
  modalOpen       : boolean,
}

const PermissionUpdateComponent: React.FC<PermissionUpdateProps> = ({ updatePermission, resetPagination, handleCloseModal, modalOpen }) => {

  const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
  const handleCloseConfirmModal                 = () => setOpenConfirmModal(false);
  const handleOpenConfirmModal                  = () => {
    setOpenConfirmModal(true);
  }
  const currentUser: UserOnline = useTypedSelector(
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
  
  const { mutate: submitUpdatePermission, isLoading: isLoadingUpdatePermission, isSuccess } = usePermissionUpdate({ permission_uid: updatePermission.uid })

  const onSubmit: SubmitHandler<PermissionUpdateRequest> = (data) => {
    submitUpdatePermission(data)
  }

  React.useEffect(() => {
    if(isSuccess == true) {
      resetForm();
      resetPagination();
      handleCloseModal();
    }
  }, [isSuccess]);

  React.useEffect( () => {
    loadData(updatePermission)
  },[updatePermission])

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
        <Stack direction={'column'}>
          <>
          <Controller
            name    = "display_name"
            control = {control}
            rules   = {{ 
              required: {
                value  : true,
                message: "Display Name field is required"
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
                helperText   = {error ? error.message : " "}
                size         = "medium"
                error        = {!!error}
                onChange     = {onChange}
                type         = 'string'
                value        = {value}
                label        = {"Display Name"}
                variant      = "outlined"
                sx           = {{mb:1}}
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
                error        = {!!error}
                helperText   = {error ? error.message : " "}
                sx           = {{mb:1}}
                minRows      = {4}
                multiline
                fullWidth
              />
              )
            }
          />
          </>

          <ButtonComponent
            buttonColor = 'shadow'
            onClick     = {handleOpenConfirmModal}
            disabled    = {!isValid || !isDirty}
            id          = 'permission-update-submit'
            // type        = 'submit'
            // sx          = {{mt:1}}
          >
            SUBMIT
          </ButtonComponent>
        </Stack>
      </ModalComponent>

      <ModalConfirmComponent
        modalId       = {'permission-update-confirm'}
        modalOpen     = {openConfirmModal}
        modalOnClose  = {handleCloseConfirmModal}
        onConfirm     = {handleSubmit(onSubmit)}
        modalText     = {'Are you sure want to do this action?'}
        modalButton   = {'APPLY'}
        buttonLoading = {isLoadingUpdatePermission}
      />
    </>
  )
};

export default PermissionUpdateComponent;