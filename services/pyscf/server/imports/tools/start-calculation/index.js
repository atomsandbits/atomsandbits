import { socket } from '/server/imports/socket';

// TODO: Fix the race-condition where calculationRunning isn't changed, but
// a second calculation is received
// Moving calculationRunning = true outside of callback will lead to all
// instances trying for same calculation and ignore other subsequent calcs
// until callback
const startCalculation = ({ calculationId }) => {
  return new Promise((resolve, reject) => {
    socket.emit('setCalculationRunning', { calculationId }, (error, result) => {
      if (error) throw error;
      if (result.updated) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

export { startCalculation };
export default startCalculation;
