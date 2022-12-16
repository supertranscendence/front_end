
import React, { useCallback, useState, useEffect } from 'react';
import { Container } from '@mui/system';
import { dataFriend, dataUser } from 'src/typings/types';
import fetcher from 'src/utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';

const Intro = () => {
  useEffect(() => {
    axios
      .get("https://server.gilee.click/api/users/my/friends", {
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
  const { data: myUserData } = useSWR<dataUser>('https://server.gilee.click/api/users/my', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  console.log("myUserData:", myUserData);

  const dFriends:Array<dataFriend> = [
    {
      id: 1,
      intra: "jisokang",
      friend: "jjimmy",
      block: false,
      created: null,
      updated: null
    },
    {
      id: 2,
      intra: "jisokang",
      friend: "gilmmy",
      block: false,
      created: null,
      updated: null
    }
  ];
  const dummy:dataUser = {
    avatar: "",
	  created: null,
	  id: 123,
	  intra: "dummy",
	  level: 42,
	  nickname: "dummy",
	  updated: null,
	  friends: dFriends,
  };

  return (
    <Container maxWidth="lg">
      <h1> Welcome {myUserData && myUserData.intra}!! </h1>
      <h3> Your Friends</h3>
      {myUserData?.friends?.map((i) => (
        <div>{i.friend}</div>
      ))}
      {/*<div>
        {(myUserData?.friends === undefined)
        ? (
          <div>No Friends 🥲</div>
          ) : (
          myUserData.friends.map((i) => (
            <div>{i.friend}</div>
          ))
        )}
      </div>*/}
    </Container>
  );
};

export default Intro;
