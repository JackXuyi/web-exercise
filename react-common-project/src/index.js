/**
 * @author xuyi
 */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./container";
import Route from "./router";
import store from "./redux/store";
import DevTools from "./redux/devtools";

if (process.env.NODE_ENV !== "production") {
  console.log("this is not production");
}

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route>
        {process.env.NODE_ENV !== "production" ? <DevTools /> : null}
      </Route>
    </Provider>
  </Router>,
  document.getElementById("root")
);
