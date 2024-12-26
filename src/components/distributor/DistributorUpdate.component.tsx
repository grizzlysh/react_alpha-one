
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Autocomplete, Stack, TextField } from "@mui/material";

import { useTypedSelector } from '@/hooks/other/use-type-selector';
import UserOnline from '@/types/UserOnline.type';
import LoadingButtonComponent from '../_general/atoms/LoadingButton.component';
import ModalComponent from '../_general/molecules/Modal.component';
import Distributor from '@/types/Distributor.type';
import { DistributorUpdateInput, DistributorUpdateRequest } from '@/services/distributor/update';
import { useDistributorUpdate } from '@/hooks/distributor/use-update';
import { statusOptions } from '@/utils/ddlOption';
import ModalConfirmComponent from '../_general/molecules/ModalConfirm.component';
import ButtonComponent from '../_general/atoms/Button.component';

interface DistributorUpdateProps {
  updateDistributor: Distributor,
  resetPagination  : ()=>void,
  handleCloseModal : ()=>void,
  modalOpen        : boolean,
}

const DistributorUpdateComponent: React.FC<DistributorUpdateProps> = ({ updateDistributor, resetPagination, handleCloseModal, modalOpen }) => {

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
    handleSubmit,
    reset,
    formState: { isValid, isDirty, errors },
  } = useForm<DistributorUpdateInput>({
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
      current_user_uid: currentUser.uid,
    })
  }
  const loadData = (data: Distributor) => {
    reset({
      name            : data.name,
      address         : data.address,
      phone           : data.phone,
      no_permit       : data.no_permit,
      contact_person  : data.contact_person,
      status          : data.status ? {value: true, label: 'Active'} : {value: false, label: 'Inactive'},
      description     : data.description,
      current_user_uid: currentUser.uid,
    })
  }
  
  const { mutate: submitUpdateDistributor, isLoading: isLoadingUpdateDistributor, isSuccess } = useDistributorUpdate({ distributor_uid: updateDistributor.uid })

  const onSubmit: SubmitHandler<DistributorUpdateInput> = (data) => {
    const submitData: DistributorUpdateRequest = {
      name            : data.name,
      address         : data.address,
      phone           : data.phone,
      no_permit       : data.no_permit,
      contact_person  : data.contact_person,
      status          : data.status?.value || true,
      description     : data.description,
      current_user_uid: data.current_user_uid,
    }
    submitUpdateDistributor(submitData)
  }

  React.useEffect( () => {
    loadData(updateDistributor)
  },[updateDistributor])

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
        modalId      = 'distributor-edit'
        modalTitle   = 'Distributor Edit'
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
                disabled     = {isLoadingUpdateDistributor}
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
                disabled     = {isLoadingUpdateDistributor}
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
                disabled     = {isLoadingUpdateDistributor}
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
                disabled     = {isLoadingUpdateDistributor}
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
                  disabled             = {isLoadingUpdateDistributor}
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
                helperText   = {error ? error.message : " "}
                error        = {!!error}
                disabled     = {isLoadingUpdateDistributor}
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
                disabled     = {isLoadingUpdateDistributor}
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
            buttonColor = 'shadow'
            onClick     = {handleOpenConfirmModal}
            disabled    = {!isValid || !isDirty}
            id          = 'distributor-update-submit'
            // type        = 'submit'
            // sx          = {{mt:1}}
          >
            SUBMIT
          </ButtonComponent>
        </Stack>
      </ModalComponent>

      <ModalConfirmComponent
        modalId       = {'distributor-update-confirm'}
        modalOpen     = {openConfirmModal}
        modalOnClose  = {handleCloseConfirmModal}
        onConfirm     = {handleSubmit(onSubmit)}
        modalText     = {'Are you sure want to do this action?'}
        modalButton   = {'APPLY'}
        buttonLoading = {isLoadingUpdateDistributor}
      />
    </>
  )
};

export default DistributorUpdateComponent;