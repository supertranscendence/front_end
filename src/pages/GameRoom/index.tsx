import React, { useState,useCallback, useEffect } from "react";
import { Link, Redirect,useParams } from "react-router-dom";
import { Container, Stack, Button, IconButton, Divider, Tooltip, Box } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import PrintHostVsPlayer from "src/components/PrintHostVsPlayer";
import PongGame from "src/components/PongGame";
import useSocket from "src/hooks/useSocket"
const GameRoom = () => {
	const { workspace, GameRoom } = useParams<{ workspace: string; GameRoom: string }>();
	// const [alreadyStart, setAlreadyStart]  = useState(false);
	const [gameSet, setGameSet]  = useState(false);
	const [gameDone, setGameDone]  = useState('');
	const [userA, setUserA]  = useState(0);//score
	const [userB, setUserB]  = useState(0);//score
	const [isA, setIsA]  = useState(false);
	const [userNameB, setUserNameB]  = useState('');//score
	const [userNameA, setUserNameA]  = useState('');//score
	const [start, setStart]  = useState(false);
	const [socket] = useSocket("sleact");
	const [returnFlag, setReturnFlag] = useState(false);
	const [modeFlag, setModeFlag] = useState(false);
	
	const GameRoomName = GameRoom.split("=")[0];
	const isOBS = GameRoom.split("=")[1];
	
	
	//gameSet 
	//gameDone
	//방 크리에이터를 위한 룸인포 처음에 불러올 이벤트
	useEffect(()=>{
		console.log("gameRoomInfo emit")
		socket?.emit("gameRoomInfo", GameRoomName, (obj:{playerA:string,playerB:string , isA:boolean}) =>{
			console.log("obj emit", obj);
			setUserNameA(obj.playerA);
			setUserNameB(obj.playerB);
			setIsA(obj.isA);
			})
	  },[socket])
	  
	useEffect(()=>{
		console.log("gameRoomInfo on")
		socket?.on("gameRoomInfo",  (obj:{playerA:string,playerB:string, isA:boolean}) =>{
			console.log("obj on", obj);
			setUserNameA(obj.playerA);
			setUserNameB(obj.playerB);
			})
	  },[socket])
	  
	//게임이 끝났을때 다른 페이지를 렌더할 이벤트 
	//TODO 룸에서 모두 내쫗기 -> 방이 남아있더라
	useEffect(()=>{
		console.log("game done?" );
		socket?.on("gameDone",(winner:string)=> {setGameDone(winner)});
	}, [socket]);
	
	//킥 올 이벤트를 받아서 리턴 시킬 이벤트
	useEffect(()=>{
		console.log("kickAll!" );
		socket?.on("kickAll",()=>{setReturnFlag(true)} );
	}, [socket]);
	
	
	//점수가 바뀌면 받아올 이벤트 (옵저버이면서 점수가 나면 퐁게임 렌더시작)
	useEffect(()=>{
		console.log("game set?" );
		socket?.on("gameSet",(obj:{userA:number, userB:number, mode:boolean} )=> {
			setGameSet(true);
			setUserA(obj.userA);
			setUserB(obj.userB);
			setModeFlag(obj.mode)
			});
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
		console.log("on leave", GameRoomName)
		socket?.emit("leaveGameRoom", {room:GameRoomName}, retrunChannel);
	  },[]);
	
	useEffect(()=>{
		console.log("start");
		socket?.on("gameStart", (obj:{start:boolean, mode:boolean})=> {
			isStart(obj.start);
			setModeFlag(obj.mode) });
	}, [socket]);
	
	const gameStart = useCallback(()=>{
		// setGameSet(true);
		console.log("on gameStart", GameRoomName );
		socket?.emit("gameStart", {room:GameRoomName, mode:false} );
	},[socket]);
	
	const modeGameStart = useCallback(()=>{
		console.log("on gameStart", GameRoomName );
		socket?.emit("gameStart", {room:GameRoomName, mode:true} );
		// setModeFlag((b)=>{return !b;});//TODO:지금은 냅다 트루인데 일단 토글로 해놓고 추후 수정 필요 -> 소켓으로 모드로 바꼇는지 안바꼇는지 changeMode Event
	},[socket]);
	
	if (returnFlag)
	{
		return ( <Redirect to= {`/workspace/sleact/channel/Game`}/>);
	}
	if (gameDone)
	{
		return (<div><h1>{gameDone}님이 이겼네요 호호</h1>
			<button onClick={retrunChannel}>나가기</button>
			</div>
		)
	}
	
	if (isOBS === undefined)
	{
		if (start)
			return (<PongGame userAScore ={0} userBScore={0} mode={modeFlag} isA={isA}/>)
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
							{<h1>GAME ROOM</h1>}{/* game_room_name */}
							<Tooltip title="나가기" arrow>
								<IconButton aria-label="cancle" onClick={leaveRoom}>
									<CancelIcon />
								</IconButton>
							</Tooltip>
						</Stack>
						<Divider variant="middle" />
						<PrintHostVsPlayer userNameA={userNameA} userNameB={userNameB} />  
						{/* <h2>observer list</h2>
						<div>hyopark</div> */}
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
		if (gameSet || start)
			return (<PongGame  userAScore={userA} userBScore={userB} mode={modeFlag } />)
		else 
			return (<div><h1>게임 대기 중</h1>
				<button onClick={leaveRoom}>나가기</button></div>)
	}
};
export default GameRoom;
// 