import { CreateModal, CloseModalButton } from '@components/Modal/style';
import React, { FC, PropsWithChildren, useCallback } from 'react';
import {Label, Input, Button} from '@pages/SignUp/styles';
import useInput from "@hooks/useInput"
import Modal from "@components/Modal"
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
  setShowCreateRoomModal : (flag:boolean) => void
}
const CreateRoomModal: FC<PropsWithChildren<Props>> = ({ show, children, onCloseModal, setShowCreateRoomModal }) => {
  const {data: userData, error, mutate: mutate}  = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher);
  const[newRoom, onChangeNewRoom, setNewRoom] = useInput('');
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
    <Modal show = {show} onCloseModal={onCloseModal}>
    <form onSubmit={onCreateRoom}>
    <Label id="room-create">
      <span>채널</span>
      <Input id="room" value={newRoom} onChange={onChangeNewRoom}/>
    </Label>
    <Button type="submit">생성</Button>
    </form>
  </Modal>
  );
};

export default CreateRoomModal;
