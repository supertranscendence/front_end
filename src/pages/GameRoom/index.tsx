import React from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Stack, Button, IconButton, Divider, Tooltip, Box } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import gravatar from 'gravatar';
import PrintHostVsPlayer from "src/components/PrintHostVsPlayer";

const GameRoom = () => {
	const { workspace, id } = useParams<{ workspace: string; id: string }>();
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
