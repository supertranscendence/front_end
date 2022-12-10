
import React,{ useState, useCallback, useEffect, useContext, useRef } from "react";
import useSocket from 'src/hooks/useSocket';
import { ChatArea } from "@components/ChatBox/styles";
import { userInfo } from "os";
import { Link, Redirect, Switch, Route, useParams } from 'react-router-dom';

const ChatRoom = () => {

  const { ChatRoom } = useParams<{ ChatRoom?: string }>();
  const [socket] = useSocket("sleact");
  const [returnFlag, setReturnFlag] = useState(false);
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
      user: "tester_hyopark",
      room: ChatRoom,
      msg: e.target.msg.value,
  }, );
  setMyMsg(e.target.msg.value);
  e.target.msg.value = "";
  },[socket]);

  useEffect(() => {
    socket?.on("newMsg", (msg:any) => handleReceiveMessage(msg) );
  }, [socket, handleReceiveMessage]);


const retrunChannel = useCallback(()=>{
  setReturnFlag((flag)=>true);
},[])
const leaveRoom = useCallback(()=>{
  // useEffect(() => {
    socket?.emit("leaveRoom", {room:ChatRoom},retrunChannel);
  // }, [socket]);
},[]);
if (returnFlag)
{
  return ( <Redirect to= {`/workspace/sleact/channel/Chat`}/>);
}

  return (
    <div className="d-flex flex-column" style={{ width: 1000 }}>
      <div className="text-box">
        <span>{}</span> 님 환영합니다!!
      </div>
      <div
        className="chat-window card"
        ref={chatWindow}
      >
      <div>ChatRoom: {ChatRoom}
     <form onSubmit={sendMsg}>
     <input
       name="msg"
       placeholder="메세지 입력해보슈"
       // onChange={onChangeAccount}
     />
       <button>보내버리기</button>
       <button onClick={leaveRoom}>나가볼끼?</button>
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
