const { sign } = require("jsonwebtoken");

const createAccessToken = (user) => {
  return {
    token: sign({ userId: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    }),
  };
};

const createRefreshToken = (user) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

const sendRefreshToken = (res, token) => {
  return res.cookie("jid", token, { httpOnly: true });
};

module.exports = { createAccessToken, createRefreshToken, sendRefreshToken };
