const mongoose = require("mongoose");
const logger = require("./logger");

/**
 * Create MongoDB Connection
 * @param {*} url
 * @param {*} options
 */
const connect = async (url, options) => {
  try {
    await mongoose.connect(`${url}`, options);
    logger.log.info(`Connected to MongoDB`);
  } catch (err) {
    /* istanbul ignore next */
    logger.log.error(`Error in Connecting Mongo DB - \n Err : ${err}`);
  }
};

const disconnect = () => {
  return mongoose.disconnect();
};
module.exports = {
  connect,
  disconnect,
};
