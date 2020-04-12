import React from "react";
import "./App.scss";

import Navbar from "./components/header/Navbar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PublicRoutes from "./components/routes/PublicRoutes";
import PrivateRoutes from "./components/routes/PrivateRoutes";

// para redux
import { useSelector } from "react-redux";

function App() {
  const state = useSelector(state => state);
  // console.log(state);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          {state.isloged &&
            PrivateRoutes.map((route, idx) => (
              <Route key={idx} path={route.name} component={route.component} />
            ))}
          {PublicRoutes.map((route, idx) => (
            <Route key={idx} path={route.name} component={route.component} />
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
