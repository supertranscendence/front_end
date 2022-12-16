
import React,{ useState, useCallback, useEffect, useContext, useRef } from "react";
import useSocket from 'src/hooks/useSocket';
import { ChatArea } from "@components/ChatBox/styles";
import { userInfo } from "os";
import { Link, Redirect, Switch, Route, useParams } from 'react-router-dom';
import { Header, Container, DragOver } from 'src/pages/ChatRoom/styles';
import SetPWDModal from 'src/components/SetPWDModal';
import InviteModal from 'src/components/InviteModal';
import ChatBox from 'src/components/ChatBox';
import { Scrollbars } from 'react-custom-scrollbars-2';
import makeSection from 'src/utils/makeSection';
import useInput from 'src/hooks/useInput';
import EachMsg from 'src/components/EachMsg'
import { consumeFilesChange } from "fork-ts-checker-webpack-plugin/lib/files-change";
import { stringify } from "querystring";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Client } from "socket.io/dist/client";
// import {IUser2} from 'src/typings/db'

// import scrollbar from 'smooth-scrollbar';

// smooth scroll 설정
export enum UserStatus {
  me,
  login,
  logout,
  ingame,
}

export interface IUser {
  client: Client<DefaultEventsMap, DefaultEventsMap,DefaultEventsMap, any>;
  client_id: string;
  intra: string;
  nickname?: string;
  avatar?: string;
  status?: UserStatus;
}

const ChatRoom = () => {

  const { ChatRoom } = useParams<{ ChatRoom?: string }>();
  const [socket] = useSocket("sleact");
  const [returnFlag, setReturnFlag] = useState(false);
  const [redirectFlag, setRedirectFlag] = useState('');
  const [messages, setMessages] = useState<{room: string, user: string, msg: string}[]>([]);
  const chatWindow:any = useRef(null);
  const [dragOver, setDragOver] = useState(false);
const scrollbarRef = useRef<Scrollbars>(null);
const isEmpty = messages?.length === 0;
const isReachingEnd = isEmpty || (messages && messages?.length < 20);
const [chat, onChangeChat, setChat] = useInput('');
const [showSetPWDModal, setShowSetPWDModal] = useState(false);
const [showInviteModal, setShowInviteModal] = useState(false);
const [inviteNum, setinviteNum] = useState(0);
const [whoInvite, setWhoInvite] = useState('');
const [users, setUsers] = useState<string[]>([]);
// let  inviteNum = 0;
// let  whoInvite = '';
const updateUsers = useCallback((arr:string[])=>{
    console.log("users map ",arr);
    setUsers((arr)=>[...arr.map((str)=>{
      return str})]);
},[socket,setUsers, users])

useEffect(()=>{
  socket?.on("roomInfo", (arr:string[]) => updateUsers(arr))
},[socket])

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
    console.log(e.target.value,"send");
    // console.log(ChatRoom,"send");
    // console.log(msgInfo.msg,msgInfo.room, msgInfo.user);
    // setMsgInfo({
    //     user: "hyopark",
    //     room: ChatRoom,
    //     msg: e.target.msg.value,
    // }
    // )
    // console.log(msgInfo.msg,msgInfo.room, msgInfo.user);
    console.log (e.target)
    socket?.emit("newMsg", {
      user: "tester_hyopark",//백엔
      room: ChatRoom,
      msg: e.target.value,
  }, );
  setMyMsg(e.target.value);
  e.target.value = "";
  },[socket]);

  const retrunChannel = useCallback(()=>{
    console.log("on retrunChannel")
    setReturnFlag((flag)=>true);
  },[])
  
  const redirectChannel = useCallback((Obj:{roomName:string,roomType:string })=>{
    console.log("on redirectChannel", Obj)
    if (Obj.roomType == "Dm")
      setRedirectFlag(`/workspace/sleact/channel/Chat/${Obj.roomName}`);
    else if (Obj.roomType == "Game")
      setRedirectFlag(`/workspace/sleact/channel/Game/${Obj.roomName}`);
  },[setRedirectFlag])
    
  useEffect(() => {
    socket?.on("newMsg", (msg:any) => handleReceiveMessage(msg) );
  }, [socket, handleReceiveMessage]);
  
  useEffect(() => {
    console.log("kicked!");
    socket?.on("kicked", retrunChannel);
  }, [socket, retrunChannel, returnFlag]);
  
  useEffect(() => {
    console.log("joinedRoom!");
    socket?.on("joinedRoom", (Obj:{roomName:string,roomType:string }) => {
      console.log("on redirectChannel", Obj)
    if (Obj.roomType == "Dm")
      setRedirectFlag(`/workspace/sleact/channel/Dm/${Obj.roomName}`);
    else if (Obj.roomType == "Game")
      setRedirectFlag(`/workspace/sleact/channel/Game/${Obj.roomName}`);
    });
  }, [socket, redirectChannel, redirectFlag]);
  
  // useEffect(() => {
  //   console.log("shellWeDm!");
  //   socket?.on("shellWeDm", (inviteObj : {sendIntraId:string,  recvIntraId:string})=> {{
  //     console.log("in getInvite",inviteObj );
  //     console.log("ret1:", inviteNum, whoInvite);
  //     // setinviteNum(1);}
  //     setinviteNum((n) => {return 1});
  //     // inviteNum = 1;
  //     console.log("ret2:", inviteNum, whoInvite);
  //     // setWhoInvite( inviteObj.sendIntraId );
  //     setWhoInvite((s) => {return inviteObj.sendIntraId });
  //     // whoInvite=inviteObj.sendIntraId;
  //     console.log("ret3:", inviteNum, whoInvite);
  //     setShowInviteModal(true);
  //     console.log("ret4:", inviteNum, whoInvite);
  //   }});
  // }, [socket]);
  
//   const test = useCallback((inviteObj : {sendIntraId:string,  recvIntraId:string}) => {
    
//     console.log("in getInvite",inviteObj );
//     console.log("ret1:", inviteNum, whoInvite);
//     // setinviteNum(1);}
//     setinviteNum((n) => {return 1});
//     // inviteNum = 1;
//     console.log("ret2:", inviteNum, whoInvite);
//     // setWhoInvite( inviteObj.sendIntraId );
//     setWhoInvite((s) => {return inviteObj.sendIntraId });
//     // whoInvite=inviteObj.sendIntraId;
//     console.log("ret3:", inviteNum, whoInvite);
//     setShowInviteModal(true);
//     console.log("ret4:", inviteNum, whoInvite);
// },
//   [ ]
// );
  
  // useEffect(() => {
  //   console.log("shellWeDm!");
  //   socket?.on("shellWeDm", (inviteObj : {sendIntraId:string,  recvIntraId:string})=> test(inviteObj));
  // }, [socket]);



const leaveRoom = useCallback(()=>{
  // useEffect(() => {
    socket?.emit("leaveRoom", {room:ChatRoom}, retrunChannel);
  // }, [socket]);
},[]);

const setPWD = useCallback(()=>{
  setShowSetPWDModal(true);
  // useEffect(() => {
    // socket?.emit("setPWD", {room:ChatRoom},retrunChannel);
    
  // }, [socket]);
},[]);



//////test////////


const onCloseModal = useCallback(() => {
  setShowSetPWDModal(false);
}, []);

const chatData = messages;// socket?.emit("getRoomInfo")

const chatSections = makeSection(messages ? ([] as any[]).concat(...messages).reverse() : []);

const onSubmitForm = useCallback(
  (e:any) => {
    e.preventDefault();
    if (chat?.trim() && chatData) {
      const savedChat = chat;
        // localStorage.setItem(`${workspace}-${channel}`, new Date().getTime().toString());
        console.log ("chat!!!!!", chat);
        socket?.emit("newMsg", {
          user: "tester_hyopark",
          room: ChatRoom,
          msg: chat,
      }, );
      setMyMsg(chat);
        setChat('');
        if (scrollbarRef.current) {
          console.log('scrollToBottom!', scrollbarRef.current?.getValues());
          scrollbarRef.current.scrollToBottom();
        }
    }
  },
  [chat,  chatData, setChat],
);

const onDrop = useCallback(
  (e:any) => {
    e.preventDefault();
    console.log(e);
    const formData = new FormData();
    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile();
          console.log('... file[' + i + '].name = ' + file.name);
          formData.append('image', file);
        }
      }
    } else {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
        formData.append('image', e.dataTransfer.files[i]);
      }
    }
  },
  [],
);

const onDragOver = useCallback((e:any) => {
  e.preventDefault();
  console.log(e);
  setDragOver(true);
}, []);

if (returnFlag)
{
  return ( <Redirect to= {`/workspace/sleact/channel/Chat`}/>);
}
else if (redirectFlag)
{
  return ( <Redirect to= {redirectFlag}/>);
}

  return (
  <div>
  <Container onDrop={onDrop} onDragOver={onDragOver}>
      <Header>
        <img src="" />
        <span>{ChatRoom} 방 </span>
        {users.map((user, index) => {
          return (
            <EachMsg key={user} msg={{msg: 'asdasdasd', name:user, img: ""}} roomName={ChatRoom!} ></EachMsg>
          );
        })}
        <button onClick ={leaveRoom}>leaveRoom</button>
        <button onClick ={setPWD}>setPWD</button>
      </Header>
      {/* <ChatList
        scrollbarRef={scrollbarRef}
        isReachingEnd={isReachingEnd}
        isEmpty={isEmpty}
        chatSections={chatSections}
        // setSize={setSize}
      /> */}
      {/* <div id="smooth-scroll"> */}
      <Scrollbars>
        
       {messages.map((message, index) => {
          const { room, user, msg } = message;
          // messages 배열을 map함수로 돌려 각 원소마다 item을 렌더링 해줍니다.
          return (
            <EachMsg key={room} msg={{msg: msg, name:user, img: ""}} roomName={ChatRoom!} ></EachMsg>
          );
        })}
        </Scrollbars>
      {/* </div > */}
      <ChatBox
        onSubmitForm={onSubmitForm}
        chat={chat}
        onChangeChat={onChangeChat}
        placeholder={`Message #${ChatRoom}`}
        data={[{id:12 ,nickname:"방에있는 멤버들 정보 넣을곳"}]}
      />
      {dragOver && <DragOver>업로드!</DragOver>}
    </Container>
    
    <SetPWDModal
      show={showSetPWDModal}
      onCloseModal={onCloseModal}
      setShowSetPWDModal={setShowSetPWDModal}
      roomInfo={ChatRoom!}
    />
    <InviteModal
      show={showInviteModal}
      onCloseModal={onCloseModal}
      setShowInviteModal={setShowInviteModal}
      roomInfo={ChatRoom!}
      // inviteNum={0}
      // whoInvite={""}
    />
    </div>
  );
}

//setPew emit {roomName : string, pw:string ,gottaPublic: boolean }

export default ChatRoom;
