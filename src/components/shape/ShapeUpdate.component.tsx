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
import Shape from '@/types/Shape.type';
import { useShapeUpdate } from '@/hooks/shape/use-update';
import { ShapeUpdateRequest } from '@/services/shape/update';

interface ShapeUpdateProps {
  updateShape     : Shape,
  getShapeData    : ()=>void,
  handleCloseModal: ()=>void,
}

const ShapeUpdateComponent: React.FC<ShapeUpdateProps> = ({ updateShape, getShapeData, handleCloseModal }) => {

  const currentUser: UserOnline                                        = useTypedSelector(
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
  
  const { mutate: submitUpdateShape, isLoading: isLoadingUpdateShape } = useShapeUpdate({ shape_uid: updateShape.uid, closeModal: handleCloseModal, getData: getShapeData, resetForm: resetForm })

  React.useEffect( () => {
    loadData(updateShape)
  },[updateShape])

  const onSubmit: SubmitHandler<ShapeUpdateRequest> = (data) => {
    submitUpdateShape(data)
  }

  return (
    <>
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
                disabled     = {isLoadingUpdateShape}
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
            isLoading   = {isLoadingUpdateShape}
            id          = 'shape_update_submit'
          >
            Submit
          </LoadingButtonComponent>
        </Stack>
      </form>
    </>
  )
};

export default ShapeUpdateComponent;