import { CreateModal, CloseModalButton } from 'src/components/Modal/style';
import React, { FC, PropsWithChildren, useCallback } from 'react';
import {Label, Input, Button} from 'src/pages/SignUp/styles';
import useInput from "src/hooks/useInput"
import Modal from "src/components/Modal"
import axios from 'axios';
import { useParams } from 'react-router';
import {toast} from 'react-toastify'
import fetcher from 'src/utils/fetcher'
import useSWR from 'swr'
import { IChannel, IUser } from 'src/typings/db';
import useSocket from 'src/hooks/useSocket';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowCreateGameRoomModal : (flag:boolean) => void
}
const CreateGameRoomModal: FC<PropsWithChildren<Props>> = ({ show, children, onCloseModal, setShowCreateGameRoomModal }) => {
  const {data: userData, error, mutate: mutate}  = useSWR<IUser | false>('api/users', fetcher);
  const[newGameRoom, onChangeNewGameRoom, setNewGameRoom] = useInput('');
  const {workspace, channel}=useParams<{workspace : string , channel:string}>();
  // const {data: channelData, mutate: mutateChannel} = useSWR<IChannel[]>(userData ? `api/workspaces/${workspace}/channels` : null,fetcher);
  const [socket] = useSocket(workspace);

  const clearModal = useCallback(()=>{
    mutate();
    setNewGameRoom("");
    setShowCreateGameRoomModal(false);
  },[]);
  const onCreateRoom = useCallback((e:any) => {
    e.preventDefault();
    if (!newGameRoom || !newGameRoom.trim()) {
      return;
    }
    console.log("createGameRoom!",newGameRoom );
    socket?.emit("create-game-room", newGameRoom, clearModal);
    //socket?.on("helloRoom", (str:string)=>console.log(str));
  }, [newGameRoom]);

  if (!show) {
    return null;
  }
  return (
    <Modal show = {show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateRoom}>
        <Label id="room-create">
          <span>게임방 이름</span>
          <Input id="game_room" value={newGameRoom} onChange={onChangeNewGameRoom}/>
        </Label>
        <Button type="submit">생성</Button>
      </form>
    </Modal>
  );
};

export default CreateGameRoomModal;
