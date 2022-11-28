import Table from "../../components/Table";
import ChatBox from '../../components/ChatBox';
import ChatList from '../../components/ChatList';
import InviteChannelModal from '../../components/InviteChannelModal';
import useInput from '../../hooks/useInput';
import useSocket from '../../hooks/useSocket';
import { Header, Container, DragOver } from '../Channel/styles';
import { IChannel, IChat, IUser } from '../../typings/db';
import fetcher from '../../utils/fetcher';
import makeSection from '../../utils/makeSection';
import axios from 'axios';
import React, { useMemo, useCallback, useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { toast, ToastContainer } from 'react-toastify';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import { Link, Redirect, Switch, Route, useParams } from 'react-router-dom';
import loadable from '@loadable/component';
// import Modal from '@components/Modal'
import CreateChannelModal from '../../components/CreateRoomModal'
import getRoomInfo from '../../utils/getRoomInfo'


// import faker from "faker/locale/ko";
const ChatRoom = loadable(() => import ('../ChatRoom') );
// const PAGE_SIZE = 20;
const ChatChannel = () => {
const { workspace } = useParams<{ workspace?: string }>();
const [socket] = useSocket(workspace);
const [showCreateChannelModal, setShowCreateRoomModal] = useState(false);
const [newRoomFlag, setNewRoomFlag] = useState(false);

// const {data : tetets} = useSWR( 'getChatRoomInfoSWR',getRoomInfo );

// const { data: myData } = useSWR('/api/users', fetcher);
// console.log("tetets",tetets);
const [test, setTest] = useState([]);
useEffect(()=>{
  console.log("hi");
  socket?.on("getChatRoomInfoSWR",()=>{
    setTest([...test]);
  });
}, [test]);

const onClickAddRoom = useCallback(() => {
  setShowCreateRoomModal(true);
}, []);

const onCloseModal = useCallback(() => {
  setShowCreateRoomModal(false);
}, []);

const [roomArr, setRoomArr] = useState<{name:string,roomType:string, currCnt:number , enterButton: JSX.Element }[]>([]);

// const onClickBtn = useCallback((e:any)=>{
//   e.preventDefault();
//   console.log("cl", e.target.id);
   
// },[]);

const getRooms =  useCallback( (publicRooms : [])=>{
  console.log("publicRooms", publicRooms);
  
  setRoomArr( [...publicRooms.map((_name)=>{
          return {
             name: _name,
             roomType:"public",
             currCnt: 1,
             enterButton:<Link to={`/workspace/${workspace}/channel/Chat/${_name}`}><button>입장</button></Link>
         }})
      ])
      console.log("roomArr", roomArr);
}, [roomArr]);

useEffect(()=>{
socket?.emit("getChatRoomInfo", {}, getRooms);
console.log("room arr:", roomArr);
}, [socket,newRoomFlag]);

useEffect(()=>{
  socket?.on("new-room-created", ()=>{
    setNewRoomFlag(!newRoomFlag);
  });
},[roomArr]);

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
