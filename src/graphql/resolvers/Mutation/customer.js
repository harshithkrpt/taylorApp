const Customer = require("../../../models/Customer");

const customerMutation = {
  addCustomer: async (_, { customerInput }) => {
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
  deleteCustomer: async (_, { _id }) => {
    try {
      await Customer.findByIdAndDelete({ _id });
      return true;
    } catch (e) {
      return false;
    }
  },
  updateCustomer: async (_, { _id, customerInput }) => {
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
