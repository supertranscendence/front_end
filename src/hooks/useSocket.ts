import { useCallback } from 'react';
import { io, Socket } from 'socket.io-client'

// const backUrl = 'https://server.gilee.click/api/socket';
const backUrl = 'http://127.0.0.1:3000/api/socket';

import useSWR from 'swr';
import authfetcher from 'src/utils/authfetcher';
import axios from 'axios'

const sockets: { [key: string]: Socket } = {};
const useSocket = (workspace?: string): [Socket | undefined, () => void] => {
  console.log("useSocket call");
  
  // const {data, mutate} = useSWR('token', authfetcher ,{
  //   // dedupingInterval:100000
  // });
  
    
  
  const disconnect = useCallback(() => {
    if (workspace && sockets[workspace]) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);
  if (!workspace) {
    return [undefined, disconnect];
  }
  
  if (!sockets[workspace]) {
    let act;
    
    axios.get("http://localhost:3000/api/auth/ft/refresh", {
    withCredentials:true,
    headers:{
      authorization: 'Bearer ' + localStorage.getItem(" refreshToken"),
      accept: "*/*"
    }
    }).then((response) =>{
      console.log("data!!!!",response.data.act);
      act = response.data.act;
      console.log("auth token:", 'Bearer ' + act);
    sockets[workspace] = io(`${backUrl}`, {
      transports: ['websocket'],
      auth: {
        token:'Bearer '+ act,
        authorization:'Bearer '+ act
      },
      extraHeaders: {
        authorization: 'Bearer ' + act,
     }
    });
    }).catch((err) => console.log(err));
    console.info('create socket', workspace, sockets[workspace]);
  }

  return [sockets[workspace], disconnect];
};

export default useSocket;
