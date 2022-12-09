import Table from "src/components/Table";
import useSocket from 'src/hooks/useSocket';
import React, { useMemo, useCallback, useEffect, useRef, useState } from 'react';
import { Link, Redirect, Switch, Route, useParams } from 'react-router-dom';
import loadable from '@loadable/component';
import CreateChannelModal from 'src/components/CreateRoomModal'


const ChatRoom = loadable(() => import ('src/pages/ChatRoom') );
const ChatChannel = () => {
const { workspace } = useParams<{ workspace?: string }>();
const [socket] = useSocket(workspace);
const [showCreateChannelModal, setShowCreateRoomModal] = useState(false);
const [newRoomFlag, setNewRoomFlag] = useState(false);
const [redirectRoom, setRedirectRoom] = useState('');
const [joinedRoom, setJoinedRoom] = useState(false);

const onClickAddRoom = useCallback(() => {
  setShowCreateRoomModal(true);
}, []);

const onCloseModal = useCallback(() => {
  setShowCreateRoomModal(false);
}, []);

const [roomArr, setRoomArr] = useState<{name:string,roomType:string, currCnt:number , enterButton: JSX.Element }[]>([]);
// const [data] = useSWR("roomFlag", roomfetcher);
const enterRoom = useCallback( (e:any)=> {
// console.log("roooooooomname :" ,e.target.name.value,e.target.name,e.target.name )
  socket?.emit("enterRoom",{room:e.target.name, name:"userinfo"},()=>{
    // location.href = `/workspace/sleact/channel/Chat/${e.target.name}`;
    <Redirect to= {`/workspace/sleact/channel/Chat/${e.target.name}`}/>
  })
},[])

useEffect(()=>{
  socket?.emit("getChatRoomInfo", {}, (publicRooms : [])=>{
  console.log("publicRooms", publicRooms);
  //socket.on("getExitRoomInfo, ");
  //socket?.emit("ExitRoom",{room:target.name, name:"userinfo"},()=>{})
  setRoomArr( [...publicRooms.map((_name)=>{
          return {
             name: _name,
             roomType:"public",
             currCnt: 1,
             enterButton:<Link to={`/workspace/${workspace}/channel/Chat/${_name}`}><button name={_name} onClick={enterRoom}>입장</button></Link>
         }})
      ])
      console.log("roomArr", roomArr);
});
console.log("room arr:", roomArr);
}, [newRoomFlag, socket]);

useEffect(()=>{
  socket?.on("new-room-created", (room:string)=>{
    setNewRoomFlag(newRoomFlag => !newRoomFlag);
    console.log("new-room-created: ");
    console.log(`/workspace/sleact/channel/Chat/${room}`);
    setRedirectRoom((s)=>room);
  });
},[socket,setNewRoomFlag]);

const getJoinedRoom = useCallback((str:string)=>{
  const arr :string[] = str.split(" ");
  if (arr.length > 1){
    setJoinedRoom((f)=>true);
  }
},[]);

useEffect(()=>{
  socket?.emit("joinedRoom", getJoinedRoom)
},[]);

const columns = useMemo(
  () => [
    {
      accessor: "name",
      Header: "Name",
    },
    {
      accessor: "roomType",
      Header: "RoomType",
    },
    {
      accessor: "currCnt",
      Header: "CurrCnt",
    },
    {
      accessor: "enterButton",
      Header: <button onClick={onClickAddRoom}>생성 버튼</button>,
    }
    ,],
  []
);
if (redirectRoom)
  return ( <Redirect to= {`/workspace/sleact/channel/Chat/${redirectRoom}`}/>);
if (joinedRoom)
{
  useEffect(()=>{
    socket?.emit("ExitRoom", {name:"hyopark", room:"test001"} );
    console.log("EXIT in FRONT!");
  });
}
  return (
    <div>
      <Table columns={columns} data={roomArr} />
      <CreateChannelModal
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
        setShowCreateRoomModal={setShowCreateRoomModal}
        />
    </div>
  );
};

export default ChatChannel;
