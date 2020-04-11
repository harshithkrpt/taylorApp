import React, { useRef } from "react";
import { LOCAL_STORAGE_TOKEN } from "../../utils/constants";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useAuthValue } from "../../context/AuthContext";

const SIGN_UP = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    signUp(userInput: { name: $name, email: $email, password: $password }) {
      token
      error {
        path
        msg
      }
    }
  }
`;

const SignUp = (props) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const [signup] = useMutation(SIGN_UP);
  const { setIsLogin } = useAuthValue();

  const handleSubmit = async (e) => {
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const name = nameRef.current.value;
      const response = await signup({ variables: { email, password, name } });
      const { data } = response;
      if (data.signUp.error) {
        throw new Error(data.signUp.error.msg);
      }
      // Store to local storage
      setIsLogin(true);
      localStorage.setItem(LOCAL_STORAGE_TOKEN, data.signUp.token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Name" ref={nameRef} />
      <input type="text" placeholder="Email" ref={emailRef} />
      <input type="password" placeholder="Password" ref={passwordRef} />
      <button onClick={handleSubmit}>SignUp</button>
    </div>
  );
};

export default SignUp;
