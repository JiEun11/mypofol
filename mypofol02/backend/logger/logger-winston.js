const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const path = require('path');

//
// Severity(Log Level) : RFC5424
// error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
//

const { combine, timestamp, printf } = winston.format;
const logDirectory = path.join(path.dirname(require.main.filename), process.env.LOG_LOCATION);
const logFormat = printf(log => `${log.timestamp} ${log.level}: ${log.message}`);

const logger = winston.createLogger({
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    // log file for http level
    new winstonDaily({
      level: 'http',
      datePattern: 'YYYY-MM-DD',
      dirname: logDirectory,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true
    }),

    // log file for error level
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: path.join(logDirectory, 'error'),
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true
    })]
});

//
// if development profile, enable console transport 
//
process.env.NODE_ENV === 'development' && logger.add(new winston.transports.Console({
  level: 'http',
  format: winston.format.combine(winston.format.colorize({ all: true }), logFormat)
}));

exports.winstonLogger = logger;