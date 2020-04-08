import React, { useEffect } from "react";
import "./App.css";
import AddBlouse from "./components/Blouse/AddBlouse";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import DisplayBlouse from "./components/Blouse/DisplayBlouse";
import NavBar from "./components/NavBar/NavBar";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import { useAuthValue } from "./context/AuthContext";
import firebase from "./config/firebase";
import { LOCAL_STORAGE_FIREBASE_KEY } from "./utils/constants";

const onAuthStateChange = (setIsLogin) => {
  firebase.auth().onAuthStateChanged((user) => {
    console.log("Auth");
    if (user) {
      console.log("Login");
      setIsLogin(true);
    } else {
      console.log("Not Logged In");
      localStorage.removeItem(LOCAL_STORAGE_FIREBASE_KEY);
      setIsLogin(false);
    }
  });
};

function App() {
  const { isLogin, setIsLogin } = useAuthValue();

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setIsLogin);
    return () => {
      unsubscribe();
    };
  }, [setIsLogin]);
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/add_blouse">
            {isLogin ? <AddBlouse /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/display_blouses">
            {isLogin ? <DisplayBlouse /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/signin">
            {!isLogin ? <SignIn /> : <Redirect to="/display_blouses" />}
          </Route>
          <Route exact path="/signup">
            {!isLogin ? <SignUp /> : <Redirect to="/display_blouses" />}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
