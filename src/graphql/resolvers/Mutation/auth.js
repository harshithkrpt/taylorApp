const User = require("../../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.authMutation = {
  login: async (_, { email, password }) => {
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
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_AUTH_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return {
        token,
      };
    } catch (e) {
      console.log("Error", e);
    }
  },
  signUp: async (_, { userInput }) => {
    try {
      // TODO Verify The Email and Password Length
      // Create an Instance of User
      const user = new User({ ...userInput });
      // Hash the Password
      user.password = await bcrypt.hash(user.password, 10);
      // Save To Database
      await user.save();

      // Return Token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_AUTH_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return {
        token,
      };
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
};
