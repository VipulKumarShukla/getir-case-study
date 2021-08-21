const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));

/**
 * Define Request Schema
 */

const getRecordsSchema = {
  body: Joi.object().keys({
    startDate: Joi.date().format("YYYY-MM-DD").raw().required(),
    endDate: Joi.date()
      .format("YYYY-MM-DD")
      .raw()
      .greater(Joi.ref("startDate"))
      .required(),
    minCount: Joi.number().strict().min(0).required(),
    maxCount: Joi.number()
      .strict()
      .min(0)
      .greater(Joi.ref("minCount"))
      .required(),
  }),
};

module.exports = {
  getRecordsSchema,
};
