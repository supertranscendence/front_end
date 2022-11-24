const SocketIO = require("socket.io");

const onlineMap = {};
module.exports = (server, app) => {

  const putChatRoomInfo = () =>{
    
  };
  function publicRooms(socket) {
    // const {
    //   sockets: {
    //     adapter:{sids, rooms},
    //     }, 
    //   } = io;
      const sids = socket.adapter.sids;
      const rooms = socket.adapter.rooms;
    const publicRoom = [];
    console.log("rorororoorooom~~" ,rooms);
    rooms.forEach((_,key)=>{
      if (sids.get(key) === undefined){
        publicRoom.push(key)
      }
    });
    return publicRoom;
  }
  
  const io = SocketIO(server, {
    path: "/socket.io",
  });
  app.set("io", io);
  app.set("onlineMap", onlineMap);
  const dynamicNsp = io.of(/^\/ws-.+$/).on("connect", (socket) => {
    console.log("noamlll",io.of(/^\/ws-.+$/));
    const newNamespace = socket.nsp; // newNamespace.name === '/dynamic-101'
    if (!onlineMap[socket.nsp.name]) {
      onlineMap[socket.nsp.name] = {};
    }
    
    console.log(io.sockets.adapter);
    socket.on("getChatRoomInfo",(sr, fx) =>{
      fx(publicRooms(socket));
    });
    
    socket.on("getChatRoomInfoSWR",(sr, fx) =>{
      console.log("callling");
      fx(publicRooms(socket));
    });
    

    
    socket.on("create-room", (room,fx) => {
      console.log("callll!");
      socket.join(room);
      console.log(publicRooms(socket).length);
      fx();
      socket.emit("new-room-created");
    });
    
    socket.on("login", ({ id, channels }) => {
      onlineMap[socket.nsp.name][socket.id] = id;
      newNamespace.emit(
        "onlineList",
        Object.values(onlineMap[socket.nsp.name])
      );
      channels.forEach((channel) => {
        socket.join(`${socket.nsp.name}-${channel}`);
      });
    });
    socket.on("disconnect", () => {
      delete onlineMap[socket.nsp.name][socket.id];
      newNamespace.emit(
        "onlineList",
        Object.values(onlineMap[socket.nsp.name])
      );
    });
  });
};