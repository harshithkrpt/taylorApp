const Measurement = require("../../../models/Measurement");
const Customer = require("../../../models/Customer");

const measurementQuery = {
  getMeasurement: async (_, { customerID, measurementId }, { req }) => {
    if (!req.isAuth) {
      return null;
    }

    if (customerID) {
      measurementId = await Customer.findOne({ _id: customerID }).measurementId;
    }

    const measurement = await Measurement.findOne({ _id: measurementId });

    return { _id: measurement.id, ...measurement._doc };
  },
};

module.exports = { measurementQuery };
