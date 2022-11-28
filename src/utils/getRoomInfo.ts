import { IChat, IDM } from '../typings/db';
import dayjs from 'dayjs';
import useSocket from '../hooks/useSocket'
import { Link, Redirect, Switch, Route, useParams } from 'react-router-dom';
// import { Socket } from 'dgram';

  
const getRoomInfo = (event:string) => {
	let ret;
	const { workspace } = useParams<{ workspace?: string }>();
	const [socket] = useSocket(workspace);
	
	console.log("gri cal", workspace, socket, event );
	
	socket?.emit(event, {}, (pr : [])=> {ret = [...pr]
		console.log("ret" ,ret);
	});
	return ret;
}

export default getRoomInfo;
