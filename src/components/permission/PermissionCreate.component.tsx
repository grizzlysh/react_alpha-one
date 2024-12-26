import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Stack, TextField } from "@mui/material";

import ModalComponent from '../_general/molecules/Modal.component';
import { usePermissionCreate } from '@/hooks/permission/use-create';
import { PermissionCreateRequest } from '@/services/permission/create';
import ButtonComponent from '../_general/atoms/Button.component';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import UserOnline from '@/types/UserOnline.type';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import ModalConfirmComponent from '../_general/molecules/ModalConfirm.component';

interface PermissionCreateProps {
  resetPagination : ()=>void,
  handleCloseModal : ()=>void,
  modalOpen        : boolean,
}

const PermissionCreateComponent: React.FC<PermissionCreateProps> = ({ resetPagination, handleCloseModal, modalOpen }) => {

  const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
  const handleCloseConfirmModal                 = () => setOpenConfirmModal(false);
  const handleOpenConfirmModal                  = () => {
    setOpenConfirmModal(true);
  }
  const currentUser: UserOnline                       = useTypedSelector(
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
  } = useForm<PermissionCreateRequest>({
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
  
  const { mutate: submitCreatePermission, isLoading, isSuccess } = usePermissionCreate();

  const onSubmit: SubmitHandler<PermissionCreateRequest> = (data) => {
    submitCreatePermission(data)
  }

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
        modalId      = 'permission-create'
        modalTitle   = 'Permission Create'
        modalSize    = 'sm'
        modalOpen    = {modalOpen}
        modalOnClose = {() => {handleCloseModal(); resetForm();}}
        isPermanent  = {false}
      >
        <Stack direction={'column'}>
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
                helperText   = {error ? error.message : " "}
                size         = "medium"
                error        = {!!error}
                onChange     = {onChange}
                type         = 'string'
                value        = {value}
                label        = {"Display Name"}
                variant      = "outlined"
                sx           = {{mb:1


                }}
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
                size         = "medium"
                onChange     = {onChange}
                value        = {value}
                label        = {"Description"}
                minRows      = {4}
                error        = {!!error}
                helperText   = {error ? error.message : " "}
                sx           = {{mb:1}}
                multiline
                fullWidth
              />
              )
            }
          />

          <ButtonComponent
            onClick     = {handleOpenConfirmModal}
            disabled    = {!isValid}
            id          = 'permission-create-submit'
            // sx        = {{mt:1}}
          >
            SUBMIT
          </ButtonComponent>
        </Stack>
      </ModalComponent>

      <ModalConfirmComponent
        modalId       = {'permission-create-confirm'}
        modalOpen     = {openConfirmModal}
        modalOnClose  = {handleCloseConfirmModal}
        onConfirm     = {handleSubmit(onSubmit)}
        modalText     = {'Are you sure want to do this action?'}
        modalButton   = {'APPLY'}
        buttonLoading = {isLoading}
      />
    </>
  )
};

export default PermissionCreateComponent;