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
  const [code, onChangeCode] = useState('');
  const [returnURL, setReturnURL] = useState("");
  const onSubmit2FAcode = useCallback(() => {
    console.log("code:", code);
    axios
    .post(process.env.REACT_APP_API_URL + `/api/auth/ft/email`, {code: code}, {
      withCredentials:true,
        headers:{
          authorization: 'Bearer ' + localStorage.getItem(" refreshToken"),
          accept: "*/*"
          }
    })
    .then((response) =>{
      setReturnURL("/workspace/sleact/intro");
    })
    .catch((err) => {
      console.log("[ERROR] post /api/auth/ft/email for 2FA")
      setReturnURL('/');
      console.log(err)
  });

  }, []);

  if (returnURL)
  {
    return (<Redirect to = {returnURL}/>);
  }

  return (
    //<Input2FAModal
    //  show={showInput2FAModal}
    //  onClose2FAModal={onCloseModal}
    //  setShow2FAModal={setShowInput2FAModal}
    ///>
    <Stack spacing={1}>
      <h1>인증 코드 입력</h1>
      <TextField
        id="2FA_input"
        label="인증 코드 입력"
        size='small'
        type='text'
        value={code}
        //onChange={onChangeCode}
        required={true}
        helperText='email로 받은 인증코드를 입력해주세요.'
        />
      <Button type="submit" variant='outlined'>인증 보내기</Button>
      <Button variant='outlined' onClick={onSubmit2FAcode}>인증 보내기2</Button>
    </Stack>

  );
};

export default LoginCheck;
