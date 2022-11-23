import Table from "@components/Table";
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import InviteChannelModal from '@components/InviteChannelModal';
import useInput from '@hooks/useInput';
import useSocket from '@hooks/useSocket';
import { Header, Container, DragOver } from '@pages/Channel/styles';
import { IChannel, IChat, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import makeSection from '@utils/makeSection';
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
import CreateChannelModal from '@components/CreateRoomModal'


// import faker from "faker/locale/ko";
const ChatRoom = loadable(() => import ('@pages/ChatRoom') );
const PAGE_SIZE = 20;
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

const getRooms =  useCallback( (publicRooms : [])=>{
  setRoomArr( [...publicRooms.map((_name)=>{
          return {
             name: _name,
             roomType:"public",
             currCnt: 1,
             enterButton:<button>입장</button>
         }})
      ])
      console.log("roror",roomArr);
}, [roomArr]);
useEffect(()=>{
socket?.emit("getChatRoomInfo", {}, getRooms);
console.log("room arr:", roomArr);
}, [newRoomFlag]);
socket?.on("new-room-created", ()=>{
  setNewRoomFlag(!newRoomFlag);
});

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
