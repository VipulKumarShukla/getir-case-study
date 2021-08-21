const { ERROR_CODE, ERROR_MSG } = require("./constants");

/**
 * Define Errors and response structure
 * @param {*} error
 * @returns {
 *    code: string
 *    msg: string
 *    records: [{}]
 * }
 */
const validationErr = (error) => ({
  code: ERROR_CODE.VALIDATION_ERROR,
  msg: ERROR_MSG.VALIDATION_ERROR,
  records: [],
  error,
});

const internalServerErr = (error) => ({
  code: ERROR_CODE.INTERNAL_SERVER_ERROR,
  msg: ERROR_MSG.INTERNAL_SERVER_ERROR,
  records: [],
  error,
});

const successRes = (records = []) => ({
  code: ERROR_CODE.SUCCESS,
  msg: ERROR_MSG.SUCCESS,
  records,
});

const notFoundErr = () => ({
  code: ERROR_CODE.NOT_FOUND,
  msg: ERROR_MSG.NOT_FOUND,
});

module.exports = {
  validationErr,
  internalServerErr,
  successRes,
  notFoundErr,
};
