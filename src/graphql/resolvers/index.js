const Blouse = require("../../models/Blouse");

module.exports = {
  Query: {
    blouses: async () => {
      return await Blouse.find();
    }
  },
  Mutation: {
    addBlouse: async (_, args) => {
      const newBlouse = new Blouse({
        title: args.blouseInput.title,
        deadline: args.blouseInput.deadline
      });
      const data = await newBlouse.save();
      return { ...data._doc, _id: data.id };
    }
  }
};
