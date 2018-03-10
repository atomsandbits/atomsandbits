/* eslint-env mocha */
import 'mocha';
import { expect } from 'chai';
// import { resetDatabase } from 'meteor/xolvio:cleaner';
// import { createTestData } from '/test/imports/create-data'; // Generate Test Data
// import { createCalculationResults } from '/test/imports/create-calculation-results';
// import './save-calculation-results'; // Load SocketIO Server
//
describe('api', () => {
//   beforeEach(() => {
//     resetDatabase();
//   });
//   describe('Run Calculations', () => {
//     it('should emit calculations to the serverId', done => {
//       console.log(createTestData);
//       const testVar = 'test';
//       createTestData();
//       expect(testVar).to.equal('test');
//       done();
//     });
//   });
//   describe('Save Calculation Results', () => {
//     it('should save calculations', done => {
//       const PORT = 8080;
//       const ROOT_URL = 'http://localhost';
//       const socket = require('socket.io-client')(`${ROOT_URL}:${PORT}`, {
//         transports: ['websocket', 'polling'],
//       });
//       createTestData();
//       createCalculationResults();
//       socket.emit('saveCalculationResults', {
//         results: [
//           {
//             _id: 'abc123',
//             geometries: ['H 0 0 0', 'H 0 0 1.1', 'H 0 0 1.2'],
//             energies: [5.111, 5.112, 5.113],
//           },
//           {
//             _id: 'abc124',
//             energy: 5.111,
//             force: [[3, 2, 1], [4, 3, 2]],
//           },
//         ],
//       });
//       socket.on('calculationResultsSaved', done);
//     });
//   });
});
