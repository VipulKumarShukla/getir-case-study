const express = require("express");

const validateSchema = require("../../middlewares/validate");
const { getRecordsSchema } = require("../../validator");
const { getRecordLists } = require("../../controllers/v1/records");

const router = express.Router();

/**
 * routes initialize
 */
router.post("/get-records", validateSchema(getRecordsSchema), getRecordLists);

module.exports = router;
