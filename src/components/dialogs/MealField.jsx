import MenuItem from '@mui/material/MenuItem';
import { useQuery } from 'react-query'
import Icon from '@mui/material/Icon';
import useService from "@service"
import TextField from '@mui/material/TextField';

export default function Meal({value, setValue, error, helperText}){
    const {service} = useService();
    let { isLoading: loadingMeals, data: meals } = useQuery(['meals'], () => service.find("meals"))
    if(!meals){
      meals = {data: []}
    }
    console.log(meals)
    return ( 
     <TextField
      select 
      error={error}
      helperText={helperText}
       style={{width: "100%"}}
       value={value}
       onChange={(a)=>{
         setValue(a.target.value)
       }}
       label="Meal"
     >
       <MenuItem value="">
         <em>None</em>
       </MenuItem>
       {
         meals.data.map(meal=>{
           return (
            <MenuItem style={{display: "flex"}} key={meal.id} value={meal.id}><Icon>{meal.icon}</Icon>{meal.title}</MenuItem>
  
           );
         })
       }
     </TextField>
   )
  }