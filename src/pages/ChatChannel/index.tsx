import Table from "src/components/Table";
import ChatBox from 'src/components/ChatBox';
import ChatList from 'src/components/ChatList';
import InviteChannelModal from 'src/components/InviteChannelModal';
import useInput from 'src/hooks/useInput';
import useSocket from 'src/hooks/useSocket';
import { Header, Container, DragOver } from 'src/pages/Channel/styles';
import { IChannel, IChat, IUser } from 'src/typings/db';
import fetcher from 'src/utils/fetcher';
import makeSection from 'src/utils/makeSection';
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
import CreateChannelModal from 'src/components/CreateRoomModal'
import getRoomInfo from 'src/utils/getRoomInfo'

const ChatRoom = loadable(() => import ('src/pages/ChatRoom') );
const ChatChannel = () => {
const { workspace } = useParams<{ workspace?: string }>();
const [socket] = useSocket(workspace);
const [showCreateChannelModal, setShowCreateRoomModal] = useState(false);
const [newRoomFlag, setNewRoomFlag] = useState(false);

const onClickAddRoom = useCallback(() => {
  setShowCreateRoomModal(true);
}, []);

const onCloseModal = useCallback(() => {
  setShowCreateRoomModal(false);
}, []);

const [roomArr, setRoomArr] = useState<{name:string,roomType:string, currCnt:number , enterButton: JSX.Element }[]>([]);

useEffect(()=>{
  socket?.emit("getChatRoomInfo", {}, (publicRooms : [])=>{
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
});
console.log("room arr:", roomArr);
}, [newRoomFlag]);

useEffect(()=>{
  socket?.on("new-room-created", ()=>{
  setNewRoomFlag(newRoomFlag => !newRoomFlag);
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
