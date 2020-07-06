import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Currencies from "./currencies";
import Currency from "./currency";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Currencies} />
        <Route path="/currency/:id" component={Currency} />
      </Switch>
    </Router>
  );
}

export default App;
