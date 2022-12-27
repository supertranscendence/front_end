import EachDM from 'src/components/EachDM';
import useSocket from 'src/hooks/useSocket';
import { CollapseButton } from 'src/components/DMList/styles';
import { IDM, IUser, IUserWithOnline } from 'src/typings/db';
import fetcher from 'src/utils/fetcher';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';
import { dataUser, FriendType, listFriend } from 'src/typings/types';
import { dataFriend, UserStatus, FriendList } from 'src/typings/types';
import test from 'node:test';
import { bool } from 'aws-sdk/clients/signer';
import EachMsg from 'src/components/EachMsg';
import useInput from 'src/hooks/useInput';

//
const DMList = () => {

  const { workspace } = useParams<{ workspace?: string }>();
   const { data: myUserData } = useSWR<dataUser>(process.env.REACT_APP_API_URL + '/api/users/my/', fetcher, {
     dedupingInterval: 2000, // 2초
   });
  const [socket] = useSocket(workspace);
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [onlineList, setOnlineList] = useState<number[]>([]);
  //const [stateFriend, setStateFriend] = useState<listFriend>([]);
  //let stateFriend:string | undefined = "";
  const [stateFriend, setStateFriend] = useState("")
  const [stateFriendList, setStateFriendList] = useState<listFriend>([]);

  //const [temp, setTemp] = useInput("");

  const [listFriendData, setListFriendData] = useState("");

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  //const updateFriends = useCallback((userArr:string[])=>{
  //  console.log("[frineds map]: ",userArr);
  //  setFriendData((arr)=>[...userArr.map((str)=>{
  //    return str})]);
  //  },[socket, setFriendData])


  // useEffect(() => {
  //   console.log("[get myFriend]: ");
  //   socket?.emit("myFriend", (stateFriend:string ) => {
  //     console.log("[get myFriend] res: ");
  //     console.log(JSON.parse(stateFriend));
  //     setStateFriendList(JSON.parse(stateFriend));

  //   });
  //   console.log(stateFriend);

  // }, [socket]);
  
  
  useEffect(() => {
    console.log("on change friends state");
    socket?.on("changeState", () => {
      console.log("return well change friends state");
      socket?.emit("myFriend", (stateFriend:string ) => {
            console.log("[get myFriend] res: ");
            console.log(JSON.parse(stateFriend));
            setStateFriendList(JSON.parse(stateFriend));
          });
        });
        console.log(stateFriend);    
  }, [socket, setStateFriendList]);

  useEffect(() => {
    console.log('DMList: workspace 바꼈다', workspace);
    setOnlineList([]);
  }, [workspace]);

  //useEffect(() => {
  //  socket?.on('onlineList', (data: number[]) => {
  //    setOnlineList(data);
  //  });
  //  console.log('socket on dm', socket?.hasListeners('dm'), socket);
  //  return () => {
  //    console.log('socket off dm', socket?.hasListeners('dm'));
  //    socket?.off('onlineList');
  //  };
  //}, [socket]);

  const statToColor = (status:number) =>{
    if(status === UserStatus.me)
     return "#000000"
    else if(status === UserStatus.login)
      return "#44b700"
    else if(status === UserStatus.logout)
      return "#ff1744"
    else if(status === UserStatus.ingame)
      return "#ff9800"
    else
      return "#FFFFFF"

  }

  return (
    <>
      <h2>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          📎
        </CollapseButton>
        <span>My firends</span>
      </h2>
      <div>
        {stateFriendList.map((i) => {
            return <EachMsg key={i.friend} msg={{msg: '', name:i.friend, avatar:i.avatar, status:statToColor(i.state)}}/>
          })
          }
      </div>
    </>
  );
};

export default DMList;
