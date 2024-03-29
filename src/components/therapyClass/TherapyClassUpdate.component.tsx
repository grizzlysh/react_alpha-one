import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Skeleton, Stack, TextField, Typography } from "@mui/material";

import { useTypedSelector } from '@/hooks/other/use-type-selector';
import UserOnline from '@/types/UserOnline.type';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import ModalComponent from '../_general/molecules/Modal.component';
import TherapyClass from '@/types/TherapyClass.type';
import { TherapyClassUpdateRequest } from '@/services/therapyClass/update';
import { useTherapyClassUpdate } from '@/hooks/therapyClass/use-update';

interface TherapyClassUpdateProps {
  updateTherapyClass : TherapyClass,
  getTherapyClassData: ()=>void,
  handleCloseModal   : ()=>void,
  modalOpen          : boolean,
}

const TherapyClassUpdateComponent: React.FC<TherapyClassUpdateProps> = ({ updateTherapyClass, getTherapyClassData, handleCloseModal, modalOpen }) => {

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
  } = useForm<TherapyClassUpdateRequest>({
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
  
  const { mutate: submitUpdateTherapyClass, isLoading: isLoadingUpdateTherapyClass } = useTherapyClassUpdate({ therapy_class_uid: updateTherapyClass.uid, closeModal: handleCloseModal, getData: getTherapyClassData, resetForm: resetForm })

  React.useEffect( () => {
    loadData(updateTherapyClass)
  },[updateTherapyClass])

  const onSubmit: SubmitHandler<TherapyClassUpdateRequest> = (data) => {
    submitUpdateTherapyClass(data)
  }

  return (
    <>
      <ModalComponent
        modalId      = 'therapyclass-edit'
        modalTitle   = 'Therapy Class Edit'
        modalSize    = 'sm'
        modalOpen    = {modalOpen}
        modalOnClose = {() => {handleCloseModal(); resetForm();}}
        isPermanent  = {false}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={'column'}>
            <>
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
                  disabled     = {isLoadingUpdateTherapyClass}
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
            </>

            <LoadingButtonComponent
              buttonColor = 'primary'
              type        = 'submit'
              disabled    = {!isValid || !isDirty}
              isLoading   = {isLoadingUpdateTherapyClass}
              id          = 'shape_update_submit'
            >
              Submit
            </LoadingButtonComponent>
          </Stack>
        </form>
      </ModalComponent>
    </>
  )
};

export default TherapyClassUpdateComponent;