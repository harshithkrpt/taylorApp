const User = require("../../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  sendRefreshToken,
  createAccessToken,
  createRefreshToken,
} = require("../../../utils/auth");

exports.authMutation = {
  login: async (_, { email, password }, { res }) => {
    try {
      // Check If Email Exists
      const user = await User.findOne({ email });

      if (!user) {
        return {
          error: {
            path: "login",
            msg: "Email Not Found",
          },
        };
      }
      // Compare the Password With Bcrypt
      const isAuth = await bcrypt.compare(password, user.password);
      if (!isAuth) {
        return {
          error: {
            path: "login",
            msg: "Invalid Credentials",
          },
        };
      }

      // Return Token
      //  Login Sucessful
      sendRefreshToken(res, createRefreshToken(user));

      return createAccessToken(user);
    } catch (e) {
      console.log("Error", e);
    }
  },
  signUp: async (_, { userInput }, { res }) => {
    try {
      // TODO Verify The Email and Password Length
      // Create an Instance of User
      const user = new User({ ...userInput });
      // Hash the Password
      user.password = await bcrypt.hash(user.password, 10);
      // Save To Database
      await user.save();

      sendRefreshToken(res, createRefreshToken(user));

      return createAccessToken(user);
    } catch (e) {
      console.log("SignUp", e);
      return {
        error: {
          path: "signup",
          msg: "Email Exists",
        },
      };
    }
  },
  logout: (_, __, { req, res }) => {
    if (!req.isAuth) {
      return null;
    }
    // Auth CheckUp
    sendRefreshToken(res, "");
    return true;
  },
  revokeRefreshTokensForUsers: async (_, { userId }, { req }) => {
    if (!req.isAuth) {
      return null;
    }
    // Auth CheckUp
    try {
      const user = await User.findOne({ _id: userId });
      console.log(user);
      user.tokenVersion++;
      await user.save();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
