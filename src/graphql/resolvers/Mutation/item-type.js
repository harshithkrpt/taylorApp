const ItemType = require("../../../models/ItemType");

const itemTypeMutation = {
  addItemType: async (_, { itemTypeInput }, { req }) => {
    if (!req.isAuth) {
      return null;
    }
    // Check If Name Exists
    const itemType = await ItemType.findOne({
      name: itemTypeInput.name,
    });
    if (itemType) {
      throw new Error("Item Type Already Exists");
    }
    try {
      await new ItemType({
        ...itemTypeInput,
      }).save();
      return true;
    } catch {
      return false;
    }
  },
  updateItemType: async (_, { _id, itemTypeInput }, { req }) => {
    if (!req.isAuth) {
      return null;
    }
    try {
      await ItemType.findByIdAndUpdate({ _id }, itemTypeInput);
      return true;
    } catch (e) {
      return false;
    }
  },
};

module.exports = {
  itemTypeMutation,
};
