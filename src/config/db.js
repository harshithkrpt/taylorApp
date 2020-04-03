const mongoose = require("mongoose");

module.exports = async () => {
  mongoose
    .connect(process.env.MONGO_CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Database Connected");
    })
    .catch(err => {
      console.log(err);
    });
};
