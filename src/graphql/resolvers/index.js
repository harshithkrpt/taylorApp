const { blouseQuery } = require("./Query/blouse");
const { blouseMutation } = require("./Mutation/blouse");
const { authMutation } = require("../resolvers/Mutation/auth");

module.exports = {
  Query: {
    ...blouseQuery,
  },
  Mutation: {
    ...authMutation,
    ...blouseMutation,
  },
};
