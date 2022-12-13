import ChatBox from 'src/components/ChatBox';
import ChatList from 'src/components/ChatList';
//import InviteChannelModal from 'src/components/InviteChannelModal';
import useInput from 'src/hooks/useInput';
import useSocket from 'src/hooks/useSocket';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Stack, Divider } from '@mui/material';
import GameTable from 'src/components/GameTable';
import AddIcon from '@mui/icons-material/Add';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CreateGameRoomModal from 'src/components/CreateGameRoomModal';
//const PAGE_SIZE = 20;

const Channel = () => {
  const { workspace } = useParams<{ workspace?: string }>();
  const [socket] = useSocket(workspace);
  const [newRoomFlag, setNewRoomFlag] = useState(false);
  const [showCreateGameRoomModal, setShowCreateGameRoomModal] = useState(false);
  const [gameRoomArr, setGameRoomArr] = useState<{
    name: string,
    isprivate: boolean,
    host: string,
    slot: number,
    observer: number
    enterButton: JSX.Element
  }[]>([]);

  const onClickAddRoom = useCallback(() => {
    setShowCreateGameRoomModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateGameRoomModal(false);
  }, []);

  useEffect(()=>{
    socket?.emit("getGameRoomInfo", {}, (publicRooms : [])=>{
    setGameRoomArr( [...publicRooms.map((_name)=>{
            return {
              name: _name,
              isprivate: false,
              host: "host",
              slot: 1,
              observer: 1,
              enterButton:<Link to={`/workspace/${workspace}/channel/game/${_name}`}><button>입장</button></Link>
           }})
    ])
    console.log("roomArr", gameRoomArr);
  });
}, [newRoomFlag]);

useEffect(()=>{
  socket?.on("new-game-room-created", ()=>{
  setNewRoomFlag(newRoomFlag => !newRoomFlag);
  });
},[]);

  return(
  <div>
    <Container maxWidth="lg">
      <Stack spacing={2}>
        <Stack />
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}
        >
          <Button variant="outlined" startIcon={<AddIcon />} onClick={onClickAddRoom}>New Game</Button>
          <Button variant="outlined" startIcon={<EmojiEventsIcon />}>Find Match</Button>
        </Stack>
        <GameTable />
      </Stack>
    </Container>
    <CreateGameRoomModal
      show={showCreateGameRoomModal}
      onCloseModal={onCloseModal}
      setShowCreateGameRoomModal={setShowCreateGameRoomModal}
      />
  </div>
  );

};

export default Channel;
