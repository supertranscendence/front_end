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
import { dataUser } from 'src/typings/types';
import uuid from 'react-uuid'

interface Props {
  show: boolean;
  //onCloseModal: () => void;
  setShowProfileModal : (flag:boolean) => void
}
const FirstProfileModal: FC<PropsWithChildren<Props>> = ({ show, children, setShowProfileModal }) => {
  const [newNick, onChangeNewNick, setNewNick] = useInput('');

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

  axios
    .put(process.env.REACT_APP_API_URL + `/api/users/avatar/`,{avatar: uuidKey}, {
      withCredentials:true,
        headers:{
          authorization: 'Bearer ' + localStorage.getItem("accessToken"),
          accept: "*/*"
          }
      })
      .then((response) =>{
        if(response.status === 500)
          location.href = "/error";
        console.log("[RESPONSE] put /api/users/avatar")
        console.log(response);
      })
      .catch((err) => {
        console.log("[ERROR] put /api/users/avatar")
        console.log(err)
        window.location.href = "/error";
      });

      const upload = new AWS.S3.ManagedUpload({
        params: {
            Bucket: bucket, // ?????? ??????
            Key: uuidKey + ".png", // ?????? ?????????
            Body: file, // ?????? ??????
          },
      });
      const promise = upload.promise();
      promise.then(
          function () {
              window.setTimeout(function () {
              }, 2000);
          },
          function (err) {
              // ????????? ????????? ??????
              console.log("[ERROR] ????????? ????????? ??????!", err)
          }
      );
    }, []);

  const onEditNickname = useCallback((e:any) => {
    console.log("onEditNickname called!!")
    console.log("????????? ?????????:", newNick );
    axios
      .put(process.env.REACT_APP_API_URL + `/api/users/`, {nick: newNick}, {
      withCredentials:true,
        headers:{
          authorization: 'Bearer ' + localStorage.getItem("accessToken"),
          accept: "*/*"
          }
      })
    .then((response) =>{
      if(response.status === 500)
        location.href = "/error";
      console.log(response);
    })
    .catch((err) => {
      console.log("[ERROR] post /api/users for nickname")
      console.log(err)
      window.location.href = "/error";
    });


/*
    ????????????!
 */
    //api/users/achievement
    console.log("[POST] /api/users/achievement! for FirstLogin");
    axios
    .post(process.env.REACT_APP_API_URL + `/api/users/achievement`, {achi: 0}, {
      withCredentials:true,
        headers:{
          authorization: 'Bearer ' + localStorage.getItem("accessToken"),
          accept: "*/*"
          }
      })
    .then((response) =>{
      if(response.status === 500)
        location.href = "/error";
    })
    .catch((err) => {
      console.log("[ERROR] post /achievements", err);
      console.log(err);
      window.location.href = "/error";
    });

  }, [newNick, ]);

  if (!show) {
    return null;
  }
  return (
    //<Modal show={show} onCloseModal={onCloseModal}>
    <Modal show={show}>
      <Stack spacing={1}>
			  <form onSubmit={onEditNickname}>
        <Stack spacing={1} divider={<Divider orientation='horizontal' flexItem />}>
          <h1>SET MY PROFILE</h1>
          {/*<span>{"????????? ???????????? ?????? ???????????? ?????????"}<br/> { " default ????????? ???????????????"}</span>*/}
          {/* ?????? ?????? ???????????? SET MY PROFILE ?????????! */}
          <Stack>
            <h4>????????? ?????????</h4>
            <input
              type="file"
              accept="image/*"
              name='avatar'
              ref={inputRef}
              onChange={onUploadAvatar}
            //  style={{display: 'none'}}
            />
            {/*<Button variant='outlined' onClick={onUploadImageButtonClick}>????????? ?????????</Button>*/}
          </Stack>
          <Stack>
            <h4>?????????</h4>
            <TextField
              id="edit_nickname"
              label="????????? ???????????? ?????????"
              size='small'
              value={newNick}
              onChange={onChangeNewNick}
              required={true}
              inputProps={{ maxLength: 16 }}
              helperText="???????????? ?????? 16??????????????? ????????????."
              />
          </Stack>
            <Button type="submit" variant='outlined'><EditIcon /> ????????? ????????????</Button>
      </Stack>
      </form>
    </Stack>
  </Modal>
  );
};

export default FirstProfileModal;
