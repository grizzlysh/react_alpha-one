
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Autocomplete, Stack, TextField } from "@mui/material";

import { useTypedSelector } from '@/hooks/other/use-type-selector';
import UserOnline from '@/types/UserOnline.type';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import ModalComponent from '../_general/molecules/Modal.component';
import { DistributorUpdateInput, DistributorUpdateRequest } from '@/services/distributor/update';
import { useDistributorUpdate } from '@/hooks/distributor/use-update';
import { ddlOptions, statusOptions } from '@/utils/ddlOptions';
import Drug from '@/types/Drug.type';
import { DrugUpdateInput, DrugUpdateRequest } from '@/services/drug/update';
import { useDrugUpdate } from '@/hooks/drug/use-update';
import { useShapeDdl } from '@/hooks/shape/use-ddl';
import { useCategoryDdl } from '@/hooks/category/use-ddl';
import { useTherapyClassDdl } from '@/hooks/therapyClass/use-ddl';

interface DrugUpdateProps {
  updateDrug      : Drug,
  getDrugData     : ()=>void,
  handleCloseModal: ()=>void,
  modalOpen       : boolean,
}

const DrugUpdateComponent: React.FC<DrugUpdateProps> = ({ updateDrug, getDrugData, handleCloseModal, modalOpen }) => {

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
    handleSubmit,
    reset,
    formState: { isValid, isDirty, errors },
  } = useForm<DrugUpdateInput>({
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
  const loadData = (data: Drug) => {
    console.log("oke")
    console.log(data)
    reset({
      name             : data.name,
      shape_uid        : { value: data.shapes.uid, label: data.shapes.name },
      category_uid     : { value: data.categories.uid, label: data.categories.name },
      therapy_class_uid: { value: data.therapy_classes.uid, label: data.therapy_classes.name },
      description      : data.description || '',
      status           : data.status ? {value: true, label: 'Active'} : {value: false, label: 'Inactive'},
      current_user_uid : currentUser.uid,
    })
  }

  const { refetch: doGetShape, data: dataShape, isLoading: isLoadingShape }                      = useShapeDdl();
  const { refetch: doGetCategory, data: dataCategory, isLoading: isLoadingCategory }             = useCategoryDdl();
  const { refetch: doGetTherapyClass, data: dataTherapyClass, isLoading: isLoadingTherapyClass } = useTherapyClassDdl();
  const { mutate: submitUpdateDrug, isLoading: isLoadingUpdateDrug }                             = useDrugUpdate({ drug_uid: updateDrug.uid, closeModal: handleCloseModal, getData: getDrugData, resetForm: resetForm })

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
    loadData(updateDrug)
  },[updateDrug])


  React.useEffect( () => {
    getDdlOptions()
  },[])


  const onSubmit: SubmitHandler<DrugUpdateInput> = (data) => {
    const submitData: DrugUpdateRequest = {
      
      name             : data.name,
      shape_uid        : data.shape_uid?.value || '',
      category_uid     : data.category_uid?.value || '',
      therapy_class_uid: data.therapy_class_uid?.value || '',
      description      : data.description || '',
      status           : data.status?.value || true,
      current_user_uid : data.current_user_uid,
    }
    submitUpdateDrug(submitData)
  }

  return (
    <>
      <ModalComponent
        modalId      = 'drug-edit'
        modalTitle   = 'Drug Edit'
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
                    id                   = "shape-autocomplete"
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
                    id                   = "category-autocomplete"
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
                    id                   = "therapyclass-autocomplete"
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
                  minRows      = {4}
                  autoComplete = 'off'
                  helperText   = {error ? error.message : null}
                  size         = "medium"
                  error        = {!!error}
                  onChange     = {onChange}
                  type         = 'string'
                  value        = {value}
                  label        = {"Description"}
                  variant      = "outlined"
                  sx           = {{mb:2}}
                  multiline
                  fullWidth
                />
                )
              }
            />
            <LoadingButtonComponent
              buttonColor = 'primary'
              type        = 'submit'
              disabled    = {!isValid || !isDirty}
              isLoading   = {isLoadingUpdateDrug}
              id          = 'drug_update_submit'
            >
              Submit
            </LoadingButtonComponent>
          </Stack>
        </form>
      </ModalComponent>
    </>
  )
};

export default DrugUpdateComponent;