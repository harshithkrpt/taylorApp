const { GraphQLServer } = require("graphql-yoga");
const path = require("path");
const bodyParser = require("body-parser");
const dbProd = require("./config/db");
const resolvers = require("./graphql/resolvers/index");
const { databaseSetup } = require("./tests/utils/test-functions");
const cors = require("cors");

const startServer = async () => {
  const server = new GraphQLServer({
    typeDefs: path.join(__dirname, "./graphql/schema/index.graphql"),
    resolvers: resolvers,
  });

  if (process.env.NODE_ENV !== "test") {
    await dbProd();
  } else {
    await databaseSetup();
  }

  server.express.use(cors({ origin: true }));

  server.express.use(bodyParser.json());

  const app = await server.start({ port: 8080 }, () => {
    console.log("The server is running on http://localhost:8080");
  });
  return app;
};

module.exports = { startServer };
