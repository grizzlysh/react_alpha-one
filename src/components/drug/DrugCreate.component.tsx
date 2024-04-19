import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Autocomplete, Stack, TextField } from "@mui/material";

import UserOnline from '@/types/UserOnline.type';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import ModalComponent from '../_general/molecules/Modal.component';
import { DistributorCreateInput, DistributorCreateRequest } from '@/services/distributor/create';
import { useDistributorCreate } from '@/hooks/distributor/use-create';
import { ddlOptions, statusOptions } from '@/utils/ddlOptions';
import { DrugCreateInput, DrugCreateRequest } from '@/services/drug/create';
import { useDrugCreate } from '@/hooks/drug/use-create';
import { useShapeDdl } from '@/hooks/shape/use-ddl';
import { useCategoryDdl } from '@/hooks/category/use-ddl';
import { useTherapyClassDdl } from '@/hooks/therapyClass/use-ddl';

interface DrugCreateProps {
  getDrugData     : ()=>void,
  handleCloseModal: ()=>void,
  modalOpen       : boolean,
}

const DrugCreateComponent: React.FC<DrugCreateProps> = ({ getDrugData, handleCloseModal, modalOpen }) => {

  const [shapeOptions, setShapeOptions]               = React.useState<ddlOptions[]>([])
  const [categoryOptions, setCategoryOptions]         = React.useState<ddlOptions[]>([])
  const [therapyClassOptions, setTherapyClassOptions] = React.useState<ddlOptions[]>([])
  const currentUser: UserOnline                       = useTypedSelector(
    (state) => state.reducer.user.user,
  );
  
  const { 
    watch,
    control,
    register,
    getValues,
    setValue,
    reset,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<DrugCreateInput>({
    defaultValues: {
      name             : '',
      shape_uid        : null,
      category_uid     : null,
      therapy_class_uid: null,
      description      : '',
      status           : null,
      current_user_uid: currentUser.uid,
    }
  })

  const resetForm = () => {
    reset({
      name             : '',
      shape_uid        : null,
      category_uid     : null,
      therapy_class_uid: null,
      description      : '',
      status           : null,
      current_user_uid: currentUser.uid,
    })
  }

  const { mutate: submitCreateDrug, isLoading }                                                  = useDrugCreate({ getData: getDrugData, closeModal: handleCloseModal, resetForm: resetForm })
  const { refetch: doGetShape, data: dataShape, isLoading: isLoadingShape }                      = useShapeDdl();
  const { refetch: doGetCategory, data: dataCategory, isLoading: isLoadingCategory }             = useCategoryDdl();
  const { refetch: doGetTherapyClass, data: dataTherapyClass, isLoading: isLoadingTherapyClass } = useTherapyClassDdl();


  const onSubmit: SubmitHandler<DrugCreateInput> = (data) => {
    const submitData: DrugCreateRequest = {
      name             : data.name,
      shape_uid        : data.shape_uid?.value || '',
      category_uid     : data.category_uid?.value || '',
      therapy_class_uid: data.therapy_class_uid?.value || '',
      status           : data.status?.value || true,
      description      : data.description,
      current_user_uid : data.current_user_uid,
    }
    submitCreateDrug(submitData)
  }

  const getDdlOptions = () => {
    doGetShape().then(
      (resp: any) => {
        if(resp.status == "error"){
          return;
        }

        setShapeOptions(resp.data.output_schema.data)
      } 
    )

    doGetCategory().then(
      (resp: any) => {
        if(resp.status == "error"){
          return;
        }

        setCategoryOptions(resp.data.output_schema.data)
      } 
    )

    doGetTherapyClass().then(
      (resp: any) => {
        if(resp.status == "error"){
          return;
        }

        setTherapyClassOptions(resp.data.output_schema.data)
      } 
    )
  }


  React.useEffect( () => {
    getDdlOptions()
  },[])


  return (
    <>
      <ModalComponent
        modalId      = 'drug-create'
        modalTitle   = 'Drug Create'
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

            <Controller
              name    = "shape_uid"
              control = {control}
              rules   = {{
                // validate:(value, formValues) => (formValues.write_permit || formValues.read_permit || formValues.modify_permit || formValues.delete_permit != false ),
                required: {
                  value  : true,
                  message: "Shape fields is required"
                },
              }}
              render  = { ({ 
                  field     : { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    value                = {value}
                    id                   = "controllable-states-demo"
                    options              = {shapeOptions}
                    sx                   = {{mb:2}}
                    onChange             = {(event: any, value: any) => { onChange(value) }}
                    isOptionEqualToValue = { (option: any, value: any) => option.label || "" ||  option.value == value.value}
                    renderInput          = {(params: any) => 
                    <TextField
                      fullWidth
                      {...params}
                      size       = "medium"
                      label      = "Shape"
                      error      = {!!error}
                      helperText = {error ? error.message : null}
                    />}
                  />
                )
              }
            />


            <Controller
              name    = "category_uid"
              control = {control}
              rules   = {{
                // validate:(value, formValues) => (formValues.write_permit || formValues.read_permit || formValues.modify_permit || formValues.delete_permit != false ),
                required: {
                  value  : true,
                  message: "Category fields is required"
                },
              }}
              render  = { ({ 
                  field     : { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    value                = {value}
                    id                   = "controllable-states-demo"
                    options              = {categoryOptions}
                    sx                   = {{mb:2}}
                    onChange             = {(event: any, value: any) => { onChange(value) }}
                    isOptionEqualToValue = { (option: any, value: any) => option.label || "" ||  option.value == value.value}
                    renderInput          = {(params: any) => 
                    <TextField
                      fullWidth
                      {...params}
                      size       = "medium"
                      label      = "Category"
                      error      = {!!error}
                      helperText = {error ? error.message : null}
                    />}
                  />
                )
              }
            />

            <Controller
              name    = "therapy_class_uid"
              control = {control}
              rules   = {{
                // validate:(value, formValues) => (formValues.write_permit || formValues.read_permit || formValues.modify_permit || formValues.delete_permit != false ),
                required: {
                  value  : true,
                  message: "Therapy Class fields is required"
                },
              }}
              render  = { ({ 
                  field     : { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    value                = {value}
                    id                   = "controllable-states-demo"
                    options              = {therapyClassOptions}
                    sx                   = {{mb:2}}
                    onChange             = {(event: any, value: any) => { onChange(value) }}
                    isOptionEqualToValue = { (option: any, value: any) => option.label || "" ||  option.value == value.value}
                    renderInput          = {(params: any) => 
                    <TextField
                      fullWidth
                      {...params}
                      size       = "medium"
                      label      = "Therapy Class"
                      error      = {!!error}
                      helperText = {error ? error.message : null}
                    />}
                  />
                )
              }
            />

            <Controller
              name    = "status"
              control = {control}
              rules   = {{
                // validate:(value, formValues) => (formValues.write_permit || formValues.read_permit || formValues.modify_permit || formValues.delete_permit != false ),
                required: {
                  value  : true,
                  message: "Status fields is required"
                },
              }}
              render  = { ({ 
                  field     : { onChange, value },
                  fieldState: { error },
                }) => (
                  <Autocomplete
                    value                = {value}
                    id                   = "controllable-states-demo"
                    options              = {statusOptions}
                    sx                   = {{mb:2}}
                    onChange             = {(event: any, value: any) => { onChange(value) }}
                    isOptionEqualToValue = { (option: any, value: any) => option.label || "" ||  option.value == value.value}
                    renderInput          = {(params: any) => 
                    <TextField
                      fullWidth
                      {...params}
                      size       = "medium"
                      label      = "Status"
                      error      = {!!error}
                      helperText = {error ? error.message : null}
                    />}
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
                  multiline
                  fullWidth
                  minRows      = {4}
                  autoComplete = 'off'
                  size         = "medium"
                  onChange     = {onChange}
                  value        = {value}
                  label        = {"Description"}
                  sx           = {{mb:2}}
                />
                )
              }
            />
            <LoadingButtonComponent
              buttonColor = 'primary'
              type        = 'submit'
              disabled    = {!isValid}
              isLoading   = {isLoading}
              id          = 'distributor_create_submit'
            >
              Submit
            </LoadingButtonComponent>
          </Stack>
        </form>
      </ModalComponent>
    </>
  )
};

export default DrugCreateComponent;