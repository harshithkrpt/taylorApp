import React, { useRef } from "react";
import firebase, { auth } from "../../config/firebase";
import { LOCAL_STORAGE_FIREBASE_KEY } from "../../utils/constants";

const SignIn = (props) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Submit Input
  const handleSubmit = async (e) => {
    try {
      await auth().createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
      const token = await firebase.auth().currentUser.getIdToken();
      localStorage.setItem(LOCAL_STORAGE_FIREBASE_KEY, token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Sign UP</h1>
      <input placeholder="Email" type="text" ref={emailRef} />
      <input placeholder="Password" type="password" ref={passwordRef} />

      <button onClick={handleSubmit}>SignUp</button>
    </div>
  );
};

export default SignIn;
