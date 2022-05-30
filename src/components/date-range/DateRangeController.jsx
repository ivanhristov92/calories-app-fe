import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import styles from "./DateRangeController.module.css"
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';

import {useState} from "react";
import ButtonGroup from '@mui/material/ButtonGroup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function ModeDaily({setDateValue, dateValue}){
    let isToday = true;
    return (
        <div className={styles.wrapper}>
            
            <IconButton>
                    <ArrowBackIosNewIcon />
                </IconButton>
            <DatePicker
                label="Basic example"
                value={dateValue}
                onChange={(newValue) => {
                setDateValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
                 <IconButton disabled={isToday}>
                    <ArrowForwardIosIcon />
                </IconButton>

                <div style={{position: "relative"}}>
                    {
                        !isToday && (
                            <Button className={styles.todayButton} color="secondary">Today</Button>
                        )
                    }
                </div>
               
            
        </div>
    );
}


function ModeFromTo({dateValue, setDateValue}){
    return (
        <>
              <DatePicker
                        label="From"
                        value={dateValue}
                        onChange={(newValue) => {
                        setDateValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
            
                    <DatePicker
                        label="To"
                        value={dateValue}
                        onChange={(newValue) => {
                        setDateValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
        
        </>
    );
}


function ModeSeletor({modes, setMode, mode}){
    return (
        <div style={{padding: 20}}>

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                m: 1,
                },
            }}
        >
        <ButtonGroup variant="text" aria-label="text button group">
            <Button style={{minWidth: 130}} onClick={()=>setMode(modes.DAILY)} variant={mode === modes.DAILY ? "contained" : "text"}>Daily</Button>
            <Button style={{minWidth: 130}} onClick={()=>setMode(modes.FROMTO)} variant={mode === modes.FROMTO ? "contained" : "text"}>From - to</Button>
        </ButtonGroup>
        </Box>
        </div> 

    );
}


export default ({dateValue, setDateValue})=>{
    const modes = {
        DAILY: "daily",
        WEEKLY: "weekly",
        MONTHLY: "monthly",
        FROMTO: "fromto"
    };

    let [mode, setMode] = useState(modes.DAILY)

    return (
        <>
           <Card sx={{ display: 'flex'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <ModeSeletor modes={modes} mode={mode} setMode={setMode}/>

                    {
                        mode === modes.DAILY && (
                            <ModeDaily />
                        )
                    }
                        
                    {
                        mode === modes.FROMTO && (
                            <ModeFromTo />
                        )
                    }


                </CardContent>
            </Card>
        </>

    )
}