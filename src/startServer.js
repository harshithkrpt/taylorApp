const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const bodyParser = require("body-parser");
const dbProd = require("./config/db");
const User = require("./models/User");
const { databaseSetup } = require("./tests/utils/test-functions");
const cors = require("cors");
const isAuth = require("./middleware/isAuth");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const cookieParser = require("cookie-parser");
const { verify } = require("jsonwebtoken");
const {
  sendRefreshToken,
  createAccessToken,
  createRefreshToken,
} = require("./utils/auth");

const startServer = async () => {
  // Server Setup
  const app = express();

  // TODO  CORS SETUP FOR ONLY SELECTED FRONTEND
  app.use(cors({ origin: true }));
  app.use(cookieParser());
  // Body Parser
  app.use(bodyParser.json());

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.json({ ok: false, accessToken: "" });
    }

    let payload = null;
    try {
      payload = verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
    } catch (e) {
      console.log(e);
      return res.json({ ok: false, accessToken: "" });
    }

    const user = User.findOne({ id: payload.userId });
    if (!user) {
      return res.json({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.json({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  // Database Setup Test or Development
  if (process.env.NODE_ENV !== "test") {
    await dbProd();
  } else {
    await databaseSetup();
  }

  app.use(isAuth);

  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers,
    context: async ({ req, res }) => {
      // Request Header Validate Token

      return { req, res };
    },
  });

  server.applyMiddleware({ app });
  // Server Started
  app.listen(process.env.PORT, () => {
    console.log(`Server Started At PORT ${process.env.PORT}`);
  });

  return app;
};

module.exports = { startServer };
