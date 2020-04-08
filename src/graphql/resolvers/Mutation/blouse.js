const { isAuthenticated } = require("../../../helpers/auth");
const Blouse = require("../../../models/Blouse");

const blouseMutation = {
  addBlouse: async (_, args, { request }) => {
    if (await isAuthenticated(request)) {
      const newBlouse = new Blouse({ ...args.blouseInput });
      const data = await newBlouse.save();
      return { ...data._doc, _id: data.id };
    } else {
      return null;
    }
  },
};

module.exports = { blouseMutation };
