import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useState, useEffect} from "react";
import service from "@service"

export default function ComboBox({users, user, setUser}) {
  let _users = [];
  
  if(users && users.data){
    _users = (users.data).map(a=>{return {...a, label: `${a.name} (${a.email})`}})
  }

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={_users}
      sx={{ width: 300 }}
      value={user}
      onChange={(e, val)=>{
        setUser(val)
      }}
      renderInput={(params, b) => {
        return <TextField {...params} key={params.email} label="User" />
    }}
    />
  );
}
