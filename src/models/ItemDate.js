const mongoose = require("mongoose");

const { Schema } = mongoose;

const ItemDateSchema = new Schema({
  receivedAt: {
    type: Schema.Types.Date,
    required: true,
  },
  returnAt: {
    type: Schema.Types.Date,
    required: true,
  },
});

const ItemDate = mongoose.model("ItemDate", ItemDateSchema);

module.exports = ItemDate;
