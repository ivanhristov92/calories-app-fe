import { useState } from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IconButton from '@mui/material/IconButton';
import InviteAFriendDialog from './InviteAFriendDialog';
import {useMutation} from "react-query"
import useService from "@service"
import { SuccessAndError } from "@components/mui-toast/Snack"


export default ()=> {
  
  let {service} = useService();

  let [toastIsOpen, setToastIsOpen] = useState(false);


  let [open, setOpen] = useState(false);
  let [values, setValues] = useState({
    name: "",
    email: ""
  });

  const { mutate, isLoading } = useMutation((data)=>service.create("invites", data), {
    onSuccess: data => {
      const message = "success"
    },
    onError: () => {
    },
    onSettled: () => {
    }
  });

  const handleSendClicked = (data, cb)=>{
    mutate(values)
    cb && cb();
    setOpen(false)
    setToastIsOpen(true)
  }


  return (
    <div>
          <IconButton onClick={()=>setOpen(true)}><PersonAddIcon /><span style={{padding: 8, fontSize: 12}}>Invite a friend</span></IconButton>
            
            <InviteAFriendDialog 
              open={open} 
              setOpen={setOpen}
              values={values}
              setValues={setValues}
              handleSendClicked={handleSendClicked}
            />

              <SuccessAndError
                successOpen={toastIsOpen}
                setSuccessOpen={setToastIsOpen}
                successMsg={"Invitation sent"}
            />
            
    </div>
           
        
  );
}
