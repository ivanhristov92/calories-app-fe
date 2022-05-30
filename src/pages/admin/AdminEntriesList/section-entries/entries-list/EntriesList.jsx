import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Entry from "./Entry"


export default function EnhancedTable({total, limit, setLimit, page, setPage, entries, meals, users, onGridDeleteClicked, onGridEditClicked, setEditEntryOpen, setDeleteOpen}) {
  const rowsPerPage = 10;
  const handleChangePage = (e, val)=>{
    console.log(val)
    setPage(val)
  }
  const handleChangeRowsPerPage = (e, val)=>{
    setLimit(val)
  }
  
  let rows = []
  if(entries && entries.data){
    rows = entries.data;
    if(meals && meals.data){
      let mealsMap = meals.data.reduce((acc, meal)=>{
        return {...acc, [meal.id]: meal}
      }, {})
      rows = rows.map(row=>{
        return {
          ...row,
          mealName: mealsMap[row.meal].title
        }
      })
    }

    if(users && users.data){
      let usersMap = users.data.reduce((acc, user)=>{
        return {...acc, [user.user_id]: user}
      }, {})
      rows = rows.map(row=>{
        return {
          ...row,
          user: usersMap[row.userId]
        }
      })
    }
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
                    Meal
                  </TableCell>
                  <TableCell
                    align="right"
                  >
                    Food
                  </TableCell>
                  <TableCell
                    align="right"
                  >
                    Calories
                  </TableCell>
                  <TableCell
                    align="right"
                  >
                    Time
                  </TableCell>
                  <TableCell
                  >
                  </TableCell>
                  <TableCell
                  >
                  </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                  return <Entry 
                    key={row.id}
                    row={row} 
                    index={index} 
                    onGridEditClicked={onGridEditClicked} 
                    onGridDeleteClicked={onGridDeleteClicked}
                  />
                })}
            
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={total}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          on
        />
      </Paper>
     
  );
}
