import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import InviteChannelModal from '@components/InviteChannelModal';
import useInput from '@hooks/useInput';
import useSocket from '@hooks/useSocket';
import { Header, DragOver } from '@pages/Channel/styles';
import { IChannel, IChat, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import makeSection from '@utils/makeSection';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { Button, Container, Stack, Divider, Menu, MenuItem } from '@mui/material';
import GameTable from '@components/GameTable';
import AddIcon from '@mui/icons-material/Add';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CreateGameRoomModal from '@components/CreateGameRoomModal';
import CreateChannelModal from '@components/CreateRoomModal'
import ProfileMenu from '@components/ProfileMenu';

const Channel = () => {
  const { workspace } = useParams<{ workspace?: string }>();
  const [socket] = useSocket(workspace);
  const [showCreateChannelModal, setShowCreateRoomModal] = useState(false);
  const [newRoomFlag, setNewRoomFlag] = useState(false);

  const onClickAddRoom = useCallback(() => {
    setShowCreateRoomModal(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setShowCreateRoomModal(false);
  }, []);
  const [roomArr, setRoomArr] = useState<{name:string,roomType:string, currCnt:number , enterButton: JSX.Element }[]>([]);


  //--------------------for Test Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //--------------------for Test Menu
return(
  <div>
    <CreateChannelModal
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
        setShowCreateRoomModal={setShowCreateRoomModal}
      />
    <Container maxWidth="lg">
      <Stack spacing={2}>
        <Stack />
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}
        >
          <Button variant="outlined" onClick={onClickAddRoom} startIcon={<AddIcon />}>New Game</Button>
          <Button variant="outlined" startIcon={<EmojiEventsIcon />}>Find Match</Button>
          <Button variant="outlined"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >Test Menu</Button>
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
            <MenuItem onClick={handleClose}>DM 보내기</MenuItem>
            <MenuItem onClick={handleClose}>친구 추가/삭제</MenuItem>
            <MenuItem onClick={handleClose}>음소거하기</MenuItem>
          </Menu>
        </Stack>
        <GameTable />
      </Stack>
    </Container>
  </div>
);

};

export default Channel;
