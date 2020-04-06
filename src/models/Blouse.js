const mongoose = require("mongoose");

const BlouseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
    pictureUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blouse", BlouseSchema);
