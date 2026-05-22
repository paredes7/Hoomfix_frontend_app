import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { API_URL } from '../config';
import { getAccessToken } from '../storage/authStorage';

export function useSocket(userId: string | null | undefined) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    let disposed = false;
    let localSocket: Socket | null = null;

    void (async () => {
      const token = await getAccessToken();
      if (disposed || !token) return;

      const socket = io(API_URL, {
        transports: ['websocket'],
        auth: { token },
      });
      localSocket = socket;
      socketRef.current = socket;

      socket.on('connect', () => {
        socket.emit('register', { userId, token });
      });
    })();

    return () => {
      disposed = true;
      localSocket?.disconnect();
      socketRef.current = null;
    };
  }, [userId]);

  return { socketRef };
}
