import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Skeleton, Stack, TextField, Typography } from "@mui/material";

import { useTypedSelector } from '@/hooks/other/use-type-selector';
import UserOnline from '@/types/UserOnline.type';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import Shape from '@/types/Shape.type';
import { useShapeUpdate } from '@/hooks/shape/use-update';
import { ShapeUpdateRequest } from '@/services/shape/update';
import ModalComponent from '../_general/molecules/Modal.component';
import ModalConfirmComponent from '../_general/molecules/ModalConfirm.component';
import ButtonComponent from '../_general/atoms/Button.component';

interface ShapeUpdateProps {
  updateShape     : Shape,
  resetPagination : ()=>void,
  handleCloseModal: ()=>void,
  modalOpen       : boolean,
}

const ShapeUpdateComponent: React.FC<ShapeUpdateProps> = ({ updateShape, resetPagination, handleCloseModal, modalOpen }) => {

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
  } = useForm<ShapeUpdateRequest>({
    defaultValues: {
      name            : '',
      current_user_uid: currentUser.uid,
    }
  })

  const resetForm = () => {
    reset({
      name            : '',
      current_user_uid: currentUser.uid,
    })
  }
  const loadData = (data: any) => {
    reset({
      name            : data.name,
      current_user_uid: currentUser.uid,
    })
  }
  
  const { mutate: submitUpdateShape, isLoading: isLoadingUpdateShape, isSuccess } = useShapeUpdate({ shape_uid: updateShape.uid })

  const onSubmit: SubmitHandler<ShapeUpdateRequest> = (data) => {
    submitUpdateShape(data)
  }

  React.useEffect( () => {
    loadData(updateShape)
  },[updateShape])

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
        modalId      = 'shape-edit'
        modalTitle   = 'Shape Edit'
        modalSize    = 'sm'
        modalOpen    = {modalOpen}
        modalOnClose = {() => {handleCloseModal(); resetForm();}}
        isPermanent  = {false}
      >
        <Stack direction={'column'}>
          <>
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
                disabled     = {isLoadingUpdateShape}
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
          </>

          <ButtonComponent
            buttonColor = 'shadow'
            onClick     = {handleOpenConfirmModal}
            disabled    = {!isValid || !isDirty}
            id          = 'shape-update-submit'
            // type        = 'submit'
            // sx          = {{mt:1}}
          >
            SUBMIT
          </ButtonComponent>
        </Stack>
      </ModalComponent>

      <ModalConfirmComponent
        modalId       = {'shape-update-confirm'}
        modalOpen     = {openConfirmModal}
        modalOnClose  = {handleCloseConfirmModal}
        onConfirm     = {handleSubmit(onSubmit)}
        modalText     = {'Are you sure want to do this action?'}
        modalButton   = {'APPLY'}
        buttonLoading = {isLoadingUpdateShape}
      />
    </>
  )
};

export default ShapeUpdateComponent;