import ChatBox from 'src/components/ChatBox';
import ChatList from 'src/components/ChatList';
//import InviteChannelModal from 'src/components/InviteChannelModal';
import useInput from 'src/hooks/useInput';
import useSocket from 'src/hooks/useSocket';
import { Header, DragOver } from 'src/pages/Channel/styles';
import { IChannel, IChat, IUser } from 'src/typings/db';
import fetcher from 'src/utils/fetcher';
import makeSection from 'src/utils/makeSection';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { Button, Container, Grid, Stack, Divider } from '@mui/material';
import GameTable from 'src/components/GameTable';
import AddIcon from '@mui/icons-material/Add';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

//const PAGE_SIZE = 20;
const Channel = () => {
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
          <Button variant="outlined" startIcon={<AddIcon />}>New Game</Button>
          <Button variant="outlined" startIcon={<EmojiEventsIcon />}>Find Match</Button>
        </Stack>
        <GameTable />
      </Stack>
    </Container>
  </div>
);

};

export default Channel;
