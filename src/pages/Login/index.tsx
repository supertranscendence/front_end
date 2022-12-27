//import { Error, Form, Header, Input, Label, LinkContainer } from 'src/pages/SignUp/styles';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import React, { useCallback, useState } from 'react';
import authfetcher from 'src/utils/authfetcher';
import { Avatar, Button, Container } from '@mui/material';
import { Box, Stack } from '@mui/system';
import axios from 'axios'

const LogIn = () => {

  const {data, mutate} = useSWR('token', authfetcher ,{
    dedupingInterval:100000
  });
  // let data  = '';
  console.log("login page");
  
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
          <Button
              variant='outlined'
              onClick={()=>{
                window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/ft/redirect`;
            }}>환경변수 주소로로 로그인</Button>
        </Stack>
      </Box>

    </Container>
  );
};

export default LogIn;
