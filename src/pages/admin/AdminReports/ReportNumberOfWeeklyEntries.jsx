import * as React from 'react';
import Paper from '@mui/material/Paper';
import { useQuery } from "react-query"
import useService from "@service";

export default ()=>{

  let { service } = useService();

  const { isLoading, data: report } = useQuery(['reports-totalEntriesLastTwoWeeks'], 
  () => service.run("reports", "totalEntriesLastTwoWeeks"));

  let reportPlaceholder = {
    past7: 0,
    weekBefore: 0
  }

  let borderColor = "rgba(224, 224, 224, 1)"
    return (
        <div style={{paddingTop: 20}}>
            <h4>Number of added entries in the last 7 days vs. added entries the week before that.</h4>
            <Paper sx={{ width: '100%', mb: 2 }}>

              <div style={{padding: 20}}>
                <div style={{border: `1px solid ${borderColor}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <div style={{display: "flex", alignItems: "center", justifyContent: "center", borderRight: `1px solid ${borderColor}`, padding: 20}}>
                    <span style={{paddingRight: 20, fontSize: "1.2rem"}}>Last 7 days</span>
                    <span style={{fontSize: "2rem"}}>{(report || reportPlaceholder).past7}</span>
                  </div>
                  
                  <div style={{padding: 20, display: "flex", alignItems: "center", justifyContent: "center",}}>
                    <span style={{fontSize: "2rem"}}>{(report || reportPlaceholder).weekBefore}</span>
                    <span style={{paddingLeft: 20, fontSize: "1.2rem"}}>Week before</span>
                  </div>
                </div>
              </div> 

            </Paper>
        </div>
    );
}