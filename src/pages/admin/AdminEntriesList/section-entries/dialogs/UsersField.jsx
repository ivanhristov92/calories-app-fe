import MenuItem from '@mui/material/MenuItem';
import { useQuery } from 'react-query'
import useService from "@service"
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';


export default function Users({error, helperText, value, setValue}){
  const {service} = useService();

    let { isLoading, data: users } = useQuery(['users'], () => service.find("users"))
    if(!users){
        users = {data: []}
    } else {
      users = {data: users.users}
    }
    return ( 
     <TextField
      error={error}
      helperText={helperText}
       style={{width: "100%", display: "flex"}}
       value={value || ""}
       onChange={(a)=>{
         setValue(a.target.value)
       }}
       select
       label="User"
     >
       <MenuItem value="">
         <em>None</em>
       </MenuItem>
       {
         users.data.map(user=>{
           return (
            <MenuItem key={user.user_id} value={user.user_id}>          
              <Avatar  alt="Remy Sharp" src={user.picture} />
              <span style={{paddingLeft: 10}}>{user.name}</span>
            </MenuItem>
  
           );
         })
       }
     </TextField>
   )
  }