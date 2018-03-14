import socketIOClient from 'socket.io-client';

const DATABASE_URL = process.env.DATABASE_URL || 'http://localhost:8080';
const serverId = process.env.SERVER_ID || 'free';
const program = 'psi4';

const socket = socketIOClient(DATABASE_URL, {
  transports: ['websocket', 'polling'],
  query: {
    program,
    serverId,
  },
});

export { socket }
export default socket;
