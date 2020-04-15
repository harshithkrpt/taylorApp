const ItemType = require('../../../models/ItemType');


const itemTypeMutation = {
    addItemType: async (_, {
        itemTypeInput
    }) => {
        // Check If Name Exists
        const itemType = await ItemType.findOne({
            name: itemTypeInput.name
        });
        if (itemType) {
            throw new Error("Item Type Already Exists");
        }
        try {
            await new ItemType({
                    ...itemTypeInput
                })
                .save()
            return true

        } catch {
            return false;
        }

    }
}

module.exports = {
    itemTypeMutation
}