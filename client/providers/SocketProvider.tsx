import { useRouter } from 'next/router';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

export const socket = io('http://localhost:4000', {
  transports: ['websocket', 'polling'],
});

interface Context {
  socket: Socket;
  members: [];
  roomId: string;
  messages: [];
  name: string;
}

export const SocketContext = createContext<Context>({
  socket,
  members: [],
  roomId: '',
  messages: [],
  name: '',
});

function SocketsProvider(props: any) {
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [roomId, setRoomId] = useState();
  const [name, setName] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (!roomId) router.push('/');

    socket.on('members', (members, roomId) => {
      setMembers(members);
      setRoomId(roomId);
    });

    socket.on('message', (message: string) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('name', (name: string) => {
      setName(name);
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        members,
        roomId,
        messages,
        name,
      }}
      {...props}
    />
  );
}

export default SocketsProvider;

export const useSockets = () => useContext(SocketContext);
