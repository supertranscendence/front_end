import { IUser } from 'src/typings/db';
import fetcher from 'src/utils/fetcher';
import React, { useEffect, useCallback, useState ,VFC } from 'react';
import { useParams } from 'react-router';
import { NavLink, useLocation, Redirect, Link } from 'react-router-dom';
import useSWR from 'swr';
import {ProfileImg} from 'src/layouts/Workspace/style'
import gravatar from "gravatar";
import { Modal, Badge, Button, IconButton, Menu, MenuItem, List, Container, ListItem, ListItemAvatar, ListItemText, ListItemButton } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import { styled } from '@mui/material/styles';
import PendingIcon from '@mui/icons-material/Pending';
import { grey } from '@mui/material/colors';
import { Stack } from '@mui/system';
import { dataUser } from '@typings/types';
import useSocket from 'src/hooks/useSocket';
import FtAvatar from 'src/components/FtAvatar';
import { UserStatus } from 'src/typings/types';

const grey_color = grey[50];
interface Props {
  friend: string;
  avatar: string;
  state: UserStatus;
  blocked: boolean;
}

const EachDM: VFC<Props> = ({ friend, avatar, state, blocked }) => {
  const [socket] = useSocket("sleact");
  const { workspace } = useParams<{ workspace?: string }>();
  const location = useLocation();
  const { data: userData } = useSWR<dataUser>('api/users', fetcher, {
    dedupingInterval: 2000, //x 2초
  });
  //const date = localStorage.getItem(`${workspace}-${friend}`) || 0;
  ////date 는 필요없어!
  //const { data: count, mutate } = useSWR<number>(
  //  userData ? `api/workspaces/${workspace}/dms/${member}/unreads?after=${date}` : null,
  //  fetcher,
  //);

  //useEffect(() => {
  //  if (location.pathname === `/workspace/${workspace}/dm/${friend}`) {
  //    mutate(0);
  //  }
  //}, [mutate, location.pathname, workspace, friend]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [returnURL, setReturnURL] = useState("");

  const showProfile = useCallback(()=>{
    console.log("showProfile" );
    setReturnURL(`/workspace/sleact/profile/${userData?.intra}`);
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
              <FtAvatar userAvatar={avatar} size={32}/>
          </StyledBadge>
        </ListItemAvatar>
          {/*<NavLink key={member.id} activeClassName="selected" to={`/workspace/${workspace}/dm/${member.id}`}>*/}
          <ListItemText >{friend}</ListItemText>
          {/*</NavLink>*/}
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
        <MenuItem onClick={handleClose} component={Link} to={`/workspace/${workspace}/profile/${userData?.intra}`}>프로필 보기</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to={`/workspace/${workspace}/dm/${friend}`}>DM 보내기</MenuItem>
        <MenuItem onClick={handleClose}>게임 신청하기</MenuItem>
        {/*게임 신청하기! */}
      </Menu>
    </List>
  );
};

export default EachDM;
