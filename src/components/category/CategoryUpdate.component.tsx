import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Skeleton, Stack, TextField, Typography } from "@mui/material";

import { useTypedSelector } from '@/hooks/other/use-type-selector';
import UserOnline from '@/types/UserOnline.type';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import ModalComponent from '../_general/molecules/Modal.component';
import Category from '@/types/Category.type';
import { useCategoryUpdate } from '@/hooks/category/use-update';
import { CategoryUpdateRequest } from '@/services/category/update';

interface CategoryUpdateProps {
  updateCategory  : Category,
  resetPagination : ()=>void,
  // getCategoryData : ()=>void,
  handleCloseModal: ()=>void,
  modalOpen       : boolean,
}

const CategoryUpdateComponent: React.FC<CategoryUpdateProps> = ({ updateCategory, resetPagination, handleCloseModal, modalOpen }) => {

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
  } = useForm<CategoryUpdateRequest>({
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
  
  const { mutate: submitUpdateCategory, isLoading: isLoadingUpdateCategory, isSuccess } = useCategoryUpdate({ category_uid: updateCategory.uid })

  const onSubmit: SubmitHandler<CategoryUpdateRequest> = (data) => {
    submitUpdateCategory(data)
  }

  React.useEffect( () => {
    loadData(updateCategory)
  },[updateCategory])

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
        modalId      = 'category-edit'
        modalTitle   = 'Category Edit'
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
                  disabled     = {isLoadingUpdateCategory}
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

            <LoadingButtonComponent
              buttonColor = 'primary'
              type        = 'submit'
              disabled    = {!isValid || !isDirty}
              isLoading   = {isLoadingUpdateCategory}
              id          = 'shape_update_submit'
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

export default CategoryUpdateComponent;