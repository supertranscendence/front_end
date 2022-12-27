import { Avatar } from "@mui/material";
import React, {VFC} from "react";

interface Props {
	userAvatar: string | undefined
	size?: number | undefined
}

const FtAvatar: VFC<Props> = ({userAvatar, size}) => {
	if(size === undefined )
		size = 36;
	return(
		<Avatar
			src={'https://gilee.click/' + userAvatar + '.png'}
			sx={{ width: size, height: size}}
		/>
	);
}
	//TODO 환경변수

export default FtAvatar;
