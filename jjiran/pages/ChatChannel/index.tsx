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
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { useTable, useGlobalFilter, useSortBy } from "react-table";

// import faker from "faker/locale/ko";

const PAGE_SIZE = 20;
const ChatChannel = () => {

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
        Header: <button>생성 버튼</button>,
      }
      ,
    ],
    []
  );

  const data = useMemo(
    () =>{
      return ([{
        name: "hyopark" ,
        roomType: "private",
        currCnt: "1",
        enterButton: <button>입장</button>
      },
      {
        name: "jisokang" ,
        roomType: "public",
        currCnt: "1" ,
        enterButton: <button>입장</button>
      },
      ,
      {
        name: "jji" ,
        roomType: "protected",
        currCnt: "1" ,
        enterButton: <button>입장</button>
      },
      ,
      {
        name: "gilee" ,
        roomType: "public",
        currCnt: "1" ,
        enterButton: <button>입장</button>
      },
      
      ])},
    []
  );

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default ChatChannel;
