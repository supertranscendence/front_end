import { CreateModal, CloseModalButton } from 'src/components/Modal/style';
import React, { FC, PropsWithChildren, useCallback,useState } from 'react';
import {Label, Input} from 'src/pages/SignUp/styles';
import { Avatar, Button, Divider } from '@mui/material';
import useInput from "src/hooks/useInput"
import Modal from "src/components/Modal"
import axios from 'axios';
import { Link, Redirect, Switch, Route, useParams } from 'react-router-dom';
import {toast} from 'react-toastify'
import fetcher from 'src/utils/fetcher'
import useSWR from 'swr'
import { IChannel, IUser } from 'src/typings/db';
import useSocket from 'src/hooks/useSocket';
import { TextField } from '@mui/material';
import { Stack } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowProfileModal : (flag:boolean) => void
}
const EditProfileModal: FC<PropsWithChildren<Props>> = ({ show, children, onCloseModal, setShowProfileModal }) => {
  //const {data: userData, error, mutate: mutate}  = useSWR<IUser | false>('api/users', fetcher);
  const[newNick, onChangeNewNick, setNewNick] = useInput('');
  const {workspace, channel}=useParams<{workspace : string , channel:string}>();
  // const {data: channelData, mutate: mutateChannel} = useSWR<IChannel[]>(userData ? `api/workspaces/${workspace}/channels` : null,fetcher);
  const [socket] = useSocket(workspace);

  const [checkedInputs, setCheckedInputs] = useState<any[]>([]);

  const clearModal = useCallback(()=>{
    //mutate();
    setShowProfileModal(false);
  },[]);


  const onEditNickname = useCallback((e:any) => {
    e.preventDefault();
    console.log("NewNick!",newNick );
    socket?.emit("edit-new-nickname", newNick, clearModal);
    //socket?.on("helloRoom", (str:string)=>console.log(str));
    // return (<Redirect to= {`/workspace/sleact/channel/Chat/${newNick}`}/>);
  }, [newNick]);

  if (!show) {
    return null;
  }
  return (
    <Modal show = {show} onCloseModal={onCloseModal}>
              <input type="file" accept="image/*" />
    <form onSubmit={onEditNickname}>
      <Stack spacing={1}>
        <Label id="room-create">
          <Stack spacing={1} divider={<Divider orientation='horizontal' flexItem />}>
            <h1>EDIT PROFILE</h1>
            {/* 처음 시작 화면이면 SET MY PROFILE 뜨도록! */}
            <Stack>
              <div>
                <h4>아바타</h4>
              </div>
              <Avatar sx={{width: 56, height: 56}} />
              <Button variant='outlined'>아바타 업로드</Button>
              <Button>아바타 제거</Button>
            </Stack>
            <Stack>
              <div>
                <h4>닉네임</h4>
              </div>
              <TextField
                id="edit_nickname"
                label="수정할 유니크한 닉네임"
                size='small'
                value={newNick}
                onChange={onChangeNewNick}
                required={true}
                inputProps={{ maxLength: 16 }}
                helperText="닉네임은 최대 16글자까지만 가능해요."
                />
            </Stack>
          </Stack>
        </Label>
        <Button type="submit" variant='outlined'>
          <EditIcon />
          프로필 수정하기
        </Button>
      </Stack>
    </form>
  </Modal>
  );
};

export default EditProfileModal;
