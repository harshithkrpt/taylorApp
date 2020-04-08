const Blouse = require("../../../models/Blouse");
const { isAuthenticated } = require("../../../helpers/auth");

const blouseQuery = {
  blouses: async (_, __, { request }) => {
    if (await isAuthenticated(request)) {
      return await Blouse.find();
    } else {
      return null;
    }
  },
};

module.exports = { blouseQuery };
