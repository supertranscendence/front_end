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

//
const DMList = () => {

  const { workspace } = useParams<{ workspace?: string }>();
   const { data: myUserData } = useSWR<dataUser>(process.env.REACT_APP_API_URL + '/api/users/my/', fetcher, {
     dedupingInterval: 2000, // 2초
   });
  const [socket] = useSocket(workspace);
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [onlineList, setOnlineList] = useState<number[]>([]);
  const [stateFriend, setStateFriend] = useState<listFriend>([]);
  //{friend: "dummy1", avatar: "", state: 0, blocked: false}, {friend: "dummy2", avatar: "", state: 0, blocked: false}
  //const [friendData, setFriendData] = useState<string[]>([
  //  "dummy1", "dummy2", "dummy3"
  //]);
  //const [listFriendData, setListFriendData] = useState<listFriend[]>([]);
  const [listFriendData, setListFriendData] = useState("");

  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);

  //const updateFriends = useCallback((userArr:string[])=>{
  //  console.log("[frineds map]: ",userArr);
  //  setFriendData((arr)=>[...userArr.map((str)=>{
  //    return str})]);
  //  },[socket, setFriendData])



  useEffect(() => {

    //const str = [{"friend":"hyopark","state":2,"blocked":false,"avatar":""},{"friend":"jji","state":1,"blocked":false,"avatar":""}]
    console.log(socket);
    console.log("[get myFriend]: ");
    //socket?.emit("myFriend", (stateFriend:Promise<string> ) => {
    socket?.emit("myFriend", (stateFriend:string ) => {
      console.log("[get myFriend] res: ");
      console.log(JSON.parse(stateFriend));
      setStateFriend(JSON.parse(stateFriend));
      //setStateFriend(()=>[...stateFriend]);
      // stateFriend.then((ele)=>{
      // console.log("hohohoho", ele);
        // setStateFriend(ele);
      // })
    });
    //socket?.emit("myFriend", stateFriend);
    //console.log("myFriend stateFriend", stateFriend);
    //setStateFriend(stateFriend);
    //console.log(stateFriend.length);

  }, [socket]);

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
        {/*<CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          📎
        </CollapseButton>*/}
        <span>My firends</span>
      </h2>
      <div>
        {stateFriend.map((i) => {
            return <EachMsg key={i.friend} msg={{msg: '', name:i.friend, avatar:i.avatar}}/>
          })
          }
      </div>
    </>
  );
};

export default DMList;
