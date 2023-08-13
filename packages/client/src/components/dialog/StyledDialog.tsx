import React from 'react'
import Dialog from '@mui/material/Dialog'
import CloseIcon from '@mui/icons-material/Close'
import './StyledDialog.css'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'

type StyledDialogProps = {
  open: boolean
  handleClose: () => void
  title?: string
  children?: React.ReactNode
}

const StyledDialog = ({
  open,
  handleClose,
  title,
  children,
}: StyledDialogProps) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}>
      <DialogTitle>
        {title}
        <IconButton aria-label="close" onClick={handleClose} className="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Понятно
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default StyledDialog
