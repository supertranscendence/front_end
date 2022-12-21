import EachDM from 'src/components/EachDM';
import useSocket from 'src/hooks/useSocket';
import { CollapseButton } from 'src/components/DMList/styles';
import { IDM, IUser, IUserWithOnline } from 'src/typings/db';
import fetcher from 'src/utils/fetcher';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import useSWR from 'swr';
import { dataUser, listFriend } from 'src/typings/types';
import { dataFriend, UserStatus, FriendList } from 'src/typings/types';
import test from 'node:test';

//
const DMList = () => {
  const { workspace } = useParams<{ workspace?: string }>();
   const { data: myUserData } = useSWR<dataUser>(process.env.REACT_APP_API_URL + '/api/users/my/friends', fetcher, {
     dedupingInterval: 2000, // 2초
   });
  // const { data: memberData } = useSWR<IUserWithOnline[]>(
  //   userData ? `/api/workspaces/${workspace}/members` : null,
  //   fetcher,
  // );
  const [socket] = useSocket(workspace);
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [onlineList, setOnlineList] = useState<number[]>([]);
  //const [friendData, setFriendData] = useState<string[]>([]);
  const [friendData, setFriendData] = useState<string[]>([]);
  //const [listFriendData, setListFriendData] = useState<listFriend[]>([]);
  const [listFriendData, setListFriendData] = useState("");

  //type test = {
  //  friend: string
  //  state: UserStatus
  //  blocked: boolean
  //  }

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  const updateFriends = useCallback((userArr:string[])=>{
    console.log("[frineds map]: ",userArr);
    setFriendData((arr)=>[...userArr.map((str)=>{
      return str})]);
    },[socket, setFriendData])

  useEffect(() => {

    console.log(socket);

    socket?.emit("myFriend", (stateFriend:listFriend) => {
      console.log("myFriend res: ", stateFriend);
    })
    //console.log('Get socket any, [myFriend]! ');
    //socket?.emit("myFriend", (json:any)=> {
    //  console.log("myFriend res: ", json);
    //});
    //console.log('Get socket string, [myFriend]! ');
    //socket?.emit("myFriend", (json:string)=> {
    //  console.log("myFriend res: ", json);
    //});
    //console.log('Get socket any.parse, [myFriend]! ');
    //socket?.emit("myFriend", (json:any)=> {
    //  console.log("myFriend res: ", JSON.parse(json));
    //});
    //console.log('Get socket string.parse, [myFriend]! ');
    //socket?.emit("myFriend", (json:string)=> {
    //  console.log("myFriend res: ", JSON.parse(json));
    //});
    //console.log('Get socket typeLIST, [myFriend]! ');
    //socket?.emit("myFriend", (json:listFriend)=> {
    //  console.log("myFriend res: ", json);
    //});
    //console.log('Get socket typeLIST-block, [myFriend]! ');
    //socket?.emit("myFriend", (json:test)=> {
    //  console.log("myFriend res: ", json);
    //});

  }, []);

  useEffect(() => {
    console.log('DMList: workspace 바꼈다', workspace);
    setOnlineList([]);
  }, [workspace]);

  useEffect(() => {
    socket?.on('onlineList', (data: number[]) => {
      setOnlineList(data);
    });
    console.log('socket on dm', socket?.hasListeners('dm'), socket);
    return () => {
      console.log('socket off dm', socket?.hasListeners('dm'));
      socket?.off('onlineList');
    };
  }, [socket]);


  return (
    <>
      <h2>
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          📎
        </CollapseButton>
        <span>My firends</span>
      </h2>
      <div>
        {friendData?.map((i) => {
            return <EachDM member={i} />;
            //return <EachDM key={i} member={member} isOnline={isOnline} />;
          })
          }
      </div>
    </>
  );
};

export default DMList;
