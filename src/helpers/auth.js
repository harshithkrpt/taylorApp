const admin = require("../config/firebase-service");

const getAuthToken = (request) => {
  if (
    request.headers.authorization &&
    request.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return request.headers.authorization.split(" ")[1];
  }
};

const isAuthenticated = async (request) => {
  const token = getAuthToken(request);

  const userInfo = await admin.auth().verifyIdToken(token);
  // Store The UserID
  request.authId = userInfo.uid;
};

module.exports = { isAuthenticated };
