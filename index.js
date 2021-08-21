require("dotenv").config();
const app = require("./app");
const mongoose = require("./plugins/mongo");

const {
  port,
  mongoose: { url, options },
} = require("./config");

const logger = require("./plugins/logger");

/**
 * Start the server on Defined port
 */

const server = app.listen(port, async () => {
  logger.log.info(`Express App Listening on PORT : ${port}`);
  await mongoose.connect(url, options);
});

/**
 * listen to exception events
 */
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.log.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.log.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

/**
 * Gracefuly close server
 */
process.on("SIGTERM", () => {
  logger.log.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
