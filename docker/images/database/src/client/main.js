import { Meteor } from 'meteor/meteor';
// import Response from 'meteor-node-stubs/node_modules/http-browserify/lib/response';
//
// if (!Response.prototype.setEncoding) {
//   Response.prototype.setEncoding = (encoding) => {
//     // do nothing
//   };
// }

Meteor.startup(() => {
  console.log('test');
});

// Hack https://github.com/socketio/socket.io-client/issues/961
// import Response from 'meteor-node-stubs/node_modules/http-browserify/lib/response';
// if (!Response.prototype.setEncoding) {
//   Response.prototype.setEncoding = function(encoding) {
//      do nothing
//   }
// }

// Socket io client
// const PORT = 8080;
// const ROOT_URL = 'http://localhost';
// const socket = require('socket.io-client')(`${ROOT_URL}:${PORT}`, {
//   query: {
//     program: 'tensormol'
//   }
// });
//
// socket.on('connect', () => {
//   console.log('Client connected');
// });
// socket.on('disconnect', () => {
//   console.log('Client disconnected');
// });
// socket.on('hello world', (data) => {
//   console.log('hello world received', data);
// })
//
// setInterval(() => {
//   socket.emit('saveCalculationResults', [
//     {
//       blah: 'rar'
//     }
//   ]);
// }, 2000);
