const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");

const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

// Database
require("./config/db");

const app = express();

app.use(express.json());

app.use(cors({ origin: true }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  })
);

app.listen(process.env.PORT, () => {
  console.log("Server Started at " + process.env.PORT);
});
