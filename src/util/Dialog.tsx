import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface IDialog {
    openConfirm : boolean;
    setOpenConfirm : Dispatch<SetStateAction<boolean>>;
    handleCofirm : any
}
export default function UDialog({openConfirm,setOpenConfirm ,handleCofirm} : IDialog){
    return ( <Dialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete ?"}
        </DialogTitle>
     
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Disagree</Button>
          <Button onClick={handleCofirm} autoFocus>
             Agree
          </Button>
        </DialogActions>
      </Dialog>)
}