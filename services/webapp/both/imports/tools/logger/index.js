import winston from 'winston';

const logger = new winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
      timestamp: true
    }),
  ]
});

export default logger;
