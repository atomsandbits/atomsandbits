import { socket } from '/server/imports/socket';

const pinger = {
  start: ({ calculationId }) => {
    clearInterval(pinger.interval);
    pinger.interval = setInterval(() => {
      socket.emit(
        'pingCalculationRunning',
        { calculationId },
        (error, result) => {
          if (error) throw error;
        }
      );
    }, 1000);
  },
  stop: () => {
    clearInterval(pinger.interval);
  },
  interval: null,
};

export { pinger };
export default pinger;
