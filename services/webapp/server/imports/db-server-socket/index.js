import { Meteor } from 'meteor/meteor';
import socketIOClient from 'socket.io-client';

const DATABASE_URL = process.env.DATABASE_URL || 'http://localhost:8080';

const socket = socketIOClient(DATABASE_URL, {
  transports: ['websocket', 'polling'],
  query: {
    service: 'webapp',
  },
  forceNew: true,
});

export { socket };
export default { socket };
