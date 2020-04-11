const Blouse = require("../../../models/Blouse");
const { createWriteStream } = require("fs");
const path = require("path");

const blouseMutation = {
  addBlouse: async (_, args, { req }) => {
    try {
      if (!req.isAuth) {
        return null;
      }
      let imageName;
      if (args.blouseInput.image) {
        const { createReadStream, filename } = await args.blouseInput.image;
        imageName = filename;
        await new Promise((res) =>
          createReadStream().pipe(
            createWriteStream(path.join(__dirname, "images", filename)).on(
              "close",
              res
            )
          )
        );
      }

      const newBlouse = new Blouse({ ...args.blouseInput, image: imageName });
      const data = await newBlouse.save();
      return { ...data._doc, _id: data.id };
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  deleteBlouse: async (_, { _id }, { req }) => {
    try {
      if (!req.isAuth) {
        return null;
      }
      const res = await Blouse.findByIdAndDelete(_id);
      if (res != null) {
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  updateBlouse: async (_, args, { req }) => {
    try {
      if (!req.isAuth) {
        return null;
      }
      const { _id, updateBlouseInput } = args;

      const doc = await Blouse.findByIdAndUpdate({ _id }, updateBlouseInput, {
        new: true,
      });
      return doc;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};

module.exports = { blouseMutation };
