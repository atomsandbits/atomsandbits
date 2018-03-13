import { Meteor } from 'meteor/meteor';
import winston from 'winston';

let level = 'silly';
if (Meteor.isTest) {
  level = 'debug';
}

const logger = winston.createLogger({
  level,
  // levels: winston.config.npm,
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
      timestamp: true,
    }),
  ],
});

export { logger };
export default logger;
