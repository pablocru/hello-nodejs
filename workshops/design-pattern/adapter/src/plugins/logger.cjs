const winston = require("winston");
const { combine, timestamp, prettyPrint } = winston.format;
const { resolve } = require("path");

/**
 * @param {string} filename
 */
function createLogPath(filename) {
  /*
    `process.argv[1]` = path of the entrypoint, the file passed as an argument for node:

    ```bash
    node src/app.js
    ```

    Using `process.argv[1]` instead of `__dirname` ensures the path is correctly resolved
    even with relative paths or different working directories.
  */
  return resolve(process.argv[1], "../../logs", filename);
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

/**
 * @param {string} service
 */
function configureLogger(service) {
  return {
    log: (message) => {
      logger.log("info", message, { service });
    },
    error: (message) => {
      logger.log("error", message, { service });
    },
  };
}

module.exports = { configureLogger };
