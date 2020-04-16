const Customer = require("../../../models/Customer");

const customerMutation = {
  addCustomer: async (_, { customerInput }, { req }) => {
    if (!req.isAuth) {
      return null;
    }
    let phoneNo = +customerInput.phoneNo;
    const customer = await Customer.findOne({
      phoneNo,
    });
    if (customer) {
      throw Error("Customer Already Exists");
    }
    let newCustomer = new Customer({
      ...customerInput,
      phoneNo,
    });
    try {
      newCustomer = await newCustomer.save();
      return {
        _id: newCustomer.id,
        ...newCustomer._doc,
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  deleteCustomer: async (_, { _id }, { req }) => {
    if (!req.isAuth) {
      return null;
    }
    try {
      // TODO DELETE THE MEASUREMENTS TOO
      await Customer.findByIdAndDelete({ _id });
      return true;
    } catch (e) {
      return false;
    }
  },
  updateCustomer: async (_, { _id, customerInput }, { req }) => {
    if (!req.isAuth) {
      return null;
    }
    try {
      const customer = await Customer.findByIdAndUpdate(
        { _id },
        customerInput,
        { new: true }
      );

      return {
        ...customer._doc,
        _id: customer.id,
      };
    } catch (e) {
      return null;
    }
  },
};

module.exports = {
  customerMutation,
};
