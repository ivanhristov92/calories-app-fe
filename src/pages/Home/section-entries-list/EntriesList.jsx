import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import BoltIcon from '@mui/icons-material/Bolt';
import Tooltip from '@mui/material/Tooltip';


import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import {format} from "date-fns"


function Entry({time, food, calories, meal, icon}){
  return (
    <>
    <ListItem>
      <ListItemAvatar>
        <Tooltip title={time}>
        <IconButton>

          <Icon>
            {icon}
          </Icon>
          </IconButton>

        </Tooltip>

      </ListItemAvatar>
      <ListItemText primary={food} secondary={format(new Date(time), "MM-dd HH:mm")}>
      </ListItemText>
      <div>{calories}</div>
      <BoltIcon />
    </ListItem>
    <Divider variant="inset" component="li" />
    </>
  );
}

export default function EntriesList({entries, meals}) {
  return (
   
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            margin: "0 auto",
            overflow: "auto"
          }}
        >
          {
            (entries?.data || []).map(entry=>{
              if(meals && meals.data){
                let meal = meals.data?.find(m=>m.id ===entry.meal )
                entry.icon = meal.icon;
              }
              return (<Entry {...entry} key={entry.id}/>)
            })
          }
        </List>
     
  );
}



