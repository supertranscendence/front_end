import { CreateModal, CloseModalButton } from 'src/components/Modal/style';
import React, { FC, PropsWithChildren, useCallback, useState, useRef } from 'react';
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
import AWS from "aws-sdk";
import { dataUser } from 'src/pages/Profile/type';
import uuid from 'react-uuid'

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowProfileModal : (flag:boolean) => void
}
const EditProfileModal: FC<PropsWithChildren<Props>> = ({ show, children, onCloseModal, setShowProfileModal }) => {
  const {data: myUserData}  = useSWR<dataUser>('api/users/my/friend', fetcher);
  const [newNick, onChangeNewNick, setNewNick] = useInput('');
  const {workspace, channel}=useParams<{workspace : string , channel:string}>();
  const [checkedInputs, setCheckedInputs] = useState<any[]>([]);
  const clearModal = useCallback(()=>{
    //mutate();
    setShowProfileModal(false);
  },[]);
  const [tempAvatar, setTempAvatar] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  /*************************************** for AWS ***************************************/
  const region = "ap-northeast-2";
  const bucket = "ts-f-dp";

  AWS.config.update({
    region: region,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

  /*************************************** ******* ***************************************/

    const onUploadAvatar = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    console.log(e.target.files[0].name);
    const uuidKey = uuid();
    console.log("UUID Key: ", uuidKey);

    console.log("accessToken: ", localStorage.getItem("accessToken"));
    console.log("refreshToken: ", localStorage.getItem(" refreshToken"));
    axios
    .put(`/api/users/avatar/`,{avatar: uuidKey}, {
      withCredentials:true,
        headers:{
          authorization: 'Bearer ' + localStorage.getItem(" refreshToken"),
          accept: "*/*"
          }
      })
      .then((response) =>{
        console.log("[RESPONSE] put /api/users/avatar")
        console.log(response);
      })
      .catch((err) => {
        console.log("[ERROR] put /api/users/avatar")
        console.log(err)
      });

      const upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: bucket, // 버킷 이름
            Key: uuidKey + ".png", // 유저 아이디
            Body: file, // 파일 객체
          },
      });

      const promise = upload.promise();
      promise.then(
          function () {
              // 이미지 업로드 성공
              window.setTimeout(function () {
                  location.reload();
              }, 2000);
          },
          function (err) {
              // 이미지 업로드 실패
              console.log("[ERROR] 이미지 업로드 에러!", err)
          }
      );
    }, []);

  const onEditNickname = useCallback((e:any) => {
    console.log("onEditNickname called!!")
    e.preventDefault();
    console.log("새로운 닉네임:", newNick );
    axios
      .put(`https://server.gilee.click/api/users/`, {nick: newNick}, {
      withCredentials:true,
        headers:{
          authorization: 'Bearer ' + localStorage.getItem(" refreshToken"),
          accept: "*/*"
          }
      })
    .then((response) =>{
      console.log(response);
      //setUser(response.data);
    })
    .catch((err) => {
      console.log("[ERROR] post /api/users for nickname")
      console.log(err)
    });
  }, [newNick, ]);

  if (!show) {
    return null;
  }
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <Stack spacing={1}>
        <Stack spacing={1} divider={<Divider orientation='horizontal' flexItem />}>
          <h1>EDIT PROFILE</h1>
          {/* 처음 시작 화면이면 SET MY PROFILE 뜨도록! */}
          <Stack>
              <h4>아바타</h4>
              <Avatar sx={{width: 56, height: 56}}/>
              <input
                type="file"
                accept="image/*"
                name='avatar'
                ref={inputRef}
                onChange={onUploadAvatar}
                style={{display: 'none'}}
              />
              <Button variant='outlined' onClick={onUploadImageButtonClick}>아바타 업로드</Button>
          </Stack>
      <form onSubmit={onEditNickname}>
        <Label id="edit-nickname">
          <Stack>
            <h4>닉네임</h4>
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
            <Button type="submit" variant='outlined'><EditIcon /> 프로필 수정하기</Button>
          </Stack>
        </Label>
      </form>
      </Stack>
    </Stack>
  </Modal>
  );
};

export default EditProfileModal;
