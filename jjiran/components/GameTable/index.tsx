import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LockIcon from '@mui/icons-material/Lock';
import { Button, Icon, SvgIcon } from '@mui/material';

function createData(
  name: string,
  isprivate: boolean,
  host: string,
  slot: number,
  observer: number
) {
  return { name, isprivate, host, slot, observer};
}

const rows = [
  createData('헌터 1:1 초보만', true, 'jisokang', 1, 0),
  createData('Hyopark들어와', false, 'jji', 1, 0),
  createData('으아아아아', false, 'hyopark', 2, 4),
  createData('Noname', false, 'gilee', 2, 4),
];

function isPrivate(
	props:boolean
){
	if(props == true)
		return <LockIcon fontSize='small'/>;
	return'';
}

const MAX_SLOT = 2;
const MAX_OBSERVER = 4;

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Room</TableCell>
            <TableCell align="left">Host</TableCell>
            <TableCell align="right">Slot</TableCell>
            <TableCell align="right">Observer</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}{isPrivate(row.isprivate)}
              </TableCell>
              <TableCell align="left">{row.host}</TableCell>
              <TableCell align="right">{row.slot}/{MAX_SLOT}</TableCell>
              <TableCell align="right">{row.observer}/{MAX_OBSERVER}</TableCell>
              <TableCell align="right"><Button variant="outlined">Join</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
