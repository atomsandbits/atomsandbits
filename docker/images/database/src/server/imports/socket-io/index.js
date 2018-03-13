import logger from '/both/imports/logger';
import http from 'http';
import socketIO from 'socket.io';

const PORT = 8080;

// Server
const server = http.createServer();
const io = socketIO(server);

// New client
io.on('connection', socket => {
  logger.silly('socket: new client...', socket.handshake.query);
  const { serverId } = socket.handshake.query;
  const { program } = socket.handshake.query;
  if (serverId) {
    if (program) {
      socket.join(`${serverId}-${program}`);
    } else {
      logger.warn(
        'serverId and no program defined on connection...',
        socket.handshake.query,
      );
    }
  }
});

// Start server
try {
  server.listen(PORT);
} catch (e) {
  logger.error(e);
}

export { io };
export default io;
