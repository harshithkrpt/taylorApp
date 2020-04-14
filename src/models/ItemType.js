const mongoose = require("mongoose");

const { Schema } = mongoose;

const ItemTypeSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  price: {
    type: Float32Array,
    required: true,
  },
});

const ItemType = mongoose.model("ItemType", ItemTypeSchema);

module.exports = ItemType;
