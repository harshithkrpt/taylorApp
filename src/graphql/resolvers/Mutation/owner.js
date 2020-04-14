const Owner = require('../../../models/Owner');


const ownerMutation = {
    addOwner: async (_, {
        ownerInput
    }) => {
        let phoneNo = +ownerInput.phoneNo;
        const owner = await Owner.findOne({
            phoneNo
        });
        if (owner) {
            throw Error("Owner Already Exists");
        }
        let newOwner = new Owner({
            ...ownerInput,
            phoneNo
        });
        try {
            newOwner = await newOwner.save();
            return {
                _id: newOwner.id,
                ...newOwner._doc
            };
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

module.exports = {
    ownerMutation
}