//import { Error, Form, Header, Input, Label, LinkContainer } from 'src/pages/SignUp/styles';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import authfetcher from 'src/utils/authfetcher';
import React, { useCallback, useState } from 'react';
import { Avatar, Button, Container } from '@mui/material';
import { Box, Stack } from '@mui/system';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios'

const LogIn = () => {
  console.log("login page");
  const {data, mutate} = useSWR('token', authfetcher ,{
    dedupingInterval:100000
  });
  if (localStorage.getItem(" refreshToken") ){
    if (localStorage.getItem("accessToken") ){
      console.log("already have ref and acc token");
      return <Redirect to="/workspace/sleact/intro"/>
    }
    else{
        axios.get(process.env.REACT_APP_API_URL + "/api/auth/ft/refresh", {
        withCredentials:true,
        headers:{
        authorization: 'Bearer ' + localStorage.getItem(" refreshToken"),
        accept: "*/*"
        }
      }).then((response) =>{
        console.log(response);
        console.log("data",response.data);
        localStorage.setItem("accessToken",response.data.act);
      })
      .catch((err) => console.log(err));
    }
  }

  // // 로그인 판단을 일단 로컬스토리지 리프레시 토큰으로 남겨놨습니다.
  // if (data){
  //   console.log("already have acc token");
  //   return <Redirect to="/workspace/sleact/intro"/>
  //   // location.href=("/");
  // }

	//TODO 환경변수 로그인 버튼 (redirect)

  return (
    <Container maxWidth="sm">
      <Box sx={{
            marginTop: '40%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Stack spacing={1}>
          <h1>JJIRANSCENDENCE</h1>
          <Stack/>
          <Button
              variant='outlined'
              onClick={()=>{
                window.location.href = "https://server.gilee.click/api/auth/ft/redirect";
            }}>기리네로 로그인</Button>
          <Button
              variant='outlined'
              onClick={()=>{
                window.location.href = "http://127.0.0.1/api/auth/ft/redirect";
            }}>로컬 백엔드로 로그인</Button>
          <Button
              variant='outlined'
              startIcon={<LoginIcon/>}
              onClick={()=>{
                window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/ft/redirect`;
            }}>Login with 42</Button>
        </Stack>
      </Box>

    </Container>
  );
};

export default LogIn;
