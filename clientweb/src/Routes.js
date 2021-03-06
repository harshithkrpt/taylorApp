import React from "react";
import "./App.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

import DisplayBlouse from "./components/Blouse/DisplayBlouse";
import AddBlouse from "./components/Blouse/AddBlouse";

import { useAuthValue } from "./context/AuthContext";
import AddCustomer from "./components/Customer/AddCustomer";
import Customers from "./components/Customer/Customers";

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
          <Route exact path="/add_customer">
            {isLogin ? <AddCustomer /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/display_customers">
            {isLogin ? <Customers /> : <Redirect to="/signin" />}
          </Route>
          <Route exact path="/signin">
            {!isLogin ? <SignIn /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/signup">
            {!isLogin ? <SignUp /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default Routes;
