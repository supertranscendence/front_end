import React, {FC, useCallback, useState ,useEffect} from 'react';
import useSWR, { mutate } from 'swr';
import fetcher from 'src/utils/fetcher';
import { Link, Redirect, Switch, Route, useParams, useHistory } from 'react-router-dom';
import loadable from '@loadable/component';
import DMList from 'src/components/DMList';
import ChannelList from 'src/components/ChannelList';
import FtAvatar from 'src/components/FtAvatar';
import { AppBar, Avatar, Button, Container, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import { Box, Stack, width } from '@mui/system';
import useSocket from 'src/hooks/useSocket';
import { dataUser, FriendType, listFriend } from 'src/typings/types';
import authfetcher from 'src/utils/authfetcher';
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

const Intro = loadable(() => import ('src/pages/Intro') );
const Profile = loadable(() => import ('src/pages/Profile') );
const Chat = loadable(() => import ('src/pages/ChatChannel') );
const Game = loadable(() => import ('src/pages/GameChannel') );
const GameRoom = loadable(() => import ('src/pages/GameRoom') );
const ChatRoom = loadable(() => import ('src/pages/ChatRoom') );
const DmRoom = loadable(() => import ('src/pages/DmRoom') );

interface Props {
  children:any
}

const Workspace:FC<Props> = ({children}) =>
{
  const { data:myUserData } = useSWR<dataUser>(process.env.REACT_APP_API_URL + '/api/users/my/', fetcher, {
    //dedupingInterval: 2000, // 2초
  });
  const [returnFlag, setReturnFlag] = useState("");
	const {workspace} = useParams<{workspace:string}>();
  const [socket,disconnect] = useSocket(workspace);
  const {data, mutate} = useSWR('token', authfetcher);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenProfileMenu = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [stateFriendList, setStateFriendList] = useState<listFriend>([]);

  //console.log("workspace",localStorage.getItem(" refreshToken"))
	if ( !localStorage.getItem(" refreshToken") )
	{
    console.log("if문 들어감!")
    console.log("return /");
		if (!returnFlag)
		  setReturnFlag("/");
	}
	useEffect(()=>{
	  socket?.on("error",()=>setReturnFlag("/error"));
	},[socket]);
	
	
	
	const allDelCookies = (domain?:any, path?:any) => {
    // const doc = document;
    domain = domain || document.domain;
    path = path || '/';

    const cookies = document.cookie.split('; '); // 배열로 반환
    //console.log(cookies);
    const expiration = 'Sat, 01 Jan 1972 00:00:00 GMT';

    // 반목문 순회하면서 쿠키 전체 삭제
    if (!document.cookie) {
      console.log('삭제할 쿠키가 없습니다.');
    } else {
      for (let i:any = 0; i < cookies.length; i++) {


        //TODO: 도메인을 환경변수로 받아올것!!!!!!
        document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration +"; domain=.gilee.click;";
        document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration +"; domain=127.0.0.1;";
        document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration +"; domain=localhost;";
      }
      console.log('쿠키 전부 삭제완료!![',document.cookie,"]");    }
  };

  const history = useHistory();
  
  
  useEffect(()=>{
    socket?.on("goOBS",(gameRoomName:string)=>{
      if (gameRoomName !== "")
      {
        socket?.emit("enterGameRoomOBS",gameRoomName, ()=>{
          console.log("enterGameRoomOBS", gameRoomName);
          // setRedirectFlag(`/workspace/sleact/channel/Game/${gameRoomName}=OBS`);
          // window.location.href = `/workspace/sleact/channel/Game/${gameRoomName}=OBS`;
          history.push(`/workspace/sleact/channel/Game/${gameRoomName}=OBS`);
        });
      }
    });
  },[socket]);
  
  const onMyProfile = useCallback(()=>
  {
    console.log("myUser Intra", myUserData?.intra);
    window.location.href = `/workspace/sleact/profile/${myUserData?.intra}`;
    //history.push(`/workspace/sleact/profile/${myUserData?.intra}`);
  }, [myUserData])

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

		disconnect();
		// location.href="/";
		//setShowUserMenu(ShowUserMenu => false);
		setReturnFlag("/");

	}, [localStorage, setReturnFlag]);

	if (returnFlag)
  {
    console.log("retruen Flag :", returnFlag);
    return (<Redirect to={returnFlag}/>);
  }
  else
    return(
      <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <h1 >Jjiransendence! </h1>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenProfileMenu} sx={{ p: 0 }}>
                <FtAvatar userAvatar={myUserData?.avatar}/>
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
                <MenuItem onClick={onMyProfile}>My Profile</MenuItem>
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
              <Route path = "/workspace/:workspace/profile/:intra" component={Profile}/>
              <Route path = "/workspace/:workspace/channel/Chat/:ChatRoom/" component={ChatRoom}/>
              <Route path = "/workspace/:workspace/channel/DM/:DmRoom/" component={DmRoom}/>
              <Route path = "/workspace/:workspace/channel/Chat/" component={Chat}/>
              <Route path = "/workspace/:workspace/channel/Game/:GameRoom" component={GameRoom}/>
              <Route path = "/workspace/:workspace/channel/Game/" component={Game}/>
            </Switch>
          </Chats>
      </WorkspaceWrapper>
      </div>
    )

}
export default Workspace;
