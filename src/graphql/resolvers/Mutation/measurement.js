const Measurement = require("../../../models/Measurement");
const Customer = require("../../../models/Customer");

const measurementMutation = {
  addMeasurement: async (_, { measurementInput, _id }) => {
    try {
      const customer = await Customer.findOne({
        _id,
      });

      if (!customer) {
        throw new Error("Customer Does Not Exists");
      }

      if (customer.measurementId) {
        throw new Error("Measurement Already Exists");
      }

      let newMeasurement = new Measurement({
        ...measurementInput,
      });

      newMeasurement = await newMeasurement.save();
      // Connect customer With Measurement
      customer.measurementId = newMeasurement.id;

      await customer.save();

      return {
        _id: newMeasurement.id,
        ...newMeasurement._doc,
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};

module.exports = {
  measurementMutation,
};
