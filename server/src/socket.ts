import { Server, Socket } from 'socket.io';
import logger from './utils/logger';

import { addUser, rooms, users } from './utils/addUser';

function socket({ io }: { io: Server }) {
  logger.info(`Sockets enabled`);

  io.on('connection', (socket: Socket) => {
    logger.info(`User connected ${socket.id}`);

    socket.on('join', ({ name, roomId, host }, cb) => {
      const errObj = addUser({ name, roomId, socketId: socket.id });
      if (host) {
        io.to(socket.id).emit('host', {});
      }
      if (errObj && errObj.error) return cb(errObj.error);
      socket.join(roomId);
      io.to(socket.id).emit('name', name);
      io.in(roomId).emit('members', rooms[roomId], roomId);
    });

    socket.on('sendMessage', (message) => {
      const tempUser = users[socket.id];

      io.in(tempUser.roomId).emit('message', {
        user: tempUser,
        text: message,
      });
    });
  });
}

export default socket;
