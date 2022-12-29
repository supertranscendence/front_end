import { dataUser } from 'src/typings/types';
import useSWR from 'swr';
import fetcher from 'src/utils/fetcher';
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


const [users, setUsers] = useState<string[]>([]);

const updateUsers = useCallback((userArr:string[])=>{
  console.log("users map ",userArr);
  setUsers((arr)=>[...userArr.map((str)=>{
    return str})]);
  },[socket,setUsers])
useEffect(()=>{
  socket?.emit("roomInfo", {roomName:ChatRoom}, (obj: {userArr : string[], joined:boolean}) =>{
  if (obj.joined ===false)
    setReturnFlag(true);
  else
    updateUsers(obj.userArr);
  })
},[])


useEffect(()=>{
  socket?.on("roomInfo", (userArr:string[]) => updateUsers(userArr))
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
    console.log("on!@!@#!@#");
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

const leaveRoom = useCallback(()=>{
  // useEffect(() => {
    socket?.emit("leaveRoom", {room:ChatRoom}, retrunChannel);
  // }, [socket]);
},[]);

const setPWD = useCallback(()=>{
  setShowSetPWDModal(true);
},[]);

const onCloseModal = useCallback(() => {
  setShowSetPWDModal(false);
  setShowInviteModal(false);
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
        <>
        {users.map((user, index) => {
          return (
            <>
            <EachMsg key={user} msg={{msg: '', name:user, avatar: ""}} roomName={ChatRoom!} ></EachMsg>
            </>
          );
        })}
        </>
        <button onClick ={leaveRoom}>leaveRoom</button>
        <button onClick ={setPWD}>setPWD</button>
      </Header>
      <Scrollbars>
       {messages.map((message, index) => {
          const { room, user, msg } = message;
          // messages 배열을 map함수로 돌려 각 원소마다 item을 렌더링 해줍니다.
          return (
            <EachMsg key={room} msg={{msg: msg, name:user, avatar: ""}} roomName={ChatRoom!} ></EachMsg>
          );
        })}
        </Scrollbars>
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
    />
    </div>
  );
}

export default ChatRoom;
