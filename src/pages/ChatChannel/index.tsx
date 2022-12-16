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
import axios from "axios";
import authfetcher from "src/utils/authfetcher";
import useSWR from "swr";
import { Button, Container, Grid, Stack, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PWDModal from 'src/components/PWDModal';

const ChatRoom = loadable(() => import ('src/pages/ChatRoom') );
const ChatChannel = () => {
const { workspace } = useParams<{ workspace?: string }>();
const [socket] = useSocket(workspace);
const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
const [showPWDModal, setShowPWDModal] = useState(false);
const [newRoomFlag, setNewRoomFlag] = useState(false);
const [redirectRoom, setRedirectRoom] = useState('');
const [joinedRoom, setJoinedRoom] = useState(false);
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
const {data} = useSWR("token", authfetcher);
const enterRoom =  useCallback( (e:any)=> {
  console.log ("ispublic?", e);
  socket?.emit("enterRoom",{room:e.target.name, name:"userinfo"},()=>{
  })
},[])

const getJoinedRoom = useCallback((str:string)=>{
  const arr :string[] = str.split(" ");
  console.log("arr",arr);
  console.log("arr.length",arr.length);
  console.log("arr.length",arr.length);
  if (arr.length > 1){
    // setJoinedRoom((f)=>true);
    return ;
  }
},[]);

useEffect(()=>{
 socket?.emit("joinedRoom", getJoinedRoom)
},[]);
 
if (joinedRoom)
{
 socket?.emit("ExitRoom", {name:"hyopark", room:"test001"} );
 setJoinedRoom((f)=>false);
 console.log("EXIT in FRONT!");
}

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
}, [ socket, joinedRoom]);

useEffect(()=>{
  socket?.on("new-room-created", (room:string)=>{
    setNewRoomFlag(true);//
    console.log("new-room-created: ");
    console.log(`/workspace/sleact/channel/Chat/${room}`);
    setRedirectRoom((s)=>room);
  });
},[socket,setNewRoomFlag]);

const columns = useMemo(
  () => [
    {
      accessor: "name",
      Header: "Name",
    },
    {
      accessor: "roomType",
      Header: "RoomType",
    },
    {
      accessor: "currCnt",
      Header: "CurrCnt",
    },
    {
      accessor: "enterButton",
      Header: <button onClick={onClickAddRoom}>생성 버튼</button>,
    }
    ,],
  []
);

const fetchch = useCallback(()=>{
  axios.get("https://server.gilee.click/api/auth/ft/refresh", {
  withCredentials:true,
    headers:{
      authorization: 'Bearer ' + localStorage.getItem(" refreshToken"),
      accept: "*/*"
      }
  }).then((response) =>{ console.log(response);console.log("data",response.data);}).catch((err) => console.log(err));
},[])

if (redirectRoom)
  return ( <Redirect to= {`/workspace/sleact/channel/Chat/${redirectRoom}`}/>);
else
{
//TODO : 클리어 룸 버그가 너무 많음 고쳐야함
 if (!newRoomFlag)
  {
    console.log("crearRoom call");
    socket?.emit("clearRoom");
    setNewRoomFlag(false);
  }
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
            <Button variant="outlined" onClick={fetchch} > API 받아오기 (refresh)</Button>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={onClickAddRoom}>New Chat</Button>
          </Stack>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell><b>Room Name</b></TableCell>
                <TableCell align="right"><b>Room Type</b></TableCell>
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
                <TableCell align="right">{row.currCnt}/{4}</TableCell>
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
