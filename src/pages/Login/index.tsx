import useInput from 'src/hooks/useInput';
import { Button } from '@mui/material';
import { Error, Form, Header, Input, Label, LinkContainer } from 'src/pages/SignUp/styles';
import fetcher from 'src/utils/fetcher';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
// import useSWRImmutable from 'swr';
import React, { useCallback, useState } from 'react';
import authfetcher from 'src/utils/authfetcher';

const LogIn = () => {  
  if (localStorage.getItem(" refreshToken") ){
    console.log("2here i am ");
    return <Redirect to="/workspace/sleact/intro"/>
  }
  // 로그인 판단을 일단 로컬스토리지 리프레시 토큰으로 남겨놨습니다.
  
  const {data} = useSWR('token', authfetcher ,{
    	dedupingInterval:100000
  });
  console.log("data", data);
  if (data){
      console.log("1here i am ");
      return <Redirect to="/workspace/sleact/intro"/>
    }
  
  return (
    <div id="container">
      <Header>Jiiranscendence</Header>
       <button onClick={()=>{
            window.location.href = "https://server.gilee.click/api/auth/ft/redirect";
        }}>기리네로 가보자</button>
       <button onClick={()=>{
            window.location.href = "http://127.0.0.1:3000/api/auth/ft/redirect";
        }}>로컬 백엔드로 가보자</button>
    </div>
  );
};

export default LogIn;