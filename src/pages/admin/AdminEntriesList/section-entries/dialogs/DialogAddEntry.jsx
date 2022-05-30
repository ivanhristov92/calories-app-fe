import {useState} from "react";
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import MealField from "@components/dialogs/MealField"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import UsersField from "./UsersField"
import Divider from "@components/dialogs/Divider"
import styles from "./DialogAddEntry.module.css"


export default function AddEntryDialog({open, setOpen, values, setValues, handleListItemClick}){

  /**
   * Validations
   */
  let [initial, setInitial] = useState(true); // initial load
  let defaultErrorHelperText = "Incorrect value"
  // set in a callback -- onError - managed by the field
  let [dateTimeError, setDateError] = useState(false);

  // validators - abstracted, so they can be reused during submit
  let userError = initial => !initial && !values.userId;
  let mealError = initial => !initial && !values.meal;
  let foodError = initial => !initial && !values.food;
  let caloriesError = initial => !initial && !values.calories;
  
  

  // also called during submit
  function runValidations(initial, dateTimeError){
    let validations = {
      userError: userError(initial),
      mealError: mealError(initial),
      foodError: foodError(initial),
      caloriesError: caloriesError(initial),
      dateTimeError: !initial && !values.time // used during submit
    };
    if(typeof dateTimeError !== "undefined"){
      validations.dateTimeError = dateTimeError; // used for visualization
    } 
    return validations;
  }

  let validations = runValidations(initial, dateTimeError)
  let dateValue = initial ? (values.time || null) : values.time || "" // triggers an error if it is not null and is empty

  /**
   * End of validations
   */

  const submit = ()=>{
    setInitial(false);
    let eventualValidationState =  runValidations(false)
    if(Object.values(eventualValidationState).some(a=>a===true)){
      return;
    } else {
      handleListItemClick();
      setInitial(true)
      setDateError(false)
    }
  }

  const onClose = ()=>{
    setDateError(false); setOpen(false); setInitial(true);
  }

  return (
        <div style={{padding: 20}}>
    
          <Dialog onClose={onClose} open={open}>

          <div style={{padding:20, display: "flex", flexDirection: "column"}}>
    
            <DialogTitle style={{textAlign: "center"}}>Add a new entry</DialogTitle>
          
            <UsersField 
            error={validations.userError} 
            helperText={validations.userError ? defaultErrorHelperText : ""}
            value={values.userId} setValue={v=>{setValues({...values, userId: v})}}/>
            <Divider /> 
          
            <MealField 
            error={validations.mealError}
            helperText={validations.mealError ? defaultErrorHelperText : ""}
            value={values.meal} 
            setValue={v=>{setValues({...values, meal: v})}}/>
            <Divider /> 
          
            <TextField 
            error={validations.foodError} 
            helperText={validations.foodError ? defaultErrorHelperText: ""} 
            value={values.food} 
            onChange={e=>{setValues({...values, food: e.target.value})}} 
            label="Food" 
            style={{width: "100%"}} />
            <Divider /> 
      
            <TextField 
            type="number"
            error={validations.caloriesError} 
            helperText={validations.caloriesError ? defaultErrorHelperText: ""} 
            value={values.calories} 
            onChange={e=>{setValues({...values, calories: e.target.value})}} 
            label="Calories"   
            style={{width: "100%"}}/>
            <Divider /> 
      
            <DateTimePicker
              label="Time"
              value={dateValue}
              style={{width: "100%"}}
              maxDate={new Date()}
              onChange={(a)=>{
                setValues({...values, time: a})
                setDateError(false)
              }}
              onError={e=>{
                setDateError(e) // sometimes 'e' is null, we don't want to show the error message then, so we pass it on
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            {dateTimeError && (
            <p className={styles["date-error"]}>{defaultErrorHelperText}</p>
            )}
            <Divider /> 

            <Button onClick={submit}>Add</Button>
          </div>
    
        </Dialog>
        </div>
      );
}
