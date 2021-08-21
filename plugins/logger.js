/**
 * Initialize logger
 */
const pino = require("pino")({
  level: "info",
  prettyPrint: { colorize: true },
});

module.exports = {
  log: pino,
};
