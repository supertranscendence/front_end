import { useCallback } from 'react';
import { io, Socket } from 'socket.io-client'

const backUrl = process.env.REACT_APP_API_URL + '/api/socket';


const sockets: { [key: string]: Socket } = {};
const useSocket = (workspace?: string): [Socket | undefined, () => void] => {

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
    sockets[workspace] = io(`${backUrl}`, {
      transports: ['websocket'],
      auth: {
        token:'Bearer '+ localStorage.getItem("accessToken"),
        authorization:'Bearer '+ localStorage.getItem("accessToken")
      },
      extraHeaders: {
        authorization: 'Bearer ' + localStorage.getItem("accessToken"),
     }
    });
    console.info('create socket', workspace, sockets[workspace]);
  }

  return [sockets[workspace], disconnect];
};

export default useSocket;
