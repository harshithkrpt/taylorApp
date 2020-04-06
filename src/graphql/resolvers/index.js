const Blouse = require("../../models/Blouse");

module.exports = {
  Query: {
    blouses: async () => {
      return await Blouse.find();
    },
  },
  Mutation: {
    addBlouse: async (_, args) => {
      const newBlouse = new Blouse({ ...args.blouseInput });
      newBlouse;
      const data = await newBlouse.save();
      return { ...data._doc, _id: data.id };
    },
  },
};
