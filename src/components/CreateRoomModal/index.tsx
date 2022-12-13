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
  setShowCreateRoomModal : (flag:boolean) => void
}
const CreateRoomModal: FC<PropsWithChildren<Props>> = ({ show, children, onCloseModal, setShowCreateRoomModal }) => {
  //const {data: userData, error, mutate: mutate}  = useSWR<IUser | false>('api/users', fetcher);
  const[newRoom, onChangeNewRoom, setNewRoom] = useInput('');
  const[pwCheck, onChangePWCheck, setPWCheck] = useInput(false);
  const[pw, onChangePW, setPW] = useInput('');
  const {workspace, channel}=useParams<{workspace : string , channel:string}>();
  // const {data: channelData, mutate: mutateChannel} = useSWR<IChannel[]>(userData ? `api/workspaces/${workspace}/channels` : null,fetcher);
  const [socket] = useSocket(workspace);
  
  const [checkedInputs, setCheckedInputs] = useState<any[]>([]);

  const clearModal = useCallback(()=>{
    //mutate();
    setNewRoom("");
    setPW("");
    setShowCreateRoomModal(false);
  },[]);
  
  const changeHandler = (checked:any, id:any) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
      setPW((e)=>{return ''});
      setPWCheck((c)=>{return !c})
    } else {
      // 체크 해제
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
      setPW((e)=>{return ''});
      setPWCheck((c)=>{return !c})
    }
  };
  
  const onCreateRoom = useCallback((e:any) => {
    e.preventDefault();
    if (!newRoom || !newRoom.trim()) {
      return;
    }
    console.log("createRoom!",newRoom );
    socket?.emit("create-room", newRoom, clearModal);
    socket?.on("helloRoom", (str:string)=>console.log(str));
    // return (<Redirect to= {`/workspace/sleact/channel/Chat/${newRoom}`}/>);
  }, [newRoom]);

  if (!show) {
    return null;
  }
  return (
    <Modal show = {show} onCloseModal={onCloseModal}>
    <form onSubmit={onCreateRoom}>
    <Label id="room-create">
      <span>방 생성</span>
      방 이름<Input id="room" value={newRoom} onChange={onChangeNewRoom}/>
      <input 
        id={"pwCheck"}
        type="checkbox" 
        onChange={(e:any)=>{
          changeHandler(e.currentTarget.checked, "pwCheck")
        }}
        checked={checkedInputs.includes("pwCheck") ? true : false}
      />
      비밀번호<Input id="pw" value={pw} onChange={onChangePW} disabled={!pwCheck}/>
    </Label>
    <Button type="submit">생성</Button>
    </form>
  </Modal>
  );
};

export default CreateRoomModal;
