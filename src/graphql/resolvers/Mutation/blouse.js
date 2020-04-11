const Blouse = require("../../../models/Blouse");

const blouseMutation = {
  addBlouse: async (_, args, { request }) => {
    try {
      if (!request.isAuth) {
        return null;
      }
      const newBlouse = new Blouse({ ...args.blouseInput });
      const data = await newBlouse.save();
      return { ...data._doc, _id: data.id };
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  deleteBlouse: async (_, { _id }, { request }) => {
    try {
      if (!request.isAuth) {
        return null;
      }
      const res = await Blouse.findByIdAndDelete(_id);
      if (res != null) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  updateBlouse: async (_, args, { request }) => {
    try {
      if (!request.isAuth) {
        return null;
      }
      const { _id, updateBlouseInput } = args;

      const doc = await Blouse.findByIdAndUpdate({ _id }, updateBlouseInput, {
        new: true,
      });
      console.log(doc);
      return doc;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};

module.exports = { blouseMutation };
