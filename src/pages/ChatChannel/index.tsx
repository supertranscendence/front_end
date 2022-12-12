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

const ChatRoom = loadable(() => import ('src/pages/ChatRoom') );
const ChatChannel = () => {
const { workspace } = useParams<{ workspace?: string }>();
const [socket] = useSocket(workspace);
const [showCreateChannelModal, setShowCreateRoomModal] = useState(false);
const [newRoomFlag, setNewRoomFlag] = useState(false);
const [redirectRoom, setRedirectRoom] = useState('');
const [joinedRoom, setJoinedRoom] = useState(false);

const onClickAddRoom = useCallback(() => {
  setShowCreateRoomModal(true);
}, []);

const onCloseModal = useCallback(() => {
  setShowCreateRoomModal(false);
}, []);

const [roomArr, setRoomArr] = useState<{name:string,roomType:string, currCnt:number , enterButton: JSX.Element }[]>([]);
const {data} = useSWR("token", authfetcher);
const enterRoom = useCallback( (e:any)=> {
// console.log("roooooooomname :" ,e.target.name.value,e.target.name,e.target.name )
  socket?.emit("enterRoom",{room:e.target.name, name:"userinfo"},()=>{
    // location.href = `/workspace/sleact/channel/Chat/${e.target.name}`;
    //<Redirect to= {`/workspace/sleact/channel/Chat/${e.target.name}`}/>
    //TODO: 뒤로가기가 방으로 리다이렉트 되는 이유가 웬지 스테이트를 안바꿔서 그런것같은 예감 다시 초기화 시켜보자!
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
  socket?.emit("getChatRoomInfo", {}, (publicRooms : [])=>{
  console.log("publicRooms", publicRooms);
  //socket.on("getExitRoomInfo, ");
  //socket?.emit("ExitRoom",{room:target.name, name:"userinfo"},()=>{})
  setRoomArr( [...publicRooms.map((_name)=>{
      return {
          name: _name,
          roomType:"public",
          currCnt: 1,
          enterButton:<Link to={`/workspace/${workspace}/channel/Chat/${_name}`}><Button name={_name} onClick={enterRoom}>Join</Button></Link>
      }})
      ])
      console.log("roomArr 배열", roomArr);
});
console.log("room arr:", roomArr);
}, [newRoomFlag, socket, joinedRoom]);

useEffect(()=>{
  socket?.on("new-room-created", (room:string)=>{
    setNewRoomFlag(newRoomFlag => true);
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
      // authorization: 'Bearer ' + data,
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
//  if (!newRoomFlag)
//   {
//     console.log("crearRoom call");
//     socket?.emit("clearRoom");
//   }
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
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
        setShowCreateRoomModal={setShowCreateRoomModal}
        />
    </div>
  );
}
};

export default ChatChannel;
