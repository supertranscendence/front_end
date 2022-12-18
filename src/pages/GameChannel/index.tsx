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
import CreateGameRoomModal from 'src/components/CreateGameRoomModal'
import axios from "axios";
import authfetcher from "src/utils/authfetcher";
import useSWR from "swr";
import { Button, Container, Grid, Stack, Divider } from '@mui/material';
import PWDModal from 'src/components/PWDModal';
import AddIcon from '@mui/icons-material/Add';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

//const PAGE_SIZE = 20;
const Channel = () => {
  const { workspace } = useParams<{ workspace?: string }>();
  const [socket] = useSocket(workspace);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [newRoomFlag, setNewRoomFlag] = useState(false);
  const [redirectRoom, setRedirectRoom] = useState('');
  // const [roomInfo, setRoomInfo] = useState('');
  
  const onClickAddRoom = useCallback(() => {
    setShowCreateRoomModal(true);
  }, []);
  
  const onCloseModal = useCallback(() => {
    setShowCreateRoomModal(false);
  }, []);
  
  const [roomArr, setRoomArr] = useState<{name:string, userAname:string, enterButton: JSX.Element , obEnterButton: JSX.Element }[]>([]);
  const enterRoom =  useCallback( (e:any)=> {
    console.log ("enterGameRoom?", e);
    socket?.emit("enterGameRoom",e.target.name,()=>{
    })
  },[])
  

  useEffect(()=>{
  
    socket?.emit("getGameRoomInfo", {}, (publicRoomsArr : {roomName:string , userAname : string}[])=>{
    console.log("publicRooms", publicRoomsArr);
    setRoomArr( [...publicRoomsArr.map((eachObj)=>{
        return {
          name: eachObj.roomName,
          userAname: eachObj.userAname,
          enterButton: 
            <Link to={`/workspace/${workspace}/channel/Game/${eachObj.roomName}`}><Button name={eachObj.roomName} onClick={enterRoom}>Join</Button></Link> ,
          obEnterButton: 
            <Link to={`/workspace/${workspace}/channel/Game/${eachObj.roomName}`}><Button name={eachObj.roomName} onClick={enterRoom}>Obs Join</Button></Link> 
        }})
        ])
        console.log("roomArr 배열", roomArr);
  });
  console.log("room arr:", roomArr);
  }, [ socket]);
  
  useEffect(()=>{
    socket?.on("newGameRoomCreated", (room:string)=>{
      setNewRoomFlag(true);//
      console.log("newGameRoomCreated: ");
      console.log(`/workspace/sleact/channel/Game/${room}`);
      setRedirectRoom((s)=>room);
    });
  },[socket,setNewRoomFlag]);
  
  
  useEffect(()=>{
    if (!newRoomFlag)
    {
      console.log("clearGameRoom call");
      socket?.emit("clearGameRoom");
      // setNewRoomFlag(false);
    }
    },[socket])
  
  if (redirectRoom)
    return ( <Redirect to= {`/workspace/sleact/channel/Game/${redirectRoom}`}/>);
  else
  {
  //TODO : 클리어 룸 버그가 너무 많음 고쳐야함
    return (
      <div>
        {/*<Table columns={columns} data={roomArr} />*/}
        <Container maxWidth="lg">
          <Stack spacing={2}>
            <Stack/>
            <h1>GAME LOBBY</h1>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={1}
            >
              <Button variant="outlined" startIcon={<AddIcon />} onClick={onClickAddRoom}>New Game</Button>
              <Button variant="outlined" startIcon={<EmojiEventsIcon />}>Find Match</Button>
            </Stack>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><b>Room Name</b></TableCell>
                  <TableCell align="right"><b>Player</b></TableCell>
                  <TableCell align="right"></TableCell>
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
                  <TableCell align="right">{row.userAname}</TableCell>
                  <TableCell align="right">
                    {row.enterButton}
                  </TableCell>
                  <TableCell align="right">
                    {row.obEnterButton}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
            </TableContainer>
          </Stack>
        </Container>
        <CreateGameRoomModal
          show={showCreateRoomModal}
          onCloseModal={onCloseModal}
          setShowCreateRoomModal={setShowCreateRoomModal}
          />
      </div>
    );
  }

};

export default Channel;
