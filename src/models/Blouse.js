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
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blouse", BlouseSchema);
