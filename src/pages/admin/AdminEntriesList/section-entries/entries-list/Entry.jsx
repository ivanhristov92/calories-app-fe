import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {format} from "date-fns"

export default function Entry({row, index, onGridEditClicked, onGridDeleteClicked}){

  return (
      <TableRow
        hover
        onClick={() => {}}
        tabIndex={-1}
        key={row.id}
      >
     
        <TableCell
          component="th"
          scope="row"
          padding="none"
        >
          <div style={{display: "flex", alignItems: "center", padding: 16}}>
          <Avatar  alt="Remy Sharp" src={row.user?.picture} />
              <span style={{padding: 10}}>{row.user?.name}</span>
          </div>
         
          {/*  */}
        </TableCell>
        <TableCell align="right">{row.mealName}</TableCell>
        <TableCell align="right">{row.food}</TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.isoDate ? format(new Date(row.isoDate), "yyyy-MM-dd HH:mm") : ""}</TableCell>
        <TableCell align="right">
          <IconButton style={{padding:0}} onClick={()=>onGridEditClicked(row)}>
              <ModeEditIcon />
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton style={{padding:0}} onClick={()=>onGridDeleteClicked(row)}>
              <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
}