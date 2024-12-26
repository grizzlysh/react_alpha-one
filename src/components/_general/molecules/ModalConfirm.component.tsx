import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, DialogProps } from '@mui/material';
import ButtonComponent from '../atoms/Button.component';
import InfoIcon from '@mui/icons-material/Info';
import LoadingButtonComponent from '../atoms/LoadingButton.component';

interface ModalConfirmProps {
  modalOpen    : boolean,
  modalOnClose : () => void,
  onConfirm    : () => void,
  modalId      : string,
  modalText    : string,
  modalButton  : string,
  buttonLoading: boolean,
}

const ModalConfirmComponent: React.FC<ModalConfirmProps> = ({
  modalId,
  modalOpen, 
  modalOnClose,
  onConfirm, 
  modalText,
  modalButton,
  buttonLoading,
}: any) => {

  const handleOnClose: DialogProps["onClose"] = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    modalOnClose()
  }

  const handleConfirm = () => {
    onConfirm();
    modalOnClose();
  }

  return (

      <Dialog
        open             = {modalOpen}
        onClose          = {handleOnClose}
        maxWidth         = {'xs'}
        aria-labelledby  = {modalId}
        aria-describedby = {modalId+'-content'}
        sx               = {{
          '& .MuiDialogTitle-root': {
            fontWeight: 700
          },
          '.MuiDialog-paper' : {
            borderRadius: 4,
          },
        }}
      >
        <DialogTitle id={modalId}>
          Confirmation
        </DialogTitle>
        
        <IconButton
          aria-label = "close"
          onClick    = {modalOnClose}
          sx         = {{
            position: 'absolute',
            right   : 8,
            top     : 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers id={modalId+'content'}>
          {modalText}
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent : 'space-evenly'
          }}
        >
          {/* <Button 
            id      = 'button-cancel'
            color   = 'primary'
            onClick = {modalOnClose}
          >
            Cancel
          </Button> */}
          <ButtonComponent
            key         = {'button-cancel'}
            id          = {'button-cancel'}
            buttonColor = {'error'}
            onClick     = {modalOnClose}
            style       = {{
              width: '40%'
            }}
          >
            CANCEL
          </ButtonComponent>

          {/* <ButtonComponent
            id          = {modalId}
            onClick     = {onConfirm}
            buttonColor = {'shadow'}
            style       = {{
              width: '40%'
            }}
          >
            {modalButton}
          </ButtonComponent> */}

          <LoadingButtonComponent
            buttonColor = {'shadow'}
            onClick     = {handleConfirm}
            isLoading   = {buttonLoading}
            id          = {modalId}
            style       = {{
              width: '40%'
            }}
          >
            APPLY
          </LoadingButtonComponent>

        </DialogActions>
      </Dialog>
  )
}

export default ModalConfirmComponent;