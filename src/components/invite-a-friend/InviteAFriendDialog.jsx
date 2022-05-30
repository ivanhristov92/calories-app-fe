import {useState} from "react";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import isEmail from 'validator/lib/isEmail';

function Divider(){
 return (
   <div style={{height: 10}}></div>
 )
}


export default function InviteAFriendDialog({
    open, setOpen, values, setValues, handleSendClicked
}){

  
  /**
   * Validations
   */
   let [initial, setInitial] = useState(true); // initial load
   let defaultErrorHelperText = "Incorrect value"
   // set in a callback -- onError - managed by the field
 
   // validators - abstracted, so they can be reused during submit
  //  let userError = initial => !initial && !values.userId;
   let nameError = initial => !initial && !values.name;
   let emailError = initial => !initial && (!values.email || !isEmail(values.email));
   
   
   // also called during submit
   function runValidations(initial){
     let validations = {
      nameError: nameError(initial),
      emailError: emailError(initial),
     };
     return validations;
   }
 
   let validations = runValidations(initial)
 
   const hasNextStateError = ()=>{
    let eventualValidationState =  runValidations(false)
    return Object.values(eventualValidationState).some(a=>a===true)
   }
   /**
    * End of validations
    */

    const submit = ()=>{
      setInitial(false);
      if(hasNextStateError()){
        console.log("found error")
        return;
      } else {
        console.log("handleSendClicked")
        handleSendClicked();
        setInitial(true)
      }
    }

  return (
        <div >
    
        <Dialog onClose={()=>setOpen(false)} open={open} >
        
        <div style={{padding:20, display: "flex", flexDirection: "column"}}>
            <DialogTitle style={{textAlign: "center"}}>Who do you want to invite?</DialogTitle>
            
            <TextField 
            error={validations.nameError}
            helperText={validations.nameError ? defaultErrorHelperText : ""}
            value={values.name} 
            onChange={e=>{setValues({...values, name: e.target.value})}} 
            label="Name" 
            style={{width: "100%"}} />

            <Divider /> 
      
            <TextField 
            error={validations.emailError}
            helperText={validations.emailError ? defaultErrorHelperText : ""}
            value={values.email} 
            onChange={e=>{setValues({...values, email: e.target.value})}} 
            label="Email"   
            style={{width: "100%"}}/>

            <Divider /> 
           
           
            <Button variant="outlined" color="primary" onClick={submit}>
                Send
            </Button>
        </div>
    
        </Dialog>
        </div>
      );
}
