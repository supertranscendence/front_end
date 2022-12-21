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
  const [friendData, setFriendData] = useState<string[]>([]);
  const [listFriendData, setListFriendData] = useState<listFriend[]>([]);

  interface test {
    friend: string
    avatar: string
    state: UserStatus;
    blocked: true

    }

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  const updateFriends = useCallback((userArr:string[])=>{
    console.log("[frineds map]: ",userArr);
    setFriendData((arr)=>[...userArr.map((str)=>{
      return str})]);
    },[socket, setFriendData])

  useEffect(() => {
    console.log('Get socket, [myFriend]! ');
    let data:string = "";
    let _friend:string = "";
    let _avatar:string = "";
    let _block:boolean = false;
    let _state:UserStatus  = 0;

    socket?.emit("myFriend", data);
    console.log("myFriend data:", data);
    //console.log("friend:", _friend);
    //console.log("avatar:", _avatar);
    //console.log("blocked:", _block);
    //console.log("state:", _state);
    //if (!listFriendData[0]) {
    //  console.log("No FRIEND!")
    //  return;
    //}
    //console.log("listFriendData[0].friend:", listFriendData[0].friend);
    //console.log("listFriendData[0].avatar:", listFriendData[0].avatar);
    //console.log("listFriendData[0].blocked:", listFriendData[0].blocked);
    //console.log("listFriendData[0].state:", listFriendData[0].state);

    //socket?.emit('myFriend', function(data:listFriend[]){
    //socket?.emit('myFriend', function(data:listFriend[]){
      //console.log('data[0].friend: ', data[0].friend);
      //console.log('data[0].avatar: ', data[0].avatar);
      //console.log('data[0].blocked: ', data[0].blocked);
      //console.log('data[0].state: ', data[0].state);
    //})
    //socket?.on('myFriend', (userArr: string[]) => {
    //  updateFriends(userArr);
    //});
  }, [listFriendData]);

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
