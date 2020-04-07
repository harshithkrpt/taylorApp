import React from "react";
import "./App.css";
import Blouse from "./components/Blouse/AddBlouse";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DisplayBlouse from "./components/Blouse/DisplayBlouse";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/add_blouse" component={Blouse} />
          <Route exact path="/display_blouses" component={DisplayBlouse} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
