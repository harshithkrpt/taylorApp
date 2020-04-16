const ItemDate = require("../../../models/ItemDate");

const itemDateMutation = {
  addItemDate: async (_, args, { req }) => {
    if (!req.isAuth) {
      return null;
    }
    const receivedDate = new Date(args.receivedDate);
    const returnDate = new Date(args.returnDate);
    try {
      if (receivedDate > returnDate) {
        throw new Error("Cant Add Date");
      }

      await new ItemDate({
        receivedDate: receivedDate.toDateString(),
        returnDate: returnDate.toDateString(),
      }).save();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};

module.exports = {
  itemDateMutation,
};
