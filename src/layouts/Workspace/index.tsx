import axios from 'axios';
import React, {FC, useCallback, useState ,useEffect} from 'react';
import useSWR, { mutate } from 'swr';
import fetcher from 'src/utils/fetcher';
import { Link, Redirect, Switch, Route, useParams, NavLink } from 'react-router-dom';
// import { Header, ProfileImg, RightMenu, WorkspaceWrapper,Workspaces, Channels, Chats, MenuScroll, WorkspaceName, ProfileModal, LogOutButton, WorkspaceButton, AddButton, WorkspaceModal } from '@layouts/Workspace/style';
import gravatar from "gravatar";
import loadable from '@loadable/component';
//import Menu from 'src/components/Menu';
import { IChannel, IUser } from 'src/typings/db';
import { Label, Input} from 'src/pages/SignUp/styles';
import Modal from 'src/components/Modal'
import useInput from 'src/hooks/useInput'
import {toast} from 'react-toastify'
import CreateChannelModal from 'src/components/CreateRoomModal'
// import { channel } from 'diagnostics_channel';
import DirectMessage from 'src/pages/DirectMessage';
import DMList from 'src/components/DMList';
import ChannelList from 'src/components/ChannelList';
// import useSocket from 'src/hooks/useSocket';
import authfetcher from 'src/utils/authfetcher';
// import Intro from '@pages/Intro';

import { AppBar, Avatar, Button, Container, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Box, Stack, width } from '@mui/system';
import {
    AddButton,
    Channels,
    Chats,
    //Header,
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

//import GamePong from 'src/pages/GamePong/Game';

const Intro = loadable(() => import ('src/pages/Intro') );
const Profile = loadable(() => import ('src/pages/Profile') );
const Chat = loadable(() => import ('src/pages/ChatChannel') );
const Game = loadable(() => import ('src/pages/GameChannel') );
const GamePong = loadable(() => import ('src/pages/GamePong/Game') );
const GameRoom = loadable(() => import ('src/pages/GameRoom') );
const ChatRoom = loadable(() => import ('src/pages/ChatRoom') );
const DmRoom = loadable(() => import ('src/pages/DmRoom') );

var deleteCookie = function(name:string){
	document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
  }

interface Props {
    children:any
  }
const Workspace:FC<Props> = ({children}) =>
{
	const {workspace} = useParams<{workspace:string}>();
	const {data, mutate} = useSWR('token', authfetcher);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenProfileMenu = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log("workspace",localStorage.getItem(" refreshToken"))
	if ( !localStorage.getItem(" refreshToken") )
	{
    console.log("if문 들어감!")
    console.log("return /");
		location.href ="http://gilee.click/";
		// return <Redirect to="/"/>;
	}
	
	const allDelCookies = (domain?:any, path?:any) => {
    // const doc = document;
    domain = domain || document.domain;
    path = path || '/';
  
    const cookies = document.cookie.split('; '); // 배열로 반환
    console.log(cookies);
    const expiration = 'Sat, 01 Jan 1972 00:00:00 GMT';
  
    // 반목문 순회하면서 쿠키 전체 삭제
    if (!document.cookie) {
      console.log('삭제할 쿠키가 없습니다.');
    } else {
      for (let i:any = 0; i < cookies.length; i++) {
        // const uname = cookies[i].split('=')[0];
        // document.cookie = `${uname}=; expires=${expiration}`;
        document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration +"; domain=.gilee.click;";
        // document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration + '; domain =' + domain;
        // document.cookie = 'mycookie=; expire=날짜; domain=cusmaker.com;'
      }
      console.log('쿠키 전부 삭제완료!![',document.cookie,"]");    }
  };
	const [ShowUserMenu,setShowUserMenu] = useState(false);
	const onLogout = useCallback(()=>
	{
    console.log("onLogout 들어감!")
		localStorage.removeItem(" refreshToken");
		localStorage.removeItem("accessToken");
		// mutate(null);
		// deleteCookie("refreshToken");
		// deleteCookie("accessToken");
    allDelCookies();

		console.log("re tokken",localStorage.getItem(" refreshToken"));
		console.log("ac tokken",localStorage.getItem("accessToken"));
		location.href="/";
		//setShowUserMenu(ShowUserMenu => false);
		
	}, [localStorage]);

    return(
      <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <h2> Jjiransendence! </h2>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenProfileMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
              <Menu
                id="menu-profile"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                >
                <MenuItem onClick={handleClose} component={Link} to={`/workspace/${workspace}/profile`}>Profile</MenuItem>
                <MenuItem onClick={onLogout} >Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <WorkspaceWrapper>
          <Channels>
              <MenuScroll>
              <ChannelList />
              <DMList />
              </MenuScroll>
          </Channels>
          <Chats>
            <Switch>
              <Route path = "/workspace/:workspace/intro" component={Intro}/>
              <Route path = "/workspace/:workspace/profile" component={Profile}/>
              {/*<Route path = "/workspace/:workspace/dm/:id" component={DirectMessage}/>*/}
              <Route path = "/workspace/:workspace/channel/Chat/:ChatRoom/" component={ChatRoom}/>
              <Route path = "/workspace/:workspace/channel/DM/:DmRoom/" component={DmRoom}/>
              <Route path = "/workspace/:workspace/channel/Chat/" component={Chat}/>
              <Route path = "/workspace/:workspace/channel/Game/" component={Game}/>
              <Route path = "/workspace/:workspace/channel/GameRoom/Pong" component={GamePong}/>
              <Route path = "/workspace/:workspace/channel/GameRoom/" component={GameRoom}/>
            </Switch>
          </Chats>
      </WorkspaceWrapper>
      </div>
    )

}
export default Workspace;
