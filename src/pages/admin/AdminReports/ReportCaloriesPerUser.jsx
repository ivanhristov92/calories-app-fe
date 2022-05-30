import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import useService from "@service";
import { useQuery } from "react-query"


function EnhancedTable() {

  let {service} = useService()

  const [selected, setSelected] = React.useState([]);
  const isSelected = (name) => selected.indexOf(name) !== -1;
  
  const { isLoading, data: report } = useQuery(['reports-avgCaloriesPerUserLastWeek'], 
  () => service.run("reports", "avgCaloriesPerUserLastWeek"));

  const {data: users } = useQuery(['users'], 
  () => service.find("users"));

  let usersMap = {};

  if(users && users.data){
    usersMap = users.data.reduce((acc, u)=>{
      return {
        ...acc,
        [u.user_id]: u
      }
    }, {})
  }


  return (
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <TableHead>
              <TableRow>
                
                  <TableCell
                    align="left"
                  >
                    User
                  </TableCell>
                  <TableCell
                    align="right"
                  >
                    Avg Calories
                  </TableCell>
                 
                  <TableCell
                    align="right"
                  >
                    Total Entries
                  </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {(report || []).map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => {}}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.userId}
                      selected={isItemSelected}
                    >
                    
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <div style={{display: "flex", alignItems: "center", paddingLeft: 16}}>
                          <Avatar src={usersMap[row.userId] ? usersMap[row.userId].picture : ""}>
                            </Avatar>
                          <span style={{paddingLeft: 8}}>{usersMap[row.userId] ? usersMap[row.userId].name : row.userId}</span>
                        </div>
                         
                      </TableCell>
                      <TableCell align="right">{row.averageCalories}</TableCell>
                      <TableCell align="right">{row.totalEntries}({row.totalCalories})</TableCell>
                    </TableRow>
                    
                  );
                })}
             
            </TableBody>
          </Table>
        </TableContainer>
        
      </Paper>
     
  );
}


export default ()=>{
    return (
        <div>
            <h4>Average number of calories added per user for the last 7 days</h4>
            <EnhancedTable />
        </div>
    );
}