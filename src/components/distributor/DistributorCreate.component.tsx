import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Autocomplete, Stack, TextField } from "@mui/material";

import UserOnline from '@/types/UserOnline.type';
import { useTypedSelector } from '@/hooks/other/use-type-selector';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import ModalComponent from '../_general/molecules/Modal.component';
import { DistributorCreateInput, DistributorCreateRequest } from '@/services/distributor/create';
import { useDistributorCreate } from '@/hooks/distributor/use-create';
import { statusOptions } from '@/utils/ddlOption';
import ButtonComponent from '../_general/atoms/Button.component';
import ModalConfirmComponent from '../_general/molecules/ModalConfirm.component';

interface DistributorCreateProps {
  resetPagination   : ()=>void,
  handleCloseModal  : ()=>void,
  modalOpen         : boolean,
}

const DistributorCreateComponent: React.FC<DistributorCreateProps> = ({ resetPagination, handleCloseModal, modalOpen }) => {

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

  const { mutate: submitCreateDistributor, isLoading, isSuccess } = useDistributorCreate()

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
        modalId      = 'distributor-create'
        modalTitle   = 'Distributor Create'
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
            name    = "no_permit"
            control = {control}
            rules   = {{ 
              required: {
                value  : true,
                message: "Permit Number field is required"
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
                label        = {"No Permit"}
                variant      = "outlined"
                sx           = {{mb:1}}
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
                message: "Phone field is required"
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
                label        = {"Phone"}
                variant      = "outlined"
                sx           = {{mb:1}}
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
                message: "Contact Person field is required"
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
                label        = {"Contact Person"}
                variant      = "outlined"
                sx           = {{mb:1}}
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
            name    = "address"
            control = {control}
            rules   = {{
              // validate:(value, formValues) => (formValues.write_permit || formValues.read_permit || formValues.modify_permit || formValues.delete_permit != false ),
              required: {
                value  : true,
                message: "Address field is required"
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
                error        = {!!error}
                helperText   = {error ? error.message : " "}
                minRows      = {4}
                size         = "medium"
                onChange     = {onChange}
                value        = {value}
                label        = {"Address"}
                sx           = {{mb:1}}
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
                error        = {!!error}
                helperText   = {error ? error.message : " "}
                sx           = {{mb:1}}
              />
              )
            }
          />

          <ButtonComponent
            onClick     = {handleOpenConfirmModal}
            disabled    = {!isValid}
            id          = 'distributor-create-submit'
            // sx        = {{mt:1}}
          >
            SUBMIT
          </ButtonComponent>
        </Stack>
      </ModalComponent>

      <ModalConfirmComponent
        modalId       = {'distributor-create-confirm'}
        modalOpen     = {openConfirmModal}
        modalOnClose  = {handleCloseConfirmModal}
        onConfirm     = {handleSubmit(onSubmit)}
        modalText     = {'Are you sure want to do this action?'}
        modalButton   = {'APPLY'}
        buttonLoading = {isLoading}
      />
    </>
  )
};

export default DistributorCreateComponent;