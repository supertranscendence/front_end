
import React, { useCallback, useState } from 'react';
import { Container, Stack } from '@mui/system';
import { TypeDataUser } from 'src/typings/types';
import fetcher from 'src/utils/fetcher';
import useSWR from 'swr';
import { userInfo } from 'os';


const Intro = () => {
  //const { data: myUserData } = useSWR<TypeDataUser>('https://server.gilee.click/api/users/my', fetcher, {
    const { data: myUserData } = useSWR<TypeDataUser>('http://127.0.0.1:3000/api/users/my', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  const dummy:TypeDataUser = {
    avatar: null,
	  created: null,
	  id: 123,
	  intra: "dummy",
	  level: 42,
	  nickname: "dummy",
	  updated: null,
	  friends: [],
	  achive: ["✌️ victory"],
  };
  //myUserData?.friends.push(dummy);
  console.log("myUserData:", myUserData);
  return (
    <Container maxWidth="lg">
      <Stack>
        <h1>Welcome {myUserData && myUserData.intra}!! </h1>
        <h3>My Friends</h3>
        <div>
          {dummy.achive.map((i) => (
            <div>{i}</div>
          ))}
        </div>
        {/*<div>
            {(!myUserData?.friends[0])
            ? (
                <div>No Friends 🥲</div>
            ) : (
              myUserData.friends.forEach((i) => {return i.intra;})
            )}
        </div>*/}
      </Stack>
    </Container>
  );
};

export default Intro;
