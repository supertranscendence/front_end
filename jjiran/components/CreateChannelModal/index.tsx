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

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowCreateChannelModal : (flag:boolean) => void
}
const CreateChannelModal: FC<PropsWithChildren<Props>> = ({ show, children, onCloseModal, setShowCreateChannelModal }) => {
  const {data: userData, error, mutate: mutate}  = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher);
  const[newChannel, onChangeNewChannel, setNewChannel] = useInput('');
  const {workspace, channel}=useParams<{workspace : string , channel:string}>();
  const {data: channelData, mutate: mutateChannel} = useSWR<IChannel[]>(userData ? `http://localhost:3095/api/workspaces/${workspace}/channels` : null,fetcher);
  
  const onCreateChannel = useCallback((e:any) => {
    // e.onCreateChannel();
    e.preventDefault();
    axios.post(`http://localhost:3095/api/workspaces/${workspace}/channels`, {
      name: newChannel
    },{
      withCredentials: true
    }
    ).then(()=>{
      setShowCreateChannelModal(false);
      mutateChannel();
      setNewChannel('');
    }).catch((error)=> {
      console.dir(error);
      toast.error(error.response?.data, {position:'bottom-center'})
    })
  }, [newChannel]);

  if (!show) {
    return null;
  }
  return (
    <Modal show = {show} onCloseModal={onCloseModal}>
    <form onSubmit={onCreateChannel}>
    <Label id="channel-create">
      <span>채널</span>
      <Input id="channel" value={newChannel} onChange={onChangeNewChannel}/>
    </Label>
    <Button type="submit">생성</Button>
    </form>
  </Modal>
  );
};

export default CreateChannelModal;
