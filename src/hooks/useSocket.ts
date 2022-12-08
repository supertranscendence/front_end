import { useCallback } from 'react';
import { io, Socket } from 'socket.io-client'

const backUrl = 'https://gilee.click';

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
      extraHeaders: {
     "Sec-WebSocket-Protocol": chat, superchat
  }
    });
    console.info('create socket', workspace, sockets[workspace]);
  }

  return [sockets[workspace], disconnect];
};

export default useSocket;
