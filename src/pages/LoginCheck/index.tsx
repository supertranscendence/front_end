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
  const [isError, setIsError] = useState(false);

  const onSubmit2FAcode = useCallback((e:any) => {
    e.preventDefault();
    console.log("code:", code);

   if(code) {

    //post
    //200
    //로그인 버튼

    axios
    .post(process.env.REACT_APP_API_URL + `/api/auth/ft/verify_email`, {code: code}
      //{params: {code: code}, withCredentials: false},
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

      if(response.status === 200){
        console.log("200!", response.status);
        window.location.href = "https://server.gilee.click/api/auth/ft/redirect";
      }
      else
        setIsError(true);

      //setReturnURL("/workspace/sleact/intro");
      //if (status가 맞으면)
        //그냥 넘어가기
      //

    })
    .catch((err) => {
      console.log("[ERROR] post /api/auth/ft/email for 2FA")
      console.log(err)
  });}

  }, [code, isError]);

  //if (returnURL){
  //  //need
  //  return <Redirect to="/workspace/sleact/intro"/>
  //}

  return (
    <Stack spacing={1}>
      <h1>인증 코드 입력</h1>
      <form onSubmit={onSubmit2FAcode}>
      <TextField
        error={isError}
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
