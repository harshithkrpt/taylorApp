const mongoose = require("mongoose");
const databaseName = "test-taylor-app";

let db;

const databaseSetup = async () => {
  try {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    db = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database Connected");
  } catch (e) {
    console.log(e);
  }
};

const databaseCleanUp = async () => {
  try {
    db.connection.db.dropDatabase();
  } catch (e) {
    console.log(e);
  }
};

module.exports = { databaseCleanUp, databaseSetup };
