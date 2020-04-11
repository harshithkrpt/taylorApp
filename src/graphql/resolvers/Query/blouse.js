const Blouse = require("../../../models/Blouse");

const blouseQuery = {
  blouses: async (_, __, { request }) => {
    if (!request.isAuth) {
      return null;
    }
    return await Blouse.find();
  },
};

module.exports = { blouseQuery };
