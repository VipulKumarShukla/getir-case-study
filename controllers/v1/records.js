const httpStatus = require("http-status");
const logger = require("../../plugins/logger");

const {
  internalServerErr,
  successRes,
} = require("../../utilities/error/handler");
const { fetchRecords } = require("../../services/records");

/**
 * Fetch Records lists based on filter
 * @param {*} req
 * @param {*} res -{
 *      code : String
 *      msg : String
 *      records : Array
 *     }
 */
exports.getRecordLists = async (req, res) => {
  try {
    const recordsData = await fetchRecords(req.body);
    return res.status(httpStatus.OK).send(successRes(recordsData));
  } catch (err) {
    logger.log.error(`Internal Server Error ${err}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(internalServerErr(err));
  }
};
