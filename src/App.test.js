import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// para redux
import { Provider } from "react-redux";
import Store from "./components/redux/Store";
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
