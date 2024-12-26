import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, DialogProps } from '@mui/material';
import ButtonComponent from '../atoms/Button.component';
import InfoIcon from '@mui/icons-material/Info';
import LoadingButtonComponent from '../atoms/LoadingButton.component';

interface DeleteConfirmProps {
  modalOpen   : boolean,
  modalOnClose: () => void,
  onDelete    : () => void,
  modalId     : string,
  buttonLoading: boolean,
}

const DeleteConfirmComponent: React.FC<DeleteConfirmProps> = ({
  modalOpen,
  modalOnClose,
  modalId,
  onDelete,
  buttonLoading,
}: any) => {

  const handleOnClose: DialogProps["onClose"] = (event, reason) => {
    if (reason && reason === "backdropClick")
      return;
    modalOnClose()
  }

  const handleConfirm = () => {
    onDelete();
    modalOnClose();
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
          Delete Confirmation
        </DialogTitle>
        
        <IconButton
          aria-label = "close"
          onClick    = {modalOnClose}
          sx         = {{
            position: 'absolute',
            right   : 8,
            top     : 8,
            // color   : (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers id={modalId+"-content"}>
          Do you want to delete this record?
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent : 'space-evenly'
          }}
        >
          
            <ButtonComponent
              key         = {'button-cancel'}
              id          = {'button-cancel'}
              buttonColor = {'shadow'}
              onClick     = {modalOnClose}
              style       = {{
                width: '40%'
              }}
            >
              CANCEL
            </ButtonComponent>

            {/* <ButtonComponent
              id          = 'button-delete'
              onClick     = {handleConfirm}
              buttonColor = {'error'}
            >
              Delete
            </ButtonComponent> */}
            <LoadingButtonComponent
              buttonColor = {'error'}
              onClick     = {handleConfirm}
              isLoading   = {buttonLoading}
              id          = {modalId}
              style       = {{
                width: '40%'
              }}
            >
              DELETE
            </LoadingButtonComponent>


          {/* <Button onClick={modalOnClose}>Disagree</Button>
          <Button onClick={modalOnClose} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
  )
}

export default DeleteConfirmComponent;