const mongoose = require("mongoose");

const { Schema } = mongoose;

/**
 * Define records model
 */

const Records = mongoose.model(
  "Records",
  new Schema({
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    counts: {
      type: [Number],
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  })
);

module.exports = Records;
