export let rooms = new Array();
export let users = new Array();
let nameToSocketId = new Array();

type AddUserProps = {
  name: string;
  roomId: string;
  socketId: string;
};

export const addUser = ({ name, roomId, socketId }: AddUserProps) => {
  if (rooms[roomId] && rooms[roomId].includes(name)) {
    return { error: 'Username is taken' };
  }
  if (rooms[roomId] && rooms[roomId].length === 4)
    return { error: 'Room is full' };
  if (!!rooms[roomId]) {
    rooms[roomId].push(name);
  } else {
    rooms[roomId] = [name];
  }
  users[socketId] = { name, roomId };
  nameToSocketId[name] = socketId;
};
