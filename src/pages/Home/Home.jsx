import DailyStats from './section-daily-stats/DailyStats';
import EntriesList from './section-entries-list/EntriesList';
import { useState, useEffect } from 'react';
import {  useQuery, useMutation, useQueryClient  } from 'react-query'
import { format, subDays } from 'date-fns'
import AddEntryDialog from "./section-entries-list/NewEntryDialog"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useAuth0 } from "@auth0/auth0-react";
import {SuccessAndError} from "@components/mui-toast/Snack"
import useService from "@service";
import {isAfter} from "date-fns"

export default function Home(props){

  let {user: currentUserInfo} = useAuth0();
  let {service, isLoading: isLoadingService} = useService();

  // toaster
  let [errorMsg, setErrorMsg] = useState("")
  let [successMsg, setSuccessMsg] = useState("")
  let [errorOpen, setErrorOpen] = useState(false);
  let [successOpen, setSuccessOpen] = useState(false);


  let [date, setDate] = useState(new Date());
  const prevDate = ()=>{
    setDate(subDays(date, 1))
  }
  const nextDate = ()=>{
    setDate(subDays(date, -1))
  }

  function formatDateRange(date1, date2){
    return `*|${format(date1, "yyyy-MM-dd")}|${format(date2, "yyyy-MM-dd")}|*`
  }

  // let endDate = subDays(date, -1)

  const { isLoading: loadingEntries, data: entries } = useQuery(['entries', {date, currentUserInfo}], 
  () => service.find("entries", {
    // isoDate: formatDateRange(date, endDate), 
    isoDate: formatDateRange(new Date(date.toISOString()), subDays(new Date(date.toISOString()), -1)), 
    userId: currentUserInfo.sub,
    sort: "isoDate:asc"
  }))
  
  let { isLoading: loadingMeals, data: meals } = useQuery(['meals'], () => service.find("meals"))
  

  const queryClient = useQueryClient();

  useEffect(()=>{
    queryClient.invalidateQueries("entries")
  }, [date])

  const toastCreateSuccess = ()=>{
    setSuccessMsg("Created");
    setSuccessOpen(true)
  }
  const toastCreateError = (msg)=>{
    setErrorMsg(msg);
    setErrorOpen(true)
  }
  const { mutate, isLoading } = useMutation((data)=>{
    return service.create("entries", data)
  }, {
    onSuccess: (data, q) => {
      if(data.msg){
        toastCreateError(data.msg)
      } else {
        toastCreateSuccess()
        queryClient.invalidateQueries("entries")
      }
    },
    onError: (e) => {
      toastCreateError()
    },
    onSettled: (asd) => {
      queryClient.invalidateQueries('entries');
    }
  });

  const addEntry = async (entry, cb)=>{
    let newEntry = {
      ...entry,
    }
    newEntry.time = newEntry.time.toString()
    newEntry.isoDate = new Date(entry.time).toISOString();
    newEntry.userId = currentUserInfo.sub
    mutate(newEntry)
    cb && cb(true);
  }
 
 
  if(meals && meals.data){
    meals?.data.forEach(m=>{
      if(!m.icon){
        m.icon = "restaurant";
      }
      return m;
    })
  }

    let caloriesToday;
    if(entries && entries.data){
      caloriesToday = (entries.data || []).reduce((acc, entry)=>{
        let isToday = true; //TODO change
        if(isToday){
          return acc + Number(entry.calories);
        }
        return acc;
      }, 0)
    }

    const wrapperStyle = {display: "flex", flexDirection: "column", height: "100%" };

    return (
        <div style={wrapperStyle}>
          <DailyStats date={date} prevDate={prevDate} nextDate={nextDate} caloriesToday={caloriesToday}/>
           <Card style={{flexGrow: 1}}>
            <CardContent className="custom-scroll" sx={{ flex: '1 0 auto'}}>
              <div>
              <EntriesList entries={entries} meals={meals} addEntry={addEntry}/> 
              </div>
              <AddEntryDialog  date={date} addEntry={addEntry} meals={meals} />
            </CardContent>
          </Card> 

          <SuccessAndError
            errorOpen={errorOpen}
            setErrorOpen={setErrorOpen}
            errorMsg={errorMsg}

            successOpen={successOpen}
            setSuccessOpen={setSuccessOpen}
            successMsg={successMsg}
          />
        </div>
      )
  }
  