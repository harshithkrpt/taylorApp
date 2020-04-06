require("dotenv/config");
const path = require("path");
const { startServer } = require("./startServer");

// Firebase Config
const firebase = require("./config/firebase");

// Start The Server
startServer();
