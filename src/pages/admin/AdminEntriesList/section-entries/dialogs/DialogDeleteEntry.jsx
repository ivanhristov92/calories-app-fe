import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function EditEntryDialog({open, setOpen, onConfirmDeleteClicked}) {

  return  (
  <div style={{padding: 20}}>
    <Dialog onClose={()=>setOpen(false)} open={open} >
      <div style={{padding:20, display: "flex", flexDirection: "column"}}>

        <DialogTitle style={{textAlign: "center"}}>Are you sure you want to delete?</DialogTitle>

        <Button variant="outlined" color="error" onClick={onConfirmDeleteClicked}>
          Delete
        </Button>
      </div>

    </Dialog>
  </div>)
}
