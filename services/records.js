const logger = require("../plugins/logger");
const Records = require("../models/records");

/**
 *
 * @param {*} param0
 * @returns records from db [{}]
 */
exports.fetchRecords = async ({ startDate, endDate, minCount, maxCount }) => {
  try {
    return await Records.aggregate([
      {
        $project: {
          key: 1,
          createdAt: 1,
          totalCount: { $sum: "$counts" },
          _id: 0,
        },
      },
      {
        $match: {
          /**
           * totalCount- in this we are including boundry value of minCount and maxCount
           * createdAt- In this at endDate we have used $lt so as to include get record of same date
           */
          createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) },
          totalCount: { $gte: minCount, $lte: maxCount },
        },
      },
    ]);
  } catch (err) {
    logger.log.error(`Error Occurred! ,${err}`);
    throw err;
  }
};
