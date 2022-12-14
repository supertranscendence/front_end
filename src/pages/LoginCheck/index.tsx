import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import React, { useCallback, useState } from 'react';
import { Avatar, Button, Container, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import axios from 'axios'
import useInput from "src/hooks/useInput"

const LoginCheck = () => {
  if (localStorage.getItem(" refreshToken") ){
    if (localStorage.getItem("accessToken") ){
      console.log("already have ref and acc token");
      return <Redirect to="/workspace/sleact/intro"/>
    }
  }
  const [code, onChangeCode, setCode] = useInput('');
  const [isError, setIsError] = useState(false);

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
        window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/ft/redirect`;
      } else {
        setIsError(true);
      }
    })
    .catch((err) => {
      console.log("[ERROR] post /api/auth/ft/email for 2FA")
      console.log(err)
      window.location.href = "/error";
    });
  }
  }, [code, isError]);

  return (
    <Container maxWidth="sm">
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
    </Container>

  );
};

export default LoginCheck;
