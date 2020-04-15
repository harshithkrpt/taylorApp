const mongoose = require("mongoose");

const {
  Schema
} = mongoose;

const ItemTypeSchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
  },
});

const ItemType = mongoose.model("ItemType", ItemTypeSchema);

module.exports = ItemType;