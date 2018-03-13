import socketIOClient from 'socket.io-client';

const PORT = 8080;
const ROOT_URL = 'http://localhost';
const serverId = 'free';
const program = 'psi4';

const socket = socketIOClient(`${ROOT_URL}:${PORT}`, {
  transports: ['websocket', 'polling'],
  query: {
    program,
    serverId,
  },
});

export { socket }
export default socket;
