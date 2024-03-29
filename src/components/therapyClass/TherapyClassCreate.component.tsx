import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Stack, TextField } from "@mui/material";

import UserOnline from '@/types/UserOnline.type';
import { useShapeCreate } from '@/hooks/shape/use-create';
import { ShapeCreateRequest } from '@/services/shape/create';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import ModalComponent from '../_general/molecules/Modal.component';
import { CategoryCreateRequest } from '@/services/category/create';
import { useCategoryCreate } from '@/hooks/category/use-create';
import { useTherapyClassCreate } from '@/hooks/therapyClass/use-create';
import { TherapyClassCreateRequest } from '@/services/therapyClass/create';

interface TherapyClassCreateProps {
  getTherapyClassData: ()=>void,
  handleCloseModal   : ()=>void,
  modalOpen          : boolean,
}

const TherapyClassCreateComponent: React.FC<TherapyClassCreateProps> = ({ getTherapyClassData, handleCloseModal, modalOpen }) => {

  const currentUser: UserOnline = useTypedSelector(
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
  } = useForm<CategoryCreateRequest>({
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

  const { mutate: submitCreateTherapyClass, isLoading } = useTherapyClassCreate({ getData: getTherapyClassData, closeModal: handleCloseModal, resetForm: resetForm })

  const onSubmit: SubmitHandler<TherapyClassCreateRequest> = (data) => {
    submitCreateTherapyClass(data)
  }

  return (
    <>
      <ModalComponent
        modalId      = 'therapyclass-create'
        modalTitle   = 'Therapy Class Create'
        modalSize    = 'sm'
        modalOpen    = {modalOpen}
        modalOnClose = {() => {handleCloseModal(); resetForm();}}
        isPermanent  = {false}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={'column'}>
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

            <LoadingButtonComponent
              buttonColor = 'primary'
              type        = 'submit'
              disabled    = {!isValid}
              isLoading   = {isLoading}
              id          = 'shape_create_submit'
            >
              Submit
            </LoadingButtonComponent>
          </Stack>
        </form>
      </ModalComponent>
    </>
  )
};

export default TherapyClassCreateComponent;