import React, { useState,useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Stack, Button, IconButton, Divider, Tooltip, Box } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import PrintHostVsPlayer from "src/components/PrintHostVsPlayer";
import PongGame from "src/components/PongGame";
import useSocket from "src/hooks/useSocket"
///TODO:  어딜가나 조인 풀리게 clearRoom달아놓기
const GameRoom = () => {
	const { workspace, GameRoom } = useParams<{ workspace: string; GameRoom: string }>();
	const [isPlaying, setIsPlaying]  = useState(false);
	const [warn, setWarn]  = useState('');
	const [socket] = useSocket("sleact");
	// 
	useEffect(()=>{
		console.log("isPlaying?" );
		socket?.emit("isPlaying", GameRoom ,(b:boolean)=> {setIsPlaying(b)});
	}, []);
	
	useEffect(()=>{
		console.log("start" );
		socket?.on("gameStart", (b:boolean)=>{
		if (b) 
			setIsPlaying(true)
		else 
			setWarn("방 주인만 시작할 수 있읍니다.")
		});
	}, []);
	
	const gameStart = useCallback(()=>{
		socket?.emit("gameStart", GameRoom );
	},[]);
	
	if (isPlaying)//혹은 프롭스 넘겨주면서 리다이렉트 -> 옵저버 설정이 좀 애매해짐
		return (
			<PongGame/>
		)
	else
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
							<IconButton aria-label="cancle" component={Link} to={`/workspace/${workspace}/channel/Game/`}>
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
				</Stack>
					{/* <>{warn?{warn}:""}</> */}
			</Container>
		);
};
export default GameRoom;
// 