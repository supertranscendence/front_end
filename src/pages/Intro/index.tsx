
import React, { useCallback, useState, useEffect } from 'react';
import { Container } from '@mui/system';
import { TypeDataUser } from 'src/typings/types';
import fetcher from 'src/utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';

const Intro = () => {
  useEffect(() => {
    axios
    //.get("http://127.0.0.1:3000/api/users/jisokang", {
      .get("https://server.gilee.click/api/users/friends", {
      withCredentials:true,
        headers:{
          authorization: 'Bearer ' + localStorage.getItem(" refreshToken"),
          accept: "*/*"
          }
      })
    .then((response) =>{
      console.log("[response]: ", response);
      //console.log("friends: ", response.data);
      console.log("[친구]: ",response.data)
    })
    .catch((err) => {
      console.log("[ERROR] get /api/users/friends")
      console.log(err)
    });
  }, []);
  //const { data: myUserData } = useSWR<TypeDataUser>('http://127.0.0.1:3000/api/users/my', fetcher, {
  const { data: myUserData } = useSWR<TypeDataUser>('https://server.gilee.click/api/users/my', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  console.log("myUserData:", myUserData);


  return (
    <Container maxWidth="lg">
      <h1> Welcome {myUserData && myUserData.intra}!! </h1>
    </Container>
  );
};

export default Intro;
