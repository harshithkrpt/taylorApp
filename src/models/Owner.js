const mongoose = require("mongoose");

const {
  Schema
} = mongoose;

const OwnerSchema = new Schema({
  measurementId: {
    type: Schema.Types.ObjectId,
    ref: "Measurement",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
  },
});

const Owner = mongoose.model("Owner", OwnerSchema);

module.exports = Owner;