import React, { useRef } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useAuthValue } from "../../context/AuthContext";
import { setAccessToken } from "../../context/accessToken";

const SIGN_IN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      error {
        path
        msg
      }
    }
  }
`;

const SignIn = (props) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [login] = useMutation(SIGN_IN);
  const { setIsLogin } = useAuthValue();

  const handleSubmit = async (e) => {
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const response = await login({ variables: { email, password } });
      const { data } = response;
      if (data.login.error) {
        throw new Error(data.login.error.msg);
      }
      // Store to local storage
      setIsLogin(true);
      setAccessToken(data.login.token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Email" ref={emailRef} />
      <input type="password" placeholder="Password" ref={passwordRef} />
      <button onClick={handleSubmit}>SignIn</button>
    </div>
  );
};

export default SignIn;
