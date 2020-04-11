const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const bodyParser = require("body-parser");
const dbProd = require("./config/db");

const { databaseSetup } = require("./tests/utils/test-functions");
const cors = require("cors");
const isAuth = require("./middleware/isAuth");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const startServer = async () => {
  // Server Setup
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers,
    context: async ({ req }) => {
      // Request Header Validate Token

      return { req };
    },
  });

  // Database Setup Test or Development
  if (process.env.NODE_ENV !== "test") {
    await dbProd();
  } else {
    await databaseSetup();
  }

  // TODO  CORS SETUP FOR ONLY SELECTED FRONTEND
  app.use(cors({ origin: true }));

  app.use(isAuth);
  // Body Parser
  app.use(bodyParser.json());

  server.applyMiddleware({ app });
  // Server Started
  app.listen(process.env.PORT, () => {
    console.log(`Server Started At PORT ${process.env.PORT}`);
  });

  return app;
};

module.exports = { startServer };
