import axios from 'axios';
import React, {FC, useCallback, useState ,useEffect} from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Link, Redirect, Switch, Route, useParams } from 'react-router-dom';
// import { Header, ProfileImg, RightMenu, WorkspaceWrapper,Workspaces, Channels, Chats, MenuScroll, WorkspaceName, ProfileModal, LogOutButton, WorkspaceButton, AddButton, WorkspaceModal } from '@layouts/Workspace/style';
import gravatar from "gravatar";
import loadable from '@loadable/component';
import Menu from '@components/Menu';
import { IChannel, IUser } from '@typings/db';
import { Label, Input, Button} from '@pages/SignUp/styles';
import Modal from '@components/Modal'
import useInput from '@hooks/useInput'
import {toast} from 'react-toastify'
import CreateChannelModal from '@components/CreateRoomModal'
// import { channel } from 'diagnostics_channel';
import DirectMessage from '@pages/DirectMessage';
import DMList from '@components/DMList';
import ChannelList from '@components/ChannelList';
import useSocket from '@hooks/useSocket';
// import Intro from '@pages/Intro';

import {
	AddButton,
	Channels,
	Chats,
	Header,
	LogOutButton,
	MenuScroll,
	ProfileImg,
	ProfileModal,
	RightMenu,
	WorkspaceButton,
	WorkspaceModal,
	WorkspaceName,
	Workspaces,
	WorkspaceWrapper,
	InnerHeader
  } from './style';


// const Channel = loadable(() => import ('@pages/Channel') );
const Intro = loadable(() => import ('@pages/Intro') );
// const DirectMessage = loadable(() => import ('@pages/DirectMessage') );


const Chat = loadable(() => import ('@pages/ChatChannel') );
const Game = loadable(() => import ('@pages/GameChannel') );
const GameRoom = loadable(() => import ('@pages/GameRoom') );
const ChatRoom = loadable(() => import ('@pages/ChatRoom') );

interface Props {
	children:any
  }
const Workspace:FC<Props> = ({children}) =>
{
	const {workspace} = useParams<{workspace:string}>();
	const [socket, disconnectSocket] = useSocket(workspace);
	const {data: userData, error, mutate}  = useSWR<IUser | false>('http://localhost:3095/api/users',fetcher);
	const [ShowUserMenu,setShowUserMenu] = useState(false);
	const {data: channelData} = useSWR<IChannel[]>(userData ? `http://localhost:3095/api/workspaces/${workspace}/channels` : null,fetcher);
	
	  console.log(userData);
	const onLogout = useCallback(()=>
	{
		axios.post('http://localhost:3095/api/users/logout', null, {
			withCredentials : true,
		})
			.then(()=>{
				mutate(false);
			})
			// .finally(()=>{ return <Redirect to="/"/>});
	}, []);

	const onClickUserProfile = useCallback(()=>{
		setShowUserMenu(!ShowUserMenu);
	}, [ShowUserMenu]);


	if (!userData)
	{
		return <Redirect to="/"/>;
	}
	return(
		<div>
		<Header>JJIRANSENDANCE</Header>
		<RightMenu>
			<span onClick={onClickUserProfile}>
				<ProfileImg src={gravatar.url(userData.email, {s : '50px', d:'retro'})}/>
				{ShowUserMenu && (
					<Menu style={{right: 0, top: 38}} show={ShowUserMenu} onCloseModal={onClickUserProfile} >
					<ProfileModal>
						<img src = {gravatar.url(userData.email, {s : '50px', d:'retro'})} alt="" />
						<div>
							<span id = "profile-name">
								{userData.nickname}
							</span>
							<span id = "profile-active">
								Active
							</span>
						</div>
					</ProfileModal>
					<LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
				</Menu>
				)}
			</span>
		</RightMenu>
		<WorkspaceWrapper>
			<Channels>
				<WorkspaceName >jjiransendence!</WorkspaceName>
				<MenuScroll>
				<ChannelList />
				<DMList />
				</MenuScroll>
			</Channels>
			<Chats>
				<Switch>
					<Route path = "/workspace/:workspace/intro" component={Intro}/>
					<Route path = "/workspace/:workspace/dm/:id" component={DirectMessage}/>
                    <Route path = "/workspace/:workspace/channel/Chat/:ChatRoom" component={ChatRoom}/>
					<Route path = "/workspace/:workspace/channel/Chat/" component={Chat}/>
                    <Route path = "/workspace/:workspace/channel/Game/" component={Game}/>
                    <Route path = "/workspace/:workspace/channel/GameRoom/" component={GameRoom}/>
				</Switch>
			</Chats>
		</WorkspaceWrapper>
		</div>
	)

}
export default Workspace;
