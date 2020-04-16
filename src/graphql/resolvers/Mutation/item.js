const Item = require("../../../models/Item");

const itemMutation = {
  addItem: async (_, { itemInput }, { req }) => {
    if (!req.isAuth) {
      return null;
    }
    try {
      let item = await Item.findOne({ title: itemInput.title });
      if (item) {
        throw new Error("Item Already Exists");
      }
      await new Item({ ...itemInput }).save();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  updateItem: async (_, { _id, itemInput }, { req }) => {
    if (!req.isAuth) {
      return null;
    }
    try {
      await Item.findByIdAndUpdate({ _id }, { ...itemInput });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};

module.exports = {
  itemMutation,
};
