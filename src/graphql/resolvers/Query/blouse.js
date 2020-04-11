const Blouse = require("../../../models/Blouse");

const blouseQuery = {
  blouses: async (_, __, { req }) => {
    if (!req.isAuth) {
      return null;
    }
    return await Blouse.find();
  },
};

module.exports = { blouseQuery };
