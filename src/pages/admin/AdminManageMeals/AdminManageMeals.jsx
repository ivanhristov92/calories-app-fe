import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import React, {useState, useEffect} from "react";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import useService from '@service';
import { useAuth0 } from "@auth0/auth0-react";
import {  useQuery, useMutation, useQueryClient  } from 'react-query'

import {SuccessAndError} from "@components/mui-toast/Snack" 



const longText = `
https://fonts.google.com/icons
`;
const MealItem = ({meal, updateMeal})=>{

    let [mealIconName, setMealIconName] = useState("restaurant");
    let [values, setValues] = useState({...meal});
    let [editMode, setEditMode] = useState(false);

    // toaster
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
      updateMeal(values, ()=>{
        setOpen(true);
      })
    };
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };



    
  /**
   * Validations
   */
   let [initial, setInitial] = useState(true); // initial load
   let defaultErrorHelperText = "Incorrect value"
   // set in a callback -- onError - managed by the field
 
   // validators - abstracted, so they can be reused during submit
  //  let userError = initial => !initial && !values.userId;
   let titleError = initial => !initial && !values.title;
   let maxEntriesError = initial => !initial && !values.maxEntries;
   let iconError = initial => !initial && !values.icon;
   
   
   // also called during submit
   function runValidations(initial){
     let validations = {
      //  userError: userError(initial),
      titleError: titleError(initial),
      maxEntriesError: maxEntriesError(initial),
      iconError: iconError(initial),
     };
     return validations;
   }
 
   let validations = runValidations(initial)
 
   /**
    * End of validations
    */
 
   const submit = ()=>{
     // validate
    setInitial(false);
    let eventualValidationState =  runValidations(false)
    
    // if invalid
    if(Object.values(eventualValidationState).some(a=>a===true)){
      console.log("found error", eventualValidationState)
      return;
    } else {
      // if valid
        console.log("handleClick")
        handleClick();
        setEditMode(false)
    }
   }

   const handleEditIconClick = ()=>{
    if(editMode){
      submit()
    } else {
      setEditMode(!editMode)
    }
   }
 
    return (
        <div style={{padding: 5, display: "flex", justifyContent: "center"}}>
            <TextField 
            error={validations.titleError}
            helperText={validations.titleError ? defaultErrorHelperText : ""}
            style={{padding: 5}} 
            disabled={!editMode} 
            value={values.title} 
            onChange={e=>{setValues({...values, title: e.target.value})}} 
            label="Title"  />

            <TextField 
            error={validations.maxEntriesError}
            helperText={validations.maxEntriesError ? defaultErrorHelperText : ""}
            style={{padding: 5}} 
            disabled={!editMode} 
            type= "number" 
            value={values.maxEntries} 
            onChange={e=>{setValues({...values, maxEntries: e.target.value > 0 ? e.target.value : 1 })}} 
            label="Max Entries"  />

            <TextField 
            error={validations.iconError}
            helperText={validations.iconError ? defaultErrorHelperText : ""}
            style={{padding: 5}} 
            disabled={!editMode} 
            value={values.icon} 
            onChange={e=>{setValues({...values, icon: e.target.value})}} 
            label="Icon"  />
         
            {/* asdasd */}


              <Tooltip title={longText}>
                  <IconButton>
                      <Icon>{values.icon || "info"}</Icon>
                  </IconButton>
              </Tooltip>

              <IconButton onClick={handleEditIconClick}>
                      <Icon>{editMode ? "done" : "edit"}</Icon>
              </IconButton>

            <SuccessAndError
            successOpen={open}
            setSuccessOpen={setOpen}
            successMsg={"Success"}
          />
            
        </div>
    );
}

export default ()=>{
  let {service} = useService();
  let [loading, setLoading] = useState(false);

  let [errorMsg, setErrorMsg] = useState("")
  let [successMsg, setSuccessMsg] = useState("")
  let [errorOpen, setErrorOpen] = useState(false);
  let [successOpen, setSuccessOpen] = useState(false);

  const { isLoading: loadingMeals, data: _meals } = useQuery(['meals', {}], 
  () => service.find("meals", {}))
  console.log(_meals)

  const queryClient = useQueryClient();


  const toastCreateSuccess = ()=>{
    setSuccessMsg("Created");
    setSuccessOpen(true)
  }
  const toastCreateError = (msg)=>{
    setErrorMsg(msg);
    setErrorOpen(true)
  }

  const { mutate, isLoading: isLoadingUpdate } = useMutation((data)=>service.update("meals", data.id, data), {
    onSuccess: (data, q) => {
      console.log("success", data, data.msg, q)
      if(data.msg){
        toastCreateError(data.msg)
      } else {
        toastCreateSuccess()
        queryClient.invalidateQueries("meals")
      }
    },
    onError: (e) => {
      console.log("error")
      console.log(e)
      toastCreateError()
    },
    onSettled: (asd) => {
      console.log(asd)
      queryClient.invalidateQueries('meals');
    }
  });

  const updateMeal = async (data, cb)=>{
    console.log(data)
    mutate(data)
    cb && cb()
  }

  

    return (
        <div style={{textAlign: "center", padding: 20}}>
            <h3 style={{padding: 20}}>Manage meals</h3>
            {
             loading && (
                <CircularProgress />
              )
            }

            {
                (_meals?.data || []).map((meal, i)=>{
                    return <MealItem 
                    key={meal.id} meal={meal} updateMeal={updateMeal}/>
                })
            }

        </div>
    );
}