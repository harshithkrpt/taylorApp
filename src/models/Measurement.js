const mongoose = require("mongoose");

const {
  Schema
} = mongoose;

const MeasurementSchema = new Schema({
  neckSize: {
    type: Number,
    required: true,
  },
  handSize: {
    type: Number,
    required: true,
  },
  waistSize: {
    type: Number,
    required: true,
  },
});

const Measurement = mongoose.model("Measurement", MeasurementSchema);

module.exports = Measurement;