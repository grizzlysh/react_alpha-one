import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Stack, TextField } from "@mui/material";

import UserOnline from '@/types/UserOnline.type';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import ModalComponent from '../_general/molecules/Modal.component';
import { CategoryCreateRequest } from '@/services/category/create';
import { useCategoryCreate } from '@/hooks/category/use-create';

interface CategoryCreateProps {
  resetPagination : ()=>void,
  handleCloseModal: ()=>void,
  modalOpen       : boolean,
}

const CategoryCreateComponent: React.FC<CategoryCreateProps> = ({ resetPagination, handleCloseModal, modalOpen }) => {

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

  const { mutate: submitCreateCategory, isLoading, isSuccess } = useCategoryCreate()

  const onSubmit: SubmitHandler<CategoryCreateRequest> = (data) => {
    submitCreateCategory(data)
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
        modalId      = 'category-create'
        modalTitle   = 'Category Create'
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

            <LoadingButtonComponent
              buttonColor = 'primary'
              type        = 'submit'
              disabled    = {!isValid}
              isLoading   = {isLoading}
              id          = 'shape_create_submit'
              sx           = {{mt:1}}
            >
              SUBMIT
            </LoadingButtonComponent>
          </Stack>
        </form>
      </ModalComponent>
    </>
  )
};

export default CategoryCreateComponent;