import { CreateModal, CloseModalButton } from 'src/components/Modal/style';
import React, { FC, PropsWithChildren, useCallback,useState } from 'react';
import {Label, Input, Button} from 'src/pages/SignUp/styles';
import useInput from "src/hooks/useInput"
import Modal from "src/components/Modal"
import { Link, Redirect, Switch, Route, useParams } from 'react-router-dom';
import {toast} from 'react-toastify'
import fetcher from 'src/utils/fetcher'
import useSWR from 'swr'
import { IChannel, IUser } from 'src/typings/db';
import useSocket from 'src/hooks/useSocket';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowCreateRoomModal : (flag:boolean) => void
}
const CreateGameRoomModal: FC<PropsWithChildren<Props>> = ({ show, children, onCloseModal, setShowCreateRoomModal }) => {
  //const {data: userData, error, mutate: mutate}  = useSWR<IUser | false>('api/users', fetcher);
  const[newRoom, onChangeNewRoom, setNewRoom] = useInput('');

  const {workspace, channel}=useParams<{workspace : string , channel:string}>();
  const [socket] = useSocket(workspace);

  const clearModal = useCallback(()=>{
    //mutate();
    setNewRoom("");
    setShowCreateRoomModal(false);
  },[]);

  const onCreateRoom = useCallback((e:any) => {
    e.preventDefault();
    if (!newRoom || !newRoom.trim()) {
      return;
    }
      socket?.emit("createGameRoom",  newRoom, clearModal);
      console.log("createRoom!", {room: newRoom} );
  }, [newRoom]);

  if (!show) {
    return null;
  }
  return (
    <Modal show = {show} onCloseModal={onCloseModal}>
    <form onSubmit={onCreateRoom}>
    <Label id="room-create">
      <span>방 생성</span>
      방 이름<Input id="room" value={newRoom} onChange={onChangeNewRoom} maxLength={16}/>
      </Label>
      <Button type="submit">생성</Button>
    </form>
  </Modal>
  );
};

export default CreateGameRoomModal;
