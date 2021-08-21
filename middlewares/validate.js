const Joi = require("@hapi/joi");
const httpStatus = require("http-status");

const { pick } = require("../utilities/helper");
const { validationErr } = require("../utilities/error/handler");

/**
 * compares request with schema
 * @param {*} schema
 * @returns validationErr || next()
 */
const validateSchema = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  if (error) {
    let errorMessage = error.message;

    errorMessage =
      error.details &&
      error.details.map((details) => details.message).join(", ");

    return res
      .status(httpStatus.BAD_REQUEST)
      .send(validationErr(errorMessage));
  }

  Object.assign(req, value);
  return next();
};

module.exports = validateSchema;
