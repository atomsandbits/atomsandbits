import { Meteor } from 'meteor/meteor';
import socketIOClient from 'socket.io-client';
import '/server/imports/config';

import { runCalculation } from './imports/tools/run-calculation';

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
socket.on('runCalculation', ({ calculation }) => {
  console.log(`Psi4 Received: Calculation #${calculation._id}...`);
  // console.log(calculation);
  runCalculation(calculation);
});
