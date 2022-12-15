
import React, { useCallback, useState } from 'react';
import { Container } from '@mui/system';
import { TypeDataUser } from 'src/typings/types';
import fetcher from 'src/utils/fetcher';
import useSWR from 'swr';

const Intro = () => {
  //const { data: myUserData } = useSWR<TypeDataUser>('http://127.0.0.1:3000/api/users/my', fetcher, {
  const { data: myUserData } = useSWR<TypeDataUser>('https://server.gilee.click/api/users/my', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  console.log("myUserData:", myUserData);

  return (
    <Container maxWidth="lg">
      <h1> Welcome {myUserData && myUserData.intra}! </h1>
    </Container>
  );
};

export default Intro;
