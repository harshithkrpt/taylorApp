const mongoose = require("mongoose");

const { Schema } = mongoose;

const ItemSchema = new Schema({
  title: {
    unique: true,
    type: String,
  },
  description: {
    type: String,
  },
  imageUrl: [
    {
      type: String,
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  itemDateId: {
    type: Schema.Types.ObjectId,
    ref: "ItemDate",
  },
  itemTypeId: {
    type: Schema.Types.ObjectId,
    ref: "ItemType",
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "Owner",
  },
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
