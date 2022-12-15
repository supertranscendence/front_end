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
  const [redirectRoom, setRedirectRoom] = useState('');
  
  const clearModal = useCallback(()=>{
    //mutate();
    setShowInviteModal(false);
  },[]);
  
 
  
  const onSetPublic = useCallback((e:any) => {
    e.preventDefault();
    console.log("set publc!!");
    socket?.emit("SetPWD", {roomName: roomInfo , pw: "" , gottaPublic: true} ,()=>{console.log("done")})
    clearModal()
  }, []);
  

  if (!show) {
    return null;
  }
  
  const onOk = useCallback(()=>{
    console.log("ok");
    setShowInviteModal(false);
  },[]);
  const onNo = useCallback(()=>{
    console.log("no");
    setShowInviteModal(false);
  },[]);
  
  return (
    <Modal show = {show} onCloseModal={onCloseModal}>
      {whoInvite}님이 {(inviteNum == 1)?"DM에":1} 초대했습니다.
      <Button onClick={onOk}> 수락</Button>
      <Button onClick={onNo}> 거절</Button>
  </Modal>
  );
};

export default InviteModal;
