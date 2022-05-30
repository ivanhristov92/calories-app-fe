import {forwardRef} from "react"; 
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export {Alert}


export function SuccessAndError({
  errorMsg, errorOpen, setErrorOpen, 
  successMsg, successOpen, setSuccessOpen
}){
  return (
    <>
       <Snackbar open={errorOpen} autoHideDuration={6000} onClose={()=>setErrorOpen(false)}>
          <Alert onClose={()=>setErrorOpen(false)} severity="error" sx={{ width: '100%' }}>
              {errorMsg}
          </Alert>
      </Snackbar>

      <Snackbar open={successOpen} autoHideDuration={6000} onClose={()=>setSuccessOpen(false)}>
          <Alert onClose={()=>setSuccessOpen(false)} severity="success" sx={{ width: '100%' }}>
              {successMsg}
          </Alert>
      </Snackbar>
    </>
  )
}