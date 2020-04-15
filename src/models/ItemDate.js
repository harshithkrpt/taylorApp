const mongoose = require("mongoose");

const {
  Schema
} = mongoose;

const ItemDateSchema = new Schema({
  receivedDate: {
    type: Schema.Types.Date,
    required: true,
  },
  returnDate: {
    type: Schema.Types.Date,
    required: true,
  },
});

const ItemDate = mongoose.model("ItemDate", ItemDateSchema);

module.exports = ItemDate;