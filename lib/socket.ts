import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initSocket = () => {
  if (!socket) {
    // Para desarrollo local
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3003', {
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socket.on('connect', () => {
      console.log('✅ Conectado al servidor WebSocket');
    });

    socket.on('disconnect', () => {
      console.log('❌ Desconectado del servidor WebSocket');
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};


