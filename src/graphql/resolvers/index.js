const {
  blouseQuery
} = require("./Query/blouse");
const {
  blouseMutation
} = require("./Mutation/blouse");
const {
  authMutation
} = require("../resolvers/Mutation/auth");
const {
  ownerMutation
} = require('../resolvers/Mutation/owner');
const {
  measurementMutation
} = require('../resolvers/Mutation/measurement')
const {
  ownerQuery
} = require('../resolvers/Query/owner')

module.exports = {
  Query: {
    ...blouseQuery,
    ...ownerQuery
  },
  Mutation: {
    ...authMutation,
    ...blouseMutation,
    ...ownerMutation,
    ...measurementMutation
  },
};