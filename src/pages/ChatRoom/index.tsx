// import ChatBox from 'src/components/ChatBox';
// import ChatList from 'src/components/ChatList';
// import useInput from 'src/hooks/useInput';
// import {Label, Input, Button} from 'src/pages/SignUp/styles';
// import useSocket from 'src/hooks/useSocket';
// import { DragOver } from 'src/pages/Channel/styles';
// import { Header, Container } from 'src/pages/DirectMessage/styles';
// import { IDM } from 'src/typings/db';
// import fetcher from 'src/utils/fetcher';
// import makeSection from 'src/utils/makeSection';
// import axios from 'axios';
// import gravatar from 'gravatar';
// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { Scrollbars } from 'react-custom-scrollbars-2';
// import { useParams } from 'react-router';
// import { toast } from 'react-toastify';
// import useSWR from 'swr';
// import useSWRInfinite from 'swr/infinite';

// const ChatRoom = () => {
//   const { workspace } = useParams<{ workspace?: string }>();
//   const scrollbarRef = useRef<Scrollbars>(null);
//   const [socket] = useSocket(workspace);
//   const [msgInfo, setMsgInfo] = useState<{user: string; room: string | undefined; msg: any}>({
//     user: "",
//     room: "",
//     msg: ""
//   });
  
//   const { ChatRoom } = useParams<{ ChatRoom?: string }>();
//   const chatWindow = useRef(null);
  

//   console.log("Chat",ChatRoom);
  
  
//   // const input = killForm.querySelector("input");
  
//   // const addMsg = useCallback((msg:string)=>{
//   //   const nameForm = msgg.querySelector("#name");
//   // },[])
  
//   const moveScrollToReceiveMessage = useCallback(() => { 
//     if (chatWindow.current) {
//       chatWindow.current.scrollTo({
//         top: chatWindow.current.scrollHeight,
//         behavior: "smooth",
//       });
//     }
//   }, []);
  
//   const addMsg = useCallback(pongData => {
//     const newMessage = makeMessage(pongData); // makeMessage는 아직 구현하지 않은 함수.
//     setMessages(messages => [...messages, newMessage]);
//     moveScrollToReceiveMessage();
//   },
//   [moveScrollToReceiveMessage]
// );
//   // const resetMsg = useCallback((e:any)=>{
//   //   setMsgInfo({
//   //     user: "",
//   //     room: "",
//   //     msg: ""
//   //     }
//   //   )
//   // }, []);
  
//   const sendMsg = useCallback((e:any)=>{
//     e.preventDefault();
//     console.log(e.target.msg.value,"send");
//     console.log(ChatRoom,"send");
//     console.log(msgInfo.msg,msgInfo.room, msgInfo.user);
//     setMsgInfo({
//         user: "hyopark",
//         room: ChatRoom,
//         msg: e.target.msg.value,
//     }
//     )
//     console.log(msgInfo.msg,msgInfo.room, msgInfo.user);
//     socket?.emit("newMsg", {
//       user: "hyopark",
//       room: ChatRoom,
//       msg: e.target.msg.value,
//   }, ()=>{e.target.msg.value = ""});
//   },[]);
  
//   // useEffect(()=>{
//     socket?.on("newMsg", (msg:any) => addMsg(msg) );
//   // },[])
  
//   return (<div>{ChatRoom}
//     <form onSubmit={sendMsg}>
//     <input
//       name="msg"
//       placeholder="메세지 입력해보슈"
//       // onChange={onChangeAccount}
//     />
//       <button></button>
//     </form>
//     <ul>
//     </ul>
//     </div>  
//   );
// };

// export default ChatRoom;




import React,{ useState, useCallback, useEffect, useContext, useRef } from "react";

import useSocket from 'src/hooks/useSocket';
import { useParams } from 'react-router';
import { ChatArea } from "@components/ChatBox/styles";
const ChatRoom = () => {

  const { ChatRoom } = useParams<{ ChatRoom?: string }>();
  const [socket] = useSocket("sleact");
  const [messages, setMessages] = useState<{room: string, user: string, msg: string}[]>([]);
  const chatWindow:any = useRef(null);
  // const [msgInfo, setMsgInfo] = useState<{user: string; room: string | undefined; msg: any}>({
      //   user: "",
      //   room: "",
      //   msg: ""
      // });
  // 새 메시지를 받으면 스크롤을 이동하는 함수
  const moveScrollToReceiveMessage = useCallback(() => { 
    
    if (chatWindow.current) {
      chatWindow.current.scrollTo({
        top: chatWindow.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);
  const handleReceiveMessage = useCallback((pongData:any) => {
    const newMessage =pongData; // makeMessage는 아직 구현하지 않은 함수.
      console.log("pongData", pongData);
      // console.log("pongData", newMessage);
      setMessages((msg)=>[...msg.map((str)=>{
        return str}),newMessage]);
      console.log("messssss",messages);
      moveScrollToReceiveMessage();
    },
    [moveScrollToReceiveMessage ]
  );
  
  

const setMyMsg = (str:string) => {
if (ChatRoom)
  setMessages((msg)=>[...msg.map((str)=>{
    return str}),
    {
      room : ChatRoom,
      user: "it's me",
      msg : str
    }
    ]);
}
  

  const sendMsg = useCallback((e:any)=>{
    e.preventDefault();
    console.log(e.target.msg.value,"send");
    console.log(ChatRoom,"send");
    // console.log(msgInfo.msg,msgInfo.room, msgInfo.user);
    // setMsgInfo({
    //     user: "hyopark",
    //     room: ChatRoom,
    //     msg: e.target.msg.value,
    // }
    // )
    // console.log(msgInfo.msg,msgInfo.room, msgInfo.user);
    socket?.emit("newMsg", {
      user: "hyopark",
      room: ChatRoom,
      msg: e.target.msg.value,
  }, );
  setMyMsg(e.target.msg.value);
  e.target.msg.value = "";
  },[socket]);
  
  useEffect(() => {
    socket?.on("newMsg", (msg:any) => handleReceiveMessage(msg) ); 
  }, [socket, handleReceiveMessage]);
  
  return (
    <div className="d-flex flex-column" style={{ width: 1000 }}>
      <div className="text-box">
        <span>{"hyopark"}</span> 님 환영합니다!
      </div>
      <div
        className="chat-window card"
        ref={chatWindow}
      >
      <div>{ChatRoom}
     <form onSubmit={sendMsg}>
     <input
       name="msg"
       placeholder="메세지 입력해보슈"
       // onChange={onChangeAccount}
     />
       <button></button>
     </form>
     <ul>
     </ul>
     </div>  
     메세지 나와라 뚝딲!
        {messages.map((message, index) => { 
          const { room, user, msg } = message;
          // messages 배열을 map함수로 돌려 각 원소마다 item을 렌더링 해줍니다.
          return (
            <div key={index} className="d-flex flex-row">
              {msg && <div className="message-user">{user}: </div>}
              <div>{msg}</div>
              {/* <div className="time">{message}</div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatRoom;