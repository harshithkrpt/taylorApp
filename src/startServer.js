const { GraphQLServer } = require("graphql-yoga");
const path = require("path");
const bodyParser = require("body-parser");
const dbProd = require("./config/db");
const resolvers = require("./graphql/resolvers/index");
const { databaseSetup } = require("./tests/utils/test-functions");
const cors = require("cors");
const { getAuthToken, isAuthenticated } = require("./helpers/auth");

const startServer = async () => {
  // Server Setup
  const server = new GraphQLServer({
    typeDefs: path.join(__dirname, "./graphql/schema/index.graphql"),
    resolvers: resolvers,
    context: async ({ request }) => {
      // Request Header Validate Token
      return { request };
    },
  });

  // Database Setup Test or Development
  if (process.env.NODE_ENV !== "test") {
    await dbProd();
  } else {
    await databaseSetup();
  }

  // TODO  CORS SETUP FOR ONLY SELECTED FRONTEND
  server.express.use(cors({ origin: true }));

  // Body Parser
  server.express.use(bodyParser.json());

  // Server Started
  const app = await server.start({ port: 8080 }, () => {
    console.log("The server is running on http://localhost:8080");
  });

  return app;
};

module.exports = { startServer };
