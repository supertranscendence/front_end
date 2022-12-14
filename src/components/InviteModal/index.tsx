import { CreateModal, CloseModalButton } from 'src/components/Modal/style';
import React, {useEffect, FC, PropsWithChildren, useCallback,useState } from 'react';
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
  const [returnFlag, setReturnFlag] = useState('');
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
    console.log("in getInvite end" );
  },
  []
);

  useEffect(() => {
    console.log("shellWeDm!");
    socket?.on("shellWeDm", (inviteObj : {sendIntraId:string,  recvIntraId:string, type: string})=> {inviteObj.type="Dm"; modalUp(inviteObj)});
  }, [socket]);

  useEffect(() => {
    console.log("shellWeGame!");
    socket?.on("shellWeGame", (inviteObj : {sendIntraId:string,  recvIntraId:string, type: string})=> {inviteObj.type="Game"; modalUp(inviteObj)});
  }, [socket]);



  const retrunRoom = useCallback((joinedRoom:string)=>{
    console.log("on retrunRoom", joinedRoom)
    // if (inviteType == "Dm")
    //   setReturnFlag(`/workspace/sleact/channel/Chat/${joinedRoom}`);
    // else if (inviteType == "Game")
    //   setReturnFlag(`/workspace/sleact/channel/Game/${joinedRoom}`);
  },[inviteType])

  const goRoom = useCallback ((e:any)=>{
    e.preventDefault();
    // const eventName = "go" + inviteType;
    console.log("go room ok")

    if (inviteType === "Dm")
    {
      console.log("goDm",{roomName:roomInfo , user:whoInvite})
      socket?.emit("goDm",{roomName:roomInfo , user:whoInvite}, (str:string) => retrunRoom(str))
    }
    else if (inviteType === "Game")
    {
      console.log("goGame",{roomName:roomInfo , user:whoInvite})
      socket?.emit("goGame",{roomName:roomInfo , user:whoInvite}, (str:string) => retrunRoom(str))
    }
    clearModal();
    },[whoInvite, inviteType ])

  const noRoom = (e:any)=>{
    e.preventDefault();
    console.log("noRoom");
    socket?.emit("reJoin", roomInfo);
    clearModal();
    }
  if (!show) {
    return null;
  }
  if (returnFlag)
    return(
      <Redirect to={returnFlag}/>
    )
  return (
    <Modal show = {show} onCloseModal={onCloseModal}>
      <Label>{whoInvite}?????? {inviteType}??? ??????????????????.</Label>
      {/* <form onSubmit={goRoom}> */}
        <Button onClick={goRoom}>??????</Button>
      {/* </form> */}
      {/* <form onSubmit={noRoom}> */}
        <Button onClick={noRoom}>??????</Button>
      {/* </form> */}
  </Modal>
  );
};

export default InviteModal;
