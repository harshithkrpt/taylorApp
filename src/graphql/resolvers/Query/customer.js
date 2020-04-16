const Customer = require("../../../models/Customer");

const customerQuery = {
  getCustomer: async (_, { userId, searchTerm, customerId }, { req }) => {
    if (!req.isAuth) {
      return null;
    }
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
  getCustomers: async (_, { userId }, { req }) => {
    if (!req.isAuth) {
      return null;
    }
    let customers = [];
    try {
      customers = await Customer.find({ userId }).limit(20);
      customers = customers.map((customer) => {
        return {
          ...customer._doc,
          _id: customer.id,
        };
      });
      return customers;
    } catch (e) {
      console.log(e);
      return customers;
    }
  },
};

module.exports = {
  customerQuery,
};
