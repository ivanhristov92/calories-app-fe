import React, {useState} from "react";
import {  useQuery, useMutation, useQueryClient  } from 'react-query'

import Button from '@mui/material/Button';

// entries list
import EntriesList from "./entries-list/EntriesList"
import Autocomplete from './entries-list/Autocomplete';

// Dialogs
import AddEntryDialog from "./dialogs/DialogAddEntry"
import EditEntryDialog from "./dialogs/DialogEditEntry";
import DeleteEntryDialog from "./dialogs/DialogDeleteEntry"

// Services
import useService from "@service"
import {SuccessAndError} from "@components/mui-toast/Snack"
import { useAuth0 } from "@auth0/auth0-react";



export default function SectionEntriesList(props){

  let {service} = useService()
  
   // toaster
   let [errorMsg, setErrorMsg] = useState("")
   let [successMsg, setSuccessMsg] = useState("")
   let [errorOpen, setErrorOpen] = useState(false);
   let [successOpen, setSuccessOpen] = useState(false);
   const toastSuccess = (msg)=>{
    setSuccessMsg(msg);
    setSuccessOpen(true)
  }
  const toastError = (msg)=>{
    setErrorMsg(msg);
    setErrorOpen(true)
  }
   // users 
   const { isLoading: loadingUsers, data: users } = useQuery(['users'], 
   () => service.find("users"))

  // meals 
  const { isLoading: loadingMeals, data: meals } = useQuery(['meals'], 
  () => service.find("meals"))


  let [page, setPage] = useState(0);
  let [limit, setLimit] = useState(5);
  let [user, setUser] = useState("")
  console.log("user", user)
  //entries
  const { isLoading: loadingEntries, data: entries } = useQuery(['entries', {page, user}], 
  () => service.find("entries", {
    limit: limit,
    offset: page * limit,
    sort: "isoDate:asc",
    ...(user ? {userId: user.user_id} : {})
  }))


  // shared b/n dialogs
  const queryClient = useQueryClient();
  const emptyEntry = ()=>({
    time: "",
    food: "",
    calories: "",
    meal: ""
  });

  let [values, setValues] = useState(emptyEntry());
 
  // add entry dialog
  const [addEntryOpen, setAddEntryOpen] = React.useState(false);
  const { mutate: addEntry, isLoading: isLoadingAddEntry } = useMutation((data)=>{
    let newData = {...data};
    newData.isoDate = new Date(newData.time).toISOString();
    return service.create("entries", newData)
  }, {
    onSuccess: (data, q, s) => {
      if(data.msg){
        // error
        setAddEntryOpen(false);
        toastError(data.msg)
      } else {
        setAddEntryOpen(false);
        toastSuccess("Created")
      }
      queryClient.invalidateQueries('entries');
    },
    onError: (err) => {
      console.log("couldnt create")
      toastSuccess("Couldn't create")
    },
    onSettled: () => {
      queryClient.invalidateQueries('entries');
    }
  });
  const handleAddEntryConfirmed = async () => {
    addEntry(values, ()=>{setAddEntryOpen(false)})
  };

  // edit entry dialog
  const [editEntryOpen, setEditEntryOpen] = useState(false);
  const { mutate: update, isLoading: isLoadingUpdate } = useMutation(([id, data])=>{
    console.log("update data", data)
    let newData = {...data};
    newData.isoDate = new Date(newData.time).toISOString();
    service.update("entries", id, newData)
  }, {
    onSuccess: data => {
      const message = "success"
      queryClient.invalidateQueries('entries');
      setEditEntryOpen(false)
      toastSuccess("Updated")

    },
    onError: () => {
      toastSuccess("Couldn't update")

    },
    onSettled: () => {
      queryClient.invalidateQueries('entries');
    }
  });
  const onConfirmEditClicked = ()=>{
    console.log(values)
    update([values.id, values])
    // setOpen(false)
  }

  // delete dialog
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { mutate: _delete, isLoading } = useMutation((id)=>service.delete("entries", id), {
    onSuccess: data => {
      const message = "success"
      toastSuccess("Deleted")
    },
    onError: () => {
      toastSuccess("Could not delete")
    },
    onSettled: () => {
      queryClient.invalidateQueries('entries');
    }
  });
  const onConfirmDeleteClicked = () => {
    console.log(values)
    _delete(values.id)
    setDeleteOpen(false)
  }

  // dialog toggle controls
  const onAddEntryClicked = ()=>{
    setValues(emptyEntry())
    setAddEntryOpen(true)
  }
  const onEditEntryClicked = (entry)=>{
    setValues({...entry})
    setEditEntryOpen(true)
  }
  const onDeleteEntryClicked = (entry)=>{
    setValues({...entry})
    setDeleteOpen(true)
  }
  

  return (
     <>
       
            <Autocomplete 
              users={users}
              user={user}
              setUser={(val)=>{setUser(val); setPage(0)}}
            />
            <EntriesList 
              limit={limit}
              setLimit={setLimit}
              setPage={setPage}
              page={page}
              total={(entries || {}).total}
              entries={entries} 
              meals={meals}
              users={users}
              onGridEditClicked={onEditEntryClicked} 
              onGridDeleteClicked={onDeleteEntryClicked}
            />

          <div style={{textAlign: "center"}}>
            <Button onClick={onAddEntryClicked}>Add entry</Button>

          </div>

          {
            addEntryOpen && (
              <AddEntryDialog 
              open={addEntryOpen} 
              setOpen={setAddEntryOpen} 
              handleListItemClick={handleAddEntryConfirmed}
              values={values}
              setValues={setValues}
            />
            )
          }
          
          {
            deleteOpen && (
              <DeleteEntryDialog 
              open={deleteOpen} 
              setOpen={setDeleteOpen} 
              onConfirmDeleteClicked={onConfirmDeleteClicked}
              values={values}
              setValues={setValues}
            />
            )
          }

           
          {
            editEntryOpen && (
              <EditEntryDialog 
              open={editEntryOpen} 
              setOpen={setEditEntryOpen} 
              handleListItemClick={onConfirmEditClicked}
              values={values}
              setValues={setValues}
              />
            )
          }
          

              <SuccessAndError
                errorOpen={errorOpen}
                setErrorOpen={setErrorOpen}
                errorMsg={errorMsg}

                successOpen={successOpen}
                setSuccessOpen={setSuccessOpen}
                successMsg={successMsg}
              />
      </>
  );
}

