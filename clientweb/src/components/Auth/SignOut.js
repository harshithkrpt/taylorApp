import React from "react";
import { useAuthValue } from "../../context/AuthContext";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { setAccessToken } from "../../context/accessToken";

const SIGNOUT = gql`
  mutation {
    logout
  }
`;

const SignOut = (props) => {
  const { setIsLogin } = useAuthValue();
  const [signout] = useMutation(SIGNOUT);
  const handleSignout = async (e) => {
    // TODO Remove State if ANY
    await signout();
    setIsLogin(false);
    setAccessToken("");
  };

  return <button onClick={handleSignout}>Signout</button>;
};

export default SignOut;
