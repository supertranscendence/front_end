import { CreateModal, CloseModalButton } from 'src/components/Modal/style';
import React, { FC, PropsWithChildren, useCallback,useState } from 'react';
import {Label, Input, Button} from 'src/pages/SignUp/styles';
import useInput from "src/hooks/useInput"
import Modal from "src/components/Modal"
import axios from 'axios';
import { Link, Redirect, Switch, Route, useParams } from 'react-router-dom';
import {toast} from 'react-toastify'
import fetcher from 'src/utils/fetcher'
import useSWR from 'swr'
import { IChannel, IUser } from 'src/typings/db';
import useSocket from 'src/hooks/useSocket';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteModal : (flag:boolean) => void
  roomInfo : string
  inviteNum : number
  whoInvite : string
}

const InviteModal: FC<PropsWithChildren<Props>> = ({ show, children, onCloseModal, setShowInviteModal ,roomInfo , inviteNum , whoInvite}) => {
  const {workspace, channel}=useParams<{workspace : string , channel:string}>();
  const [socket] = useSocket(workspace);  
  // const [checkedInputs, setCheckedInputs] = useState<any[]>([]);
  const [inviteType, setInviteType] = useState('');
  const clearModal = useCallback(()=>{
    //mutate();
    setShowInviteModal(false);
  },[]);
  // if (inviteNum === 1)
  //   setInviteType((n)=>{return "DM"})
 
  if (!show) {
    return null;
  }
  
  const onOk = useCallback(()=>{
    console.log("ok");
    setShowInviteModal(false);
    clearModal();
  },[]);
  
  const onNo = useCallback(()=>{
    console.log("no");
    setShowInviteModal(false);
    clearModal();
  },[]);
  
  return (
    <Modal show = {show} onCloseModal={onCloseModal}>
      <Label>{whoInvite}님이 {inviteType}에 초대했습니다.</Label>
      <Button onClick={onOk}> 수락</Button>
      <Button onClick={onNo}> 거절</Button>
      <form onSubmit={onOk}>
        <Button type="submit"> 변경</Button>
      </form>
  </Modal>
  );
};

export default InviteModal;
