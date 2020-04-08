const { blouseQuery } = require("./Query/blouse");
const { blouseMutation } = require("./Mutation/blouse");

module.exports = {
  Query: {
    ...blouseQuery,
  },
  Mutation: {
    ...blouseMutation,
  },
};
