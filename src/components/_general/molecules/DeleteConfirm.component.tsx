import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, DialogProps } from '@mui/material';
import ButtonComponent from '../atoms/Button.component';
import InfoIcon from '@mui/icons-material/Info';

interface DeleteConfirmProps {
  modalOpen   : boolean,
  modalOnClose: () => void,
  onDelete    : () => void,
  modalId     : string,
}

const DeleteConfirmComponent: React.FC<DeleteConfirmProps> = ({modalOpen, modalOnClose, modalId, onDelete }: any) => {

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

        <DialogActions>
          
            <Button 
              id      = 'button-cancel'
              color   = 'primary'
              onClick = {modalOnClose}
            >
              Cancel
            </Button>

            <ButtonComponent
              id          = 'button-delete'
              onClick     = {onDelete}
              buttonColor = {'error'}
            >
              Delete
            </ButtonComponent>


          {/* <Button onClick={modalOnClose}>Disagree</Button>
          <Button onClick={modalOnClose} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
  )
}

export default DeleteConfirmComponent;