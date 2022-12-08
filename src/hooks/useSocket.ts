import { useCallback } from 'react';
import { io, Socket } from 'socket.io-client'

const backUrl = 'https://server.gilee.click/api/socket';

import useSWR from 'swr';
import authfetcher from 'src/utils/authfetcher';

const sockets: { [key: string]: Socket } = {};
const useSocket = (workspace?: string): [Socket | undefined, () => void] => {
  const {data, mutate} = useSWR('token', authfetcher ,{
    dedupingInterval:100000
  });
  
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
    console.log("auth token:", 'Bearer ' + data);
    sockets[workspace] = io(`${backUrl}`, {
      transports: ['websocket'],
      extraHeaders: {
        authorization: 'Bearer ' + data,
        // "Sec-WebSocket-Protocol": "chat",
    //     "test": "chat",
    //     "tetet": "chat",
     }
    });
    console.info('create socket', workspace, sockets[workspace]);
  }

  return [sockets[workspace], disconnect];
};

export default useSocket;
