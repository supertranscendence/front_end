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
  setPWDModal : (flag:boolean) => void
  roomInfo : string
}
const PWDModal: FC<PropsWithChildren<Props>> = ({ show, children, onCloseModal, setPWDModal ,roomInfo }) => {
  const [pwd, onChangepwd, setpwd] = useInput('');
  const {workspace, channel}=useParams<{workspace : string , channel:string}>();
  const [socket] = useSocket(workspace);  
  // const [checkedInputs, setCheckedInputs] = useState<any[]>([]);
  const [redirectRoom, setRedirectRoom] = useState('');
  
  const clearModal = useCallback(()=>{
    //mutate();
    setpwd("");
    setPWDModal(false);
  },[]);
  
  const routePWD = useCallback(( PWDCheck:boolean)=>{
    console.log("PWDCheck", PWDCheck);
    if (PWDCheck)
      setRedirectRoom(roomInfo);
    else
      clearModal();
  },[roomInfo])
  
  const onCheckPWD = useCallback((e:any) => {
    e.preventDefault();
    console.log("pwd!!", pwd);
    socket?.emit("PWDCheck", {roomName: roomInfo , pw: pwd}, routePWD )
    clearModal();
  }, [pwd]);

  // if (!show) {
  //   return null;
  // }
  
  if (redirectRoom){
    console.log ("asd");
    return (<Redirect to={`/workspace/${workspace}/channel/Chat/${redirectRoom}`} />);
  }
  
  return (
    <Modal show = {show} onCloseModal={onCloseModal}>
    <form onSubmit={onCheckPWD}>
    <Label id="pwd-check">
      {/* <span>비밀번호</span> */}
      비밀번호<Input id="room" type="password" value={pwd} onChange={onChangepwd}/>
      </Label>
      <Button type="submit">입장</Button>
    </form>
  </Modal>
  );
};

export default PWDModal;
