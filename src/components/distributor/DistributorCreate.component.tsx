import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Autocomplete, Stack, TextField } from "@mui/material";

import UserOnline from '@/types/UserOnline.type';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import ModalComponent from '../_general/molecules/Modal.component';
import { DistributorCreateInput, DistributorCreateRequest } from '@/services/distributor/create';
import { useDistributorCreate } from '@/hooks/distributor/use-create';
import { statusOptions } from '@/utils/ddlOptions';

interface DistributorCreateProps {
  getDistributorData: ()=>void,
  handleCloseModal  : ()=>void,
  modalOpen         : boolean,
}

const DistributorCreateComponent: React.FC<DistributorCreateProps> = ({ getDistributorData, handleCloseModal, modalOpen }) => {

  const currentUser: UserOnline                  = useTypedSelector(
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
  } = useForm<DistributorCreateInput>({
    defaultValues: {
      name            : '',
      address         : '',
      phone           : '',
      no_permit       : '',
      contact_person  : '',
      status          : null,
      description     : '',
      current_user_uid: currentUser.uid,
    }
  })

  const resetForm = () => {
    reset({
      name            : '',
      address         : '',
      phone           : '',
      no_permit       : '',
      contact_person  : '',
      status          : null,
      description     : '',
      current_user_uid: currentUser.uid,
    })
  }

  const { mutate: submitCreateDistributor, isLoading } = useDistributorCreate({ getData: getDistributorData, closeModal: handleCloseModal, resetForm: resetForm })

  const onSubmit: SubmitHandler<DistributorCreateInput> = (data) => {
    const submitData: DistributorCreateRequest = {
      name            : data.name,
      address         : data.address,
      phone           : data.phone,
      no_permit       : data.no_permit,
      contact_person  : data.contact_person,
      status          : data.status?.value || true,
      description     : data.description,
      current_user_uid: data.current_user_uid,
    }
    submitCreateDistributor(submitData)
  }

  return (
    <>
      <ModalComponent
        modalId      = 'distributor-create'
        modalTitle   = 'Distributor Create'
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
              name    = "no_permit"
              control = {control}
              rules   = {{ 
                required: {
                  value  : true,
                  message: "Permit Number fields is required"
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
                  label        = {"No Permit"}
                  variant      = "outlined"
                  sx           = {{mb:2}}
                  fullWidth
                />
                )
              }
            />

            <Controller
              name    = "phone"
              control = {control}
              rules   = {{ 
                required: {
                  value  : true,
                  message: "Phone fields is required"
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
                  label        = {"Phone"}
                  variant      = "outlined"
                  sx           = {{mb:2}}
                  fullWidth
                />
                )
              }
            />

            <Controller
              name    = "contact_person"
              control = {control}
              rules   = {{ 
                required: {
                  value  : true,
                  message: "Contact Person fields is required"
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
                  label        = {"Contact Person"}
                  variant      = "outlined"
                  sx           = {{mb:2}}
                  fullWidth
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
                      helperText = {error ? error.message : null}
                      />}
                  />
                )
              }
            />

            <Controller
              name    = "address"
              control = {control}
              rules   = {{
                // validate:(value, formValues) => (formValues.write_permit || formValues.read_permit || formValues.modify_permit || formValues.delete_permit != false ),
                required: {
                  value  : true,
                  message: "Address fields is required"
                },
              }}
              render  = { ({ 
                  field     : { onChange, value },
                  fieldState: { error },
                  formState,
                }) => (
                <TextField
                  multiline
                  fullWidth

                  autoComplete = 'off'
                  helperText   = {error ? error.message : null}
                  minRows      = {4}
                  size         = "medium"
                  onChange     = {onChange}
                  value        = {value}
                  label        = {"Address"}
                  sx           = {{mb:2}}
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
              disabled    = {false}
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

export default DistributorCreateComponent;