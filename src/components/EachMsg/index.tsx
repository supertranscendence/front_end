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
import { grey } from '@mui/material/colors';
import { Stack } from '@mui/system';
import useSocket from 'src/hooks/useSocket';


const grey_color = grey[50];
interface Props {
  roomName: string
  msg : {name: string,msg :string, img:string}
  // isOnline: boolean;
}

const EachMsg: VFC<Props> = ({ msg, roomName }) => {
  const { workspace } = useParams<{ workspace?: string }>();
  const location = useLocation();
  const [socket] = useSocket("sleact");

  const [returnURL, setReturnURL] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  
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
    setReturnURL(`/workspace/:workspace/profile/${msg.name}`);
  },[socket, ])
  
  

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
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


if (returnURL)
{
  return (<Redirect to = {returnURL}/>)
}

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
          >
              <Avatar sx={{ width: 32, height: 32 }}/>
          </StyledBadge>
          {msg.name}
        </ListItemAvatar>
         
         <ListItemText ></ListItemText>
          {/* {msg.kg === userData?.id && <span> (나)</span>} */}
          {<span className="count"> {msg.msg}</span> || null}
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
        <MenuItem onClick={setAdmin}>관리자 권한 주기</MenuItem>
        <MenuItem onClick={shellWeDm}>DM 초대</MenuItem>
        <MenuItem onClick={shellWeGame}>Game 초대</MenuItem>
        <MenuItem onClick={muteUser}>음소거 설정 / 해제</MenuItem>
        <MenuItem onClick={kickUser}>추방</MenuItem>
        <MenuItem onClick={banUser}>영원히 추방</MenuItem>
        
        {/* <MenuItem onClick={muteUser}>음소거</MenuItem> */}
        {/* <MenuItem onClick={handleClose} component={Link} to={`/workspace/${workspace}/dm/${msg.kg}`}>DM 보내기</MenuItem> */}
        {/* <MenuItem onClick={handleClose}>친구 추가/삭제</MenuItem>
        <MenuItem onClick={handleClose}>음소거하기</MenuItem> */}
      </Menu>
    </List>
  );
};

export default EachMsg;
