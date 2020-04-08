import React from "react";

import { auth } from "../../config/firebase";
const SignOut = (props) => {
  const handleSignout = async (e) => {
    try {
      await auth().signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return <button onClick={handleSignout}>Signout</button>;
};

export default SignOut;
