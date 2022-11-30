import axios from 'axios';
import React, {FC, useCallback, useState ,useEffect} from 'react';
import useSWR from 'swr';
import fetcher from 'src/utils/fetcher';
import { Link, Redirect, Switch, Route, useParams } from 'react-router-dom';
// import { Header, ProfileImg, RightMenu, WorkspaceWrapper,Workspaces, Channels, Chats, MenuScroll, WorkspaceName, ProfileModal, LogOutButton, WorkspaceButton, AddButton, WorkspaceModal } from '@layouts/Workspace/style';
import gravatar from "gravatar";
import loadable from '@loadable/component';
import Menu from 'src/components/Menu';
import { IChannel, IUser } from 'src/typings/db';
import { Label, Input, Button} from 'src/pages/SignUp/styles';
import Modal from 'src/components/Modal'
import useInput from 'src/hooks/useInput'
import {toast} from 'react-toastify'
import CreateChannelModal from 'src/components/CreateRoomModal'
// import { channel } from 'diagnostics_channel';
import DirectMessage from 'src/pages/DirectMessage';
import DMList from 'src/components/DMList';
import ChannelList from 'src/components/ChannelList';
import useSocket from 'src/hooks/useSocket';
import authfetcher from 'src/utils/authfetcher';
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
const Intro = loadable(() => import ('src/pages/Intro') );
// const DirectMessage = loadable(() => import ('@pages/DirectMessage') );


const Chat = loadable(() => import ('src/pages/ChatChannel') );
const Game = loadable(() => import ('src/pages/GameChannel') );
const GameRoom = loadable(() => import ('src/pages/GameRoom') );
const ChatRoom = loadable(() => import ('src/pages/ChatRoom') );

interface Props {
	children:any
  }
const Workspace:FC<Props> = ({children}) =>
{
	const {workspace} = useParams<{workspace:string}>();
// 	const {data} = useSWR('token', authfetcher ,{
//     	dedupingInterval:100000
//   });
	const [ShowUserMenu,setShowUserMenu] = useState(false);
	const onLogout = useCallback(()=>
	{
		axios.post('/api/users/logout', null, {
			withCredentials : true,
		})
			.then(()=>{
				// mutate(false);
			})
			// .finally(()=>{ return <Redirect to="/"/>});
	}, []);

	const onClickUserProfile = useCallback(()=>{
		setShowUserMenu(!ShowUserMenu);
	}, [ShowUserMenu]);


	if ( !localStorage.getItem(" refreshToken") )
	// if (!data )
	{
		return <Redirect to="/"/>;
	}
	return(
		<div>
		<Header>JJIRANSENDANCE</Header>
		<RightMenu>
			<span onClick={onClickUserProfile}>
				{/* <ProfileImg src={gravatar.url(userData.email, {s : '50px', d:'retro'})}/> */}
				유저프로필버튼이여야할것
				{ShowUserMenu && (
					<Menu style={{right: 0, top: 38}} show={ShowUserMenu} onCloseModal={onClickUserProfile} >
					<ProfileModal>
						{/* <img src = {gravatar.url(userData.email, {s : '50px', d:'retro'})} alt="" /> */}
						<div>
							<span id = "profile-name">
								{/* {userData.nickname} */}
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
                    <Route path = "/workspace/:workspace/channel/Chat/:ChatRoom/" component={ChatRoom}/>
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