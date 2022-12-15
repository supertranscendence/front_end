import { CreateModal, CloseModalButton } from 'src/components/Modal/style';
import React, {useEffect, FC, PropsWithChildren, useCallback,useState } from 'react';
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
  // inviteNum : number
  // whoInvite : string
}

const InviteModal: FC<PropsWithChildren<Props>> = ({ show, children, onCloseModal, setShowInviteModal ,roomInfo }) => {
  const {workspace, channel}=useParams<{workspace : string , channel:string}>();
  const [socket] = useSocket(workspace);  
  // const [checkedInputs, setCheckedInputs] = useState<any[]>([]);
  const [inviteType, setInviteType] = useState('');
  const [whoInvite, setWhoInvite] = useState('');
  const clearModal = useCallback(()=>{
    //mutate();
    setShowInviteModal(false);
  },[]);
  
  const modalUp = useCallback((inviteObj : {sendIntraId:string,  recvIntraId:string, type:string}) => {
    
    console.log("in getInvite",inviteObj );
    // setWhoInvite( inviteObj.sendIntraId );
    setWhoInvite(inviteObj.sendIntraId);
    setInviteType(inviteObj.type);
    setShowInviteModal(true);
  },
  []
);
  
  useEffect(() => {
    console.log("shellWeDm!");
    socket?.on("shellWeDm", (inviteObj : {sendIntraId:string,  recvIntraId:string, type: "디엠"})=> modalUp(inviteObj));
  }, [socket]);
  
  useEffect(() => {
    console.log("shellWeGame!");
    socket?.on("shellWeGame", (inviteObj : {sendIntraId:string,  recvIntraId:string, type: "게임"})=> modalUp(inviteObj));
  }, [socket]);

 
  if (!show) {
    return null;
  }
  
  
  const goDm = (e:any)=>{
    e.preventDefault();
    console.log("ok")
    console.log("goDm",{roomName:roomInfo , user:whoInvite})
    socket?.emit("goDm",{roomName:roomInfo , user:whoInvite})
    clearModal();
    }
    
  const noDm = (e:any)=>{
    e.preventDefault();
    console.log("no")
    clearModal();
    }
  
  return (
    <Modal show = {show} onCloseModal={onCloseModal}>
      <Label>{whoInvite}님이 {inviteType}에 초대했습니다.</Label>
      <form onSubmit={goDm}>
        <Button type="submit"> 수락</Button>
      </form>
      <form onSubmit={noDm}>
        <Button type="submit"> 거절</Button>
      </form>
  </Modal>
  );
};

export default InviteModal;
