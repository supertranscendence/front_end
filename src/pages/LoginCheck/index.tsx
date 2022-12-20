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
  //const [done2FA, setDone2FA] = useState(false);

  const onSubmit2FAcode = useCallback((e:any) => {
    e.preventDefault();
    console.log("code:", code);

   if(code) {
   axios
    .post(process.env.REACT_APP_API_URL + `/api/auth/ft/verify_email`, {code: code}
    )

    .then((response) =>{
      console.log("2FA Response all", response);
      console.log("STATUS", response.status);

      if(response.status === 200){
        console.log("200!", response.status);
        //setIsError(false);
        window.location.href = "https://server.gilee.click/api/auth/ft/redirect";
      } else {
        setIsError(true);
      }
    })
    .catch((err) => {
      console.log("[ERROR] post /api/auth/ft/email for 2FA")
      console.log(err)
    });

  }

  }, [code, isError]);

  return (
    //code 입력하자 마자 error떠서 수정해야함!
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
