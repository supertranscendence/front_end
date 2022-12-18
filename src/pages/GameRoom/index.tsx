import React, { useState,useCallback, useEffect } from "react";
import { Link, Redirect,useParams } from "react-router-dom";
import { Container, Stack, Button, IconButton, Divider, Tooltip, Box } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import PrintHostVsPlayer from "src/components/PrintHostVsPlayer";
import PongGame from "src/components/PongGame";
import useSocket from "src/hooks/useSocket"
///TODO:  어딜가나 조인 풀리게 clearRoom달아놓기
const GameRoom = () => {
	const { workspace, GameRoom } = useParams<{ workspace: string; GameRoom: string }>();
	// const [alreadyStart, setAlreadyStart]  = useState(false);
	const [gameSet, setGameSet]  = useState(false);
	const [gameDone, setGameDone]  = useState('');
	const [userA, setuserA]  = useState(0);
	const [userB, setuserB]  = useState(0);
	const [start, setStart]  = useState(false);
	const [socket] = useSocket("sleact");
	const [returnFlag, setReturnFlag] = useState(false);
	const [modeFlag, setModeFlag] = useState(false);
	
	const GameRoomName = GameRoom.split("=")[0];
	const isOBS = GameRoom.split("=")[1];
	
	
	//gameSet 
	//gameDone
	useEffect(()=>{
		console.log("game done?" );
		socket?.on("gameDone",(winner:string)=> {setGameDone(winner)});
	}, [socket]);
	
	useEffect(()=>{
		console.log("game set?" );
		socket?.on("kickAll",(obj:{userA:number, userB:number} )=> {setGameSet(true);setuserA(userA); setuserB(userB)});
	}, [socket]);
	
	useEffect(()=>{
		console.log("game set?" );
		socket?.emit("gameSet",(obj:{userA:number, userB:number, mode:boolean} )=> {setuserA(userA); setuserB(userB), setModeFlag(true)});
	}, [socket]);
	
	const isStart = useCallback((b:boolean)=>{
		if (b) 
		{
			console.log("true" ,b);
			setStart((b)=>true)
		}
		else 
		{   
			console.log("false" ,b);
		}
	},[]);
	const retrunChannel = useCallback(()=>{
		console.log("on retrunChannel")
		setReturnFlag((flag)=>true);
	  },[])
	  
	const leaveRoom = useCallback(()=>{
		  socket?.emit("leaveGameRoom", {room:GameRoomName}, retrunChannel);
	  },[]);
	  
	
	useEffect(()=>{
		console.log("start" );
		socket?.on("gameStart", (b:boolean)=> isStart(b));
	}, [socket]);
	
	const gameStart = useCallback(()=>{
		// setGameSet(true);
		console.log("on gameStart", GameRoomName );
		socket?.emit("gameStart", GameRoomName );
	},[socket]);
	
	const modeGameStart = useCallback(()=>{
		console.log("on gameStart", GameRoomName );
		socket?.emit("gameStart", GameRoomName );
		setModeFlag(true);
	},[socket]);
	
	if (returnFlag)
	{
		return ( <Redirect to= {`/workspace/sleact/channel/Game`}/>);
	}
	if (gameDone)
	{
		return (<div><h1>{gameDone}님이 이겼네요 호호</h1>
			<button onClick={leaveRoom}>나가기</button>
			</div>
		)
	}
	
	if (isOBS === undefined)
	{
	if (start)
		return (<PongGame userAScore ={0} userBScore={0} mode={modeFlag}/>)
	else//TODO: 나가기 온클릭으로 리브룸으로 바꾸기
		return(
			<Container maxWidth="lg">
				<Stack spacing={1}>
					<Stack />
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<h1>GAME ROOM</h1>{/* game_room_name */}
						<Tooltip title="나가기" arrow>
							<IconButton aria-label="cancle" onClick={leaveRoom}>
								<CancelIcon />
							</IconButton>
						</Tooltip>
					</Stack>
					<Divider variant="middle" />
					<PrintHostVsPlayer />  
					{/* playerA = {} playerB = {}/> */}
					{/* nickname 불러와서 출력해줘야함 */}
					<h2>observer list</h2>
					<div>hyopark</div>
					{/* observer list 출력 */}
					<Divider variant="middle" />
					<Button variant="outlined"  onClick={gameStart}>GAME START</Button>
					<Button variant="outlined"  onClick={modeGameStart}>MODE GAME START</Button>
				</Stack>
					{/* <>{warn?{warn}:""}</> */}
			</Container>
		);
	}
	else
	{
		if (gameSet)
			return (<PongGame  userAScore={userA} userBScore={userB} mode={modeFlag} />)
		else 
			return (<div><h1>게임 대기 중</h1>
				<button onClick={leaveRoom}>나가기</button></div>)
	}
};
export default GameRoom;
// 