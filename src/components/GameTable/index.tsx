import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, ButtonGroup, Icon, SvgIcon, Box } from '@mui/material';
import { Route, Redirect, Link, useParams } from 'react-router-dom';
import UserMenu from 'src/components/UserMenu';
import loadable from '@loadable/component';

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
  createData('Hyopark들어와', true, 'jji', 1, 0),
  createData('으아아아아', false, 'hyopark', 2, 4),
  createData('Noname', false, 'gilee', 2, 4),
];

function isGamePrivate(
	props:boolean
){
	if(props == true)
		return "🔒";
	return'';
}

const moveToGameRoom = () =>
{
  const { workspace} = useParams<{ workspace: string;}>();
  console.log("CLICK!");
  <Link to = {`/workspace/${workspace}/channel/GameRoom/`} />
}

const MAX_SLOT = 2;
const MAX_OBSERVER = 4;

export default function GameTable() {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Room</b></TableCell>
            <TableCell align="left"><b>Host</b></TableCell>
            <TableCell align="right"><b>Slot</b></TableCell>
            <TableCell align="right"><b>Observer</b></TableCell>
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
                {row.name}{isGamePrivate(row.isprivate)}
              </TableCell>
              <TableCell align="left">{row.host}</TableCell>
              <TableCell align="right">{row.slot}/{MAX_SLOT}</TableCell>
              <TableCell align="right">{row.observer}/{MAX_OBSERVER}</TableCell>
              <TableCell align="right">
                <ButtonGroup variant="outlined" size='small'>
                  <Button startIcon={<VisibilityIcon />}>Observe</Button>
                  <Button component={Link} to={`/workspace/${workspace}/channel/GameRoom/`}>Join</Button>
                  {/*<Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                  <UserMenu />
                  </Button>*/}
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
