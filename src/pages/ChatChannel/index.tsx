//import Table from "src/components/Table";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useSocket from 'src/hooks/useSocket';
import React, { useMemo, useCallback, useEffect, useRef, useState } from 'react';
import { Link, Redirect, Switch, Route, useParams } from 'react-router-dom';
import loadable from '@loadable/component';
import CreateChannelModal from 'src/components/CreateRoomModal'
import { Button, Container, Grid, Stack, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PWDModal from 'src/components/PWDModal';
import RefreshIcon from '@mui/icons-material/Refresh';

const ChatRoom = loadable(() => import ('src/pages/ChatRoom') );
const ChatChannel = () => {
const { workspace } = useParams<{ workspace?: string }>();
const [socket] = useSocket(workspace);
const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
const [showPWDModal, setShowPWDModal] = useState(false);
const [newRoomFlag, setNewRoomFlag] = useState(false);
const [redirectRoom, setRedirectRoom] = useState('');
const [roomInfo, setRoomInfo] = useState('');

const onClickAddRoom = useCallback(() => {
  setShowCreateRoomModal(true);
}, []);

const onClickPWD = useCallback((e:any) => {
  setRoomInfo((o)=> {return e.target.name});
  setShowPWDModal(true);
}, []);

const onCloseModal = useCallback(() => {
  setShowPWDModal(false);
  setShowCreateRoomModal(false);
}, []);

const [roomArr, setRoomArr] = useState<{name:string,roomType:string, currCnt:number , enterButton: JSX.Element }[]>([]);
const enterRoom =  useCallback( (e:any)=> {
  console.log ("ispublic?", e);
  //TODO 사실 enterRoomd 보낼떄 name 안보내도 됨
  socket?.emit("enterRoom",{room:e.target.name, name:"userinfo"},()=>{
  })
},[])

useEffect(()=>{
  if (!newRoomFlag)
  {
    console.log("crearRoom call");
    socket?.emit("clearRoom");
    socket?.emit("clearGameRoom");
    // setNewRoomFlag(false);
  }
  },[socket])


useEffect(()=>{

  socket?.emit("getChatRoomInfo", {}, (publicRoomsArr : {roomName:string , isPublic:boolean, currNum: number}[])=>{
  console.log("publicRooms", publicRoomsArr);
  setRoomArr( [...publicRoomsArr.map((eachObj)=>{
      return {
          name: eachObj.roomName,
          roomType: eachObj.isPublic ? "public" : "private",
          currCnt: eachObj.currNum,
          enterButton: eachObj.isPublic ?
          <Link to={`/workspace/${workspace}/channel/Chat/${eachObj.roomName}`}><Button name={eachObj.roomName} onClick={enterRoom}>Join</Button></Link> :
          <Button name={eachObj.roomName} onClick={onClickPWD}>Join</Button>
      }})
      ])
      console.log("roomArr 배열", roomArr);
});
console.log("room arr:", roomArr);
}, [ socket]);

useEffect(()=>{
  socket?.on("new-room-created", (room:string)=>{
    setNewRoomFlag(true);//
    console.log("new-room-created: ");
    console.log(`/workspace/sleact/channel/Chat/${room}`);
    setRedirectRoom((s)=>room);
  });
},[socket,setNewRoomFlag]);

const onClickRefresh = useCallback(() => {
  location.reload();
}, [])

if (redirectRoom)
  return ( <Redirect to= {`/workspace/sleact/channel/Chat/${redirectRoom}`}/>);
else
{
  return (
    <div>
      {/*<Table columns={columns} data={roomArr} />*/}
      <Container maxWidth="lg">
        <Stack spacing={2}>
          <Stack/>
          <h1>CHAT LOBBY</h1>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
          >
            <Button variant="outlined" onClick={onClickRefresh}><RefreshIcon /></Button>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={onClickAddRoom}>New Chat</Button>
          </Stack>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell align="right"><b>Type</b></TableCell>
                <TableCell align="right"><b>Slot</b></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {roomArr.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                  {/*{isGamePrivate(row.isprivate)}*/}
                </TableCell>
                <TableCell align="right">{row.roomType}</TableCell>
                <TableCell align="right">{row.currCnt}</TableCell>
                <TableCell align="right">
                  {row.enterButton}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
          </TableContainer>
        </Stack>
      </Container>
      <CreateChannelModal
        show={showCreateRoomModal}
        onCloseModal={onCloseModal}
        setShowCreateRoomModal={setShowCreateRoomModal}
        />
        <PWDModal
        show={showPWDModal}
        onCloseModal={onCloseModal}
        setPWDModal={setShowPWDModal}
        roomInfo={roomInfo}
        />

    </div>
  );
}
};

export default ChatChannel;
