import React, { FC, PropsWithChildren, useCallback, useState, useRef} from "react";
import { Button, Container, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import useInput from "src/hooks/useInput"
import axios from 'axios';
import useSWR from 'swr';
import AWS from "aws-sdk";
import uuid from 'react-uuid'

const FirstSetup = () => {
  /*************************************** for AWS ***************************************/
  const region = "ap-northeast-2";
  const bucket = "ts-f-dp";

  AWS.config.update({
    region: region,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  });

  /*************************************** ******* ***************************************/

  const {data: isFirstLogin, mutate} = useSWR('first_login',{
    dedupingInterval:100000
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [newNick, onChangeNewNick, setNewNick] = useInput('');
  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

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
    .put(process.env.REACT_APP_API_URL + `/api/users/avatar/`,{avatar: uuidKey}, {
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
      .put(process.env.REACT_APP_API_URL + `/api/users/`, {nick: newNick}, {
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

	return (
		<Container maxWidth="sm">
			<Box sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',}}
		  >
        <Stack spacing={1}>
          <h1>Setup Profile</h1>
          <Stack>
              <h4>아바타 업로드</h4>
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
      </form>
        </Stack>
			</Box>
		</Container>
	);
};

export default FirstSetup;
