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
import { ConstructionOutlined } from '@mui/icons-material';

//const PAGE_SIZE = 20;
///TODO:  어딜가나 조인 풀리게 clearRoom달아놓기 -> 했는데 백엔드에서 게임룸 조인도 풀어달라하기

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
    setShowCreateRoomModal(true);
  }, []);
  
  const onCloseModal = useCallback(() => {
    setShowCreateRoomModal(false);
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
    setRoomArr( [...publicRoomsArr.map((eachObj)=>{
        return {
          name: eachObj.roomName,
          userAname: eachObj.userAname,
          enterButton:
            // <Link to={`/workspace/${workspace}/channel/Game/${eachObj.roomName}`}><Button name={eachObj.roomName} onClick={enterRoom}>Join</Button></Link> ,
            <Button name={eachObj.roomName} onClick={enterRoom} >Join</Button>,
          obEnterButton: 
            // <Link to={`/workspace/${workspace}/channel/Game/${eachObj.roomName}=OBS`}><Button name={eachObj.roomName} onClick={enterRoomOBS}>옵저버 Join</Button></Link> 
            <Button name={eachObj.roomName} onClick={enterRoomOBS}>옵저버 Join</Button>
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
  
  useEffect(()=>{//매칭완료
    socket?.on("findMatch", (obj : {roomName:string, isA:boolean })=>{
      // setRedirectRoom((s)=>obj.room);
      console.log("ononon findMatch", obj);
      if(obj.isA){//a유저이면 방생성자로서 역할 해주기
          console.log("createRoom!");
          socket?.emit("createGameRoom", obj.roomName, ()=>{// TODO: 찌가 바꿔주면 이거만 빼자 
          setNewRoomFlag(true);
          setRedirectRoom((s)=>obj.roomName);
          console.log("findMatch Done");
          console.log(`/workspace/sleact/channel/Game/${obj.roomName}`);
        });
      }
      else{//b유저이면 만들어진 방에 입장하는 역할
        socket?.emit("enterGameRoom",obj.roomName, (isAlreadyB:boolean) =>onEnterRoom(isAlreadyB,obj.roomName))
        // setRedirectRoom((s)=>obj.roomName);
      }
      setReadyMatch(false);
    });
  },[socket, setNewRoomFlag]);
  
  const findMatch = useCallback(()=>{
    //대기열 등록
    console.log("on findMatch")
    socket?.emit("findMatch", (size:number)=>{
      console.log("size",size);
    // setReadyMatch((f)=>{return (!f);})
    setReadyMatch(true);
    });
  },[setReadyMatch]);
  
  const leaveMatch = useCallback(()=>{
    //대기열 해제
    console.log("on leaveMatch")
    socket?.emit("findMatch", (size:number)=>{
      console.log("size",size);
    // setReadyMatch((f)=>{return (!f);})
    setReadyMatch(false);
    });
  },[setReadyMatch]);
  
  
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
  else if (readyMatch)
    {
      return (<><div> 매칭 중..</div>
        <button onClick={leaveMatch}>매칭 나가기(테스팅 중)</button>
          </>
      )//버튼 
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
              <Button variant="outlined" startIcon={<AddIcon />} onClick={onClickAddRoom}>New Game</Button>
              <Button variant="outlined"  onClick={findMatch} startIcon={<EmojiEventsIcon  />}>Find Match</Button>
            </Stack>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><b>Room Name</b></TableCell>
                  <TableCell align="right"><b>상대선수</b></TableCell>
                  <TableCell align="right">플레이어로 입장</TableCell>
                  <TableCell align="right">옵저버로 입장</TableCell>
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
