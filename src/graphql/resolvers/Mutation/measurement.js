const Measurement = require('../../../models/Measurement');
const Owner = require('../../../models/Owner');

const measurementMutation = {
    addMeasurement: async (_, {
        measurementInput,
        _id
    }) => {
        try {

            console.log(_id);
            const owner = await Owner.findOne({
                _id
            })

            if (!owner) {
                throw new Error("Owner Does Not Exists");
            }

            if (owner.measurementId) {
                throw new Error("Measurement Already Exists");
            }

            let newMeasurement = new Measurement({
                ...measurementInput
            });


            newMeasurement = await newMeasurement.save();
            // Connect Owner With Measurement
            owner.measurementId = newMeasurement.id;

            await owner.save()

            return {
                _id: newMeasurement.id,
                ...newMeasurement._doc
            };

        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

module.exports = {
    measurementMutation
}