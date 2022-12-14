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
  setShowSetPWDModal : (flag:boolean) => void
  roomInfo : string
}
const SetPWDModal: FC<PropsWithChildren<Props>> = ({ show, children, onCloseModal, setShowSetPWDModal ,roomInfo }) => {
  const [pwd, onChangepwd, setpwd] = useInput('');
  const {workspace, channel}=useParams<{workspace : string , channel:string}>();
  const [socket] = useSocket(workspace);  
  // const [checkedInputs, setCheckedInputs] = useState<any[]>([]);
  const [redirectRoom, setRedirectRoom] = useState('');
  
  const clearModal = useCallback(()=>{
    //mutate();
    setpwd("");
    setShowSetPWDModal(false);
  },[]);
  
 
  
  const onSetPublic = useCallback((e:any) => {
    e.preventDefault();
    console.log("set publc!!");
    socket?.emit("setPWD", {roomName: roomInfo , pw: "" , gottaPublic: true} ,()=>{console.log("done")})
    clearModal()
  }, [pwd]);
  
  const onSetPWD = useCallback((e:any) => {
    e.preventDefault();
    if (!pwd)
      return ;
    console.log("set pwd!!", pwd);
    socket?.emit("setPWD", {roomName: roomInfo , pw: pwd , gottaPublic: false},()=>{console.log("done")} )
    clearModal();
  }, [pwd]);

  if (!show) {
    return null;
  }
  
  // if (redirectRoom){
  //   console.log ("asd");
  //   return (<Redirect to={`/workspace/${workspace}/channel/Chat/${redirectRoom}`} />);
  // }
  
  return (
    <Modal show = {show} onCloseModal={onCloseModal}>
    <button onClick ={onSetPublic}> 퍼블릭 룸 으로 변경</button>
    <hr/>
    <form onSubmit={onSetPWD}>
    <Label id="pwd-check">
      {/* <span>비밀번호</span> */}
      비밀번호<Input id="room" type="password" value={pwd} onChange={onChangepwd}/>
    </Label>
      <Button type="submit"> 변경</Button>
    </form>
  </Modal>
  );
};

export default SetPWDModal;
