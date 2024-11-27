const winston = require("winston");
const { combine, timestamp, prettyPrint } = winston.format;
const { resolve } = require("path");

/**
 * @param {string} filename
 */
function createLogPath(filename) {
  return resolve(__dirname, "../../logs", filename);
}

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), prettyPrint()),
  transports: [
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new winston.transports.File({
      filename: createLogPath("error.log"),
      level: "error",
    }),
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    new winston.transports.File({ filename: createLogPath("combined.log") }),
  ],
});

module.exports = function configureLogger(service) {
  return {
    log: (message) => {
      logger.log("info", message, { service });
    },
    error: (message) => {
      logger.log("error", message, { service });
    },
  };
};
