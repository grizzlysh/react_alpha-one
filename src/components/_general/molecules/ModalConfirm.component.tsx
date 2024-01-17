import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, DialogProps } from '@mui/material';
import ButtonComponent from '../atoms/Button.component';
import InfoIcon from '@mui/icons-material/Info';

interface ModalConfirmProps {
  modalOpen   : boolean,
  modalOnClose: () => void,
  onConfirm   : () => void,
  modalId     : string,
  modalTitle  : string,
  modalText   : string,
  modalButton : string,
  buttonColor : string,
}

const ModalConfirmComponent: React.FC<ModalConfirmProps> = ({
  modalOpen, 
  modalOnClose, 
  modalId, 
  onConfirm, 
  modalTitle, 
  modalText,
  modalButton,
  buttonColor, 
}: any) => {

  const handleOnClose: DialogProps["onClose"] = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    modalOnClose()
  }

  return (

      <Dialog
        open             = {modalOpen}
        onClose          = {handleOnClose}
        maxWidth         = {'xs'}
        aria-labelledby  = {modalId}
        aria-describedby = {modalId+"-content"}
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
          {modalTitle}
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

        <DialogContent dividers id={modalId+"-content"}>
          {modalText}
        </DialogContent>

        <DialogActions>
          
            <Button 
              id      = 'button-cancel'
              color   = 'primary'
              onClick = {modalOnClose}
            >
              Cancel
            </Button>

            <ButtonComponent
              id          = 'button-confirm'
              onClick     = {onConfirm}
              buttonColor = {buttonColor}
            >
              {modalButton}
            </ButtonComponent>

        </DialogActions>
      </Dialog>
  )
}

export default ModalConfirmComponent;