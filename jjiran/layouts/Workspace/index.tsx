import axios from 'axios';
import React, {FC, useCallback, useState } from 'react';
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
import CreateChannelModal from '@components/CreateChannelModal'
// import { channel } from 'diagnostics_channel';
import DirectMessage from '@pages/DirectMessage';
import DMList from '@components/DMList';
import ChannelList from '@components/ChannelList';
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

const Channel = loadable(() => import ('@pages/Channel') );
<<<<<<< HEAD
const ChatChannel = loadable(() => import ('@pages/ChatChannel') );
const GameChannel = loadable(() => import ('@pages/GameChannel') );
const Intro = loadable(() => import ('@pages/Intro') );

=======
const Intro = loadable(() => import ('@pages/Intro') );
>>>>>>> edb1d2b2ab1a6117ee265784c04b061553987610
// const DirectMessage = loadable(() => import ('@pages/DirectMessage') );

const Workspace:FC = ({children}) =>
{
	const {data: userData, error, mutate}  = useSWR<IUser | false>('http://localhost:3095/api/users',fetcher);
	const [ShowUserMenu,setShowUserMenu] = useState(false);
	// const [ShowCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
	// const [ShowCreateChannelModal, setShowCreateChannelModal] = useState(false);
	// const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
	// const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
	// const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');
	const {workspace} = useParams<{workspace:string}>();
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
	
<<<<<<< HEAD
	// const goHomeYank = useCallback((e)=>{
	// 	e.preventDefault();
	// 	console.log("clcickc");
	// // ()=>{<Link to="/workspace/:workspace/intro"/>}
	// },[]);
=======
>>>>>>> edb1d2b2ab1a6117ee265784c04b061553987610
	
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
<<<<<<< HEAD
				<WorkspaceName>jjiransendence!</WorkspaceName>
				{/* <WorkspaceName onClick={(e)=>{e.preventDefault();console.log("clcickc");
				 return<Link to="/workspace/:workspace/intro"/>
				}} >jjiransendence!</WorkspaceName> */}
=======
				<WorkspaceName onClick={()=>{<Redirect to="/workspace/:workspace/intro"/>}} >jjiransendence!</WorkspaceName>
>>>>>>> edb1d2b2ab1a6117ee265784c04b061553987610
				<MenuScroll>
				<ChannelList />
				<DMList />
				</MenuScroll>
			</Channels>
			<Chats>
				<Switch>
					<Route path = "/workspace/:workspace/intro" component={Intro}/>
					<Route path = "/workspace/:workspace/channel/:channel" component={Channel}/>
<<<<<<< HEAD
					<Route path = "/workspace/:workspace/chat/:channel" component={ChatChannel}/>
					{/* <Route path = "/workspace/:workspace/game/:channel" component={GameChannel}/> */}
=======
>>>>>>> edb1d2b2ab1a6117ee265784c04b061553987610
					<Route path = "/workspace/:workspace/dm/:id" component={DirectMessage}/>
				</Switch>
			</Chats>
		</WorkspaceWrapper>
		</div>
	)
	
}
export default Workspace;