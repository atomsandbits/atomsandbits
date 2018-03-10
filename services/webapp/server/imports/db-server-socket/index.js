import { Meteor } from 'meteor/meteor';
import socketIOClient from 'socket.io-client';

const PORT = 8080;
const ROOT_URL = 'http://localhost';

const socket = socketIOClient(`${ROOT_URL}:${PORT}`, {
  transports: ['websocket', 'polling'],
  query: {
    service: 'webapp',
  },
  forceNew: true,
});

export { socket };
export default { socket };
