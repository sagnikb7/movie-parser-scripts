/* eslint-disable no-shadow */
const { createLogger, format, transports } = require('winston');

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level.toUpperCase()}: ${message}`);

const logger = (l) => createLogger({
    transports: [
        new transports.Console(),
    ],
    format: combine(
        label({ label: l }),
        timestamp(),
        myFormat,
    ),
});

module.exports = logger;
