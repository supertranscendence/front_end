import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import React, { useCallback, useState } from 'react';
import authfetcher from 'src/utils/authfetcher';
import { Avatar, Button, Container, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import axios from 'axios'
import Input2FAModal from 'src/components/Input2FAModal';
import { dataUser } from 'src/typings/types';
import fetcher from 'src/utils/fetcher';
import useInput from "src/hooks/useInput"



const LoginCheck = () => {
  const [code, onChangeCode, setCode] = useInput('');
  const [returnURL, setReturnURL] = useState("");

  const onSubmit2FAcode = useCallback((e:any) => {
    e.preventDefault();
    console.log("code:", code);

   if(code) {
    axios
    .get(process.env.REACT_APP_API_URL + `/api/auth/ft/verify_email`,
      {params: {code: code}, withCredentials: false},
      //{ withCredentials: true }
    )
      //{code: code})
    // {
    //  withCredentials:true,
    //    headers:{
    //      authorization: 'Bearer ' + localStorage.getItem("accessToken"),
    //      accept: "*/*"
    //      }
    //}

    .then((response) =>{
      console.log("2FA Response all", response);
      console.log("STATUS", response.status);
      //setReturnURL("/workspace/sleact/intro");
      //if (status가 맞으면)
        //그냥 넘어가기
      //

    })
    .catch((err) => {
      console.log("[ERROR] post /api/auth/ft/email for 2FA")
      //setReturnURL('/');
      console.log(err)
  });}

  }, [code, returnURL]);

  //if (returnURL){
  //  //need
  //  return <Redirect to="/workspace/sleact/intro"/>
  //}

  return (
    <Stack spacing={1}>
      <h1>인증 코드 입력</h1>
      <form onSubmit={onSubmit2FAcode}>
      <TextField
        id="2FA_input"
        label="인증 코드 입력"
        size='small'
        type='text'
        value={code}
        onChange={onChangeCode}
        required={true}
        helperText='email로 받은 인증코드를 입력해주세요.'
        />
      <Button type="submit" variant='outlined'>인증 보내기</Button>
      </form>
    </Stack>

  );
};

export default LoginCheck;
