import React from "react";
import { Container, Stack, Button, IconButton, Divider, Tooltip } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import gravatar from 'gravatar';

const GameRoom = () => {
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
						<IconButton aria-label="cancle">
							<CancelIcon />
							{/* EXIT to gameChannel */}
						</IconButton>
					</Tooltip>
				</Stack>
				<Divider variant="middle" />
				<Stack direction="row" justifyContent="space-between">
					<div>
						<img src={gravatar.url('wltnskjs@naver.com', { s: '36px', d: 'retro' })} />
						<b>jisokang</b>
					</div>
					<h3> VS </h3>
					<div>
						<b>jisokang2</b>
						<img src={gravatar.url('wltnskjs@naver.com', { s: '36px', d: 'retro' })} />
					</div>
				</Stack>
				{/* nickname 불러와서 출력해줘야함 */}
				<h2>observer list</h2>
				<div>hyopark</div>
				{/* observer list 출력 */}
				<Divider variant="middle" />
				<Button variant="outlined">GAME START</Button>
			</Stack>
		</Container>
	);
};

export default GameRoom;
