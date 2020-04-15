const { blouseQuery } = require("./Query/blouse");
const { blouseMutation } = require("./Mutation/blouse");
const { authMutation } = require("../resolvers/Mutation/auth");
const { customerMutation } = require("../resolvers/Mutation/customer");
const { measurementMutation } = require("../resolvers/Mutation/measurement");
const { customerQuery } = require("../resolvers/Query/customer");
const { itemTypeMutation } = require("../resolvers/Mutation/item-type");
const { itemDateMutation } = require("../resolvers/Mutation/item-date");
const { itemMutation } = require("../resolvers/Mutation/item");

module.exports = {
  Query: {
    ...blouseQuery,
    ...customerQuery,
  },
  Mutation: {
    ...authMutation,
    ...blouseMutation,
    ...customerMutation,
    ...measurementMutation,
    ...itemTypeMutation,
    ...itemDateMutation,
    ...itemMutation,
  },
};
