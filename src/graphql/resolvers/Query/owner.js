const Owner = require('../../../models/Owner');

const ownerQuery = {
    getOwner: async (_, {
        _id
    }) => {
        const owner = await Owner.findOne({
            _id
        });
        return {
            ...owner._doc,
            _id
        }
    }
}

module.exports = {
    ownerQuery
}