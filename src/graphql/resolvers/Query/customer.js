const Customer = require("../../../models/Customer");

const customerQuery = {
  getCustomer: async (_, { userId, searchTerm, customerId }) => {
    let customer;
    try {
      if (customerId) {
        customer = await Customer.findOne({ userId, _id: customerId });
      } else if (searchTerm) {
        customer = await Customer.findOne({ $text: { $search: searchTerm } });
      } else {
        throw new Error("Search Something");
      }
      return {
        ...customer._doc,
        _id: customer.id,
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};

module.exports = {
  customerQuery,
};
