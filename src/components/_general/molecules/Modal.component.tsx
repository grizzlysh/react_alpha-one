import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';

interface ModalProps {
  modalOpen   : boolean,
  modalOnClose: () => void,
  modalId     : string,
  modalTitle  : string,
  modalSize   : string,
  children    : React.ReactNode,
}

const ModalComponent: React.FC<ModalProps> = ({modalOpen, modalOnClose, modalId, modalTitle, modalSize, children }: any) => {
  return (

      <Dialog
        open             = {modalOpen}
        onClose          = {modalOnClose}
        fullWidth        = {true}
        maxWidth         = {modalSize}
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
            // color   : (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers id={modalId+"-content"}>
            {children}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={modalOnClose}>Disagree</Button>
          <Button onClick={modalOnClose} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
  )
}

export default ModalComponent;