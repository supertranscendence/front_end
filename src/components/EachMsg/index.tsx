import { IUser } from 'src/typings/db';
import fetcher from 'src/utils/fetcher';
import React, {useState, useCallback, useEffect, VFC } from 'react';
import { useParams } from 'react-router';
import { NavLink, useLocation, Redirect, Link } from 'react-router-dom';
import useSWR from 'swr';
import {ProfileImg} from 'src/layouts/Workspace/style'
import gravatar from "gravatar";
import { Modal, Avatar, Badge, Button, IconButton, Menu, MenuItem, List, Container, ListItem, ListItemAvatar, ListItemText, ListItemButton } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import { styled } from '@mui/material/styles';
import PendingIcon from '@mui/icons-material/Pending';

import { Stack } from '@mui/system';
import useSocket from 'src/hooks/useSocket';
import axios from 'axios';
import { dataUser, UserStatus } from 'src/typings/types';
import FtAvatar from 'src/components/FtAvatar';
import { useHistory } from 'react-router-dom';
import theme from 'src/theme';
interface Props {
  roomName?: string
  msg : {
    name: string,
    msg :string,
    avatar:string
    status?: string;
    isDm?:boolean;
  }
}




const EachMsg: VFC<Props> = ({ msg, roomName }) => {
  const { workspace } = useParams<{ workspace?: string }>();
  const location = useLocation();
  const [socket] = useSocket("sleact");
  const [returnURL, setReturnURL] = useState("");
  const [friendMode, setFriendMode] = useState('flex');
  const [statShow, setStatShow] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { data:myUserData } = useSWR<dataUser>(process.env.REACT_APP_API_URL + '/api/users/my/', fetcher, {
    //dedupingInterval: 2000, // 2초
  });
  const [user, setUser] = useState<dataUser>();
  const [redirectFlag, setRedirectFlag] = useState("");
  const open = Boolean(anchorEl);
  const history = useHistory();
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if(roomName === undefined || (msg.isDm !== undefined && msg.isDm === true) ){
      console.log("Friend List Mode");
      setFriendMode('none');
    }
    
    if(msg.status === undefined){
      setStatShow('none');
    }
    //console.log("[!!!!]msg.name: ", msg.name);
    if(msg.name != "it's me"){
      axios
        .get(process.env.REACT_APP_API_URL + `/api/users/${msg.name}`, {
        withCredentials:true,
          headers:{
            authorization: 'Bearer ' + localStorage.getItem("accessToken"),
            accept: "*/*"
            }
        })
      .then((response) =>{
        if(response.status === 500)
            window.location.href = "/error";
        setUser(response.data);
      })
      .catch((err) => {
        console.log("[ERROR] get /api/users/{id}")
        console.log(err)
        window.location.href = "/error";
      });
    }
    else{
      console.log("myUser.intra", myUserData?.intra);
      console.log("myUser.avatar:", myUserData?.avatar)
      setUser(myUserData);
    }
    }, []);

  const setAdmin = useCallback(()=>{
  console.log("setAdmin",{roomName:roomName , adminUser :msg.name} );
    socket?.emit("setAdmin", {roomName:roomName , adminUser :msg.name} ,(arr : string[])=>{console.log("done admin arr:", arr)} );
  },[socket, ])

  const kickUser = useCallback(()=>{
    console.log("kickUser", {roomName:roomName , kickUser :msg.name} ,socket);
    socket?.emit("kickUser", {roomName:roomName , kickUser :msg.name}, (s :string)=>{console.log("done kick",s)} );
  },[socket, ])

  const banUser = useCallback(()=>{
    console.log("banUser", {roomName:roomName , banUser :msg.name} );
    socket?.emit("banUser", {roomName:roomName , banUser :msg.name},(arr : string[])=>{console.log("done ban arr:", arr)});
  },[socket, ])

  const muteUser = useCallback(()=>{
    console.log("muteUser",{roomName:roomName , muteUser :msg.name} );
    socket?.emit("muteUser", {roomName:roomName , muteUser :msg.name}, (arr : string[])=>{console.log("done mute arr:", arr)} );
  },[socket, ])

  const shellWeDm = useCallback(()=>{
    console.log("shellWeDm",{roomName:roomName , goDM :msg.name} );
    socket?.emit("shellWeDm", {roomName:roomName , shellWeDmUser:msg.name}, ()=>{console.log("shellWeDm done")} );
  },[socket, ])

  const shellWeGame = useCallback(()=>{
    console.log("shellWeGame",{roomName:roomName , goDM :msg.name} );
    socket?.emit("shellWeGame", {roomName:roomName , shellWeGameUser:msg.name}, ()=>{console.log("shellWeGame done")} );
  },[socket, ])

  const showProfile = useCallback(()=>{
    console.log("showProfile",{roomName:roomName , goDM :msg.name} );
    window.location.href = `/workspace/sleact/profile/${msg.name}`;
  },[socket, ])
  
  const goOBS = useCallback(()=>{
    console.log("goOBS",{roomName:roomName , gameUser:msg.name} ); 
    if (msg.isDm !== undefined && msg.isDm === true)
    {
      socket?.emit("goOBS", {gameUser:msg.name}, ()=>{
        console.log("shellWeGame done!");
      });
    }
    else
    {
      socket?.emit("goOBS", {roomName:roomName , gameUser:msg.name}, ()=>{
        console.log("shellWeGame done!");
      });
    }
  },[socket, ])


  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  // if (redirectFlag)
  //   return (<Redirect to={redirectFlag}/>)

  return (
    <List>
      <ListItemButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
        <ListItemAvatar>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            sx={{ '& .MuiBadge-badge': {backgroundColor: msg.status, color: msg.status, display: statShow} }}
          >
            <FtAvatar userAvatar={user?.avatar}/>
          </StyledBadge>
          {msg.name}
        </ListItemAvatar>
         <ListItemText ></ListItemText>
          {/* {msg.kg === userData?.id && <span> (나)</span>} */}
          {<span> {msg.msg}</span> || null}
      </ListItemButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={showProfile}>프로필 보기</MenuItem>
        <MenuItem onClick={setAdmin}  sx={{display: friendMode}}>관리자 권한 주기</MenuItem>
        <MenuItem onClick={shellWeDm} sx={{display: friendMode}}>DM 초대</MenuItem>
        <MenuItem onClick={shellWeGame} sx={{display: friendMode}}>Game 초대</MenuItem>
        <MenuItem onClick={muteUser} sx={{display: friendMode}}>음소거 설정 / 해제</MenuItem>
        <MenuItem onClick={kickUser} sx={{display: friendMode}}>추방</MenuItem>
        <MenuItem onClick={banUser} sx={{display: friendMode}}>영원히 추방</MenuItem>
        <MenuItem onClick={goOBS}>게임 관전</MenuItem>
      </Menu>
    </List>
  );
};

export default EachMsg;
