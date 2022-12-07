//import { Error, Form, Header, Input, Label, LinkContainer } from 'src/pages/SignUp/styles';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import React, { useCallback, useState } from 'react';
import authfetcher from 'src/utils/authfetcher';
import { Avatar, Button, Container } from '@mui/material';
import { Box, Stack } from '@mui/system';

const LogIn = () => {

  const {data, mutate} = useSWR('token', authfetcher ,{
    dedupingInterval:100000
  });
  // let data  = '';
  // console.log("data", data);
  if (localStorage.getItem(" refreshToken") ){//파싱 제대로 못해서 띄어쓰기 포함임 추후 변경예정
    console.log("already have ref token");
    return <Redirect to="/workspace/sleact/intro"/>
  }
  // 로그인 판단을 일단 로컬스토리지 리프레시 토큰으로 남겨놨습니다.
  if (data){
    console.log("already have acc token");
    return <Redirect to="/workspace/sleact/intro"/>
    // location.href=("/");
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Stack spacing={1}>
          <Avatar/>
          <h1>Jjiranscendence</h1>
          <Stack/>
          <Button
              variant='outlined'
              onClick={()=>{
                window.location.href = "https://server.gilee.click/api/auth/ft/redirect";
            }}>기리네로 로그인</Button>
          <Button
              variant='outlined'
              onClick={()=>{
                window.location.href = "http://127.0.0.1:3000/api/auth/ft/redirect";
            }}>로컬 백엔드로 로그인</Button>
        </Stack>
      </Box>

    </Container>
  );
};

export default LogIn;
