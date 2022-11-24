import { CreateModal, CloseModalButton } from '@components/Modal/style';
import React, { FC, PropsWithChildren, useCallback } from 'react';
import {Label, Input} from '@pages/SignUp/styles';
import { Button, Modal, Box, TextField } from '@mui/material';
import useInput from "@hooks/useInput"
//import Modal from "@components/Modal"
import axios from 'axios';
import { useParams } from 'react-router';
import {toast} from 'react-toastify'
import fetcher from '@utils/fetcher'
import useSWR from 'swr'
import { IChannel, IUser } from '@typings/db';
import useSocket from '@hooks/useSocket';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowCreateRoomModal : (flag:boolean) => void;
}

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CreateRoomModal: FC<PropsWithChildren<Props>> = ({ show, children, onCloseModal, setShowCreateRoomModal }) => {
  const {data: userData, error, mutate: mutate}  = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher);
  const [newRoom, onChangeNewRoom, setNewRoom] = useInput('');
  const {workspace, channel}=useParams<{workspace : string , channel:string}>();
  // const {data: channelData, mutate: mutateChannel} = useSWR<IChannel[]>(userData ? `http://localhost:3095/api/workspaces/${workspace}/channels` : null,fetcher);
  const [socket] = useSocket(workspace);

  const clearModal = useCallback(()=>{
    mutate();
    setNewRoom("");
    setShowCreateRoomModal(false);
  },[]);
  const onCreateRoom = useCallback((e:any) => {
    e.preventDefault();
    if (!newRoom || !newRoom.trim()) {
      return;
    }
    console.log("createRoom!",newRoom );
    socket?.emit("create-room", newRoom, clearModal);
    socket?.on("helloRoom", (str:string)=>console.log(str));
  }, [newRoom]);

  if (!show) {
    return null;
  }
  return (
    <Modal
     open={show}
     onClose={onCloseModal}
    >
      <Box sx={styleModal}>
        <form onSubmit={onCreateRoom}>
            <TextField
              label="방 이름"
              variant="outlined"
              value={newRoom}
              onChange={onChangeNewRoom}
            />
          <Button type="submit" variant='outlined'>생성</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateRoomModal;
