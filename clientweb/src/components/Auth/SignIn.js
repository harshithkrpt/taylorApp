import React, { useRef } from "react";
import firebase, { auth } from "../../config/firebase";
import { LOCAL_STORAGE_FIREBASE_KEY } from "../../utils/constants";

const SignIn = (props) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    try {
      await auth().signInWithEmailAndPassword(
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
      <input type="text" ref={emailRef} />
      <input type="password" ref={passwordRef} />
      <button onClick={handleSubmit}>SignIn</button>
    </div>
  );
};

export default SignIn;
