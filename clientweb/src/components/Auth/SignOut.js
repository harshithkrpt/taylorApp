import React from "react";
import { LOCAL_STORAGE_TOKEN } from "../../utils/constants";
import { useAuthValue } from "../../context/AuthContext";

const SignOut = (props) => {
  const { setIsLogin } = useAuthValue();
  const handleSignout = async (e) => {
    // TODO Remove State if ANY
    setIsLogin(false);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
  };

  return <button onClick={handleSignout}>Signout</button>;
};

export default SignOut;
