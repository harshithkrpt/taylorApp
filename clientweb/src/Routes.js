import React from "react";
import "./App.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

import DisplayBlouse from "./components/Blouse/DisplayBlouse";
import AddBlouse from "./components/Blouse/AddBlouse";

import { useAuthValue } from "./context/AuthContext";

function Routes() {
  const { isLogin } = useAuthValue();

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

export default Routes;
