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
import useSWR from "swr";
import { Button, Container, Grid, Stack, Divider } from '@mui/material';
import PWDModal from 'src/components/PWDModal';
import AddIcon from '@mui/icons-material/Add';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { ConstructionOutlined } from '@mui/icons-material';
import RefreshIcon from '@mui/icons-material/Refresh';

//const PAGE_SIZE = 20;

const Channel = () => {
  const { workspace } = useParams<{ workspace?: string }>();
  const [socket] = useSocket(workspace);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [newRoomFlag, setNewRoomFlag] = useState(false);
  const [redirectRoom, setRedirectRoom] = useState('');
  const [readyMatch, setReadyMatch] = useState(false);
  // const [roomInfo, setRoomInfo] = useState('');
  useEffect(()=>{
    if (!newRoomFlag)
    {
      console.log("crearRoom call");
      socket?.emit("clearRoom");
      socket?.emit("clearGameRoom");
    }
    },[socket])

  const onClickAddRoom = useCallback(() => {
    setShowCreateRoomModal((f)=>true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateRoomModal((f)=>false);
  }, []);

  const onEnterRoom = useCallback( (isAlreadyB:boolean, roomName :string)=>{
    console.log("enter room result",isAlreadyB,roomName);
    if(!isAlreadyB)
      setRedirectRoom((s)=>roomName)
  },[])

  const [roomArr, setRoomArr] = useState<{name:string, userAname:string, enterButton: JSX.Element , obEnterButton: JSX.Element }[]>([]);
  const enterRoom =  useCallback( (e:any)=> {
    console.log ("enterGameRoom?", e);
    socket?.emit("enterGameRoom",e.target.name, (isAlreadyB:boolean) =>onEnterRoom(isAlreadyB,e.target.name))
  },[socket])

  const enterRoomOBS =  useCallback( (e:any)=> {
    console.log ("enterGameRoomOBS?", e.target.name);
    socket?.emit("enterGameRoomOBS",e.target.name);
    setRedirectRoom((s)=>e.target.name +"=OBS")
  },[socket])

  useEffect(()=>{

    socket?.emit("getGameRoomInfo", {}, (publicRoomsArr : {roomName:string , userAname : string}[])=>{
    console.log("publicRooms", publicRoomsArr);
    setRoomArr( (r)=> [...publicRoomsArr.map((eachObj)=>{
        return {
          name: eachObj.roomName,
          userAname: eachObj.userAname,
          enterButton:
            // <Link to={`/workspace/${workspace}/channel/Game/${eachObj.roomName}`}><Button name={eachObj.roomName} onClick={enterRoom}>Join</Button></Link> ,
            <Button name={eachObj.roomName} onClick={enterRoom} >Join</Button>,
          obEnterButton:
            // <Link to={`/workspace/${workspace}/channel/Game/${eachObj.roomName}=OBS`}><Button name={eachObj.roomName} onClick={enterRoomOBS}>????????? Join</Button></Link>
            <Button name={eachObj.roomName} onClick={enterRoomOBS}>????????? Join</Button>
        }})
        ])
        console.log("roomArr ??????", roomArr);
  });
  console.log("room arr:", roomArr);
  }, [ socket]);

  useEffect(()=>{
    socket?.on("newGameRoomCreated", (room:string)=>{
      setNewRoomFlag((f)=>true);//
      console.log("newGameRoomCreated: ");
      console.log(`/workspace/sleact/channel/Game/${room}`);
      setRedirectRoom((s)=>room);
    });
  },[socket,setNewRoomFlag]);



  const findMatch = useCallback(()=>{
    //????????? ??????
    console.log("on findMatch")
    socket?.emit("findMatch", (size:number)=>{
      console.log("size",size);
    // setReadyMatch((f)=>{return (!f);})
    setReadyMatch((f)=>true);
    });
  },[setReadyMatch]);

  const leaveMatch = useCallback(()=>{
    //????????? ??????
    console.log("on leaveMatch")
    socket?.emit("findMatch", (size:number)=>{
      console.log("size",size);
    // setReadyMatch((f)=>{return (!f);})
    setReadyMatch((f)=>false);
    });
  },[setReadyMatch]);

  const findedMatch = useCallback((obj : {roomName:string, isA:boolean })=>{
    console.log("ononon findMatch", obj);
      if(obj.isA){//a???????????? ?????????????????? ?????? ?????????
          console.log("createRoom!");
          setNewRoomFlag((f)=>true);
          setRedirectRoom((s)=>obj.roomName);
          console.log("findMatch Done");
          console.log(`/workspace/sleact/channel/Game/${obj.roomName}`);
      }
      else{//b???????????? ???????????? ?????? ???????????? ??????
        socket?.emit("enterGameRoom",obj.roomName, (isAlreadyB:boolean) =>{
          // onEnterRoom(isAlreadyB,obj.roomName)
          setRedirectRoom((s)=>obj.roomName);
        })
        // setRedirectRoom((s)=>obj.roomName);
      }
      setReadyMatch((f)=>false);
  },[setRedirectRoom,setReadyMatch,setNewRoomFlag]);


  useEffect(()=>{//????????????
    console.log("??????");
    socket?.on("findMatch", (obj : {roomName:string, isA:boolean })=>findedMatch(obj));
  },[socket, findedMatch]);

  const onClickRefresh = useCallback(() => {
    location.reload();
  }, [])

  if (redirectRoom)
    return ( <Redirect to= {`/workspace/sleact/channel/Game/${redirectRoom}`}/>);
  else if (readyMatch)
    {
      return (<><div> ?????? ???..</div>
        <button onClick={leaveMatch}>?????? ?????????(????????? ???)</button>
          </>
      )//??????
    }
  else
  {
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
              <Button variant="outlined" onClick={onClickRefresh}><RefreshIcon /></Button>
              <Button variant="outlined" startIcon={<AddIcon />} onClick={onClickAddRoom}>New Game</Button>
              <Button variant="outlined"  onClick={findMatch} startIcon={<EmojiEventsIcon  />}>Find Match</Button>
            </Stack>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><b>Room Name</b></TableCell>
                  <TableCell align="right"><b>????????????</b></TableCell>
                  <TableCell align="right">??????????????? ??????</TableCell>
                  <TableCell align="right">???????????? ??????</TableCell>
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
