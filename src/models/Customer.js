const mongoose = require("mongoose");

const { Schema } = mongoose;

const CustomerSchema = new Schema({
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
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

CustomerSchema.index({ name: "text" });

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
