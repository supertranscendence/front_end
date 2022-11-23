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
    // socket.onAny((event) => {
		// 	console.log(wsServer.sockets.adapter);
		// 	console.log(`Soket Event : ${event}`);
		// });
    const newNamespace = socket.nsp; // newNamespace.name === '/dynamic-101'
    if (!onlineMap[socket.nsp.name]) {
      onlineMap[socket.nsp.name] = {};
    }
    
    console.log(io.sockets.adapter);
    // console.log(io.socket.adapter);
    
    // console.log(wsServer.sockets.adapter);
    // broadcast to all clients in the given sub-namespace
    // socket.emit("hello", socket.nsp.name);
    socket.on("getChatRoomInfo",(sr, fx) =>{
      // console.log(publicRooms());
      fx(publicRooms(socket));
    });
    
    // socket.on("createRoom",(sr, done) =>{
    //   console.log("strartttttttttttt", sr.data);
    //   socket.join(sr.data);
    //   done();
    //   socket.to(sr.data).emit("helloRoom" , "hi");
    //   // console.log(publicRooms());
    //   // fx(publicRooms());
    // });
    
    socket.on("create-room", (room,fx) => {
      console.log("callll!");
      socket.join(room);
      // console.log("socket:::",socket);
      // console.log("io:::",io.sockets);
      // console.log("io room",io.sockets.rooms);
      // console.log("io room",io.sockets.room);
      // console.log("room",socket.rooms);
      // console.log(`room ${room} was created`);
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
