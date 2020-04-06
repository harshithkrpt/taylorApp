const Blouse = require("../../models/Blouse");
const shortid = require("shortid");

const storeUpload = async ({ stream }) => {
  const path = `images/${shortid.generate()}`;
  return new Promise((resolve, reject) => {
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ path }))
      .on("error", reject);
  });
};

const processUpload = async (upload) => {
  const { stream } = await upload;
  const { path } = await storeUpload({ stream });
  return path;
};

module.exports = {
  Query: {
    blouses: async () => {
      return await Blouse.find();
    },
  },
  Mutation: {
    addBlouse: async (_, args) => {
      const newBlouse = new Blouse({
        title: args.blouseInput.title,
        deadline: args.blouseInput.deadline,
        pictureUrl: await processUpload(args.blouseInput.picture),
      });
      const data = await newBlouse.save();
      return { ...data._doc, _id: data.id };
    },
  },
};
