import { IUser } from 'src/typings/db';
import fetcher from 'src/utils/fetcher';
import React, { useEffect, VFC } from 'react';
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

const grey_color = grey[50];
interface Props {
  // msg: IUser;
  // msg: {name:string,kg:number,email:string};
  msg : {name: string,msg :string, img:string}
  // isOnline: boolean;
}

const EachMsg: VFC<Props> = ({ msg }) => {
  const { workspace } = useParams<{ workspace?: string }>();
  const location = useLocation();
  // const { data: userData } = useSWR<IUser>('api/users', fetcher, {
  //   dedupingInterval: 2000, //x 2초
  // });
  // const date = localStorage.getItem(`${workspace}-${msg.kg}`) || 0;
  // const { data: count, mutate } = useSWR<number>(
  //   userData ? `api/workspaces/${workspace}/dms/${msg.kg}/unreads?after=${date}` : null,
  //   fetcher,
  // );

  // useEffect(() => {
  //   if (location.pathname === `/workspace/${workspace}/dm/${msg.kg}`) {
  //     mutate(0);
  //   }
  // }, [mutate, location.pathname, workspace, msg]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <MenuItem onClick={handleClose}>프로필 보기</MenuItem>
        {/* <MenuItem onClick={handleClose} component={Link} to={`/workspace/${workspace}/dm/${msg.kg}`}>DM 보내기</MenuItem> */}
        <MenuItem onClick={handleClose}>친구 추가/삭제</MenuItem>
        <MenuItem onClick={handleClose}>음소거하기</MenuItem>
      </Menu>
    </List>
  );
};

export default EachMsg;
