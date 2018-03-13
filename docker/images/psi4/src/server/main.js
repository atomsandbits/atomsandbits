import '/server/imports/config';

import { socket } from './imports/socket';

import { startCalculation } from './imports/tools/start-calculation';
import { runCalculation } from './imports/tools/run-calculation';

let calculationRunning = false;

socket.on('runCalculation', async ({ calculation }) => {
  console.log(`Received: Calculation #${calculation._id}...`);
  // console.log(calculation);
  const calculationId = calculation._id;
  const calculationStarted = await startCalculation({calculationId});
  if (!calculationStarted) return;
  calculationRunning = true;
  console.log(`Started: Calculation #${calculation._id}...`);
  try {
    runCalculation(calculation);
  } catch (error) {
    calculationRunning = false;
    throw error;
  }
});
