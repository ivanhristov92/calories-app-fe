import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LinearProgressBar from "./LinearProgressBar"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { format } from 'date-fns'

const DAILY_CALORY_TRESHOLD = process.env.REACT_APP_DAILY_CALORY_TRESHOLD;

export default function({caloriesToday, date, prevDate, nextDate}){

    let warn = false;
    let surpassed = false;
    if(caloriesToday){
      if(caloriesToday / DAILY_CALORY_TRESHOLD >= 0.8){
          warn = true;
      }
      if(caloriesToday / DAILY_CALORY_TRESHOLD > 1){
            surpassed = true;
        }
    }
 
    let percentage = Math.floor((caloriesToday / DAILY_CALORY_TRESHOLD) * 100)
    if(isNaN(percentage)){
        percentage = 0
    }

    let _isToday = format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")

    return (
    <Card >
        <CardContent sx={{ flex: '1 0 auto' }}>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <h2>{_isToday ? "Today" : format(date, "yyyy-MM-dd") }'s Entries</h2>
            <div style={{position: "relative"}}>
                <div style={{
                    position: "absolute",
                    width: 90,
                    top: 0,
                    left: 0,
                    transform: "translate(0, -50%)"
                }}>
                    <IconButton style={{padding:0}} onClick={prevDate}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton style={{padding:0}}>
                        <CalendarMonthIcon />
                    </IconButton>
                    <IconButton disabled={_isToday} style={{padding:0}} onClick={nextDate}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </div>
            </div>
        </div>
        <div style={{textAlign: "center", margin: "0 auto", maxWidth: 500}}>
            <LinearProgressBar value={percentage} className={ surpassed ? "surpassed" : (warn ?  "warn" : "")}/>
            <div style={{color: surpassed ? "red" : (warn ? "orange" : "")}}>
            consumed {caloriesToday}/{DAILY_CALORY_TRESHOLD} calories
            </div>
        </div>
        </CardContent>
    </Card>
    )
}