
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Autocomplete, Stack, TextField } from "@mui/material";

import { useTypedSelector } from '@/hooks/other/use-type-selector';
import UserOnline from '@/types/UserOnline.type';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import ModalComponent from '../_general/molecules/Modal.component';
import { DdlOptions, statusOptions } from '@/utils/ddlOption';
import Drug from '@/types/Drug.type';
import { DrugUpdateInput, DrugUpdateRequest } from '@/services/drug/update';
import { useDrugUpdate } from '@/hooks/drug/use-update';
import { useShapeDdl } from '@/hooks/shape/use-ddl';
import { useCategoryDdl } from '@/hooks/category/use-ddl';
import { useTherapyClassDdl } from '@/hooks/therapyClass/use-ddl';
import ModalConfirmComponent from '../_general/molecules/ModalConfirm.component';
import ButtonComponent from '../_general/atoms/Button.component';

interface DrugUpdateProps {
  updateDrug      : Drug,
  resetPagination : ()=>void,
  handleCloseModal: ()=>void,
  modalOpen       : boolean,
}

const DrugUpdateComponent: React.FC<DrugUpdateProps> = ({ updateDrug, resetPagination, handleCloseModal, modalOpen }) => {

  const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
  const handleCloseConfirmModal                 = () => setOpenConfirmModal(false);
  const handleOpenConfirmModal                  = () => {
    setOpenConfirmModal(true);
  }
  const [shapeOptions, setShapeOptions]               = React.useState<DdlOptions[]>([])
  const [categoryOptions, setCategoryOptions]         = React.useState<DdlOptions[]>([])
  const [therapyClassOptions, setTherapyClassOptions] = React.useState<DdlOptions[]>([])
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
  const { mutate: submitUpdateDrug, isLoading: isLoadingUpdateDrug, isSuccess}                   = useDrugUpdate({ drug_uid: updateDrug.uid })

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
  
  React.useEffect(() => {
    if(isSuccess == true) {
      resetForm();
      resetPagination();
      handleCloseModal();
    }
  }, [isSuccess]);

  React.useEffect( () => {
    loadData(updateDrug)
  },[updateDrug])


  React.useEffect( () => {
    getDdlOptions()
  },[])


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
        <Stack direction={'column'}>
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

          <Controller
            name    = "shape_uid"
            control = {control}
            rules   = {{
              // validate:(value, formValues) => (formValues.write_permit || formValues.read_permit || formValues.modify_permit || formValues.delete_permit != false ),
              required: {
                value  : true,
                message: "Shape field is required"
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
                  sx                   = {{mb:1}}
                  onChange             = {(event: any, value: any) => { onChange(value) }}
                  isOptionEqualToValue = { (option: any, value: any) => option.label || "" ||  option.value == value.value}
                  renderInput          = {(params: any) => 
                  <TextField
                    fullWidth
                    {...params}
                    size       = "medium"
                    label      = "Shape"
                    error      = {!!error}
                    helperText = {error ? error.message : " "}
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
                message: "Category field is required"
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
                  sx                   = {{mb:1}}
                  onChange             = {(event: any, value: any) => { onChange(value) }}
                  isOptionEqualToValue = { (option: any, value: any) => option.label || "" ||  option.value == value.value}
                  renderInput          = {(params: any) => 
                  <TextField
                    fullWidth
                    {...params}
                    size       = "medium"
                    label      = "Category"
                    error      = {!!error}
                    helperText = {error ? error.message : " "}
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
                message: "Therapy Class field is required"
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
                  sx                   = {{mb:1}}
                  onChange             = {(event: any, value: any) => { onChange(value) }}
                  isOptionEqualToValue = { (option: any, value: any) => option.label || "" ||  option.value == value.value}
                  renderInput          = {(params: any) => 
                  <TextField
                    fullWidth
                    {...params}
                    size       = "medium"
                    label      = "Therapy Class"
                    error      = {!!error}
                    helperText = {error ? error.message : " "}
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
                message: "Status field is required"
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
                  sx                   = {{mb:1}}
                  onChange             = {(event: any, value: any) => { onChange(value) }}
                  isOptionEqualToValue = { (option: any, value: any) => option.label || "" ||  option.value == value.value}
                  renderInput          = {(params: any) => 
                  <TextField
                    fullWidth
                    {...params}
                    size       = "medium"
                    label      = "Status"
                    error      = {!!error}
                    helperText = {error ? error.message : " "}
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
                size         = "medium"
                onChange     = {onChange}
                type         = 'string'
                value        = {value}
                label        = {"Description"}
                variant      = "outlined"
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
            buttonColor = 'shadow'
            onClick     = {handleOpenConfirmModal}
            disabled    = {!isValid || !isDirty}
            id          = 'drug-update-submit'
            // type        = 'submit'
            // sx          = {{mt:1}}
          >
            SUBMIT
          </ButtonComponent>
        </Stack>
      </ModalComponent>
      
      <ModalConfirmComponent
        modalId       = {'drug-update-confirm'}
        modalOpen     = {openConfirmModal}
        modalOnClose  = {handleCloseConfirmModal}
        onConfirm     = {handleSubmit(onSubmit)}
        modalText     = {'Are you sure want to do this action?'}
        modalButton   = {'APPLY'}
        buttonLoading = {isLoadingUpdateDrug}
      />
    </>
  )
};

export default DrugUpdateComponent;